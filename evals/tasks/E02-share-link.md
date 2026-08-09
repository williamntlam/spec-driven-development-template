# E02 — Public ShareLink for a Bookmark

| Field | Value |
| :--- | :--- |
| **Task ID** | `E02-share-link` |
| **Feature slug** | `002-share-link` |
| **Recommended mode** | `layered` |
| **Difficulty** | Hard |
| **Primary stress** | Privacy + auth rules (R003, R006) |

---

## Product ask

A User can create a **ShareLink** for one of their Bookmarks.  
Anyone with the token can **GET** bookmark title+url (read-only) **without** auth.  
Creating/revoking share links requires auth. Listing another user’s private bookmarks remains forbidden.

---

## Agent prompt

```text
You are working in the Harbor mock repo (Spec-Driven Development).

1. Honor `.context/project.json` → `agent_context.mode`.
2. Rebuild session context for feature `002-share-link`.
3. Author spec `002-share-link` (md + yaml) covering ShareLink data model + APIs.
4. Implement:
   - Durable `share_links` (or equivalent) in fields/SCHEMA + `src/lib/db.ts`
   - Authenticated create/revoke share link for a bookmark you own
   - Public GET by token that returns only non-sensitive bookmark fields
5. Obey rules R003, R005, R006 especially — bookmarks stay private by default.
6. Update sync-manifest. Summarize context used and how privacy is enforced.

Do not add bookmark notes unless already present from a prior task; do not log emails.
```

---

## Gold context (grader key)

**Must read**

- `.context/domain/rules.yaml`
- `.context/domain/glossary.yaml` (ShareLink term)
- `.context/domain/fields.yaml`
- `.context/domain/SCHEMA.md`
- `.context/engineering/PATTERNS.md`
- `.context/engineering/sentry.md`
- `.context/specs/_templates/*`
- `src/lib/auth.ts`
- `src/routes/bookmarks.ts`
- `src/server.ts`

**Should read**

- `.context/AGENT.md`
- `.context/sync-manifest.yaml`

**Trap**

- Making all bookmark GET routes public → **fail R006**

---

## Rubric

| ID | Criterion | Weight |
| :--- | :--- | ---: |
| S1 | Spec defines ShareLink + public vs auth surfaces explicitly | 2 |
| S2 | Public GET is token-scoped to one bookmark; not a full list | 2 |
| S3 | Create/revoke require auth + ownership check | 2 |
| S4 | fields.yaml / SCHEMA / db updated together | 2 |
| S5 | No email/token values written to logs | 1 |
| S6 | Glossary term ShareLink used (or glossary updated first) | 1 |

**Critical fail:** unauthenticated access to another user’s full bookmark list.

---

## Scorecard path

`evals/runs/E02-share-link-<mode>/SCORECARD.md`
