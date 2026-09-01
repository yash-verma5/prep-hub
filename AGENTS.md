# Repository instructions

## Mission

Build a focused local study and practice platform for the IOCL 2026 Graduate Engineer Grade-A Computer Science and IT CBT. This is an exam tool, not a showcase application.

## Planning gate

- Read `docs/SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/SOURCE_REGISTRY.md`, and `docs/CONTENT_POLICY.md` before changing application or question content.
- Do not implement application code until the user approves the proposed plan.
- If an official corrigendum changes the exam, update the registry and planning docs before application behavior.

## Source rules

- IOCL documents govern pattern, marking, dates, vacancies, and broad syllabus.
- Use only `sources/official/CS_2026_Syllabus.pdf` to expand IOCL’s broad CS/IT headings into detailed topics.
- Historical GATE papers do not widen the syllabus and are never IOCL previous-year papers.
- `sources/personal/AS_CIL.pdf` is private baseline context only; do not expose its identifiers or copy its questions.
- `sources/official/CS/CS1-2017.pdf` and `sources/official/CS/CS2011.pdf` are malformed and quarantined.
- The root 2025 GATE paper copies duplicate the matching files under `sources/official/CS/`; never ingest both.
- Never invent a fact, question, answer, explanation, locator, citation, or previous-year attribution.
- Follow `docs/CONTENT_POLICY.md`; every enabled question needs an explanation, provenance label, precise source, verification source, and approved status.
- Do not reproduce paid or unauthorized copyrighted test-series content.

## Product constraints

- React + Vite + TypeScript.
- Browser-only; persist user state in `localStorage`.
- No authentication, backend, cloud database, AI chatbot, telemetry, or required network call.
- Prefer semantic HTML, plain CSS, native browser APIs, and existing dependencies.
- Do not add a router, state library, component framework, chart library, date library, or abstraction without a demonstrated need.
- Support single-answer MCQs first; exact mocks must follow 20 Quant / 15 Reasoning / 15 English / 50 Domain, Section A then B, 60/90 minutes, and -0.25 per wrong answer.
- Record confidence separately from correctness. Low-confidence correct answers remain review material.
- General Awareness from the CIL baseline is not an IOCL study track unless a later official correction adds it.

## Change discipline

- Keep diffs small and reuse existing code before adding helpers.
- Do not add speculative features or files.
- Preserve user data: validate imports, confirm destructive reset/overwrite, and tolerate corrupt localStorage.
- Non-trivial scoring, timers, persistence, import, and content validation need the smallest runnable tests that cover failure-prone behavior.
- Never weaken input validation, data-loss protection, content provenance, security basics, or accessibility to reduce code.

## Completion checks

- Run the available type-check/build and focused tests.
- Confirm every shipped question passes the content gate.
- Confirm official facts and tentative wording still match the latest registered IOCL source.
- Report what changed, what was verified, and any source/content blocker. Do not claim application completion while approved content is missing.
