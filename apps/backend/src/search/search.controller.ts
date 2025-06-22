import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async search(@Query('query') query: string) {
        return this.searchService.searchProducts(query);
    }
}
