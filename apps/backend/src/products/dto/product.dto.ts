import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: 'Product ID' })
  id: number;

  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product description' })
  description: string;

  @ApiProperty({ description: 'Product category' })
  category: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Similarity score (only for search results)', required: false })
  similarity?: number;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product category' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class SearchProductsDto {
  @ApiProperty({ description: 'Search query text' })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiProperty({ description: 'Number of results to return', required: false, default: 10 })
  @IsNumber()
  @IsOptional()
  limit?: number = 10;
}

export class ProductEmbeddingDto {
  @ApiProperty({ description: 'Product ID' })
  id: number;

  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product description' })
  description: string;

  @ApiProperty({ description: 'Product category' })
  category: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Embedding vector', type: [Number] })
  embedding: number[];
}
