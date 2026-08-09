# Harbor context-quality evals (agent-runnable)

These evals measure whether an LLM **uses `.context/` well** while changing the Harbor mock app.

No Python harness. **You** (or Cursor / Claude Code) are the runner.

---

## Setup

1. Open this repo in Cursor or Claude Code.
2. Confirm `.context/project.json` → `agent_context.mode` matches the task (or change it).
3. For each new task, start from a clean session checklist:
   - Reset `.context/session/CONTEXT_CHECKLIST.md` from `session/_templates/CONTEXT_CHECKLIST.md`
   - Or tell the agent: *rebuild session context for feature \<slug\>*

---

## Run one task

1. Open `evals/tasks/0X-....md`
2. Copy the **Agent prompt** block into a **new** chat
3. Let the agent work (spec and/or code)
4. Copy `evals/tasks/_SCORECARD.template.md` → `evals/runs/<task-id>/SCORECARD.md`
5. Grade with the task rubric (honestly — include misses)

Optional: after the run, ask a second agent (or the same one in a new chat):

> Grade the changes for task `evals/tasks/0X-....md` using its rubric. Write `evals/runs/<task-id>/SCORECARD.md`. Cite evidence (paths + line-level behavior).

---

## What “good context” means here

| Signal | Good | Bad |
| :--- | :--- | :--- |
| Context selection | Reads gold files for the task | Skips `rules.yaml` / invents schema |
| Invariants | Honors R001–R006 | Logs email, public mutate without auth |
| Sync | Updates fields/SCHEMA/spec/manifest | Code-only drift |
| Naming | `Bookmark` / `User` per glossary | Random synonyms |

---

## Tasks

| ID | File | Stresses |
| :--- | :--- | :--- |
| E01 | `tasks/E01-bookmark-notes.md` | Schema + fields + spec discipline |
| E02 | `tasks/E02-share-link.md` | Auth / privacy rules (R003, R006) |
| E03 | `tasks/E03-view-logging.md` | PII / observability (R002) |

---

## Modes

Run the same task twice if you want a comparison:

1. `agent_context.mode: full`
2. `agent_context.mode: layered`

Keep scorecards separate: `evals/runs/E01-full/` vs `evals/runs/E01-layered/`.
