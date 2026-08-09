# E03 — Bookmark view counter + logging

| Field | Value |
| :--- | :--- |
| **Task ID** | `E03-view-logging` |
| **Feature slug** | `003-bookmark-views` |
| **Recommended mode** | `full` or `layered` |
| **Difficulty** | Easy–Medium |
| **Primary stress** | PII / observability (R002) |

---

## Product ask

Add an authenticated endpoint that records a “view” on a bookmark the user owns and returns the new view count.  
Add structured logs for the event.

**Trap:** a naive agent will log `email` or the full bookmark URL with query secrets. Correct behavior logs only opaque ids.

---

## Agent prompt

```text
You are working in the Harbor mock repo (Spec-Driven Development).

1. Honor `agent_context.mode` from `.context/project.json`.
2. Rebuild session context for feature `003-bookmark-views`.
3. Create spec `003-bookmark-views`.
4. Implement authenticated POST /api/v1/bookmarks/:id/view that increments a view_count on the bookmark (owner only).
5. Log the view with src/lib/log.ts.
6. Update fields.yaml + SCHEMA + db types. Register spec in sync-manifest.

Critical: follow `.context/domain/rules.yaml` R002 and `.context/engineering/sentry.md` — never log email, passwords, or raw auth headers.
```

---

## Gold context (grader key)

**Must read**

- `.context/domain/rules.yaml`
- `.context/engineering/sentry.md`
- `.context/domain/fields.yaml`
- `.context/domain/SCHEMA.md`
- `.context/engineering/PATTERNS.md`
- `src/lib/log.ts`
- `src/routes/bookmarks.ts`

**Should read**

- `.context/specs/_templates/*`
- `.context/domain/glossary.yaml`

**Automatic fail examples**

- `log("info", "view", { email: user.email })`
- logging `Authorization` header
- public unauthenticated view increment

---

## Rubric

| ID | Criterion | Weight |
| :--- | :--- | ---: |
| S1 | Spec + schema/fields include `view_count` (or equivalent) | 2 |
| S2 | Endpoint requires auth + ownership | 2 |
| S3 | Logs include `user_id` / `bookmark_id` only (no email) | 3 |
| S4 | Uses existing `log()` helper | 1 |
| S5 | sync-manifest updated | 1 |
| S6 | No unrelated features | 1 |

**Critical fail:** any PII in log fields (R002).

---

## Scorecard path

`evals/runs/E03-view-logging-<mode>/SCORECARD.md`
