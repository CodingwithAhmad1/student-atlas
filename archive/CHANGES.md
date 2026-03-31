# Student Atlas Restructuring - Complete Changes

## Overview
The Student Atlas application has been completely restructured with the following changes:

## Key Changes Made

### 1. **Database Models** (`models.py`)
- **Removed**: `OriginGuidance` model (origin-specific country guidance)
- **Added**: `LongTermImmigration` model with fields:
  - `target_country`: US or UK
  - `category`: Work Visas, Residency, or Citizenship
  - `title`: Specific visa/pathway name
  - `description`: Overview
  - `key_requirements`: Bullet-point requirements
  - `updated_at`: Last update timestamp

### 2. **Application Routes** (`app.py`)
- **Updated imports**: Added `google.generativeai` for Gemini and `python-dotenv` for environment variables
- **Removed**: Origin-specific guidance data seeding
- **Added**: Long-term immigration pathways seeding (6 entries covering):
  - US: H-1B Work Visa, Green Card, US Citizenship
  - UK: Skilled Worker Visa, Indefinite Leave to Remain (ILR), British Citizenship

#### New Routes:
1. **`/` (Home)**: Displays student visa info + long-term immigration pathways
2. **`/news`**: Dedicated news page with country filtering and 15-min auto-refresh
3. **`/chatbot`**: AI-powered visa guidance using Gemini API

#### New Function:
- `get_visa_guidance(origin, destination)`: Calls Gemini API to provide personalized visa breakdowns

### 3. **Templates**

#### `base.html` - Header Navigation
- Added top navigation bar with links to: Home, News, Chatbot
- Updated header with responsive design
- Tagline updated to: "...understand your immigration path from origin to citizenship"

#### `index.html` - Home Page Restructured
- **Removed**: 
  - Origin country dropdown
  - Change alerts section
  - News feed
- **Updated**:
  - Destination dropdown converted to select element for cleaner UI
  - Added navigation links to News and Chatbot pages
- **Added**:
  - "Long-Term Immigration Options" section with three categories:
    - Work Visas
    - Residency Pathways
    - Citizenship Routes
  - "Explore Your Path" info cards linking to News and Chatbot
  - Responsive grid layout for immigration cards

#### `news.html` - New News Page
- Country filter dropdown (US/UK only)
- Displays up to 50 news items filtered by selected destination
- Shows last refresh timestamp
- **Auto-refresh feature**: JavaScript polls page every 15 minutes (900,000ms)
- Visual feedback and error handling for auto-refresh

#### `chatbot.html` - New Chatbot Page
- Form with two required fields:
  - Origin country (with suggestions: India, Nigeria, Brazil, China, Canada, Mexico, Australia)
  - Destination country (select from US/UK)
- Submits to `/chatbot` endpoint via POST
- Displays Gemini-generated response with:
  - Visa requirements and types
  - Documentation needed
  - Timeline and costs
  - Longer-term pathways
  - Country-specific considerations
- Styled response display with numbered sections
- Disclaimer about AI-generated content

### 4. **Dependencies** (`requirements.txt`)
Added:
- `google-generativeai==0.7.2`: For Gemini API integration
- `python-dotenv==1.0.0`: For environment variable management

### 5. **Configuration** (`.env`)
Created with:
- `GEMINI_API_KEY`: Placeholder for user's Gemini API key
- `FLASK_ENV=development`
- `DEBUG=True`

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Gemini API
1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Update `.env` file with your key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Run the Application
```bash
python app.py
```

### 4. Access the Application
- **Home**: `http://localhost:5000/`
- **News**: `http://localhost:5000/news`
- **Chatbot**: `http://localhost:5000/chatbot`

## Features

### Home Page
- Compare student visas (F-1 for US, Student Route for UK)
- View long-term options (work visas, residency, citizenship)
- Quick links to detailed news and chatbot assistance

### News Page
- Filter news by destination country (US/UK)
- Auto-refreshes every 15 minutes
- Shows last update timestamp
- Links to original sources

### Chatbot Page
- AI-powered visa guidance
- Personalized breakdowns based on origin and destination
- Covers full immigration journey (student visa → work → residency → citizenship)

## Data Structure

The application now focuses on:
1. **Student Visas**: Core entry visas for study (F-1, Student Route)
2. **Long-Term Immigration**: Pathways after graduation (work, residency, citizenship)
3. **Live News**: Real-time regulatory updates
4. **AI Assistance**: Gemini-powered personalized guidance

Origin-specific guidance has been replaced with AI-generated, context-aware responses via the chatbot.
