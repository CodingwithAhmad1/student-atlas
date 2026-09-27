# DEACTIVATED: the legacy Flask app, replaced by the static React frontend. Kept for reference.
"""Student Atlas Flask application (legacy)."""

from __future__ import annotations

import html
import logging
import os
import re
import secrets
import ssl
import threading
import time
from datetime import date, datetime, timezone

import certifi
import feedparser

# Fix macOS SSL certificate verification — http.client calls
# ssl._create_default_https_context internally, so patch that to use certifi.
ssl._create_default_https_context = lambda: ssl.create_default_context(cafile=certifi.where())  # noqa: SLF001

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
NEWS_WORKER_ENABLED = False

# ---------------------------------------------------------------------------
# Tiered keyword system for immigration/visa relevance filtering
# ---------------------------------------------------------------------------
# STRONG: A single match is sufficient — these are unambiguously immigration-related.
STRONG_KEYWORDS = (
	r"\bimmigration\b",
	r"\bimmigrant\b",
	r"\bimmigrants\b",
	r"\bsevis\b",
	r"\bukvi\b",
	r"\bgraduate route\b",
	r"\btier 4\b",
	r"\bi-20\b",
	r"\binternational student\b",
	r"\binternational students\b",
	r"\bstudy abroad\b",
	r"\bf-1\b",
	r"\bh-1b\b",
	r"\bwork visa\b",
	r"\bwork permit\b",
	r"\bgreen card\b",
	r"\bpermanent residen\w*\b",
	r"\bnaturalization\b",
	r"\bdeport\w*\b",
	r"\buscis\b",
	r"\bstem opt\b",
	r"\bopt extension\b",
	r"\bopt period\b",
	r"\bstudy permit\b",
	r"\bstudent visa\b",
	r"\bvisa application\b",
	r"\bvisa process\w*\b",
	r"\bvisa denial\b",
	r"\bvisa ban\b",
	r"\bvisa policy\b",
	r"\bvisa restriction\w*\b",
	r"\bvisa holder\w*\b",
	r"\bvisa expir\w*\b",
	r"\bvisa revoc\w*\b",
	r"\bimmigration policy\b",
	r"\bimmigration reform\b",
	r"\bimmigration law\b",
	r"\basylum\b",
	r"\brefugee\w*\b",
	r"\bundocumented\b",
	r"\bvisa sponsor\w*\b",
	r"\bvisa program\b",
	r"\bvisa requirement\w*\b",
	r"\bvisa status\b",
	r"\bvisa interview\b",
	r"\bvisa stamp\b",
	r"\bvisa fee\w*\b",
)

# CONTEXT: Ambiguous alone — need a SUPPORTING signal to qualify.
CONTEXT_KEYWORDS = (
	r"\bstudents?\b",
	r"\bvisa\b",
	r"\bcitizenship\b",
	r"\bopt\b",
	r"\bcpt\b",
	r"\bsponsorship\b",
	r"\bpetition\b",
)

# SUPPORTING: Disambiguate CONTEXT keywords — presence alongside a CONTEXT
# keyword indicates the article is likely immigration-related.
# NOTE: These must NOT overlap with CONTEXT_KEYWORDS to prevent self-confirmation.
SUPPORTING_SIGNALS = (
	r"\bimmigration\b",
	r"\bpassport\b",
	r"\bembassy\b",
	r"\bconsulate\b",
	r"\bconsular\b",
	r"\bborder\b",
	r"\bforeign\b",
	r"\bwork authorization\b",
	r"\bemployment authorization\b",
	r"\bpolicy\b",
	r"\bregulation\b",
	r"\buniversity\b",
	r"\bcollege\b",
	r"\benrollment\b",
	r"\btuition\b",
	r"\binternational\b",
	r"\btravel\b",
	r"\bgovernment\b",
	r"\bsevis\b",
	r"\buscis\b",
	r"\bdepartment of state\b",
	r"\bhome office\b",
	r"\bukvi\b",
)

# NEGATIVE: When only weak (CONTEXT) signals are present, these reject the article.
NEGATIVE_KEYWORDS = (
	r"\bcricket\b",
	r"\bfootball\b",
	r"\bsoccer\b",
	r"\bbollywood\b",
	r"\bhollywood\b",
	r"\bceleb\w*\b",
	r"\bentertainment\b",
	r"\bsports?\b",
	r"\bmovie\b",
	r"\bfilm\b",
	r"\bvisa inc\b",
	r"\bvisa mastercard\b",
	r"\bcredit card\b",
	r"\bstudent athlete\w*\b",
	r"\bstudent loan\w*\b",
	r"\bstudent debt\b",
	r"\bhigh school student\b",
)

# Pre-compile all keyword patterns for performance
STRONG_PATTERNS = [re.compile(p, re.IGNORECASE) for p in STRONG_KEYWORDS]
CONTEXT_PATTERNS = [re.compile(p, re.IGNORECASE) for p in CONTEXT_KEYWORDS]
SUPPORTING_PATTERNS = [re.compile(p, re.IGNORECASE) for p in SUPPORTING_SIGNALS]
NEGATIVE_PATTERNS = [re.compile(p, re.IGNORECASE) for p in NEGATIVE_KEYWORDS]

# Pre-compiled region-focus patterns for infer_region_focus()
_UK_FOCUS_PATTERN = re.compile(
	r"\b(?:united kingdom|uk|british|london|home office|ukvi|england|scotland|wales)\b",
	re.IGNORECASE,
)
_US_FOCUS_PATTERN = re.compile(
	r"\b(?:united states|u\.s\.|uscis|sevis|f-1|h-1b|stem opt|america|usa)\b",
	re.IGNORECASE,
)

