import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { Readable } from 'stream';

export const readPdf = async (file: Express.Multer.File): Promise<string> => {
  const buffer = file.buffer;
  const data = await pdf(buffer);
  return data.text;
};

export const readDocx = async (file: Express.Multer.File): Promise<string> => {
  const buffer = file.buffer;
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};
