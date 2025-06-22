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
        const results: Array<{
            id: string;
            name: string;
            description: string;
            similarity: string;
        }> = await this.prisma.$queryRaw`
            SELECT id, name, description, 1 - (embedding::vector <=> ${embedding}::vector) AS similarity
            FROM "products"
            ORDER BY embedding::vector <=> ${embedding}::vector
            LIMIT 5
        `;

        const retrievedIds = results.map(r => r.id);

        const rewardMy = new Map<string, number>();

        console.log(retrievedIds);

        const rewardGrouping = await this.prisma.feedback.groupBy({
            where: {
                query,
            },
            by: ['query', 'productId'],
            _avg: { reward: true },
            _count: { query: true },
        });

        rewardGrouping?.forEach(r => {
            rewardMy.set(r.productId, r._avg.reward!);
        });

        const sorted = results.sort((a, b) => {
            console.log(a.id, `a.similarity: ${a.similarity}`, `b.similarity: ${b.similarity}`);
            const aScore = this.computeFinalScore(parseFloat(b.similarity), rewardMy.get(b.id) || 0);
            const bScore = this.computeFinalScore(parseFloat(a.similarity), rewardMy.get(a.id) || 0);

            console.log({ aScore, bScore });
            return aScore - bScore;
        });

        // console.log(sorted);
        return sorted;
    }

    computeFinalScore(similarity: number, reward: number, alpha = 0.7, beta = 0.3) {
        return alpha * similarity + beta * reward;
    }
}
