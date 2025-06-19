# SmartShopper Turbo

AI-powered semantic product search using OpenAI embeddings + pgvector in a Turbo monorepo.

## Stack

- 🧠 OpenAI for text embeddings
- 🔍 pgvector + Postgres
- 🧰 NestJS (backend)
- 💻 Next.js (frontend)
- 🧱 TurboRepo monorepo with pnpm

## Setup

1. Clone this repo  
2. `cp .env.example .env` and fill values  
3. `docker compose up --build`  
4. Go to `http://localhost:3001`

## Development

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Run development servers

```bash
# Start all services with Turbo
pnpm run dev

# Or start individual services
pnpm --filter backend start:dev
pnpm --filter frontend dev
```

### Build

```bash
pnpm run build
```

## Docker

```bash
docker compose up --build
```

## API Endpoints

- Backend API: http://localhost:3000
- Frontend: http://localhost:3001
- API Documentation: http://localhost:3000/api