# ---------------------------------------------------------------------------
# Country variants for home-country detection (excludes US/UK — destination countries)
# ---------------------------------------------------------------------------
COUNTRY_VARIANTS = {
	"Afghanistan": ["afghanistan", "afghan", "afghans", "afghani", "afghanis"],
	"Albania": ["albania", "albanian", "albanians"],
	"Algeria": ["algeria", "algerian", "algerians"],
	"Andorra": ["andorra", "andorran", "andorrans"],
	"Angola": ["angola", "angolan", "angolans"],
	"Antigua and Barbuda": ["antigua and barbuda", "antigua", "barbuda", "antiguan", "antiguans", "barbudan", "barbudans"],
	"Argentina": ["argentina", "argentine", "argentines", "argentinian", "argentinians", "argentinean", "argentineans"],
	"Armenia": ["armenia", "armenian", "armenians"],
	"Australia": ["australia", "australian", "australians", "aussie", "aussies"],
	"Austria": ["austria", "austrian", "austrians"],
	"Azerbaijan": ["azerbaijan", "azerbaijani", "azerbaijanis", "azeri", "azeris"],
	"Bahamas": ["bahamas", "the bahamas", "bahamian", "bahamians"],
	"Bahrain": ["bahrain", "bahraini", "bahrainis"],
	"Bangladesh": ["bangladesh", "bangladeshi", "bangladeshis"],
	"Barbados": ["barbados", "barbadian", "barbadians", "bajan", "bajans"],
	"Belarus": ["belarus", "belarusian", "belarusians", "belorussian", "belorussians"],
	"Belgium": ["belgium", "belgian", "belgians"],
	"Belize": ["belize", "belizean", "belizeans"],
	"Benin": ["benin", "beninese", "beninois"],
	"Bhutan": ["bhutan", "bhutanese"],
	"Bolivia": ["bolivia", "bolivian", "bolivians"],
	"Bosnia and Herzegovina": ["bosnia and herzegovina", "bosnia", "herzegovina", "bosnian", "bosnians", "herzegovinian", "herzegovinians"],
	"Botswana": ["botswana", "motswana", "batswana", "botswanan", "botswanans"],
	"Brazil": ["brazil", "brazilian", "brazilians"],
	"Brunei": ["brunei", "bruneian", "bruneians"],
	"Bulgaria": ["bulgaria", "bulgarian", "bulgarians"],
	"Burkina Faso": ["burkina faso", "burkina", "burkinabe", "burkinabes"],
	"Burundi": ["burundi", "burundian", "burundians"],
	"Cabo Verde": ["cabo verde", "cape verde", "cape verdean", "cape verdeans", "cabo verdean", "cabo verdeans"],
	"Cambodia": ["cambodia", "cambodian", "cambodians", "khmer", "khmers"],
	"Cameroon": ["cameroon", "cameroonian", "cameroonians"],
	"Canada": ["canada", "canadian", "canadians"],
	"Central African Republic": ["central african republic", "central african", "central africans"],
	"Chad": ["chad", "chadian", "chadians"],
	"Chile": ["chile", "chilean", "chileans"],
	"China": ["china", "chinese", "prc"],
	"Colombia": ["colombia", "colombian", "colombians"],
	"Comoros": ["comoros", "the comoros", "comorian", "comorians"],
	"Congo (Democratic Republic)": ["democratic republic of the congo", "democratic republic of congo", "drc", "dr congo", "congolese"],
	"Congo (Republic)": ["republic of the congo", "republic of congo", "congo-brazzaville", "congo brazzaville"],
	"Costa Rica": ["costa rica", "costa rican", "costa ricans"],
	"Croatia": ["croatia", "croatian", "croatians", "croat", "croats"],
	"Cuba": ["cuba", "cuban", "cubans"],
	"Cyprus": ["cyprus", "cypriot", "cypriots"],
	"Czech Republic": ["czech republic", "czechia", "czech", "czechs"],
	"Denmark": ["denmark", "danish", "dane", "danes"],
	"Djibouti": ["djibouti", "djiboutian", "djiboutians"],
	"Dominica": ["dominica"],
	"Dominican Republic": ["dominican republic", "dominican", "dominicans"],
	"East Timor": ["east timor", "timor-leste", "timor leste", "timorese", "east timorese"],
	"Ecuador": ["ecuador", "ecuadorian", "ecuadorians", "ecuadorean", "ecuadoreans"],
	"Egypt": ["egypt", "egyptian", "egyptians"],
	"El Salvador": ["el salvador", "salvadoran", "salvadorans", "salvadorian", "salvadorians"],
	"Equatorial Guinea": ["equatorial guinea", "equatorial guinean", "equatorial guineans"],
	"Eritrea": ["eritrea", "eritrean", "eritreans"],
	"Estonia": ["estonia", "estonian", "estonians"],
	"Eswatini": ["eswatini", "swaziland", "swazi", "swazis"],
	"Ethiopia": ["ethiopia", "ethiopian", "ethiopians"],
	"Fiji": ["fiji", "fijian", "fijians"],
	"Finland": ["finland", "finnish", "finn", "finns"],
	"France": ["france", "french"],
	"Gabon": ["gabon", "gabonese"],
	"Gambia": ["gambia", "the gambia", "gambian", "gambians"],
	"Georgia": ["georgia", "georgian", "georgians"],
	"Germany": ["germany", "german", "germans"],
	"Ghana": ["ghana", "ghanaian", "ghanaians"],
	"Greece": ["greece", "greek", "greeks", "hellenic"],
	"Grenada": ["grenada", "grenadian", "grenadians"],
	"Guatemala": ["guatemala", "guatemalan", "guatemalans"],
	"Guinea": ["guinea", "guinean", "guineans"],
	"Guinea-Bissau": ["guinea-bissau", "guinea bissau", "bissau-guinean", "bissau guinean"],
	"Guyana": ["guyana", "guyanese"],
	"Haiti": ["haiti", "haitian", "haitians"],
	"Honduras": ["honduras", "honduran", "hondurans"],
	"Hungary": ["hungary", "hungarian", "hungarians", "magyar", "magyars"],
	"Iceland": ["iceland", "icelandic", "icelander", "icelanders"],
	"India": ["india", "indian", "indians"],
	"Indonesia": ["indonesia", "indonesian", "indonesians"],
	"Iran": ["iran", "iranian", "iranians", "persian", "persians"],
	"Iraq": ["iraq", "iraqi", "iraqis"],
	"Ireland": ["ireland", "irish"],
	"Israel": ["israel", "israeli", "israelis"],
	"Italy": ["italy", "italian", "italians"],
	"Ivory Coast": ["ivory coast", "cote d'ivoire", "cote divoire", "ivorian", "ivorians"],
	"Jamaica": ["jamaica", "jamaican", "jamaicans"],
	"Japan": ["japan", "japanese"],
	"Jordan": ["jordan", "jordanian", "jordanians"],
	"Kazakhstan": ["kazakhstan", "kazakh", "kazakhs", "kazakhstani", "kazakhstanis"],
	"Kenya": ["kenya", "kenyan", "kenyans"],
	"Kiribati": ["kiribati", "i-kiribati"],
	"Kosovo": ["kosovo", "kosovar", "kosovars", "kosovan", "kosovans"],
	"Kuwait": ["kuwait", "kuwaiti", "kuwaitis"],
	"Kyrgyzstan": ["kyrgyzstan", "kyrgyz", "kirghiz"],
	"Laos": ["laos", "lao", "laotian", "laotians"],
	"Latvia": ["latvia", "latvian", "latvians"],
	"Lebanon": ["lebanon", "lebanese"],
	"Lesotho": ["lesotho", "mosotho", "basotho"],
	"Liberia": ["liberia", "liberian", "liberians"],
	"Libya": ["libya", "libyan", "libyans"],
	"Liechtenstein": ["liechtenstein", "liechtensteiner", "liechtensteiners"],
	"Lithuania": ["lithuania", "lithuanian", "lithuanians"],
	"Luxembourg": ["luxembourg", "luxembourger", "luxembourgers", "luxembourgish"],
	"Madagascar": ["madagascar", "malagasy"],
	"Malawi": ["malawi", "malawian", "malawians"],
	"Malaysia": ["malaysia", "malaysian", "malaysians", "malay", "malays"],
	"Maldives": ["maldives", "the maldives", "maldivian", "maldivians"],
	"Mali": ["mali", "malian", "malians"],
	"Malta": ["malta", "maltese"],
	"Marshall Islands": ["marshall islands", "the marshall islands", "marshallese"],
	"Mauritania": ["mauritania", "mauritanian", "mauritanians"],
	"Mauritius": ["mauritius", "mauritian", "mauritians"],
	"Mexico": ["mexico", "mexican", "mexicans"],
	"Micronesia": ["micronesia", "micronesian", "micronesians"],
	"Moldova": ["moldova", "moldovan", "moldovans", "moldavian", "moldavians"],
	"Monaco": ["monaco", "monegasque", "monegasques", "monacan", "monacans"],
	"Mongolia": ["mongolia", "mongolian", "mongolians", "mongol", "mongols"],
	"Montenegro": ["montenegro", "montenegrin", "montenegrins"],
	"Morocco": ["morocco", "moroccan", "moroccans"],
	"Mozambique": ["mozambique", "mozambican", "mozambicans"],
	"Myanmar": ["myanmar", "burmese", "burma"],
	"Namibia": ["namibia", "namibian", "namibians"],
	"Nauru": ["nauru", "nauruan", "nauruans"],
	"Nepal": ["nepal", "nepalese", "nepali", "nepalis"],
	"Netherlands": ["netherlands", "the netherlands", "holland", "dutch"],
	"New Zealand": ["new zealand", "new zealander", "new zealanders", "kiwi", "kiwis"],
	"Nicaragua": ["nicaragua", "nicaraguan", "nicaraguans"],
	"Niger": ["niger", "nigerien", "nigeriens"],
	"Nigeria": ["nigeria", "nigerian", "nigerians"],
	"North Korea": ["north korea", "north korean", "north koreans", "dprk"],
	"North Macedonia": ["north macedonia", "macedonia", "macedonian", "macedonians"],
	"Norway": ["norway", "norwegian", "norwegians"],
	"Oman": ["oman", "omani", "omanis"],
	"Pakistan": ["pakistan", "pakistani", "pakistanis"],
	"Palau": ["palau", "palauan", "palauans"],
	"Palestine": ["palestine", "palestinian", "palestinians", "palestinian territories"],
	"Panama": ["panama", "panamanian", "panamanians"],
	"Papua New Guinea": ["papua new guinea", "papuan", "papuans", "papua new guinean", "papua new guineans"],
	"Paraguay": ["paraguay", "paraguayan", "paraguayans"],
	"Peru": ["peru", "peruvian", "peruvians"],
	"Philippines": ["philippines", "the philippines", "filipino", "filipinos", "filipina", "filipinas", "philippine"],
	"Poland": ["poland", "polish", "pole", "poles"],
	"Portugal": ["portugal", "portuguese"],
	"Qatar": ["qatar", "qatari", "qataris"],
	"Romania": ["romania", "romanian", "romanians"],
	"Russia": ["russia", "russian", "russians"],
	"Rwanda": ["rwanda", "rwandan", "rwandans", "rwandese"],
	"Saint Kitts and Nevis": ["saint kitts and nevis", "st kitts and nevis", "st kitts", "kittitian", "kittitians", "nevisian", "nevisians"],
	"Saint Lucia": ["saint lucia", "st lucia", "saint lucian", "saint lucians", "st lucian"],
	"Saint Vincent and the Grenadines": ["saint vincent and the grenadines", "st vincent and the grenadines", "st vincent", "vincentian", "vincentians"],
	"Samoa": ["samoa", "samoan", "samoans"],
	"San Marino": ["san marino", "sammarinese", "san marinese"],
	"Sao Tome and Principe": ["sao tome and principe", "sao tome", "sao tomean", "sao tomeans"],
	"Saudi Arabia": ["saudi arabia", "saudi", "saudis", "saudi arabian", "saudi arabians"],
	"Senegal": ["senegal", "senegalese"],
	"Serbia": ["serbia", "serbian", "serbians", "serb", "serbs"],
	"Seychelles": ["seychelles", "the seychelles", "seychellois"],
	"Sierra Leone": ["sierra leone", "sierra leonean", "sierra leoneans"],
	"Singapore": ["singapore", "singaporean", "singaporeans"],
	"Slovakia": ["slovakia", "slovak", "slovaks", "slovakian", "slovakians"],
	"Slovenia": ["slovenia", "slovenian", "slovenians", "slovene", "slovenes"],
	"Solomon Islands": ["solomon islands", "the solomon islands", "solomon islander", "solomon islanders"],
	"Somalia": ["somalia", "somali", "somalis", "somalian", "somalians"],
	"South Africa": ["south africa", "south african", "south africans"],
	"South Korea": ["south korea", "south korean", "south koreans"],
	"South Sudan": ["south sudan", "south sudanese"],
	"Spain": ["spain", "spanish", "spaniard", "spaniards"],
	"Sri Lanka": ["sri lanka", "sri lankan", "sri lankans", "sinhalese", "ceylonese"],
	"Sudan": ["sudan", "sudanese"],
	"Suriname": ["suriname", "surinamese"],
	"Sweden": ["sweden", "swedish", "swede", "swedes"],
	"Switzerland": ["switzerland", "swiss"],
	"Syria": ["syria", "syrian", "syrians"],
	"Taiwan": ["taiwan", "taiwanese"],
	"Tajikistan": ["tajikistan", "tajik", "tajiks", "tadzhik"],
	"Tanzania": ["tanzania", "tanzanian", "tanzanians"],
	"Thailand": ["thailand", "thai", "thais"],
	"Togo": ["togo", "togolese"],
	"Tonga": ["tonga", "tongan", "tongans"],
	"Trinidad and Tobago": ["trinidad and tobago", "trinidad", "tobago", "trinidadian", "trinidadians", "tobagonian", "tobagonians"],
	"Tunisia": ["tunisia", "tunisian", "tunisians"],
	"Turkey": ["turkey", "turkish", "turk", "turks"],
	"Turkmenistan": ["turkmenistan", "turkmen", "turkmens"],
	"Tuvalu": ["tuvalu", "tuvaluan", "tuvaluans"],
	"Uganda": ["uganda", "ugandan", "ugandans"],
	"Ukraine": ["ukraine", "ukrainian", "ukrainians"],
	"United Arab Emirates": ["united arab emirates", "uae", "emirati", "emiratis"],
	"Uruguay": ["uruguay", "uruguayan", "uruguayans"],
	"Uzbekistan": ["uzbekistan", "uzbek", "uzbeks", "uzbekistani", "uzbekistanis"],
	"Vanuatu": ["vanuatu", "ni-vanuatu"],
	"Vatican City": ["vatican city", "vatican", "holy see"],
	"Venezuela": ["venezuela", "venezuelan", "venezuelans"],
	"Vietnam": ["vietnam", "viet nam", "vietnamese"],
	"Yemen": ["yemen", "yemeni", "yemenis"],
	"Zambia": ["zambia", "zambian", "zambians"],
	"Zimbabwe": ["zimbabwe", "zimbabwean", "zimbabweans"],
}

