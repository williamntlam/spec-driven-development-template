# Active Working Context

| Attribute | Value |
| :--- | :--- |
| **Last Updated** | `2026-08-08` |
| **Product** | Harbor (mock bookmarks API) |
| **Active Sprint** | `eval-ready` |
| **agent_context.mode** | See `.context/project.json` (default `layered`) |

---

## Current Focus

- Harbor mock is ready for **agent-runnable context evals** in `/evals`.
- Intentional product gaps: bookmark `notes`, share links, view analytics.

---

## How to run an eval

1. Open a task in `evals/tasks/`.
2. Paste the **Agent prompt** into Cursor / Claude Code.
3. When finished, fill `evals/runs/<task-id>/SCORECARD.md` from the template in the task.

---

## Session Notes

- Rebuild checklist/session focus when starting each new eval task (do not reuse prior task routes).
- Domain contracts in `.context/domain/` are durable across tasks.
