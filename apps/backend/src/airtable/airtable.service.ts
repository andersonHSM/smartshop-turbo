import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AirtableService {
    private readonly apiKey?: string;
    private readonly baseId?: string;
    private readonly apiUrl: string = 'https://api.airtable.com/v0';
    private readonly tableName: string = 'appFDaL4DiFQrUJuv/Furniture';

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('AIRTABLE_API_KEY');
        this.baseId = this.configService.get<string>('AIRTABLE_BASE_ID');
    }

    async fetchProducts(): Promise<{ id: string; name: string; description: string }[]> {
        const url = `${this.apiUrl}/${this.tableName}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });

        return response.data.records.map((r: { id: any; fields: { [x: string]: any } }) => ({
            id: r.id,
            name: r.fields['Name'],
            description: r.fields['Description'],
        }));
    }
}
