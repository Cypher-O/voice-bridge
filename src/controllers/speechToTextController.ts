import { Request, Response } from 'express';
import { convertSpeechToText } from '../services/speechToTextService';

export const speechToText = async (req: Request, res: Response) => {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required.' });
    }

    const transcript = await convertSpeechToText(audioFile.path);
    res.json({ transcript });
  } catch (err) {
    res.status(500).json({ error: 'Error processing audio.' });
  }
};
