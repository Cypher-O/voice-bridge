# Document Processing and Speech API

A TypeScript-based Express API for document processing (PDF/DOCX), speech-to-text, and text-to-speech conversion using Google Cloud services.

## Features

- 📄 Document Processing (PDF & DOCX)
- 🎤 Speech to Text Conversion
- 🔊 Text to Speech Conversion
- ⚡ Rate Limiting
- 🔒 Type Safety
- 📝 Standardized API Responses

## Prerequisites

- Node.js (v14 or higher)
- TypeScript (v4 or higher)
- Google Cloud Account with Speech & Text-to-Speech APIs enabled
- Service Account Key from Google Cloud

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd document-speech-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:

```env
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Project Structure

```
src/
├── controllers/
│   ├── documentReaderController.ts
│   ├── speechToTextController.ts
│   └── textToSpeechController.ts
├── services/
│   ├── documentReaderService.ts
│   ├── speechToTextService.ts
│   └── textToSpeechService.ts
├── routes/
│   └── apiRoutes.ts
├── types/
│   ├── express.d.ts
│   └── api_response.ts
├── utils/
|   ├── api_response.ts
│   └── logger.ts
├── middlewares/
|   ├── errorHandlerMiddleware.ts
│   └── rateLimitMiddleware.ts
├── app.ts
└── server.ts
```

## Dependencies

```json
{
  "dependencies": {
    "@google-cloud/speech": "^latest",
    "@google-cloud/text-to-speech": "^latest",
    "express": "^latest",
    "multer": "^latest",
    "pdf-parse": "^latest",
    "mammoth": "^latest",
    "express-rate-limit": "^latest",
    "dotenv": "^latest"
  },
  "devDependencies": {
    "@types/express": "^latest",
    "@types/multer": "^latest",
    "@types/node": "^latest",
    "typescript": "^latest",
    "ts-node": "^latest",
    "nodemon": "^latest"
  }
}
```

## API Endpoints

### 1. Document Reading

```http
POST /api/read-document
Content-Type: multipart/form-data
```

#### Request

- `file`: PDF or DOCX file

#### Response

```json
{
  "code": 0,
  "status": "success",
  "message": "Document read successfully",
  "data": {
    "text": "extracted text content",
    "fileName": "document.pdf",
    "fileType": "application/pdf"
  }
}
```

### 2. Speech to Text

```http
POST /api/speech-to-text
Content-Type: multipart/form-data
```

#### Request

- `audio`: Audio file (MP3)

#### Response

```json
{
  "code": 0,
  "status": "success",
  "message": "Audio transcribed successfully",
  "data": {
    "text": "transcribed text",
    "audioFileName": "audio.mp3",
    "duration": 10.5
  }
}
```

### 3. Text to Speech

```http
POST /api/text-to-speech
Content-Type: application/json
```

#### Request

```json
{
  "text": "Text to convert to speech",
  "voice": "en-US",  // optional
  "speed": 1.0       // optional
}
```

#### Response

- Audio stream (audio/mpeg) if successful
- Error response if failed:

```json
{
  "code": 1,
  "status": "error",
  "message": "Error message"
}
```

## Error Codes

- 0: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Usage Examples

### Using axios

```typescript
import axios from 'axios';

// Document Reading
const readDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post('/api/read-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error reading document:', error);
    throw error;
  }
};

// Speech to Text
const convertSpeechToText = async (audioFile: File) => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  
  try {
    const response = await axios.post('/api/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error converting speech to text:', error);
    throw error;
  }
};

// Text to Speech
const convertTextToSpeech = async (text: string) => {
  try {
    const response = await axios.post('/api/text-to-speech', 
      { text },
      { responseType: 'blob' }
    );
    return response.data;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
  }
};
```

## Running the Application

1. Development mode:

```bash
npm run dev
```

2. Production mode:

```bash
npm run build
npm start
```

## Setting Up Google Cloud Credentials

1. Create a project in Google Cloud Console
2. Enable Speech-to-Text and Text-to-Speech APIs
3. Create a service account and download the key file
4. Set the path to your key file in the `GOOGLE_APPLICATION_CREDENTIALS` environment variable

## Rate Limiting

The API includes rate limiting to prevent abuse. Default settings:

- 100 requests per 15 minutes window
- Customize these values in the `.env` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
