import { sql } from '@vercel/postgres';

export async function setupDatabase() {
  // Enable pgvector extension
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;

  // Create products table with vector column
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      embedding VECTOR(1536)
    )
  `;

  // Create index for faster similarity search
  try {
    await sql`CREATE INDEX IF NOT EXISTS products_embedding_idx ON products USING hnsw (embedding vector_cosine_ops)`;
  } catch (error) {
    console.warn('Note: HNSW index creation failed, falling back to exact search', error);
  }
}

export async function seedSampleProducts() {
  const count = await sql`SELECT COUNT(*) FROM products`;

  if (parseInt(count.rows[0].count) > 0) {
    return; // Skip seeding if products already exist
  }

  // Sample products will be seeded with embeddings via a separate script
  console.log('Database is empty, please run the seed script to add sample products');
}
