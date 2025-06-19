import { sql } from '@vercel/postgres';
import { getEmbedding } from './openai';
import { Product } from './types';

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // Get embedding for the search query
    const embedding = await getEmbedding(query);

    // Search for products by embedding similarity
    const result = await sql`
      SELECT 
        id,
        name, 
        description, 
        category, 
        price,
        embedding::text,
        1 - (embedding <=> $1) as similarity
      FROM products
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1
      LIMIT 9
    `;

    // Parse the results
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      price: parseFloat(row.price),
      embedding: JSON.parse(row.embedding.replace('(', '[').replace(')', ']')),
      similarity: row.similarity,
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
