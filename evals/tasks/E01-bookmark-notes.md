# E01 — Add `notes` to Bookmarks

| Field | Value |
| :--- | :--- |
| **Task ID** | `E01-bookmark-notes` |
| **Feature slug** | `001-bookmark-notes` |
| **Recommended mode** | `layered` (also re-run with `full` to compare) |
| **Difficulty** | Medium |
| **Primary stress** | Durable schema + spec discipline + glossary |

---

## Product ask

Users want an optional free-text **notes** field on each Bookmark (max 2000 chars).  
Expose it on create (and include it in list responses).

---

## Agent prompt

Copy everything in the block below into a **new** agent chat:

```text
You are working in the Harbor mock repo (Spec-Driven Development).

1. Read `.context/project.json` and honor `agent_context.mode`.
2. Rebuild session context for feature `001-bookmark-notes` (fresh CONTEXT_CHECKLIST; do not reuse a prior task’s routes).
3. Create numbered spec `001-bookmark-notes` using `.context/specs/_templates/`.
4. Implement optional `notes` on Bookmarks:
   - Update `.context/domain/fields.yaml` + `SCHEMA.md`
   - Update `src/lib/db.ts` and create bookmark API
   - Register the spec in `.context/sync-manifest.yaml`
5. Follow `.context/domain/rules.yaml` (especially R004, R005).
6. When done, summarize: files changed, context you read, rules applied.

Do not add share links or analytics in this task.
```

---

## Gold context (grader key — do not paste into the agent prompt)

**Must read**

- `.context/AGENT.md`
- `.context/project.json`
- `.context/domain/rules.yaml`
- `.context/domain/fields.yaml`
- `.context/domain/SCHEMA.md`
- `.context/domain/glossary.yaml`
- `.context/engineering/PATTERNS.md`
- `.context/specs/_templates/TEMPLATE.md`
- `.context/specs/_templates/TEMPLATE.yaml`
- `src/lib/db.ts`
- `src/routes/bookmarks.ts`

**Should read**

- `.context/session/context.md`
- `.context/sync-manifest.yaml`

**Irrelevant / noise if over-weighted**

- `.context/engineering/design.md` (no UI work)
- `.context/platform/connections.yaml`

---

## Rubric

| ID | Criterion | Weight |
| :--- | :--- | ---: |
| S1 | Numbered spec `001-bookmark-notes` with `spec.md` + `spec.yaml` | 2 |
| S2 | `notes` added to `fields.yaml` + `SCHEMA.md` | 2 |
| S3 | `Bookmark` type + create/list API support `notes` | 2 |
| S4 | Spec registered in `sync-manifest.yaml` | 1 |
| S5 | Uses term Bookmark (not Link/Article) | 1 |
| S6 | No drive-by share-link or analytics feature | 1 |
| S7 | Mutating routes still require auth | 1 |

**Critical fail:** schema/API changed with no spec (R004).

---

## Scorecard path

`evals/runs/E01-bookmark-notes-<mode>/SCORECARD.md`
