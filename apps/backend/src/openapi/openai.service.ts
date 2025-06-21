// backend/src/shared/openai.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIService {
    private readonly apiKey?: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    }

    async embedText(text: string): Promise<Buffer> {
        const response = await axios.post('http://127.0.0.1:11434/api/embeddings', {
            model: 'nomic-embed-text',
            prompt: text,
        });

        const vector = response.data.embedding;
        return Buffer.from(Float32Array.from(vector).buffer);
    }
}
