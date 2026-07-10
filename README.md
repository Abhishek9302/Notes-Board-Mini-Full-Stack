# Notes Board — Mini Full-Stack

A minimal full-stack Notes Board app built as a monorepo. Create, read, and delete notes through a Next.js frontend wired to an Express backend backed by PostgreSQL.

## What was built

- **Home** — Lists all notes with newest first. Each card links to a detail page and supports deletion.
- **New Note** — Form to create a note with title and body, persisted via the backend API.
- **Note Detail** — Shows a single note with a delete action.
- **Health check** — `GET /health` returns JSON with database connectivity status.

## Repository layout

```
├── apps/frontend/          Next.js 14 App Router (TypeScript)
├── apps/backend/           Express + pg (TypeScript)
├── database/schema.sql     Postgres schema + seed row
└── .zero-human/
    ├── DEPLOY_MANIFEST.json
    ├── ISSUE_SPEC.md
    └── PEDANT_BENCHMARK.md
```

## Tech stack

- Frontend: Next.js 14, React 18, TypeScript
- Backend: Express 4, pg, TypeScript
- Database: PostgreSQL

## Environment variables

### Frontend

- `NEXT_PUBLIC_API_URL` — Base URL of the backend (e.g., `https://api.example.com`)

### Backend

- `DATABASE_URL` — Postgres connection string
- `PORT` — Server port (default: `4000`)
- `JWT_SECRET` — Secret key for signing JWT tokens (auth endpoints)

## Setup

Install dependencies for both apps:

```bash
cd apps/backend && npm install
cd ../frontend && npm install
```

Apply the database schema:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## How to run locally

### Backend

```bash
cd apps/backend
npm run build
npm start
```

Runs on `http://0.0.0.0:4000` by default.

### Frontend

```bash
cd apps/frontend
npm run dev
```

Runs on `http://localhost:3000` by default. Set `NEXT_PUBLIC_API_URL=http://localhost:4000` before starting.

## API routes

| Method | Route           | Description                |
|--------|-----------------|----------------------------|
| GET    | `/health`       | Health + DB connectivity   |
| GET    | `/api/notes`    | List all notes             |
| POST   | `/api/notes`    | Create a note              |
| GET    | `/api/notes/:id`| Get a single note          |
| DELETE | `/api/notes/:id`| Delete a note              |
| POST   | `/auth/signup`  | Register a new user        |
| POST   | `/auth/login`   | Authenticate and get JWT   |

## Deployment

This project is configured for **GitHub + Railway**:

- Backend reads `DATABASE_URL` and `PORT` from Railway environment variables.
- Frontend reads `NEXT_PUBLIC_API_URL` at build time.
- `database/schema.sql` is applied automatically by the deploy pipeline.
