import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto, CreateProductDto, SearchProductsDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products', type: [ProductDto] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Return product by ID', type: ProductDto })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('search/semantic')
  @ApiOperation({ summary: 'Search products using semantic search' })
  @ApiQuery({ name: 'query', description: 'Search query text' })
  @ApiQuery({ name: 'limit', description: 'Number of results to return', required: false })
  @ApiResponse({ status: 200, description: 'Return search results', type: [ProductDto] })
  search(@Query('query') query: string, @Query('limit') limit?: number) {
    return this.productsService.searchByText(query, limit ? parseInt(limit) : 10);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed database with sample products' })
  @ApiResponse({ status: 200, description: 'Database seeded successfully' })
  async seed() {
    await this.productsService.seedSampleProducts();
    return { success: true, message: 'Sample products seeded successfully' };
  }
}
