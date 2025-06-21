import { Controller, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

    @Post('sync')
    async syncCatalog() {
        return this.catalogService.syncFromAirtable();
    }
}
