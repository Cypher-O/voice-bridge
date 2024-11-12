// src/controllers/documentReaderController.ts
import { Request, Response } from 'express';
import { readPdf, readDocx } from '../services/documentReaderService';

interface MulterRequest extends Request {
    file?: Express.Multer.File
}

export const readDocument = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }
        
        const fileType = req.file.mimetype;
        let text: string;
        
        if (fileType === 'application/pdf') {
            text = await readPdf(req.file);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            text = await readDocx(req.file);
        } else {
            res.status(400).json({ error: 'Unsupported file type' });
            return;
        }
        
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read document' });
    }
};
