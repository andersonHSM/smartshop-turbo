# SmartShopper Backend API

NestJS backend API for the SmartShopper application, featuring semantic search powered by OpenAI embeddings and pgvector.

## Features

- RESTful API with NestJS
- Semantic product search using OpenAI's text-embedding-ada-002 model
- Vector similarity search with pgvector
- Swagger API documentation
- Prisma ORM integration

## Development

```bash
# From the root of the monorepo
npm run dev

# Or directly from this directory
npm run dev
```

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create a new product
- `GET /products/search/semantic?query=<search-text>` - Search products using semantic search
- `POST /products/seed` - Seed database with sample products

## Swagger Documentation

Swagger documentation is available at: http://localhost:3000/api

## Environment Variables

Copy `.env` to your local environment and update with your OpenAI API key.

## Technologies

- NestJS framework
- OpenAI Embeddings API
- pgvector for PostgreSQL vector similarity search
- Prisma ORM
