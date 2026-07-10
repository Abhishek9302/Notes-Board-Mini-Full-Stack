# Implementation Notes — ABH-12

## Architecture overview

This is a minimal full-stack monorepo with three layers:

1. **Frontend** (`apps/frontend/`) — Next.js 14 App Router, client-side data fetching.
2. **Backend** (`apps/backend/`) — Express 4 REST API with `pg` driver.
3. **Database** (`database/schema.sql`) — PostgreSQL schema with idempotent seeds.

## Frontend

- **Pages**
  - `/` — Home listing all notes, supports delete.
  - `/notes/new` — Form to create a note.
  - `/notes/[id]` — Detail view for a single note.
- **Data layer** (`src/lib/api.ts`) — Thin fetch wrappers around the backend. Uses `NEXT_PUBLIC_API_URL` as the base URL with no hardcoded localhost ports.
- **Components**
  - `NoteCard` — Card UI for the list with truncation and delete action.
  - `NoteForm` — Controlled form for title and body.
- **Build** — `next.config.js` uses `output: 'standalone'` for portable deployment.

## Backend

- **Entry** (`src/index.ts`) — Boots Express on `process.env.PORT` (default `4000`). Enables CORS and JSON parsing.
- **Routes**
  - `/health` — Runs `SELECT 1` to confirm DB connectivity; returns `{ status, db }`.
  - `/api/notes` — Full CRUD: `GET` list, `POST` create, `GET /:id` read, `DELETE /:id` delete.
  - `/auth` — Signup/login endpoints returning JWT (included per full-stack contract).
- **Database connection** (`src/db.ts`) — `pg.Pool` using `DATABASE_URL`. Enables SSL only for RDS URLs.
- **Queries** — Parameterized SQL only; no ORM.

## Database

- `users` — UUID PK, email UNIQUE, password_hash, created_at.
- `notes` — UUID PK, title, body, created_at.
- Seed row inserted with `ON CONFLICT (id) DO NOTHING` so the script is idempotent.

## Environment contract

| Variable                | Used by   | Purpose                          |
|-------------------------|-----------|----------------------------------|
| `NEXT_PUBLIC_API_URL`   | Frontend  | Backend base URL                 |
| `DATABASE_URL`          | Backend   | Postgres connection string       |
| `PORT`                  | Backend   | HTTP server port                 |
| `JWT_SECRET`            | Backend   | Secret key for JWT signing       |

## Deployment guardrails

- No AWS/Vercel-specific config — targets GitHub + Railway.
- `DEPLOY_MANIFEST.json` lists required files, routes, and tables for automated validation.
