import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { AirtableModule } from '../airtable/airtable.module';
import { OpenAiModule } from '../openapi/openapi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [OpenAiModule, AirtableModule, ConfigModule],
    controllers: [CatalogController],
    providers: [CatalogService],
})
export class CatalogModule {}
