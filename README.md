# 🧠 CognIQ – A Web-Based Scientific IQ Test

CognIQ is an open-source project aimed at creating a **scientifically grounded, web-based IQ test**. The goal is to provide a fair, reliable, and accessible platform for measuring cognitive abilities using validated psychometric principles.

---

## 📖 Overview

This project is designed to:
- Deliver an interactive IQ test via a modern web interface.
- Base assessments on **established psychometric models** (fluid intelligence, working memory, pattern recognition).
- Ensure **cultural fairness** by emphasizing non-verbal reasoning tasks.
- Provide **transparent documentation** of methodology, references, and design choices.

---

## 📂 Repository Structure

```
cogniq/
│
├── README.md              # Project overview
├── LICENSE                # Open-source license
├── .gitignore             # Ignore unnecessary files
├── docs/                  # Documentation
│   ├── methodology.md     # Scientific grounding
│   ├── references.md      # Academic sources
│   └── design.md          # UX/UI principles
├── src/                   # Source code
│   ├── frontend/          # Web interface
│   ├── backend/           # API & scoring logic
│   └── tests/             # Unit & integration tests
├── data/                  # Question sets & scoring models
└── scripts/               # Deployment automation
```

> ✅ Initial scaffolding plus MVP prototype implementation is now in place.

---

## ⚙️ Installation and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cogniq.git
   cd cogniq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run backend API (Fastify + TypeScript):
   ```bash
   npm run dev:api
   ```

4. Run frontend app (React + Vite + TypeScript):
   ```bash
   npm run dev:web
   ```

---

## 🧪 Scientific Basis

CognIQ is inspired by established psychometric frameworks:
- **Fluid Intelligence**: Problem-solving and abstract reasoning.
- **Working Memory**: Short-term retention and manipulation of information.
- **Pattern Recognition**: Identifying logical sequences and relationships.

All test items are designed to minimize cultural and language bias, focusing on **non-verbal reasoning tasks**.

---

## 📚 References

- Raven, J. (2000). *The Raven’s Progressive Matrices: Change and Stability over Culture and Time*.  
- Wechsler, D. (2008). *WAIS-IV: Wechsler Adult Intelligence Scale – Fourth Edition*.  
- Carroll, J. B. (1993). *Human Cognitive Abilities: A Survey of Factor-Analytic Studies*.  

(See `docs/references.md` for a full bibliography.)

---

## 🚀 Roadmap

- [x] Define prototype question set and item schema
- [x] Implement baseline scoring and session flow
- [x] Build minimal frontend interface
- [x] Develop backend API
- [x] Add initial API tests
- [ ] Deploy to cloud hosting

## 🧱 Current Build Status

- [x] Option A selected (TypeScript full-stack)
- [x] Fastify backend MVP routes implemented
- [x] React + Vite frontend MVP implemented
- [x] Item schema + 12-item prototype bank available
- [x] API tests running with Vitest

See `docs/stack-options.md` for the recorded decision and next stack tasks.

---


## API Endpoints (Fastify MVP)

- `POST /api/sessions` → create a test session
- `GET /api/sessions/:sessionId/items/next` → fetch next unanswered item
- `POST /api/sessions/:sessionId/answers` → submit selected option
- `GET /api/sessions/:sessionId/score` → retrieve current score summary

## 📜 License

This project is licensed under the MIT License – see the `LICENSE` file for details.

---

## 🤝 Contributing

Contributions are welcome! Please read `docs/methodology.md` before submitting pull requests to ensure scientific integrity is maintained.

---

### Suggested Repo Name
- **cogniq** (short, memorable, blends “cognition” + “IQ”)  
- Alternative: **iq-test-web** (more descriptive, less brandable)

---
