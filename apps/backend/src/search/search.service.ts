import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma.service';
import { OpenAIService } from '@app/openapi/openai.service';

@Injectable()
export class SearchService {
    constructor(
        private openai: OpenAIService,
        private prisma: PrismaService,
    ) {}

    async searchProducts(query: string) {
        const embedding = await this.openai.embedText(query);

        // Raw SQL with pgvector similarity
        const results = await this.prisma.$queryRaw`
            SELECT id, name, description
            FROM "products"
            ORDER BY embedding::vector <=> ${embedding}::vector
            LIMIT 5
        `;

        return results;
    }
}
