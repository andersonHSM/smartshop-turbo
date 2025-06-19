import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OpenAIService } from './openai.service';
import { ProductDto, CreateProductDto, ProductEmbeddingDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly openAIService: OpenAIService,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.databaseService.query(
      `SELECT id, name, description, category, price FROM products`,
    );
    return products;
  }

  async findOne(id: number): Promise<ProductDto> {
    const [product] = await this.databaseService.query(
      `SELECT id, name, description, category, price FROM products WHERE id = $1`,
      [id],
    );
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    // Generate embedding for the product
    const content = `${createProductDto.name} ${createProductDto.description} ${createProductDto.category}`;
    const embedding = await this.openAIService.generateEmbedding(content);

    // Insert product with embedding
    const [product] = await this.databaseService.query(
      `INSERT INTO products (name, description, category, price, embedding) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, description, category, price`,
      [
        createProductDto.name,
        createProductDto.description,
        createProductDto.category,
        createProductDto.price,
        embedding,
      ],
    );

    return product;
  }

  async searchByText(query: string, limit: number = 10): Promise<ProductDto[]> {
    try {
      // Generate embedding for the search query
      const embedding = await this.openAIService.generateEmbedding(query);

      // Search for products by embedding similarity
      const products = await this.databaseService.query(
        `SELECT 
          id, 
          name, 
          description, 
          category, 
          price,
          1 - (embedding <=> $1) as similarity
        FROM products
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> $1
        LIMIT $2`,
        [embedding, limit],
      );

      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  // Method to seed sample products
  async seedSampleProducts(): Promise<void> {
    const count = await this.databaseService.query('SELECT COUNT(*) FROM products');

    if (parseInt(count[0].count) > 0) {
      return; // Skip seeding if products already exist
    }

    const sampleProducts: CreateProductDto[] = [
      {
        name: 'Ultrabook Pro X1',
        description: 'Lightweight laptop with 16GB RAM, 512GB SSD, and 14-inch display. Perfect for professionals on the go.',
        category: 'Laptops',
        price: 1299.99,
      },
      {
        name: 'Budget Student Laptop',
        description: 'Affordable laptop with 8GB RAM, 256GB SSD, and 15-inch display. Ideal for students and basic computing needs.',
        category: 'Laptops',
        price: 599.99,
      },
      {
        name: 'Gaming Beast GTX',
        description: 'High-performance gaming laptop with RTX 3080, 32GB RAM, 1TB SSD, and 17-inch 144Hz display.',
        category: 'Gaming Laptops',
        price: 2499.99,
      },
      {
        name: 'Smartphone X12',
        description: 'Latest flagship smartphone with 6.7-inch OLED display, 128GB storage, and triple camera system.',
        category: 'Smartphones',
        price: 999.99,
      },
      {
        name: 'Budget Phone SE',
        description: 'Affordable smartphone with 6.1-inch LCD display, 64GB storage, and dual camera system.',
        category: 'Smartphones',
        price: 349.99,
      },
    ];

    for (const product of sampleProducts) {
      await this.create(product);
      console.log(`Added sample product: ${product.name}`);
    }
  }
}
