import textToSpeech from '@google-cloud/text-to-speech';
import { Readable } from 'stream';

const client = new textToSpeech.TextToSpeechClient();

export const convertTextToSpeech = async (text: string): Promise<Readable> => {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const audioStream = Readable.from(response.audioContent);
  return audioStream;
};
