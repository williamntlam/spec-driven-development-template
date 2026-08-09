# Harbor — SDD context eval playground

Mock **bookmarks API** + Spec-Driven Development `.context/` tree, built so you can evaluate context management with **Cursor or Claude Code** (real LLM runs), not a Python harness.

---

## What’s in the box

| Path | Role |
| :--- | :--- |
| `src/` | Tiny Harbor HTTP API (bookmarks + login) with intentional feature gaps |
| `.context/` | Live SDD system (domain, rules, patterns, specs templates, modes) |
| `evals/` | Agent-runnable tasks, rubrics, and scorecards |

Intentional gaps used by evals: bookmark **notes**, **share links**, **view counts**.

---

## Quick start

```bash
cp .env.example .env
# optional: node --experimental-strip-types src/server.ts
```

Open the repo in Cursor / Claude Code. Read `.context/AGENT.md` and set:

```json
// .context/project.json
"agent_context": { "mode": "layered" }   // or "full"
```

---

## Run a context-quality eval

1. Open [`evals/README.md`](evals/README.md)
2. Pick a task, e.g. [`evals/tasks/E01-bookmark-notes.md`](evals/tasks/E01-bookmark-notes.md)
3. Paste the **Agent prompt** into a **new** chat
4. Score the result into `evals/runs/<task>-<mode>/SCORECARD.md`

| Task | Stresses |
| :--- | :--- |
| E01 bookmark notes | Schema + spec discipline |
| E02 share link | Privacy / auth invariants |
| E03 view logging | PII / observability |

Compare `full` vs `layered` by changing `agent_context.mode` and keeping separate scorecards.

---

## SDD modes

| Mode | Behavior |
| :--- | :--- |
| `full` | Load broad `.context/`; checklist optional |
| `layered` | L0→L3 + Context Checklist + `task_routes` |

Details: [`.context/AGENT.md`](.context/AGENT.md).

---

## Template note

This repo is both:

1. An **SDD template** (`.context/` layout, agent entrypoints)
2. A **Harbor mock** so agents have real code + contracts to violate or respect during evals

Strip `src/` and `evals/` if you only want the blank template skeleton for a new product.

---

## License

MIT — see [LICENSE](./LICENSE).
