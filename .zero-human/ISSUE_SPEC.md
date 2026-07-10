# ABH-12: Notes Board — Mini Full-Stack

Build a small full-stack Notes Board app as a monorepo that deploys cleanly to Railway.



Layout (required):

\- apps/frontend/     — Next.js App Router, next ^14.2.35+

\- apps/backend/      — Express, reads process.env.DATABASE\_URL and process.env.PORT

\- database/schema.sql

\- .zero-human/DEPLOY\_MANIFEST.json



Product:

\- Pages: Home (list notes), New Note form, Note detail

\- API: GET/POST /api/notes, GET /api/notes/:id, DELETE /api/notes/:id

\- Table notes: id uuid PK, title text, body text, created\_at timestamptz

\- schema.sql: CREATE TABLE IF NOT EXISTS + one seed row with ON CONFLICT DO NOTHING

\- Backend /health must return JSON including db status (connected/up)

\- Frontend calls backend via NEXT\_PUBLIC\_API\_URL (no hardcoded localhost ports)

\- Wire UI buttons to real API handlers that persist to Postgres



Constraints:

\- Follow AGENTS.md / deploy guardrails

\- Idempotent schema seeds

\- No AWS/Vercel — GitHub + Railway only


---
## FULL-STACK TECH CONTRACT (mandatory unless the request is explicitly frontend/static-only)

Deliver a REAL, wired-together full-stack app — buttons and forms MUST perform real actions that persist to a database via a backend API. Do NOT ship a static frontend with mocked data.

**Repository layout (monorepo):**
- **Frontend** (repo root): Next.js 14 App Router + TypeScript. The UI is a client app that fetches live data from the backend using `process.env.NEXT_PUBLIC_API_URL`.
- **Backend** (`backend/`): Node.js + Express + TypeScript using the `pg` driver. Reads `process.env.DATABASE_URL` and `process.env.PORT` (default 4000). Exposes `GET /health`, full CRUD REST endpoints for the domain, and auth (`POST /auth/signup`, `POST /auth/login` returning a JWT). `backend/package.json` must define scripts `build` (tsc), `start` (node dist/index.js) and `main` = `dist/index.js`.
- **Database** (`database/schema.sql`): `CREATE TABLE IF NOT EXISTS` statements for a `users` table (email UNIQUE + password_hash) and all domain tables. This file is auto-applied by the deploy pipeline.

**Wiring rules:**
- Frontend → Backend over HTTP via `NEXT_PUBLIC_API_URL` (the deploy pipeline injects this automatically).
- Backend → Database via `DATABASE_URL` (the deploy pipeline injects this automatically). Use parameterized queries. Enable Postgres SSL when the URL points at RDS/AWS.
- If the app uses object storage, read the bucket from `process.env.S3_BUCKET` and region from `process.env.S3_REGION` / `process.env.AWS_REGION` (the deploy pipeline injects these automatically). NEVER hardcode a bucket name.
- Keep imports/exports consistent so every `npm run build` succeeds for both apps.

**Deployment manifest (REQUIRED):**
The Architect MUST write `.zero-human/DEPLOY_MANIFEST.json` describing exactly which files, routes, and tables the app requires. The Pedant runs a deterministic benchmark against this manifest and bounces the work back to Grunt if anything is missing. A template is provided at `.zero-human/DEPLOY_MANIFEST.template.json` — copy it, fill it in, and save as `DEPLOY_MANIFEST.json`.
