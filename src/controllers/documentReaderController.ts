import { Request, Response } from 'express';
import { readPdf, readDocx } from '../services/documentReaderService';

export const readDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'File is required.' });
    }

    let content = '';
    if (file.mimetype === 'application/pdf') {
      content = await readPdf(file);
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      content = await readDocx(file);
    } else {
      return res.status(400).json({ error: 'Unsupported file format.' });
    }

    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: 'Error reading document.' });
  }
};
