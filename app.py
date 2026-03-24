"""Student Atlas Flask application."""

from __future__ import annotations

import html
import logging
import os
import re
import secrets
import threading
import time
from datetime import datetime, timezone

import feedparser
from flask import Flask, abort, flash, redirect, render_template, request, url_for
from markupsafe import escape

import google.generativeai as genai
from dotenv import load_dotenv

from models import AppStatus, LongTermImmigration, NewsUpdate, StudentVisaInfo, db

load_dotenv()

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
	level=logging.INFO,
	format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("student_atlas")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
TARGET_COUNTRIES = ["United States", "United Kingdom"]

IMMIGRATION_KEYWORDS = (
	"student",
	"visa",
	"immigration",
	"sevis",
	"ukvi",
	"graduate route",
	"tier 4",
	"i-20",
	"international student",
	"study abroad",
	"f-1",
	"opt",
	"cpt",
	"stem opt",
	"h-1b",
	"work visa",
	"green card",
	"permanent residence",
	"citizenship",
	"naturalization",
)

RSS_FEEDS = {
	"USCIS Immigration Updates": "https://www.uscis.gov/news/rss.xml",
	"US Department of State": "https://travel.state.gov/_res/rss/VISADP.xml",
	"United Kingdom Home Office": "https://www.gov.uk/government/organisations/uk-visas-and-immigration.atom",
	"The PIE News": "https://thepienews.com/feed/",
	"Inside Higher Ed": "https://www.insidehighered.com/rss.xml",
	"Migration Policy Institute": "https://www.migrationpolicy.org/programs/us-immigration-policy-program/rss.xml",
	"Study International": "https://www.studyinternational.com/feed/",
	"Immigration Impact": "https://immigrationimpact.com/feed/",
	"CNN": "http://rss.cnn.com/rss/cnn_topstories.rss",
	"CNN World": "http://rss.cnn.com/rss/cnn_world.rss",
	"Fox News": "https://moxie.foxnews.com/google-publisher/latest.xml",
	"CBS News": "https://www.cbsnews.com/latest/rss/main",
	"NBC News": "https://feeds.nbcnews.com/nbcnews/public/news",
	"BBC News": "http://feeds.bbci.co.uk/news/rss.xml",
	"BBC News World": "http://feeds.bbci.co.uk/news/world/rss.xml",
	"Reuters": "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best",
	"Associated Press": "https://apnews.com/rss",
	"The Guardian": "https://www.theguardian.com/world/rss",
	"NPR": "https://feeds.npr.org/1001/rss.xml",
	"Politico": "https://www.politico.com/rss/politicopicks.xml",
}

# Input length limits
MAX_COUNTRY_NAME_LEN = 100
MAX_FILTER_LEN = 200
MAX_NEWS_ITEMS = 200
NEWS_PER_PAGE = 20

# ---------------------------------------------------------------------------
# HTML sanitisation helper
# ---------------------------------------------------------------------------
_HTML_TAG_RE = re.compile(r"<[^>]+>")


def strip_html_tags(text: str) -> str:
	"""Remove HTML tags and decode entities, returning plain text."""
	if not text:
		return ""
	text = html.unescape(text)
	return _HTML_TAG_RE.sub("", text).strip()


def make_readable(text: str) -> str:
	"""Convert simple HTML fragments into readable plain text."""
	if not text:
		return ""
	text = text.replace("<p>", "\n\n").replace("</p>", "")
	text = text.replace("<br>", "\n").replace("<br/>", "\n").replace("<br />", "\n")
	# Strip remaining tags
	text = _HTML_TAG_RE.sub("", text)
	text = html.unescape(text)
	return text.strip()


# ---------------------------------------------------------------------------
# Input validation helpers
# ---------------------------------------------------------------------------
def _sanitize_text_input(value: str | None, max_length: int = 200) -> str:
	"""Strip, truncate, and escape a text input. Returns empty string on None."""
	if not value:
		return ""
	cleaned = value.strip()
	if len(cleaned) > max_length:
		cleaned = cleaned[:max_length]
	return cleaned


