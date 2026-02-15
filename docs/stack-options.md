# Technology Stack Options (Feedback Requested)

CognIQ is currently at scaffolding stage. Before implementing backend/frontend code, we should lock an MVP stack.

## Option A — TypeScript Full-Stack (Recommended for speed + consistency)
- **Frontend**: React + Vite + TypeScript
- **Backend**: Fastify + TypeScript
- **DB**: PostgreSQL (SQLite for local dev)
- **Testing**: Vitest + Playwright + Supertest

### Pros
- Single language across frontend/backend.
- Large ecosystem and strong hiring/community support.
- Fast onboarding for open-source contributors.

### Tradeoffs
- Requires discipline for runtime type safety boundaries.
- Node backend performance is good, but not as lean as Go/Rust for heavy workloads.

## Option B — Python Backend + TS Frontend
- **Frontend**: React + TypeScript
- **Backend**: FastAPI (Python)
- **DB**: PostgreSQL
- **Testing**: Pytest + Playwright

### Pros
- Excellent scientific and analytics ecosystem.
- Very productive for psychometric analysis workflows.

### Tradeoffs
- Two-language stack increases maintenance overhead.
- More integration surface area between app and analysis code.

## Option C — Next.js Monorepo
- **Frontend/API**: Next.js + TypeScript
- **DB**: PostgreSQL (via Prisma)
- **Testing**: Vitest + Playwright

### Pros
- Quick route-to-production for web app projects.
- Simple deployment model.

### Tradeoffs
- API/backend concerns can get coupled to frontend framework choices.
- Less flexibility if we later split services.

## Decision Inputs We Need From You
Please share preferences on:
1. Team familiarity (TypeScript vs Python-heavy workflows).
2. Hosting preference (Vercel/Render/Fly/AWS/etc.).
3. Expected scale and performance needs in first 6–12 months.
4. Whether psychometric analysis should live inside product repo or separate pipeline.

## Default Path If No Preference
Proceed with **Option A** for MVP, then revisit after pilot data.
