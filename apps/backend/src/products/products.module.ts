import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OpenAIService } from './openai.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, OpenAIService],
  exports: [ProductsService],
})
export class ProductsModule {}
