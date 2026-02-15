# CognIQ Project Plan

## 1) Product Goal
Build a scientifically grounded, web-based IQ assessment platform focused on non-verbal reasoning with transparent methodology, reliable scoring, and accessible UX.

## 2) Current State (from README)
- Repository currently contains high-level vision and roadmap in `README.md`.
- Baseline structure and draft docs are now scaffolded (`docs/`, `src/`, `data/`, `scripts/`).
- No runnable application or test harness exists yet.

## 3) Decision Gate (Needed Before Coding MVP)
- Finalize technology stack for MVP implementation.
- Candidate options are documented in `docs/stack-options.md`.
- Maintainer input requested on team familiarity, hosting, and analysis workflow constraints.

## 4) Delivery Phases

### Phase 0 — Foundations (Week 1)
- Create baseline repository structure:
  - `docs/`, `src/frontend`, `src/backend`, `src/tests`, `data/`, `scripts/`
- Add architecture decision record (ADR) template.
- Select initial stack (suggestion):
  - Frontend: React + TypeScript
  - Backend: Node.js + TypeScript (Express/Fastify)
  - Database: PostgreSQL (or SQLite for early prototype)
- Define contribution standards (`CONTRIBUTING.md`, code style, PR checklist).

### Phase 1 — Psychometrics & Content Design (Week 1–2)
- Draft `docs/methodology.md` with:
  - Construct definitions (fluid reasoning, working memory, pattern recognition)
  - Test blueprint by domain and difficulty bands
  - Item writing and review rules (bias mitigation)
- Draft `docs/references.md` bibliography.
- Draft `docs/design.md` UX principles for accessibility and fairness.
- Build first question bank schema in `data/`:
  - Item metadata: domain, difficulty, timing, distractor logic, validation status.

### Phase 2 — MVP Application (Week 2–4)
- Frontend MVP:
  - User flow: welcome → consent/instructions → timed item sequence → results summary.
  - Responsive UI and keyboard accessibility.
- Backend MVP:
  - Endpoints for session creation, item delivery, answer submission, score retrieval.
  - Deterministic scoring for first item set.
- Data layer:
  - Seed scripts for initial item bank.

### Phase 3 — Reliability & Quality (Week 4–5)
- Testing strategy:
  - Unit tests for scoring and item selection.
  - Integration tests for API flows.
  - Frontend tests for key interaction patterns.
- Add CI pipeline:
  - Lint + typecheck + tests on pull requests.
- Introduce telemetry for completion rates and item diagnostics (privacy-aware).

### Phase 4 — Scientific Validation & Beta (Week 5–7)
- Pilot study plan:
  - Collect sample responses and completion metrics.
  - Run item analysis (difficulty, discrimination).
- Recalibrate scoring model and retire poor-performing items.
- Publish transparent methodology notes and known limitations.

### Phase 5 — Launch Preparation (Week 7+)
- Security hardening and data handling policy.
- Deployment automation and environment configs.
- Public documentation and contributor onboarding.

## 5) Prioritized Next Tasks (Immediate Backlog)
1. **Choose MVP stack** using `docs/stack-options.md` as decision brief.
2. Define canonical item JSON schema and add 10–20 prototype non-verbal items.
3. Implement backend MVP routes for sessions/items/answers/scores.
4. Build minimal frontend test runner UI with timer and answer submission.
5. Add baseline tests for scoring and API contracts.
6. Set up CI for lint + tests.

## 6) Definition of Done for MVP
- A participant can complete a full prototype test flow end-to-end.
- Score is computed reproducibly from submitted responses.
- Core assumptions are documented in `docs/methodology.md`.
- Basic automated tests pass in CI.

## 7) Risks & Mitigations
- **Psychometric validity risk** → Use documented blueprint and iterative item analysis.
- **Bias/fairness risk** → Non-verbal focus + review checklist + pilot diagnostics.
- **Scope creep risk** → Lock MVP to one item family before expanding.
- **Data/privacy risk** → Minimize personal data collection in early phases.
