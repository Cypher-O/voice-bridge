// src/controllers/speechToTextController.ts
import { Request, Response } from 'express';
import { transcribeAudio } from '../services/speechToTextService';

interface MulterRequest extends Request {
    file?: Express.Multer.File
}

export const speechToText = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No audio file provided' });
            return;
        }
        const text = await transcribeAudio(req.file);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to convert speech to text' });
    }
};