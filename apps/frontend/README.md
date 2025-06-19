# SmartShopper Frontend

Next.js frontend for the SmartShopper application, featuring semantic search powered by OpenAI embeddings and pgvector.

## Features

- Semantic product search using OpenAI's text-embedding-ada-002 model
- Vector similarity search with pgvector
- Responsive UI built with TailwindCSS
- Server components and API routes

## Development

```bash
# From the root of the monorepo
npm run dev

# Or directly from this directory
npm run dev
```

## Database Setup

The database will be automatically set up when you run the application for the first time. To seed the database with sample products:

```bash
# Run the seed script
ts-node scripts/seed.ts
```

## Environment Variables

Copy `.env.local` to your local environment and update with your OpenAI API key.

## Technologies

- Next.js 14 with App Router
- OpenAI Embeddings API
- pgvector for PostgreSQL vector similarity search
- TailwindCSS for styling
