# Agent instructions

This repo is **Harbor** (mock bookmarks API) managed with **Spec-Driven Development (SDD)**.

1. Read [`.context/project.json`](.context/project.json) → **`agent_context.mode`**
2. Follow [`.context/AGENT.md`](.context/AGENT.md) for that mode
3. For evals, use prompts in [`evals/tasks/`](evals/tasks/) — rebuild session context per feature

| Mode | Behavior |
| :--- | :--- |
| **`full`** | Broad `.context/` load; checklist optional |
| **`layered`** (Harbor default) | L0→L3 + Context Checklist + `task_routes` |

| Need | File |
| :--- | :--- |
| Eval tasks | `evals/README.md` |
| Mode switch | `.context/project.json` → `agent_context.mode` |
| Rules | `.context/domain/rules.yaml` |
| App code | `src/` |
