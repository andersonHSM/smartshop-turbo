import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { OpenAiModule } from '@app/openapi/openapi.module';
import { PrismaModule } from '@app/prisma.module';

@Module({
    imports: [OpenAiModule, PrismaModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