# Pre-compile word-boundary regex for each country (longest variants first)
COUNTRY_PATTERNS: dict[str, re.Pattern] = {}
for _country, _variants in COUNTRY_VARIANTS.items():
	_sorted = sorted(_variants, key=len, reverse=True)
	_pattern = r"\b(?:" + "|".join(re.escape(v) for v in _sorted) + r")\b"
	COUNTRY_PATTERNS[_country] = re.compile(_pattern, re.IGNORECASE)

# ---------------------------------------------------------------------------
# Region definitions — canonical name → member countries + detection keywords
# "Gulf" alone is excluded (too ambiguous: Gulf of Mexico, Gulf of Aden, etc.)
# "Pacific" alone is excluded (Pacific Rim, Pacific Ocean, etc.)
# "MENA" fires for both Middle East and North Africa — intentional overlap.
# ---------------------------------------------------------------------------
REGION_DEFINITIONS: dict[str, dict] = {
    "Gulf": {
        "members": [
            "Saudi Arabia", "United Arab Emirates", "Kuwait",
            "Qatar", "Bahrain", "Oman",
        ],
        "keywords": [
            "Gulf Cooperation Council", "GCC", "Gulf states",
            "Gulf countries", "Gulf region", "Persian Gulf", "Arabian Gulf",
        ],
    },
    "Middle East": {
        "members": [
            "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar",
            "Bahrain", "Oman", "Jordan", "Lebanon", "Syria", "Iraq",
            "Iran", "Israel", "Palestine", "Yemen",
        ],
        "keywords": [
            "Middle East", "Middle Eastern", "MENA",
            "Arab world", "Arab states",
        ],
    },
    "North Africa": {
        "members": [
            "Egypt", "Libya", "Tunisia", "Algeria", "Morocco", "Sudan",
        ],
        "keywords": [
            "North Africa", "North African", "Maghreb", "MENA",
        ],
    },
    "Sub-Saharan Africa": {
        "members": [
            "Nigeria", "Ghana", "Senegal", "Ivory Coast", "Mali",
            "Burkina Faso", "Guinea", "Sierra Leone", "Liberia", "Togo",
            "Benin", "Niger", "Gambia", "Guinea-Bissau", "Cabo Verde",
            "Mauritania", "Kenya", "Tanzania", "Uganda", "Ethiopia",
            "Rwanda", "Burundi", "Somalia", "Djibouti", "Eritrea",
            "South Sudan", "Comoros", "Seychelles", "Mauritius",
            "Madagascar", "South Africa", "Zimbabwe", "Zambia",
            "Mozambique", "Botswana", "Namibia", "Lesotho", "Eswatini",
            "Angola", "Malawi", "Cameroon", "Democratic Republic of the Congo",
            "Republic of the Congo", "Chad", "Central African Republic",
            "Gabon", "Equatorial Guinea", "Sao Tome and Principe",
        ],
        "keywords": [
            "sub-Saharan Africa", "sub-Saharan African", "sub-Saharan",
            "Africa south of the Sahara",
        ],
    },
    "West Africa": {
        "members": [
            "Nigeria", "Ghana", "Senegal", "Ivory Coast", "Mali",
            "Burkina Faso", "Guinea", "Sierra Leone", "Liberia", "Togo",
            "Benin", "Niger", "Gambia", "Guinea-Bissau", "Cabo Verde",
            "Mauritania",
        ],
        "keywords": [
            "West Africa", "West African", "ECOWAS",
        ],
    },
    "East Africa": {
        "members": [
            "Kenya", "Tanzania", "Uganda", "Ethiopia", "Rwanda",
            "Burundi", "Somalia", "Djibouti", "Eritrea", "South Sudan",
            "Comoros", "Seychelles", "Mauritius", "Madagascar",
        ],
        "keywords": [
            "East Africa", "East African", "Horn of Africa", "EAC",
        ],
    },
    "Southern Africa": {
        "members": [
            "South Africa", "Zimbabwe", "Zambia", "Mozambique",
            "Botswana", "Namibia", "Lesotho", "Eswatini", "Angola", "Malawi",
        ],
        "keywords": [
            "Southern Africa", "Southern African", "SADC",
        ],
    },
    "South Asia": {
        "members": [
            "India", "Pakistan", "Bangladesh", "Sri Lanka",
            "Nepal", "Bhutan", "Maldives", "Afghanistan",
        ],
        "keywords": [
            "South Asia", "South Asian", "SAARC",
            "Indian subcontinent", "subcontinent",
        ],
    },
    "Southeast Asia": {
        "members": [
            "Thailand", "Vietnam", "Philippines", "Malaysia", "Indonesia",
            "Singapore", "Myanmar", "Cambodia", "Laos", "Brunei", "East Timor",
        ],
        "keywords": [
            "Southeast Asia", "South-East Asia",
            "Southeast Asian", "South-East Asian", "ASEAN",
        ],
    },
    "East Asia": {
        "members": [
            "China", "Japan", "South Korea", "North Korea",
            "Taiwan", "Mongolia",
        ],
        "keywords": [
            "East Asia", "East Asian", "Northeast Asia", "Far East",
        ],
    },
    "Central Asia": {
        "members": [
            "Kazakhstan", "Kyrgyzstan", "Uzbekistan",
            "Tajikistan", "Turkmenistan",
        ],
        "keywords": [
            "Central Asia", "Central Asian",
            "CIS countries", "post-Soviet states",
        ],
    },
    "Eastern Europe": {
        "members": [
            "Russia", "Ukraine", "Belarus", "Poland", "Czech Republic",
            "Slovakia", "Hungary", "Romania", "Bulgaria", "Moldova",
            "Estonia", "Latvia", "Lithuania", "Georgia", "Armenia", "Azerbaijan",
        ],
        "keywords": [
            "Eastern Europe", "Eastern European",
            "Central and Eastern Europe", "CEE",
            "former Soviet", "post-Soviet",
        ],
    },
    "Balkans": {
        "members": [
            "Serbia", "Bosnia and Herzegovina", "Croatia", "Montenegro",
            "North Macedonia", "Kosovo", "Albania", "Slovenia",
            "Bulgaria", "Romania",
        ],
        "keywords": [
            "Balkans", "Balkan", "Western Balkans",
            "former Yugoslavia", "ex-Yugoslavia",
        ],
    },
    "Latin America": {
        "members": [
            "Brazil", "Argentina", "Chile", "Colombia", "Peru",
            "Venezuela", "Ecuador", "Bolivia", "Paraguay", "Uruguay",
            "Guyana", "Suriname",
        ],
        "keywords": [
            "South America", "South American",
            "Latin America", "Latin American", "LATAM", "Mercosur",
        ],
    },
    "Central America": {
        "members": [
            "Guatemala", "Honduras", "El Salvador", "Nicaragua",
            "Costa Rica", "Panama", "Belize",
        ],
        "keywords": [
            "Central America", "Central American", "Northern Triangle",
        ],
    },
    "Caribbean": {
        "members": [
            "Cuba", "Jamaica", "Haiti", "Dominican Republic",
            "Trinidad and Tobago", "Barbados", "Bahamas",
            "Saint Kitts and Nevis", "Saint Lucia",
            "Saint Vincent and the Grenadines", "Grenada",
            "Antigua and Barbuda", "Dominica",
        ],
        "keywords": [
            "Caribbean", "Caribbean islands", "Caribbean nations",
            "West Indies", "CARICOM",
        ],
    },
    "South Pacific": {
        "members": [
            "Fiji", "Papua New Guinea", "Solomon Islands", "Vanuatu",
            "Samoa", "Tonga", "Kiribati", "Tuvalu", "Nauru", "Palau",
            "Micronesia", "Marshall Islands",
        ],
        "keywords": [
            "Pacific islands", "Pacific nations", "Pacific region",
            "Oceania", "South Pacific", "Pacific Islander",
        ],
    },
}

