"""Database models for Student Atlas."""

from datetime import date, datetime, timezone

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def _utcnow() -> datetime:
	"""Return current UTC time as a timezone-aware datetime."""
	return datetime.now(timezone.utc)


class StudentVisaInfo(db.Model):
	__tablename__ = "student_visa_info"

	id = db.Column(db.Integer, primary_key=True)
	target_country = db.Column(db.String(64), nullable=False, index=True)
	visa_name = db.Column(db.String(128), nullable=False)
	overview = db.Column(db.Text, nullable=False)
	legal_summary = db.Column(db.Text, nullable=False)
	compliance_steps = db.Column(db.Text, nullable=False)
	requirements_checklist = db.Column(db.Text, nullable=True, default="")
	sources = db.Column(db.Text, nullable=True, default="")
	freshness = db.Column(db.String(16), nullable=True, default="STALE")
	last_verified = db.Column(db.Date, nullable=True)
	updated_at = db.Column(db.DateTime, nullable=False, default=_utcnow)

	def __repr__(self) -> str:
		return f"<StudentVisaInfo {self.visa_name!r} ({self.target_country})>"


class LongTermImmigration(db.Model):
	__tablename__ = "long_term_immigration"

	id = db.Column(db.Integer, primary_key=True)
	target_country = db.Column(db.String(64), nullable=False, index=True)
	category = db.Column(db.String(64), nullable=False, index=True)
	title = db.Column(db.String(256), nullable=False)
	description = db.Column(db.Text, nullable=False)
	key_requirements = db.Column(db.Text, nullable=False)
	compliance_steps = db.Column(db.Text, nullable=True, default="")
	sources = db.Column(db.Text, nullable=True, default="")
	freshness = db.Column(db.String(16), nullable=True, default="STALE")
	last_verified = db.Column(db.Date, nullable=True)
	updated_at = db.Column(db.DateTime, nullable=False, default=_utcnow)

	def __repr__(self) -> str:
		return f"<LongTermImmigration {self.title!r} ({self.target_country})>"


class NewsUpdate(db.Model):
	__tablename__ = "news_updates"

	id = db.Column(db.Integer, primary_key=True)
	source = db.Column(db.String(128), nullable=False, index=True)
	title = db.Column(db.String(512), nullable=False)
	link = db.Column(db.String(512), nullable=False, unique=True)
	summary = db.Column(db.Text, nullable=True)
	published_at = db.Column(
		db.DateTime, nullable=False, default=_utcnow, index=True
	)
	region_focus = db.Column(
		db.String(64), nullable=False, default="General", index=True
	)
	mentioned_countries = db.Column(
		db.String(2048), nullable=False, default=",", index=True
	)
	mentioned_regions = db.Column(
		db.String(1024), nullable=False, default=",", index=True
	)
	created_at = db.Column(db.DateTime, nullable=False, default=_utcnow)

	def __repr__(self) -> str:
		return f"<NewsUpdate {self.title[:40]!r}>"


class AppStatus(db.Model):
	__tablename__ = "app_status"

	key = db.Column(db.String(64), primary_key=True)
	value = db.Column(db.String(256), nullable=False)

	def __repr__(self) -> str:
		return f"<AppStatus {self.key}={self.value!r}>"
