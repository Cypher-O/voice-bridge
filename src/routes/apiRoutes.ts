// src/routes/api.ts
import { Router } from 'express';
import multer from 'multer';
import { textToSpeech } from '../controllers/textToSpeechController';
import { speechToText } from '../controllers/speechToTextController';
import { readDocument } from '../controllers/documentReaderController';
import { rateLimiter } from '../middlewares/rateLimitMiddleware';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/text-to-speech', rateLimiter, textToSpeech);
router.post('/speech-to-text', rateLimiter, upload.single('audio'), speechToText);
router.post('/read-document', rateLimiter, upload.single('file'), readDocument);

export default router;