# Pre-compile word-boundary regex for each region (longest keywords first)
REGION_PATTERNS: dict[str, re.Pattern] = {}
for _region, _rdata in REGION_DEFINITIONS.items():
    _sorted_kw = sorted(_rdata["keywords"], key=len, reverse=True)
    _rpat = r"\b(?:" + "|".join(re.escape(kw) for kw in _sorted_kw) + r")\b"
    REGION_PATTERNS[_region] = re.compile(_rpat, re.IGNORECASE)

# Reverse index: country name → list of regions it belongs to
# Built programmatically so it stays in sync with REGION_DEFINITIONS automatically.
COUNTRY_TO_REGIONS: dict[str, list[str]] = {}
for _region, _rdata in REGION_DEFINITIONS.items():
    for _member in _rdata["members"]:
        COUNTRY_TO_REGIONS.setdefault(_member, []).append(_region)

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

COUNTRY_SOURCES: dict[str, list[dict[str, str]]] = {
	"Pakistan": [
		{"name": "Dawn",     "url": "https://www.dawn.com/feeds/home"},
		{"name": "ARY News", "url": "https://arynews.tv/feed/"},
		{"name": "Geo News", "url": "https://www.geo.tv/rss/1/"},
	],
	"India": [
		{"name": "The Hindu",      "url": "https://www.thehindu.com/news/feeder/default.rss"},
		{"name": "NDTV",           "url": "https://feeds.feedburner.com/ndtvnews-top-stories"},
		{"name": "Times of India", "url": "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"},
	],
	"United Arab Emirates": [
		{"name": "Khaleej Times", "url": "https://www.khaleejtimes.com/rss"},
		{"name": "Gulf News",     "url": "https://gulfnews.com/rss"},
		{"name": "The National",  "url": "https://www.thenationalnews.com/rss"},
	],
	"Nigeria": [
		{"name": "Punch Nigeria", "url": "https://punchng.com/feed/"},
		{"name": "Vanguard",      "url": "https://www.vanguardngr.com/feed/"},
	],
	"Bangladesh": [
		{"name": "The Daily Star", "url": "https://www.thedailystar.net/rss.xml"},
	],
	"Kenya": [
		{"name": "Daily Nation", "url": "https://nation.africa/kenya/rss.xml"},
	],
	"Ghana": [
		{"name": "Ghana Web", "url": "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/rss.xml"},
		{"name": "JoyOnline", "url": "https://www.myjoyonline.com/feed/"},
	],
	"Saudi Arabia": [
		{"name": "Arab News",     "url": "https://www.arabnews.com/rss.xml"},
		{"name": "Saudi Gazette", "url": "https://saudigazette.com.sa/rss"},
	],
	"Egypt": [
		{"name": "Al-Ahram English", "url": "https://english.ahram.org.eg/rss.xml"},
		{"name": "Egypt Independent","url": "https://egyptindependent.com/feed/"},
	],
	"China": [
		{"name": "South China Morning Post", "url": "https://www.scmp.com/rss/91/feed"},
		{"name": "China Daily",              "url": "https://www.chinadaily.com.cn/rss/world_rss.xml"},
	],
	"Turkey": [
		{"name": "Daily Sabah",        "url": "https://www.dailysabah.com/rss"},
		{"name": "Hurriyet Daily News","url": "https://www.hurriyetdailynews.com/rss"},
	],
	"Malaysia": [
		{"name": "The Star",          "url": "https://www.thestar.com.my/rss/News/"},
		{"name": "New Straits Times", "url": "https://www.nst.com.my/rss/news"},
	],
	"Nepal": [
		{"name": "Kathmandu Post", "url": "https://kathmandupost.com/rss"},
	],
}

