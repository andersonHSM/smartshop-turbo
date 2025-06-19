import { sql } from '@vercel/postgres';
import { getEmbedding } from '../lib/openai';
import { setupDatabase } from '../lib/db';

// Sample product data
const sampleProducts = [
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
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    category: 'Audio',
    price: 249.99,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking, GPS, and 5-day battery life. Works with Android and iOS.',
    category: 'Wearables',
    price: 299.99,
  },
  {
    name: '4K Smart TV 55"',
    description: '55-inch 4K smart TV with HDR, built-in streaming apps, and voice control.',
    category: 'TVs',
    price: 599.99,
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with 16000 DPI, RGB lighting, and 70-hour battery life.',
    category: 'Computer Accessories',
    price: 79.99,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Mechanical keyboard with customizable RGB lighting, programmable keys, and durable construction.',
    category: 'Computer Accessories',
    price: 129.99,
  },
];

async function seed() {
  try {
    console.log('Setting up database...');
    await setupDatabase();

    // Check if products already exist
    const count = await sql`SELECT COUNT(*) FROM products`;
    if (parseInt(count.rows[0].count) > 0) {
      console.log('Database already seeded with products. Skipping...');
      return;
    }

    console.log('Seeding products with embeddings...');

    for (const product of sampleProducts) {
      // Generate embedding for product
      const content = `${product.name} ${product.description} ${product.category}`;
      const embedding = await getEmbedding(content);

      // Insert product with embedding
      await sql`
        INSERT INTO products (name, description, category, price, embedding)
        VALUES (${product.name}, ${product.description}, ${product.category}, ${product.price}, ${embedding})
      `;

      console.log(`Added product: ${product.name}`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();
