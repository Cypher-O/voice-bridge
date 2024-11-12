// src/controllers/textToSpeechController.ts
import { Request, Response } from 'express';
import { convertTextToSpeech } from '../services/textToSpeechService';

export const textToSpeech = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text } = req.body;
        const audioStream = await convertTextToSpeech(text);
        res.set('Content-Type', 'audio/mpeg');
        audioStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to convert text to speech' });
    }
};