import { Request, Response } from 'express';
import { convertTextToSpeech } from '../services/textToSpeechService';

export const textToSpeech = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required.' });
    }

    const audioStream = await convertTextToSpeech(text);
    res.setHeader('Content-Type', 'audio/mp3');
    audioStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Error generating speech.' });
  }
};
