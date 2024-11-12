import speech from '@google-cloud/speech';
import { createReadStream } from 'fs';

const client = new speech.SpeechClient();

export const convertSpeechToText = async (audioFilePath: string): Promise<string> => {
  const audio = {
    content: createReadStream(audioFilePath).toString('base64'),
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  return response.results?.[0]?.alternatives?.[0]?.transcript || '';
};
