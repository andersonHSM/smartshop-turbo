import { Body, Controller, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post('sync')
    async syncCatalog() {
        return this.catalogService.syncFromAirtable();
    }

    @Post('feedback')
    async postFeedback(@Body() body: { query: string; rank: number; productId: string, reward: number }) {
        return this.catalogService.postFeedback(body);
    }
}