# Input length limits
MAX_COUNTRY_NAME_LEN = 100
MAX_FILTER_LEN = 200
MAX_NEWS_ITEMS = 500
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
def _migrate_add_mentioned_countries() -> None:
	"""One-time migration: add mentioned_countries column if missing."""
	from sqlalchemy import inspect, text

	inspector = inspect(db.engine)
	columns = [col["name"] for col in inspector.get_columns("news_updates")]
	if "mentioned_countries" in columns:
		return
	db.session.execute(
		text(
			"ALTER TABLE news_updates ADD COLUMN mentioned_countries "
			"VARCHAR(2048) NOT NULL DEFAULT ','"
		)
	)
	db.session.commit()
	logger.info("Migration: added mentioned_countries column to news_updates")


def _migrate_add_mentioned_regions() -> None:
	"""One-time migration: add mentioned_regions column if missing."""
	from sqlalchemy import inspect, text

	inspector = inspect(db.engine)
	columns = [col["name"] for col in inspector.get_columns("news_updates")]
	if "mentioned_regions" in columns:
		return
	db.session.execute(
		text(
			"ALTER TABLE news_updates ADD COLUMN mentioned_regions "
			"VARCHAR(1024) NOT NULL DEFAULT ','"
		)
	)
	db.session.commit()
	logger.info("Migration: added mentioned_regions column to news_updates")


def _migrate_student_visa_info_v2() -> None:
	"""Add requirements_checklist, sources, freshness, last_verified columns."""
	from sqlalchemy import inspect, text

	inspector = inspect(db.engine)
	columns = [col["name"] for col in inspector.get_columns("student_visa_info")]
	new_cols = {
		"requirements_checklist": "TEXT DEFAULT ''",
		"sources": "TEXT DEFAULT ''",
		"freshness": "VARCHAR(16) DEFAULT 'STALE'",
		"last_verified": "DATE",
	}
	for col_name, col_def in new_cols.items():
		if col_name not in columns:
			db.session.execute(
				text(f"ALTER TABLE student_visa_info ADD COLUMN {col_name} {col_def}")
			)
	db.session.commit()
	logger.info("Migration: student_visa_info v2 columns checked")


def _migrate_long_term_immigration_v2() -> None:
	"""Add compliance_steps, sources, freshness, last_verified columns."""
	from sqlalchemy import inspect, text

	inspector = inspect(db.engine)
	columns = [col["name"] for col in inspector.get_columns("long_term_immigration")]
	new_cols = {
		"compliance_steps": "TEXT DEFAULT ''",
		"sources": "TEXT DEFAULT ''",
		"freshness": "VARCHAR(16) DEFAULT 'STALE'",
		"last_verified": "DATE",
	}
	for col_name, col_def in new_cols.items():
		if col_name not in columns:
			db.session.execute(
				text(f"ALTER TABLE long_term_immigration ADD COLUMN {col_name} {col_def}")
			)
	db.session.commit()
	logger.info("Migration: long_term_immigration v2 columns checked")


def create_app() -> Flask:
	app = Flask(__name__)

	# Security: set a proper secret key for session signing and CSRF
	app.config["SECRET_KEY"] = os.environ.get(
		"FLASK_SECRET_KEY", secrets.token_hex(32)
	)
	database_url = os.environ.get("DATABASE_URL", "sqlite:///student_atlas.db")
	# Heroku/Render provide postgres:// but SQLAlchemy requires postgresql://
	if database_url.startswith("postgres://"):
		database_url = database_url.replace("postgres://", "postgresql://", 1)
	app.config["SQLALCHEMY_DATABASE_URI"] = database_url
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

	# Security headers
	app.config["SESSION_COOKIE_HTTPONLY"] = True
	app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

	db.init_app(app)

	with app.app_context():
		db.create_all()
		_migrate_add_mentioned_countries()
		_migrate_add_mentioned_regions()
		_migrate_student_visa_info_v2()
		_migrate_long_term_immigration_v2()
		try:
			seed_reference_data()
		except Exception:
			logger.exception("Failed to seed reference data")
			db.session.rollback()

	# Citation rendering filter
	@app.template_filter("render_citations")
	def render_citations(text_val):
		from markupsafe import Markup, escape as _esc

		safe = str(_esc(text_val))
		safe = re.sub(
			r"\[(\d+)\]",
			r'<a href="#source-\1" class="citation">[\1]</a>',
			safe,
		)
		return Markup(safe)

	register_routes(app)
	register_error_handlers(app)
	register_cli(app)
	start_background_worker(app)

	return app


