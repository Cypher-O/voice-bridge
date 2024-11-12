// src/controllers/documentReaderController.ts
import { Request, Response } from 'express';
import { readPdf, readDocx } from '../services/documentReaderService';
import { ApiResponseHandler } from '../utils/api_response';

interface MulterRequest extends Request {
    file?: Express.Multer.File
}

interface DocumentResponse {
    text: string;
    fileName: string;
    fileType: string;
}

export const readDocument = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json(ApiResponseHandler.error('No file provided', 400));
            return;
        }
        
        const fileType = req.file.mimetype;
        let text: string;
        
        if (fileType === 'application/pdf') {
            text = await readPdf(req.file);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            text = await readDocx(req.file);
        } else {
            res.status(400).json(ApiResponseHandler.error('Unsupported file type', 400));
            return;
        }
        
        const response: DocumentResponse = {
            text,
            fileName: req.file.originalname,
            fileType: req.file.mimetype
        };
        
        res.json(ApiResponseHandler.success(response, 'Document read successfully'));
    } catch (error) {
        res.status(500).json(ApiResponseHandler.error('Failed to read document', 500));
    }
};
