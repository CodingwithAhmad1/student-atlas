# Student Atlas - Quick Start Guide

## Prerequisites
- Python 3.8+
- pip (Python package manager)
- A Google Gemini API key (free tier available)

## Installation & Setup

### 1. Install Dependencies
Navigate to the project directory and install required packages:
```bash
pip install -r requirements.txt
```

### 2. Get Your Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Get API Key" → "Create API Key in new project"
3. Copy your API key

### 3. Configure Environment
Create/update `.env` file in the project root:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
FLASK_ENV=development
DEBUG=True
```

## Running the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## Application Structure

### Pages

#### 1. **Home** (`/`)
- **Student Visa Information**: F-1 (US) and Student Route (UK)
- **Long-Term Immigration Options**:
  - Work Visas (H-1B for US, Skilled Worker for UK)
  - Residency Pathways (Green Card for US, ILR for UK)
  - Citizenship Routes
- Navigation to News and Chatbot pages

#### 2. **News** (`/news`)
- **Filter by destination**: US or UK
- **Auto-refresh**: Updates every 15 minutes automatically
- **Last refreshed timestamp**: Shows when news was last fetched
- **News sources**:
  - USCIS Immigration Updates (US)
  - US Department of State (US)
  - UK Visas and Immigration (UK)
  - Times Higher Education
  - The PIE News

#### 3. **Chatbot** (`/chatbot`)
- **Input fields**:
  - Country of origin (with suggestions)
  - Destination country (US or UK)
- **AI-Generated Response** includes:
  - Visa requirements and types
  - Key documentation needed
  - Timeline and processing
  - Cost estimates
  - Pathways to work, residency, and citizenship
  - Country-specific considerations

## File Structure

```
Student Atlas/
├── app.py                 # Main Flask application
├── models.py              # SQLAlchemy database models
├── requirements.txt       # Python dependencies
├── .env                   # Environment configuration (UPDATE WITH YOUR API KEY)
├── CHANGES.md             # Detailed changelog
├── README.md              # This file
├── instance/              # Database directory
│   └── student_atlas.db   # SQLite database
├── static/                # Static files
│   └── base.css          # Stylesheet
└── templates/             # HTML templates
    ├── base.html         # Base template with navigation
    ├── index.html        # Home page
    ├── news.html         # News feed page
    └── chatbot.html      # AI chatbot page
```

## Features

### ✅ What's New
- **Long-term immigration focus**: Beyond just student visas
- **Three-page structure**: Home (visas), News (updates), Chatbot (AI help)
- **Simplified UI**: Dropdown-based filters instead of text inputs
- **AI-powered guidance**: Personalized visa breakdowns using Gemini
- **Auto-refreshing news**: Fresh updates every 15 minutes
- **Responsive design**: Works on desktop and mobile

### ❌ What's Removed
- Origin-country dropdown from home page
- Origin-specific guidance cards
- News feed from home page (moved to dedicated page)

## Database

The app uses **SQLite** for data storage with three main models:

1. **StudentVisaInfo**: Student visa details (F-1, Student Route)
2. **LongTermImmigration**: Work visas, residency, citizenship pathways
3. **NewsUpdate**: Cached news from RSS feeds
4. **AppStatus**: Metadata (last refresh timestamp, etc.)

The database is automatically created on first run.

## Background News Fetching

The application includes a background worker that:
- Fetches immigration news every 30 minutes
- Filters for student visa and immigration keywords
- Stores latest 60 news items
- Updates `news_last_refreshed` timestamp

This runs automatically when the app starts.

## Troubleshooting

### Issue: "Gemini API key not configured"
**Solution**: 
1. Verify `.env` file exists in project root
2. Check API key is correctly entered (no extra spaces)
3. Ensure you're using the actual API key, not placeholder text

### Issue: Database errors
**Solution**: Delete `instance/student_atlas.db` and restart app to rebuild

### Issue: RSS feeds not updating
**Solution**: Check internet connection; feeds update every 30 minutes in background

### Issue: News page shows "Fetching..."
**Solution**: Wait 30 seconds for background worker to fetch initial news

## Security Notes

⚠️ **Important**:
- Never commit `.env` to version control
- The API key in `.env` is sensitive; keep it private
- This application provides informational content, not legal advice
- Always verify information with official government sources

## Support & Legal Disclaimer

This application provides educational information about immigration processes. It is not a substitute for professional legal advice. Always consult:
- Official government immigration websites
- Licensed immigration attorneys
- Certified immigration consultants

For official information:
- **US**: https://www.uscis.gov
- **UK**: https://www.gov.uk/government/organisations/uk-visas-and-immigration

## Next Steps

1. ✅ Install dependencies
2. ✅ Get Gemini API key
3. ✅ Update `.env` file
4. ✅ Run `python app.py`
5. ✅ Visit `http://localhost:5000`
6. ✅ Explore the three pages!
