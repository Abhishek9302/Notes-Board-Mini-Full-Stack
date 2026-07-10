# Changelog

## [1.0.0] — 2026-07-10

### Added (ABH-12)

- **Notes Board — Mini Full-Stack**
  - Next.js 14 frontend with App Router: Home, New Note, and Note Detail pages.
  - Express backend with `pg` driver: CRUD REST API for notes, `/auth/signup` and `/auth/login` JWT endpoints, and a `/health` endpoint that reports database connectivity.
  - PostgreSQL schema (`database/schema.sql`) with `users` and `notes` tables, plus an idempotent seed row for `notes`.
  - Frontend fetches live data via `NEXT_PUBLIC_API_URL` with no hardcoded ports.
  - Deployment manifest (`.zero-human/DEPLOY_MANIFEST.json`) describing required files, routes, and tables.
