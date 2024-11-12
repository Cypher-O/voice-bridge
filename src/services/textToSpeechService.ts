// src/services/textToSpeechService.ts
import { Readable } from 'stream';
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export const convertTextToSpeech = async (text: string): Promise<Readable> => {
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: { text },
        voice: {
            languageCode: 'en-US',
            ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL
        },
        audioConfig: {
            audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3
        }
    };

    const [response] = await client.synthesizeSpeech(request);
    
    if (response.audioContent) {
        return Readable.from(Buffer.from(response.audioContent));
    }
    throw new Error('Failed to generate audio');
};