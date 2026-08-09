# Context Checklist

> Phase A output. Fill this **before** drafting a spec or an implementation prompt.
> Working copy: `.context/session/CONTEXT_CHECKLIST.md`.
> Do not write `spec.md` / `spec.yaml` or application code until Phase B has loaded every included path.

| Attribute | Value |
| :--- | :--- |
| **Created** | `{{YYYY-MM-DD}}` |
| **Task** | `{{ONE_LINE_TASK}}` |
| **Intended outcome** | `spec` <!-- spec \| implementation_prompt \| implementation --> |
| **Status** | `proposed` <!-- proposed \| approved \| loaded \| consumed --> |

---

## 1. Task Summary

What the user wants, in 2–4 sentences. No solution design yet.

---

## 2. Matched Routes (from `sync-manifest.yaml`)

| Route ID | Why it matches |
| :--- | :--- |
| `{{route_id}}` | `{{reason}}` |

---

## 3. Context Includes

Paths the agent will read in Phase B. Start from L0/L1/L2 mandates, then union matched L3 routes.

| Path | Layer | Why needed |
| :--- | :--- | :--- |
| `.context/AGENT.md` | L0 | Operating rules |
| `.context/project.json` | L0 | Stack / identity |
| `.context/sync-manifest.yaml` | L0 | Router |
| `.context/session/context.md` | L1 | Session focus |
| `.context/domain/rules.yaml` | L2 | Invariants |
| | | |

### Explicitly excluded

| Path | Why excluded |
| :--- | :--- |
| | |

---

## 4. Related Specs

| Spec slug | Status | Relevance |
| :--- | :--- | :--- |
| _(none)_ | — | — |

---

## 5. Open Questions

Unresolved items that would change the checklist or the draft. If any are blocking, stop and ask the user before Phase C.

- [ ] …

---

## 6. Draft Target

### If outcome = `spec`

- Proposed slug: `NNN-topic`
- Goals to capture: …
- Non-goals to capture: …

### If outcome = `implementation_prompt` or `implementation`

- Active spec slug (required if one exists): …
- Execution prompt outline (bullets the agent or human will run): …
