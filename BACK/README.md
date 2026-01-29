# README - LabIA Backend

Backend API for analyzing medical lab results using Mistral AI.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Add your Mistral API key to the `.env` file:
   - Get a free API key from [console.mistral.ai](https://console.mistral.ai)
   - Add it to `.env`: `MISTRAL_API_KEY=your_key_here`

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/analyze-pdf
Upload and analyze a PDF lab report.

**Request**: multipart/form-data with `file` field

**Response**:
```json
{
  "success": true,
  "extractedTests": [...],
  "analysis": {
    "summary": {...},
    "results": [...]
  }
}
```

### POST /api/analyze-manual
Analyze manually entered test data.

**Request  Body**:
```json
{
  "tests": [
    {
      "name": "Hemoglobin",
      "value": "14.5",
      "unit": "g/dL"
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "analysis": {
    "summary": {...},
    "results": [...]
  }
}
```

### GET /health
Health check endpoint.

## Environment Variables

- `MISTRAL_API_KEY`: Your Mistral AI API key (required)
- `PORT`: Server port (default: 3001)
