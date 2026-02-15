# CognIQ Project Plan

## 1) Product Goal
Build a scientifically grounded, web-based IQ assessment platform focused on non-verbal reasoning with transparent methodology, reliable scoring, and accessible UX.

## 2) Current State
- Option A stack is now selected and implemented as the active baseline.
- Backend API runs on Fastify + TypeScript.
- Frontend prototype runs on React + Vite + TypeScript.
- Prototype item schema and seed item bank are in place.
- API integration tests run with Vitest.

## 3) Completed (This Milestone)
- Migrated previous JavaScript prototype to TypeScript full-stack baseline.
- Preserved MVP flow: create session → next item → submit answer → score.
- Added stricter answer validation (invalid option handling).
- Updated docs to mark Option A as decided.

## 4) Next Delivery Phases

### Phase 1 — Stabilize MVP
- Add request/response runtime validation.
- Add per-item timing enforcement.
- Improve frontend state UX (loading/error/progress).
- Expand API tests for edge behavior and completion flow.

### Phase 2 — Persistence + Quality
- Add PostgreSQL persistence for sessions/responses.
- Introduce migration tooling and seed scripts.
- Add lint/typecheck/CI gates.

### Phase 3 — Psychometrics
- Expand and review item bank.
- Add item diagnostics (difficulty, discrimination).
- Introduce pilot analytics and reporting.

### Phase 4 — Production Readiness
- Security hardening and abuse controls.
- Deployment environments and observability.
- Contributor guide and release process.

## 5) Prioritized Next Tasks
1. Add Zod/JSON-schema runtime validation in backend handlers.
2. Add session persistence in PostgreSQL.
3. Add timer/progress UX on frontend.
4. Add CI pipeline for build + tests.
5. Add Playwright E2E for frontend flow.

## 6) Definition of Done for MVP
- End-to-end prototype flow works via UI + API.
- Score remains deterministic and reproducible.
- Option A baseline code is in TypeScript across client/server.
- Automated API tests pass.
