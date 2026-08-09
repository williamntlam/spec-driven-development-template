# Agent instructions

This repository uses **Spec-Driven Development (SDD)**.

1. Read [`.context/project.json`](.context/project.json) → **`agent_context.mode`**
2. Follow [`.context/AGENT.md`](.context/AGENT.md) for that mode

| Mode | Behavior |
| :--- | :--- |
| **`full`** (default in template) | Load as much `.context/` as practical. No L0–L3 gating. Checklist optional. |
| **`layered`** | L0→L3 + Context Checklist + `task_routes` |

Switch mode by editing `agent_context.mode` in `project.json`.

| Need | File |
| :--- | :--- |
| Mode switch | `.context/project.json` → `agent_context.mode` |
| Session focus | `.context/session/context.md` |
| Task router (layered) | `.context/sync-manifest.yaml` |
| Checklist (layered) | `.context/session/CONTEXT_CHECKLIST.md` |
| Business invariants | `.context/domain/rules.yaml` |
| Spec templates | `.context/specs/_templates/` |
