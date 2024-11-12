// src/controllers/speechToTextController.ts
import { Request, Response } from 'express';
import { transcribeAudio } from '../services/speechToTextService';
import { ApiResponseHandler } from '../utils/api_response';

interface MulterRequest extends Request {
    file?: Express.Multer.File
}

interface TranscriptionResponse {
    text: string;
    audioFileName: string;
    duration?: number;
}

export const speechToText = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json(ApiResponseHandler.error('No audio file provided', 400));
            return;
        }
        const text = await transcribeAudio(req.file);
        
        const response: TranscriptionResponse = {
            text,
            audioFileName: req.file.originalname
        };
        
        res.json(ApiResponseHandler.success(response, 'Audio transcribed successfully'));
    } catch (error) {
        res.status(500).json(ApiResponseHandler.error('Failed to convert speech to text', 500));
    }
};