# ---------------------------------------------------------------------------
# Seed data
# ---------------------------------------------------------------------------
_STUDENT_VISA_SEED = [
	{
		"target_country": "United States",
		"visa_name": "F-1 Student Visa",
		"overview": (
			"The F-1 visa is the primary pathway for international students pursuing "
			"academic study at SEVP-approved US institutions [1]. Applicants must demonstrate "
			"sufficient funding and non-immigrant intent. The visa application fee is $185 [2]."
		),
		"legal_summary": (
			"Regulated under INA sections 101(a)(15)(F) and 214. Requires SEVIS "
			"registration and full-time enrollment compliance."
		),
		"compliance_steps": (
			"1. Receive Form I-20 from your school's designated school official (DSO) [1]\n"
			"2. Pay the $350 I-901 SEVIS fee before your visa interview [3]\n"
			"3. Complete the DS-160 online visa application [4]\n"
			"4. Schedule and attend a consular interview with financial proof [2]\n"
			"5. Enter the US up to 30 days before your program start date [2]\n"
			"6. Report to your DSO within 30 days and maintain valid status [1]"
		),
		"requirements_checklist": (
			"- Valid passport with at least six months' validity\n"
			"- Form I-20 signed by you and your DSO [1]\n"
			"- I-901 SEVIS fee payment receipt ($350 for F-1 students) [3]\n"
			"- Completed DS-160 confirmation page [4]\n"
			"- Evidence of financial support covering tuition and living costs [2]\n"
			"- Proof of ties to home country (non-immigrant intent) [2]\n"
			"- Academic transcripts and standardized test scores\n"
			"- Passport-style photograph meeting State Department specifications"
		),
		"sources": (
			"[1] Students and the Form I-20 — studyinthestates.dhs.gov\n"
			"[2] Student Visa — travel.state.gov\n"
			"[3] Paying the I-901 SEVIS Fee — studyinthestates.dhs.gov\n"
			"[4] DS-160 Online Nonimmigrant Visa Application — travel.state.gov"
		),
		"freshness": "STALE",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	{
		"target_country": "United Kingdom",
		"visa_name": "Student Route Visa",
		"overview": (
			"The UK Student visa allows international students aged 16+ to study courses "
			"longer than six months at licensed institutions [1]. Applicants need a "
			"Confirmation of Acceptance for Studies (CAS) and must prove English proficiency. "
			"The application fee is \u00a3524 [1]."
		),
		"legal_summary": (
			"Governed by Appendix Student of the UK Immigration Rules. "
			"Overseen by UK Visas and Immigration (UKVI)."
		),
		"compliance_steps": (
			"1. Obtain a CAS reference number from your licensed sponsor [1]\n"
			"2. Prove English at CEFR B1 (below degree) or B2 (degree level) [1]\n"
			"3. Show funds held for 28 consecutive days ending within 31 days of applying [1]\n"
			"4. Pay the \u00a3524 application fee and Immigration Health Surcharge [1]\n"
			"5. Submit biometrics and attend appointment [1]\n"
			"6. Collect your Biometric Residence Permit (BRP) after arrival [1]"
		),
		"requirements_checklist": (
			"- CAS reference number from a licensed sponsor [1]\n"
			"- English proficiency: SELT at B1/B2 or qualifying UK degree [1]\n"
			"- Living costs: \u00a31,529/month (London) or \u00a31,171/month (outside London) for up to 9 months [1]\n"
			"- Funds held for 28 consecutive days, ending within 31 days of application [1]\n"
			"- Tuberculosis test results (if from a listed country) [1]\n"
			"- Valid passport or travel document\n"
			"- Parental consent if under 18 [1]\n"
			"- ATAS certificate (if required for your course)"
		),
		"sources": (
			"[1] Student visa — gov.uk"
		),
		"freshness": "REVIEW_SOON",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
]

_LONG_TERM_SEED = [
	# --- United States ---
	{
		"target_country": "United States",
		"category": "Work Visas",
		"title": "H-1B Specialty Occupation",
		"description": (
			"Temporary work visa for professionals in specialty occupations requiring at "
			"least a bachelor's degree [1]. Employers must sponsor the worker and file a "
			"Labor Condition Application (LCA) [2]. The annual cap is 65,000 visas plus "
			"20,000 for US advanced-degree holders [1]."
		),
		"compliance_steps": (
			"1. Employer files a Labor Condition Application with the DOL [2]\n"
			"2. Employer registers electronically during the annual cap season ($215 fee) [3]\n"
			"3. If selected, employer files Form I-129 petition with USCIS [1]\n"
			"4. Worker attends consular interview or changes status if in the US [1]\n"
			"5. Begin employment on or after October 1 of the fiscal year [1]"
		),
		"key_requirements": (
			"- Bachelor's degree or higher in a directly related specialty [1]\n"
			"- Employer sponsorship with approved LCA [2]\n"
			"- Job must qualify as a specialty occupation [1]\n"
			"- Subject to annual cap with weighted selection process (effective Feb 2026) [4]\n"
			"- Initial period of 3 years, extendable to 6 years [1]\n"
			"- $215 electronic registration fee per beneficiary [3]"
		),
		"sources": (
			"[1] H-1B Specialty Occupations — uscis.gov\n"
			"[2] H-1B Program — dol.gov\n"
			"[3] H-1B Electronic Registration Process — uscis.gov\n"
			"[4] DHS Changes Process for Awarding H-1B Work Visas — uscis.gov"
		),
		"freshness": "STALE",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	{
		"target_country": "United States",
		"category": "Residency",
		"title": "Green Card (Permanent Resident Status)",
		"description": (
			"Grants indefinite US residency and work authorization [1]. Available through "
			"employment-based categories (EB-1 through EB-5), family sponsorship, diversity "
			"visa lottery, or humanitarian grounds [2]. Visa availability depends on your "
			"priority date and preference category [3]."
		),
		"compliance_steps": (
			"1. Determine your eligibility category (employment, family, diversity, etc.) [2]\n"
			"2. Have a petition filed on your behalf (I-140 or I-130) [1]\n"
			"3. Wait for visa availability based on your priority date [3]\n"
			"4. File Form I-485 (adjustment of status) or attend consular processing [1]\n"
			"5. Complete biometrics, medical exam (I-693), and interview [1]\n"
			"6. Receive your Green Card and maintain permanent resident status [1]"
		),
		"key_requirements": (
			"- Employment-based: Employer petition via Form I-140 and labor certification [1]\n"
			"- Family-based: US citizen or permanent resident sponsor via Form I-130 [1]\n"
			"- Diversity Visa: Win the annual DV lottery (50,000 visas/year) [2]\n"
			"- Medical examination on Form I-693 [1]\n"
			"- Admissibility: No disqualifying criminal, health, or security issues [1]\n"
			"- Form I-485 adjustment of status application [1]"
		),
		"sources": (
			"[1] Green Card for Employment-Based Immigrants — uscis.gov\n"
			"[2] Green Card Eligibility Categories — uscis.gov\n"
			"[3] When to File Adjustment of Status: March 2026 — uscis.gov"
		),
		"freshness": "STALE",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	{
		"target_country": "United States",
		"category": "Citizenship",
		"title": "US Citizenship and Naturalization",
		"description": (
			"The path to becoming a US citizen through naturalization [1]. Requires holding "
			"a Green Card for 5 years (3 if married to a US citizen) and passing the 2025 "
			"Civics Test, which asks 20 questions from a bank of 128 [2]. The filing fee "
			"is approximately $710 [3]."
		),
		"compliance_steps": (
			"1. Confirm eligibility after 5 years as a permanent resident (3 if married to USC) [1]\n"
			"2. File Form N-400 (may file 90 days before meeting residence requirement) [3]\n"
			"3. Complete biometrics appointment [1]\n"
			"4. Attend naturalization interview with English and civics tests [1]\n"
			"5. Answer 12 of 20 civics questions correctly to pass (2025 test) [2]\n"
			"6. Take the Oath of Allegiance at a citizenship ceremony [1]"
		),
		"key_requirements": (
			"- 5 years as a permanent resident (or 3 if spouse is a US citizen) [1]\n"
			"- Continuous residence and physical presence in the US [3]\n"
			"- Demonstrate English reading, writing, and speaking ability [1]\n"
			"- Pass the 2025 Civics Test (12/20 correct from 128 questions) [2]\n"
			"- Good moral character during the statutory period [1]\n"
			"- Filing fee approximately $710 (reduced fee of $380 may be available) [3]"
		),
		"sources": (
			"[1] The Naturalization Interview and Test — uscis.gov\n"
			"[2] 2025 Civics Test — uscis.gov\n"
			"[3] N-400, Application for Naturalization — uscis.gov"
		),
		"freshness": "STALE",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	# --- United Kingdom ---
	{
		"target_country": "United Kingdom",
		"category": "Work Visas",
		"title": "Skilled Worker Visa",
		"description": (
			"The main route for working in the UK, requiring sponsorship from a "
			"Home Office-approved employer [1]. Based on a points system with a minimum "
			"salary of \u00a341,700 or the going rate for your job, whichever is higher [1]. "
			"Leads to settlement eligibility after 5 years [1]."
		),
		"compliance_steps": (
			"1. Receive a certificate of sponsorship from a licensed UK employer [1]\n"
			"2. Confirm your job is on the eligible occupations list [1]\n"
			"3. Prove English language proficiency at B1 level or above [1]\n"
			"4. Pay the application fee (\u00a3769\u2013\u00a31,519 from outside UK) [1]\n"
			"5. Pay the Immigration Health Surcharge (~\u00a31,035/year) [1]\n"
			"6. Submit biometrics and attend appointment [1]"
		),
		"key_requirements": (
			"- Certificate of sponsorship from a Home Office-licensed employer [1]\n"
			"- Minimum salary: \u00a341,700 or job going rate (whichever is higher) [1]\n"
			"- Reduced thresholds: \u00a333,400 if under 26, new graduate, or in training [1]\n"
			"- PhD holders: \u00a333,400 (STEM) or \u00a337,500 (non-STEM) minimum [1]\n"
			"- Healthcare/education roles: \u00a325,000 minimum [1]\n"
			"- English at B1 level minimum [1]\n"
			"- Valid for up to 5 years, renewable [1]"
		),
		"sources": (
			"[1] Skilled Worker visa — gov.uk"
		),
		"freshness": "REVIEW_SOON",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	{
		"target_country": "United Kingdom",
		"category": "Residency",
		"title": "Indefinite Leave to Remain (ILR)",
		"description": (
			"ILR (also called settlement) grants permanent UK residency, allowing you to "
			"live, work, and study without time limits [1]. Skilled Worker visa holders "
			"typically qualify after 5 years of continuous residence [2]. The application "
			"fee is \u00a33,029 [2]."
		),
		"compliance_steps": (
			"1. Complete 5 years of continuous residence on a qualifying visa [2]\n"
			"2. Ensure no more than 180 days spent outside the UK in any 12-month period [2]\n"
			"3. Book and pass the Life in the UK test (\u00a350 fee) if aged 18\u201364 [2]\n"
			"4. Meet the salary threshold (\u00a341,700 or going rate) [2]\n"
			"5. Pay the \u00a33,029 application fee and submit your application [2]\n"
			"6. Provide biometrics and await decision (usually within 6 months) [2]"
		),
		"key_requirements": (
			"- 5 years continuous residence on eligible work visa [2]\n"
			"- No more than 180 days outside the UK per 12-month period [2]\n"
			"- Pass the Life in the UK test (ages 18\u201364, \u00a350 fee) [2]\n"
			"- Meet salary threshold: \u00a341,700 or going rate [2]\n"
			"- Continue to be needed for your job after getting ILR [2]\n"
			"- Application fee: \u00a33,029 per person [2]\n"
			"- Optional priority: \u00a3500 (5 days) or \u00a31,000 (next day) [2]"
		),
		"sources": (
			"[1] Indefinite leave to remain — gov.uk\n"
			"[2] ILR if you have a Skilled Worker visa — gov.uk"
		),
		"freshness": "REVIEW_SOON",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
	{
		"target_country": "United Kingdom",
		"category": "Citizenship",
		"title": "British Citizenship",
		"description": (
			"Naturalisation as a British citizen is available after holding ILR for at least "
			"12 months (no waiting period if married to a British citizen) [1]. Applicants "
			"must have lived in the UK for 5 years and pass the Life in the UK test. "
			"The fee is \u00a31,735 including the ceremony [1]."
		),
		"compliance_steps": (
			"1. Hold ILR or settled status for at least 12 months [1]\n"
			"2. Confirm 5 years' UK residence with no more than 450 days abroad [1]\n"
			"3. Ensure no more than 90 days outside the UK in the final 12 months [1]\n"
			"4. Pass the Life in the UK test (if not already passed for ILR) [1]\n"
			"5. Pay the \u00a31,735 application fee and submit Form AN [1]\n"
			"6. Attend a citizenship ceremony and take the pledge of allegiance [1]"
		),
		"key_requirements": (
			"- ILR, settled status, or indefinite leave to enter for 12+ months [1]\n"
			"- 5 years' residence in the UK [1]\n"
			"- No more than 450 days outside the UK in the 5-year period [1]\n"
			"- No more than 90 days outside the UK in the final 12 months [1]\n"
			"- Pass the Life in the UK test [1]\n"
			"- English, Welsh, or Scottish Gaelic language proficiency [1]\n"
			"- Good character requirement [1]\n"
			"- Application fee: \u00a31,735 (includes \u00a3130 ceremony fee) [1]"
		),
		"sources": (
			"[1] Apply for citizenship if you have indefinite leave to remain — gov.uk"
		),
		"freshness": "REVIEW_SOON",
		"last_verified": date(2026, 3, 26),
		"updated_at": datetime(2026, 3, 26, 0, 0, 0),
	},
]


def seed_reference_data() -> None:
	"""Upsert student visa and long-term immigration reference cards."""
	for entry in _STUDENT_VISA_SEED:
		existing = StudentVisaInfo.query.filter_by(
			target_country=entry["target_country"],
			visa_name=entry["visa_name"],
		).first()
		if existing:
			for k, v in entry.items():
				setattr(existing, k, v)
		else:
			db.session.add(StudentVisaInfo(**entry))

	for entry in _LONG_TERM_SEED:
		existing = LongTermImmigration.query.filter_by(
			target_country=entry["target_country"],
			title=entry["title"],
		).first()
		if existing:
			for k, v in entry.items():
				setattr(existing, k, v)
		else:
			db.session.add(LongTermImmigration(**entry))

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

		filter_status: str | None = None
		user_regions: list[str] = []

		try:
			# Build query with parameterised filters (SQLAlchemy handles escaping)
			query = NewsUpdate.query.filter(
				(NewsUpdate.region_focus == target)
				| (NewsUpdate.region_focus == "General")
			)

			if country_filter:
				if country_filter in COUNTRY_VARIANTS:
					# Known country: match by country name OR any of its regions
					from sqlalchemy import or_
					filter_status = "known"
					user_regions = COUNTRY_TO_REGIONS.get(country_filter, [])
					wrapped = f"%,{country_filter},%"
					country_clause = NewsUpdate.mentioned_countries.like(wrapped)
					region_clauses = [
						NewsUpdate.mentioned_regions.like(f"%,{r},%")
						for r in user_regions
					]
					relevance_clause = or_(country_clause, *region_clauses)
					query = query.filter(
						relevance_clause | (NewsUpdate.mentioned_countries == ",")
					)
				else:
					# Unknown country: fall back to ILIKE on title+summary
					filter_status = "unknown"
					safe_filter = f"%{country_filter}%"
					query = query.filter(
						(NewsUpdate.title.ilike(safe_filter))
						| (NewsUpdate.summary.ilike(safe_filter))
						| (NewsUpdate.mentioned_countries == ",")
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
					mentioned_countries=row.mentioned_countries,
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
			filter_status=filter_status,
			user_regions=user_regions,
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

	@app.cli.command("backfill-countries")
	def backfill_countries_command() -> None:
		"""Backfill mentioned_countries for existing news articles."""
		with app.app_context():
			articles = NewsUpdate.query.all()
			updated = 0
			for article in articles:
				content = " ".join(filter(None, [article.title, article.summary]))
				countries = detect_mentioned_countries(content)
				if article.mentioned_countries != countries:
					article.mentioned_countries = countries
					updated += 1
			db.session.commit()
			print(f"Updated {updated} of {len(articles)} articles.")

	@app.cli.command("backfill-regions")
	def backfill_regions_command() -> None:
		"""Backfill mentioned_regions for existing news articles."""
		with app.app_context():
			articles = NewsUpdate.query.all()
			updated = 0
			for article in articles:
				content = " ".join(filter(None, [article.title, article.summary]))
				regions = detect_mentioned_regions(content)
				if article.mentioned_regions != regions:
					article.mentioned_regions = regions
					updated += 1
			db.session.commit()
			print(f"Updated {updated} of {len(articles)} articles.")

	@app.cli.command("audit-relevance")
	def audit_relevance_command() -> None:
		"""Check existing articles against the improved keyword filter."""
		with app.app_context():
			articles = NewsUpdate.query.order_by(NewsUpdate.published_at.desc()).all()
			would_remove = []
			for a in articles:
				content = " ".join(filter(None, [a.title, a.summary]))
				if not contains_keyword(content):
					would_remove.append((a.source, a.title[:80] if a.title else "(no title)"))
			print(f"\n{len(would_remove)} of {len(articles)} articles would be filtered out:\n")
			for source, title in would_remove:
				print(f"  [{source}] {title}")
			print(f"\n{len(articles) - len(would_remove)} articles would be kept.")


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

	if not app.config.get('NEWS_WORKER_ENABLED', NEWS_WORKER_ENABLED):
		logger.info("Background news fetcher disabled via NEWS_WORKER_ENABLED flag")
		return

	should_run = not app.debug or os.environ.get("WERKZEUG_RUN_MAIN") == "true"
	if should_run:
		t = threading.Thread(target=worker, daemon=True, name="news-fetcher")
		t.start()
		logger.info("Background news fetcher started")


# ---------------------------------------------------------------------------
# News fetching
# ---------------------------------------------------------------------------
def _inject_country(existing: str, country: str) -> str:
	"""Ensure *country* is present in the comma-delimited mentioned_countries string."""
	needle = f",{country},"
	if needle in existing:
		return existing
	if existing == ",":
		return f",{country},"
	return existing.rstrip(",") + f",{country},"


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
				countries = detect_mentioned_countries(content)
				regions = detect_mentioned_regions(content)

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
					mentioned_countries=countries,
					mentioned_regions=regions,
				)
				db.session.add(news_item)
				stored += 1
			except Exception:
				logger.exception("Error processing entry from %s", source)
				continue

	# --- Country-specific feeds (keyword filter bypassed) ---
	for source_country, feeds in COUNTRY_SOURCES.items():
		for feed_info in feeds:
			source = feed_info["name"]
			url    = feed_info["url"]
			try:
				parsed = feedparser.parse(url)
				if parsed.bozo and not parsed.entries:
					logger.warning(
						"Country feed %s (%s) error: %s",
						source, source_country, parsed.bozo_exception,
					)
					continue
			except Exception:
				logger.exception("Failed to parse country feed %s", source)
				continue

			for entry in parsed.entries:
				try:
					raw_title   = getattr(entry, "title", "")
					raw_summary = getattr(entry, "summary",
					              getattr(entry, "description", ""))
					content = " ".join(filter(None, [raw_title, raw_summary]))
					if not contains_keyword_lenient(content):
						continue

					link = getattr(entry, "link", None)
					if not link or len(link) > 512:
						continue
					if NewsUpdate.query.filter_by(link=link).first():
						continue

					published  = parse_entry_datetime(entry)
					region     = infer_region_focus(content)
					countries  = detect_mentioned_countries(content)
					countries  = _inject_country(countries, source_country)
					regions    = detect_mentioned_regions(content)

					clean_title   = strip_html_tags(raw_title) or "Regulatory update"
					clean_summary = (strip_html_tags(raw_summary)[:800]
					                 if raw_summary else None)

					news_item = NewsUpdate(
						source=source,
						title=clean_title[:512],
						link=link,
						summary=clean_summary,
						published_at=published,
						region_focus=region,
						mentioned_countries=countries,
						mentioned_regions=regions,
					)
					db.session.add(news_item)
					stored += 1
				except Exception:
					logger.exception("Error processing entry from country feed %s", source)
					continue

	if stored > 0:
		prune_old_news(MAX_NEWS_ITEMS)
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
	"""Return True if text is likely relevant to immigration/international students.

	Uses a tiered approach:
	1. STRONG keyword match -> accept immediately
	2. No CONTEXT keyword match -> reject
	3. CONTEXT match + NEGATIVE match (no strong) -> reject
	4. CONTEXT match + SUPPORTING match -> accept
	5. Otherwise -> reject
	"""
	if not text:
		return False
	lower = text.lower()

	if any(p.search(lower) for p in STRONG_PATTERNS):
		return True

	if not any(p.search(lower) for p in CONTEXT_PATTERNS):
		return False

	if any(p.search(lower) for p in NEGATIVE_PATTERNS):
		return False

	return any(p.search(lower) for p in SUPPORTING_PATTERNS)


def contains_keyword_lenient(text: str) -> bool:
	"""Lenient relevance filter for country-specific feeds.

	Country-specific feeds are inherently more relevant to the audience,
	so a CONTEXT keyword alone is sufficient. Negative keywords still reject.
	"""
	if not text:
		return False
	lower = text.lower()

	if any(p.search(lower) for p in STRONG_PATTERNS):
		return True

	if not any(p.search(lower) for p in CONTEXT_PATTERNS):
		return False

	if any(p.search(lower) for p in NEGATIVE_PATTERNS):
		return False

	return True


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
	if not text:
		return "General"
	if _UK_FOCUS_PATTERN.search(text):
		return "United Kingdom"
	if _US_FOCUS_PATTERN.search(text):
		return "United States"
	return "General"


def detect_mentioned_countries(text: str) -> str:
	"""Scan text for home-country mentions using pre-compiled patterns.

	Returns a delimiter-wrapped string like ',Pakistan,India,' or ',' for none.
	"""
	if not text:
		return ","
	found = []
	for country, pattern in COUNTRY_PATTERNS.items():
		if pattern.search(text):
			found.append(country)
	if not found:
		return ","
	return "," + ",".join(sorted(found)) + ","


def detect_mentioned_regions(text: str) -> str:
	"""Scan text for region mentions using pre-compiled patterns.

	Returns a delimiter-wrapped string like ',Gulf,Middle East,' or ',' for none.
	Regions are sorted alphabetically for consistent storage and comparison.
	"""
	if not text:
		return ","
	found = [region for region, pattern in REGION_PATTERNS.items() if pattern.search(text)]
	if not found:
		return ","
	return "," + ",".join(sorted(found)) + ","


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

	# AI feature temporarily disabled
	return (
		"The AI assistant is temporarily unavailable. "
		"Please check back later."
	)

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

		model = genai.GenerativeModel("gemini-2.0-flash")

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
