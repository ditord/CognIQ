# Technology Stack Decision

## Selected Direction
**Option A (TypeScript full-stack)** is now the active project direction.

### Current implementation baseline
- **Frontend**: React + Vite + TypeScript
- **Backend**: Fastify + TypeScript
- **Data**: JSON seed bank now, PostgreSQL planned next
- **Testing**: Vitest (API), Playwright planned for browser E2E

## Why Option A
- Single language across client/server reduces coordination overhead.
- Strong open-source contributor familiarity for fast onboarding.
- Good path to harden incrementally (validation, persistence, telemetry).

## Next stack-focused tasks
1. Add shared TypeScript types package for API contracts.
2. Add runtime schema validation for requests/responses.
3. Introduce PostgreSQL + migration tooling.
4. Add Playwright browser E2E once environment is stable.
