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
        const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
                model: 'text-embedding-ada-002',
                input: text,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            },
        );

        const vector = response.data.data[0].embedding;
        return Buffer.from(Float32Array.from(vector).buffer);
    }
}
