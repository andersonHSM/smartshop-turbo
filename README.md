# SmartShopper Turbo

AI-powered semantic product search using OpenAI embeddings + pgvector in a Turbo monorepo.

## Stack

- 🧠 OpenAI for text embeddings
- 🔍 pgvector + Postgres
- 🧰 NestJS (backend)
- 💻 Next.js (frontend)
- 🧱 TurboRepo monorepo

## Setup

1. Clone this repo  
2. `cp .env.example .env` and fill values  
3. `docker compose up --build`  
4. Go to `http://localhost:3001`

## Dev

- `npm run dev` — starts turbo monorepo in watch mode
- `cd apps/backend && npm run start:dev` for local API dev
- `cd apps/frontend && npm run dev` for local UI dev