def _is_valid_country_name(name: str) -> bool:
	"""Basic check that a country name looks reasonable (letters, spaces, hyphens, periods)."""
	if not name:
		return False
	return bool(re.match(r"^[A-Za-z\s\-\.\']{1,100}$", name))


def _validate_target_country(target_arg: str | None) -> str:
	"""Validate and return a target country, defaulting to first in list."""
	target = _sanitize_text_input(target_arg, MAX_COUNTRY_NAME_LEN)
	if target not in TARGET_COUNTRIES:
		target = TARGET_COUNTRIES[0]
	return target


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------
def create_app() -> Flask:
	app = Flask(__name__)

	# Security: set a proper secret key for session signing and CSRF
	app.config["SECRET_KEY"] = os.environ.get(
		"FLASK_SECRET_KEY", secrets.token_hex(32)
	)
	app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///student_atlas.db"
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

	# Security headers
	app.config["SESSION_COOKIE_HTTPONLY"] = True
	app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

	db.init_app(app)

	with app.app_context():
		db.create_all()
		try:
			seed_reference_data()
		except Exception:
			logger.exception("Failed to seed reference data")
			db.session.rollback()

	register_routes(app)
	register_error_handlers(app)
	register_cli(app)
	start_background_worker(app)

	return app


# ---------------------------------------------------------------------------
# Seed data
# ---------------------------------------------------------------------------
def seed_reference_data() -> None:
	if StudentVisaInfo.query.count() == 0:
		reference_entries = [
			StudentVisaInfo(
				target_country="United States",
				visa_name="F-1 Student Visa",
				overview=(
					"Primary pathway for academic study at SEVP-approved institutions. Applicants "
					"must prove sufficient funding and intent to return home upon program completion."
				),
				legal_summary=(
					"Regulated under the Immigration and Nationality Act sections 101(a)(15)(F) and 214."
					" Requires SEVIS registration, Form I-20 issuance, and compliance with full-time "
					"enrollment mandates."
				),
				compliance_steps=(
					"1. Receive Form I-20 from designated school official.\n"
					"2. Pay the I-901 SEVIS fee prior to consular interview.\n"
					"3. Complete DS-160, schedule biometrics plus interview, and maintain proof of "
					"financial capacity covering tuition and living costs.\n"
					"4. Upon arrival, check in with the DSO within 30 days and keep records of work "
					"authorization such as CPT or OPT."
				),
				updated_at=datetime(2024, 11, 6, 9, 0, 0),
			),
			StudentVisaInfo(
				target_country="United Kingdom",
				visa_name="Student Route (formerly Tier 4)",
				overview=(
					"Covers courses longer than six months with a licensed sponsor. Applicants need a "
					"Confirmation of Acceptance for Studies (CAS) and evidence of English proficiency."
				),
				legal_summary=(
					"Outlined in Appendix Student of the Immigration Rules. Applicants must satisfy "
					"Genuine Student, maintenance, and academic progression requirements overseen by "
					"UK Visas and Immigration (UKVI)."
				),
				compliance_steps=(
					"1. Obtain CAS with details of tuition fees, course dates, and sponsor license.\n"
					"2. Demonstrate financial maintenance for up to nine months plus outstanding fees.\n"
					"3. Pay the Immigration Health Surcharge and submit biometrics before visa decision.\n"
					"4. Collect BRP within 10 days of arrival and register police if required."
				),
				updated_at=datetime(2024, 10, 28, 12, 30, 0),
			),
		]
		db.session.add_all(reference_entries)

	if LongTermImmigration.query.count() == 0:
		long_term_entries = [
			LongTermImmigration(
				target_country="United States",
				category="Work Visas",
				title="H-1B Specialty Occupation",
				description=(
					"Temporary visa for professionals in specialty occupations. Requires employer sponsorship "
					"and a labor condition application (LCA)."
				),
				key_requirements=(
					"- Bachelor's degree or equivalent in relevant field\n"
					"- Employer must petition on your behalf\n"
					"- Subject to annual cap; lottery system in effect\n"
					"- Valid for 3 years, extendable to 6 years"
				),
				updated_at=datetime(2024, 11, 1, 0, 0, 0),
			),
			LongTermImmigration(
				target_country="United States",
				category="Residency",
				title="Green Card (Permanent Resident Status)",
				description=(
					"Grants indefinite residency and work authorization. Can be obtained through employment, "
					"family sponsorship, diversity visa, or humanitarian grounds."
				),
				key_requirements=(
					"- Employment-based: I-140 petition and priority date\n"
					"- Family-based: Immediate relative or preference category sponsorship\n"
					"- Diversity Visa: Annual lottery program\n"
					"- Must pass background and medical checks (I-693)"
				),
				updated_at=datetime(2024, 10, 15, 0, 0, 0),
			),
			LongTermImmigration(
				target_country="United States",
				category="Citizenship",
				title="US Citizenship and Naturalization",
				description=(
					"Path to becoming a US citizen. Requires green card holding for 5 years (3 if married to USC), "
					"continuous residence, and passing civics exam."
				),
				key_requirements=(
					"- 5 years permanent residency (or 3 if spouse is USC)\n"
					"- Demonstrate English proficiency\n"
					"- Pass civics test on US government and history\n"
					"- Good moral character\n"
					"- Oath of allegiance ceremony"
				),
				updated_at=datetime(2024, 11, 5, 0, 0, 0),
			),
			LongTermImmigration(
				target_country="United Kingdom",
				category="Work Visas",
				title="Skilled Worker Visa",
				description=(
					"Main visa for employment in the UK. Requires sponsorship from an employer with a valid "
					"license. Based on points system and salary thresholds."
				),
				key_requirements=(
					"- Licensed employer sponsorship required\n"
					"- Salary threshold: \u00a329,000+ (some exceptions at \u00a320,960+)\n"
					"- Points-based assessment\n"
					"- Valid for up to 5 years, renewable"
				),
				updated_at=datetime(2024, 11, 2, 0, 0, 0),
			),
			LongTermImmigration(
				target_country="United Kingdom",
				category="Residency",
				title="Indefinite Leave to Remain (ILR)",
				description=(
					"Permanent residency status in the UK. Grants right to live, work, and study indefinitely "
					"without need for visa renewal."
				),
				key_requirements=(
					"- Usually 5 years continuous residence on eligible visa\n"
					"- Pass the 'Life in the UK' test (citizenship knowledge)\n"
					"- English language requirement\n"
					"- Demonstrate genuine intention to settle"
				),
				updated_at=datetime(2024, 10, 20, 0, 0, 0),
			),
			LongTermImmigration(
				target_country="United Kingdom",
				category="Citizenship",
				title="British Citizenship",
				description=(
					"Become a British citizen. Available after holding ILR for 12 months, or 6 months if married "
					"to a British citizen. Requires pledge of allegiance."
				),
				key_requirements=(
					"- 12 months ILR (or 6 months if spouse is British)\n"
					"- Pass 'Life in the UK' test\n"
					"- Demonstrate good character\n"
					"- English language proficiency (B1 level)\n"
					"- Pledge of allegiance ceremony"
				),
				updated_at=datetime(2024, 11, 3, 0, 0, 0),
			),
		]
		db.session.add_all(long_term_entries)

	db.session.commit()


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
def register_routes(app: Flask) -> None:

	# -- Security: add headers to every response --
	@app.after_request
	def _set_security_headers(response):
		response.headers["X-Content-Type-Options"] = "nosniff"
		response.headers["X-Frame-Options"] = "SAMEORIGIN"
		response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
		return response

	@app.context_processor
	def inject_globals() -> dict:
		return {"current_year": datetime.now(timezone.utc).year}

	# -- Index route --
	@app.route("/", methods=["GET"])
	def index():
		target = _validate_target_country(request.args.get("target"))

		try:
			visa_info = StudentVisaInfo.query.filter_by(target_country=target).first()
			long_term_info = LongTermImmigration.query.filter_by(
				target_country=target
			).order_by(LongTermImmigration.category).all()
		except Exception:
			logger.exception("Database error loading index data")
			visa_info = None
			long_term_info = []
			flash("Unable to load visa information. Please try again later.", "error")

		return render_template(
			"index.html",
			target_countries=TARGET_COUNTRIES,
			selected_target=target,
			visa_info=visa_info,
			long_term_info=long_term_info,
		)

	# -- News route with pagination --
	@app.route("/news", methods=["GET"])
	def news():
		target = _validate_target_country(request.args.get("target"))
		country_filter = _sanitize_text_input(
			request.args.get("country_filter"), MAX_FILTER_LEN
		)

		# Pagination
		try:
			page = max(1, int(request.args.get("page", 1)))
		except (ValueError, TypeError):
			page = 1

		try:
			# Build query with parameterised filters (SQLAlchemy handles escaping)
			query = NewsUpdate.query.filter(
				(NewsUpdate.region_focus == target)
				| (NewsUpdate.region_focus == "General")
			)

			if country_filter:
				# Use parameterised LIKE -- SQLAlchemy escapes the value
				safe_filter = f"%{country_filter}%"
				query = query.filter(
					(NewsUpdate.title.ilike(safe_filter))
					| (NewsUpdate.summary.ilike(safe_filter))
				)

			total_count = query.count()
			total_pages = max(1, (total_count + NEWS_PER_PAGE - 1) // NEWS_PER_PAGE)
			page = min(page, total_pages)

			news_rows = (
				query.order_by(NewsUpdate.published_at.desc())
				.offset((page - 1) * NEWS_PER_PAGE)
				.limit(NEWS_PER_PAGE)
				.all()
			)
		except Exception:
			logger.exception("Database error loading news")
			news_rows = []
			total_pages = 1
			total_count = 0
			flash("Unable to load news updates. Please try again later.", "error")

		last_refreshed = get_status_timestamp("news_last_refreshed")

		# Build display-ready copies with sanitised summaries
		news_updates = []
		for row in news_rows:
			news_updates.append(
				NewsUpdate(
					id=row.id,
					source=row.source,
					title=row.title,
					link=row.link,
					summary=make_readable(row.summary) if row.summary else None,
					published_at=row.published_at,
					region_focus=row.region_focus,
					created_at=row.created_at,
				)
			)

		return render_template(
			"news.html",
			target_countries=TARGET_COUNTRIES,
			selected_target=target,
			news_updates=news_updates,
			last_refreshed=last_refreshed,
			country_filter=country_filter,
			page=page,
			total_pages=total_pages,
			total_count=total_count,
		)

	# -- Chatbot route --
	@app.route("/chatbot", methods=["GET", "POST"])
	def chatbot():
		if request.method == "POST":
			origin = _sanitize_text_input(
				request.form.get("origin"), MAX_COUNTRY_NAME_LEN
			)
			destination = _sanitize_text_input(
				request.form.get("destination"), MAX_COUNTRY_NAME_LEN
			)

			# Validate inputs
			if not origin or not destination:
				return render_template(
					"chatbot.html",
					target_countries=TARGET_COUNTRIES,
					error="Please provide both origin and destination countries.",
				)

			if not _is_valid_country_name(origin):
				return render_template(
					"chatbot.html",
					target_countries=TARGET_COUNTRIES,
					error="Origin country name contains invalid characters. Please use only letters, spaces, and hyphens.",
					origin=origin,
					destination=destination,
				)

			if not _is_valid_country_name(destination):
				return render_template(
					"chatbot.html",
					target_countries=TARGET_COUNTRIES,
					error="Destination country name contains invalid characters.",
					origin=origin,
					destination=destination,
				)

			if origin.lower() == destination.lower():
				return render_template(
					"chatbot.html",
					target_countries=TARGET_COUNTRIES,
					error="Origin and destination countries must be different.",
					origin=origin,
					destination=destination,
				)

			response = get_visa_guidance(origin, destination)

			# Use POST-Redirect-GET for the chatbot so refreshing doesn't re-POST.
			# However, the template expects the response inline, so we render directly
			# but still protect against double-submit via the form design.
			return render_template(
				"chatbot.html",
				target_countries=TARGET_COUNTRIES,
				origin=origin,
				destination=destination,
				response=response,
			)

		return render_template("chatbot.html", target_countries=TARGET_COUNTRIES)


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------
def register_error_handlers(app: Flask) -> None:

	@app.errorhandler(404)
	def page_not_found(e):
		return render_template(
			"base.html",
			error_code=404,
			error_message="Page not found.",
		), 404

	@app.errorhandler(500)
	def internal_error(e):
		db.session.rollback()
		return render_template(
			"base.html",
			error_code=500,
			error_message="An internal error occurred. Please try again later.",
		), 500

	@app.errorhandler(429)
	def too_many_requests(e):
		return render_template(
			"base.html",
			error_code=429,
			error_message="Too many requests. Please wait and try again.",
		), 429


# ---------------------------------------------------------------------------
# CLI commands
# ---------------------------------------------------------------------------
def register_cli(app: Flask) -> None:
	@app.cli.command("fetch-news")
	def fetch_news_command() -> None:
		with app.app_context():
			added = fetch_and_store_news()
			print(f"Stored {added} news items.")


# ---------------------------------------------------------------------------
# Background worker
# ---------------------------------------------------------------------------
NEWS_FETCH_INTERVAL = 1800  # 30 minutes
NEWS_FETCH_ERROR_BACKOFF = 300  # 5 minutes on error


def start_background_worker(app: Flask) -> None:
	def worker() -> None:
		while True:
			wait = NEWS_FETCH_INTERVAL
			with app.app_context():
				try:
					fetch_and_store_news()
				except Exception:
					logger.exception("News fetch failed")
					wait = NEWS_FETCH_ERROR_BACKOFF
			time.sleep(wait)

	should_run = not app.debug or os.environ.get("WERKZEUG_RUN_MAIN") == "true"
	if should_run:
		t = threading.Thread(target=worker, daemon=True, name="news-fetcher")
		t.start()
		logger.info("Background news fetcher started")


# ---------------------------------------------------------------------------
# News fetching
# ---------------------------------------------------------------------------
def fetch_and_store_news() -> int:
	feedparser.USER_AGENT = "StudentAtlas/1.0 (contact: support@studentatlas.local)"

	stored = 0
	for source, url in RSS_FEEDS.items():
		try:
			parsed = feedparser.parse(url)
			if parsed.bozo and not parsed.entries:
				logger.warning("Feed %s returned an error: %s", source, parsed.bozo_exception)
				continue
		except Exception:
			logger.exception("Failed to parse feed %s", source)
			continue

		for entry in parsed.entries:
			try:
				raw_title = getattr(entry, "title", "")
				raw_summary = getattr(
					entry, "summary", getattr(entry, "description", "")
				)
				content = " ".join(filter(None, [raw_title, raw_summary]))
				if not contains_keyword(content):
					continue

				link = getattr(entry, "link", None)
				if not link:
					continue

				# Validate link length
				if len(link) > 512:
					continue

				if NewsUpdate.query.filter_by(link=link).first():
					continue

				published = parse_entry_datetime(entry)
				region = infer_region_focus(content)

				# Sanitise title and summary before storage
				clean_title = strip_html_tags(raw_title) or "Regulatory update"
				clean_summary = strip_html_tags(raw_summary)[:800] if raw_summary else None

				news_item = NewsUpdate(
					source=source,
					title=clean_title[:512],
					link=link,
					summary=clean_summary,
					published_at=published,
					region_focus=region,
				)
				db.session.add(news_item)
				stored += 1
			except Exception:
				logger.exception("Error processing entry from %s", source)
				continue

	if stored > 0:
		prune_old_news()
		set_status_timestamp("news_last_refreshed", datetime.now(timezone.utc))

	try:
		db.session.commit()
	except Exception:
		logger.exception("Failed to commit news updates")
		db.session.rollback()
		stored = 0

	return stored


def prune_old_news(max_items: int = MAX_NEWS_ITEMS) -> None:
	"""Keep only the newest *max_items* news rows."""
	total = NewsUpdate.query.count()
	if total <= max_items:
		return
	ids_to_remove = [
		row.id
		for row in NewsUpdate.query.order_by(NewsUpdate.published_at.asc()).limit(
			total - max_items
		)
	]
	if ids_to_remove:
		NewsUpdate.query.filter(NewsUpdate.id.in_(ids_to_remove)).delete(
			synchronize_session=False
		)


def contains_keyword(text: str) -> bool:
	lower = (text or "").lower()
	return any(keyword in lower for keyword in IMMIGRATION_KEYWORDS)


def parse_entry_datetime(entry) -> datetime:
	if hasattr(entry, "published_parsed") and entry.published_parsed:
		try:
			return datetime.fromtimestamp(time.mktime(entry.published_parsed))
		except (ValueError, OverflowError, OSError):
			pass
	if hasattr(entry, "updated_parsed") and entry.updated_parsed:
		try:
			return datetime.fromtimestamp(time.mktime(entry.updated_parsed))
		except (ValueError, OverflowError, OSError):
			pass
	return datetime.now(timezone.utc)


def infer_region_focus(text: str) -> str:
	lower = (text or "").lower()
	uk_tokens = (
		"uk", "british", "london", "home office", "ukvi",
		"united kingdom", "england", "scotland", "wales",
	)
	us_tokens = (
		"u.s.", "united states", "uscis", "sevis", "f-1",
		"opt", "cpt", "stem opt", "h-1b", "america", "usa",
	)
	if any(token in lower for token in uk_tokens):
		return "United Kingdom"
	if any(token in lower for token in us_tokens):
		return "United States"
	return "General"


# ---------------------------------------------------------------------------
# AppStatus helpers
# ---------------------------------------------------------------------------
def set_status_timestamp(key: str, value: datetime) -> None:
	payload = value.isoformat()
	record = db.session.get(AppStatus, key)
	if record:
		record.value = payload
	else:
		record = AppStatus(key=key, value=payload)
		db.session.add(record)


def get_status_timestamp(key: str) -> datetime | None:
	record = db.session.get(AppStatus, key)
	if not record:
		return None
	try:
		return datetime.fromisoformat(record.value)
	except (ValueError, TypeError):
		return None


# ---------------------------------------------------------------------------
# Gemini chatbot
# ---------------------------------------------------------------------------
_gemini_configured = False


def get_visa_guidance(origin: str, destination: str) -> str:
	"""Get visa guidance from Gemini based on origin and destination."""
	global _gemini_configured

	api_key = os.environ.get("GEMINI_API_KEY")
	if not api_key:
		logger.error("GEMINI_API_KEY not set")
		return (
			"The AI assistant is not configured. Please set the GEMINI_API_KEY "
			"environment variable in your .env file."
		)

	try:
		if not _gemini_configured:
			genai.configure(api_key=api_key)
			_gemini_configured = True

		model = genai.GenerativeModel("gemini-pro")

		# Escape user input embedded in the prompt to prevent prompt injection
		safe_origin = escape(origin)
		safe_destination = escape(destination)

		prompt = (
			f"You are an immigration expert specializing in student and work visas. "
			f"A student is considering moving from {safe_origin} to {safe_destination} for studies or work. "
			f"\n\nProvide a comprehensive breakdown of:\n"
			f"1. Visa requirements and types available\n"
			f"2. Key documentation needed\n"
			f"3. Timeline and processing\n"
			f"4. Cost estimates\n"
			f"5. Pathways to longer-term stay (work, residency, citizenship)\n"
			f"6. Any specific considerations for {safe_origin} nationals in {safe_destination}\n\n"
			f"Be concise but detailed, and provide practical advice."
		)

		response = model.generate_content(prompt)

		if not response or not response.text:
			return "The AI assistant did not return a response. Please try again."

		return response.text

	except genai.types.BlockedPromptException:
		logger.warning("Gemini blocked prompt for %s -> %s", origin, destination)
		return "The request was blocked by the AI safety filter. Please try rephrasing."
	except genai.types.StopCandidateException:
		logger.warning("Gemini stopped generation for %s -> %s", origin, destination)
		return "The AI response was incomplete. Please try again."
	except Exception as exc:
		logger.exception("Gemini API error")
		# Don't leak internal details to the user
		return (
			"An error occurred while generating guidance. "
			"Please try again in a few moments."
		)


# ---------------------------------------------------------------------------
# App creation
# ---------------------------------------------------------------------------
app = create_app()

if __name__ == "__main__":
	app.run(debug=True, port=5001)
