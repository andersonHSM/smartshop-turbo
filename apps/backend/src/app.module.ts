import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { SearchModule } from './search/search.module';
import { CatalogModule } from './catalog/catalog.module';
import { PrismaModule } from '@app/prisma.module';

@Module({
    imports: [ConfigModule, SearchModule, CatalogModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
