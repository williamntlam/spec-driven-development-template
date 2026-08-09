# Codebase Patterns & Invariants

> Structural rules that apply across the repository. AI agents and contributors must follow these unless a spec explicitly supersedes them.

---

## 1. General Principles

- Prefer clarity over cleverness; optimize for readability and reviewability.
- Keep business rules in services/domain layers — not in controllers, UI handlers, or ad-hoc scripts.
- Fail closed on security and authorization checks.
- Prefer small, composable modules with a single responsibility.
- Do not introduce a second pattern for a concern that already has a repository convention.

---

## 2. Naming Conventions

| Concern | Convention | Example |
| :--- | :--- | :--- |
| Files / modules | kebab-case or language idiomatic | `user-service.ts` |
| Types / classes | PascalCase | `UserAccount` |
| Functions / methods | camelCase or snake_case per language | `createUser` / `create_user` |
| Database tables | plural snake_case | `user_accounts` |
| Database columns | snake_case | `created_at` |
| Env vars | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| Spec folders | `NNN-topic-slug` | `001-user-authentication` |
| Domain terms | Must match `.context/domain/glossary.yaml` | — |

---

## 3. Architecture Patterns

Customize these for your stack. Starter defaults:

- **Layering:** Transport (HTTP/RPC) → Application/Service → Domain → Persistence.
- **Persistence access:** Use a repository/data-access boundary; do not query the DB from UI or route handlers directly.
- **Configuration:** Read secrets and environment values via a single config module backed by `.context/domain/fields.yaml` contracts.
- **Errors:** Map domain errors to stable API/error codes; never leak internal stack traces to clients.
- **Feature flags:** Gate incomplete or risky behavior via `.context/platform/features.yaml`.

---

## 4. Testing Expectations

- Unit-test domain and business-rule logic.
- Integration-test persistence and external boundaries when feasible.
- Prefer deterministic fixtures over live third-party calls in CI.
- New APIs declared in a spec should ship with corresponding tests in the same change set when practical.

---

## 5. Anti-Patterns (Do Not)

- Bypass `.context/domain/rules.yaml` invariants "just this once".
- Introduce undocumented env vars or DB columns.
- Duplicate glossary terms with synonyms in code (`Customer` vs `User` unless glossary defines both).
- Export default when the project standard is named exports _(adjust if your stack differs)_.
- Scatter requirements only in PR descriptions — capture them in specs.

---

## 6. Language / Framework Notes

Document stack-specific invariants here after updating `.context/project.json`, for example:

- Package manager and workspace layout
- Preferred module system
- HTTP framework middleware order
- ORM / migration tool conventions
