import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma.service';
import { OpenAIService } from '@app/openapi/openai.service';
import { AirtableService } from '@app/airtable/airtable.service';

@Injectable()
export class CatalogService {
    constructor(
        private readonly airtable: AirtableService,
        private readonly openai: OpenAIService,
        private readonly prisma: PrismaService,
    ) {}

    async syncFromAirtable() {
        const records = await this.airtable.fetchProducts();

        for (const record of records) {
            const input = `${record.name} ${record.description}`;
            const embedding = await this.openai.embedText(input);
    
            await this.prisma.$queryRaw`
                INSERT INTO "products" ("id", "name", "description", "embedding", "updatedAt")
                VALUES (${record.id}, ${record.name}, ${record.description}, ${embedding}::vector, ${new Date()})
                ON CONFLICT ("id") 
                DO UPDATE SET
                    "name" = ${record.name},
                    "description" = ${record.description},
                    "embedding" = ${embedding}::vector
            `;
        }

        return { status: 'synced', count: records.length };
    }
}
