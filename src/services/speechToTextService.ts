// src/services/speechToTextService.ts
import { SpeechClient, protos } from '@google-cloud/speech';

const speechClient = new SpeechClient();

export const transcribeAudio = async (file: Express.Multer.File): Promise<string> => {
    const audioBytes = file.buffer.toString('base64');
    
    const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
        audio: {
            content: audioBytes
        },
        config: {
            encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.MP3,
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        },
    };

    try {
        const [response] = await speechClient.recognize(request);
        
        if (!response.results || response.results.length === 0) {
            throw new Error('No transcription results found');
        }

        const transcription = response.results
            .map(result => result.alternatives?.[0]?.transcript || '')
            .filter(text => text.length > 0)
            .join('\n');
            
        if (!transcription) {
            throw new Error('No transcription generated');
        }
        
        return transcription;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Speech recognition failed: ${error.message}`);
        }
        throw new Error('Speech recognition failed with unknown error');
    }
};