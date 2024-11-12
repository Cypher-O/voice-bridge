// src/controllers/textToSpeechController.ts
import { Request, Response } from 'express';
import { convertTextToSpeech } from '../services/textToSpeechService';
import { ApiResponseHandler } from '../utils/api_response';

interface TextToSpeechRequest {
    text: string;
    voice?: string;
    speed?: number;
}

export const textToSpeech = async (req: Request<{}, {}, TextToSpeechRequest>, res: Response): Promise<void> => {
    try {
        const { text, voice, speed } = req.body;
        
        if (!text) {
            res.status(400).json(ApiResponseHandler.error('Text is required', 400));
            return;
        }
        
        const audioStream = await convertTextToSpeech(text);
        res.set('Content-Type', 'audio/mpeg');
        audioStream.pipe(res);
    } catch (error) {
        res.status(500).json(ApiResponseHandler.error('Failed to convert text to speech', 500));
    }
};