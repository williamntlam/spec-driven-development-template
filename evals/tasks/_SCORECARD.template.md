# Scorecard — {{TASK_ID}} / {{MODE}}

| Field | Value |
| :--- | :--- |
| **Task** | `{{TASK_ID}}` |
| **Mode** | `full` \| `layered` |
| **Agent / model** | |
| **Date** | |
| **Overall (0–10)** | |

---

## 1. Context selection (0–10)

Gold **must read** (from task):

- [ ] …

Cited / actually used:

- …

Missed gold files:

- …

Irrelevant heavy reads (noise):

- …

**Score:** `/10`  
**Notes:**

---

## 2. Invariant adherence (0–10)

| Rule | Pass? | Evidence |
| :--- | :--- | :--- |
| R001 undocumented secrets | ☐ | |
| R002 no PII in logs | ☐ | |
| R003 auth on mutating APIs | ☐ | |
| R004 spec before schema | ☐ | |
| R005 glossary naming | ☐ | |
| R006 bookmarks private default | ☐ | |

**Score:** `/10`

---

## 3. Rubric criteria (from task)

| Criterion | Pass? | Evidence |
| :--- | :--- | :--- |
| … | ☐ | |

**Score:** `/10`

---

## 4. Sync discipline (0–10)

- [ ] Spec created/updated if required
- [ ] `fields.yaml` / `SCHEMA.md` updated if schema changed
- [ ] `sync-manifest.yaml` updated if spec added
- [ ] Checklist rebuilt for this feature only (layered)

**Score:** `/10`

---

## Totals

| Axis | Score |
| :--- | ---: |
| Context selection | /10 |
| Invariants | /10 |
| Rubric | /10 |
| Sync | /10 |
| **Average** | /10 |

## Verdict

- [ ] Pass (≥ 7 average and no critical rule fail)
- [ ] Fail

## What would improve context next time?
