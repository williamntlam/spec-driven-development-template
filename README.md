# Spec-Driven Development Template

Language-agnostic repository template for **Spec-Driven Development (SDD)** `2.0.0`.

Specifications in `.context/` are the single source of truth for engineers and AI coding agents (Cursor, Claude Code, Copilot, and others). Narrative docs explain *why*; declarative YAML/JSON contracts define *what*.

---

## Why SDD?

Scattered requirements in tickets and chat drift from the codebase. SDD embeds live, machine-parsable specs in the repo so humans and agents share one contract.

### Principles

1. **Dual representation** — `.md` for rationale; `.yaml` / `.json` for enforceable contracts.
2. **Selectable context loading** — `agent_context.mode` in `project.json`: `full` (load broadly) or `layered` (L0→L3 + checklist).
3. **Atomic incremental evolution** — numbered specs (`001-topic`, `002-topic`) stay auditable.

---

## Quick start

### Option A — GitHub template

1. Push this repo to GitHub and enable **Template repository** (Settings → General).
2. Click **Use this template** to create a new project.
3. Customize placeholders (see [Bootstrap checklist](#bootstrap-checklist)).

### Option B — Copy into an existing repo

```bash
# From your project root
cp -R path/to/spec-driven-development-template/.context .context
cp path/to/spec-driven-development-template/.cursorrules .cursorrules
cp path/to/spec-driven-development-template/.clauderc .clauderc
cp path/to/spec-driven-development-template/AGENTS.md AGENTS.md
```

Then complete the bootstrap checklist.

---

## How agents find information

Agents read `.context/project.json` → **`agent_context.mode`** first, then follow that playbook in [`.context/AGENT.md`](.context/AGENT.md).

### Context mode switch

```json
// .context/project.json
"agent_context": {
  "mode": "full"      // or "layered"
}
```

| Mode | When to use | Behavior |
| :--- | :--- | :--- |
| **`full`** (template default) | Small `.context/`, speed, less ceremony | Load as much durable context as practical. No L0–L3 gates. Checklist optional. |
| **`layered`** | Growing specs/schema; tighter token control | L0→L3 + Context Checklist + `task_routes` before drafting |

### `full` mode (brief)

Read session + rules + schema/fields/glossary + patterns (+ design/sentry/platform as needed) + active specs. Draft freely; still honor `rules.yaml` and sync contracts after changes.

### `layered` mode (brief)

```text
L0 + L1 → Context Checklist → load includes (+ L2) → draft spec | prompt | code
```

| Layer | Policy |
| :--- | :--- |
| **L0** | `AGENT.md`, `project.json`, `sync-manifest.yaml` |
| **L1** | `session/context.md` (+ checklist when intake applies) |
| **L2** | `domain/rules.yaml` + relevant active specs |
| **L3** | Checklist includes / matched `task_routes` only |

Checklist: [`.context/session/CONTEXT_CHECKLIST.md`](.context/session/CONTEXT_CHECKLIST.md)  
Router: [`.context/sync-manifest.yaml`](.context/sync-manifest.yaml)

### Conflict resolution (both modes)

1. `domain/rules.yaml`
2. Active feature `spec.yaml` / `spec.md`
3. `domain/SCHEMA.md` + `domain/fields.yaml`
4. `engineering/PATTERNS.md`
5. `session/context.md` (focus only — never overrides contracts)

---

## Repository topology

Organized by **access pattern** (when/why you read a file), not by file format:

```text
.
├── .context/
│   ├── AGENT.md                 # L0 — AI operating directives
│   ├── project.json             # L0 — metadata, stack, schema version
│   ├── sync-manifest.yaml       # L0 — index + task router
│   ├── session/                 # L1 — high-churn working state
│   │   ├── context.md           # Active sprint / session briefing
│   │   ├── inbox.md             # Ideas, debt, PR triage
│   │   ├── CONTEXT_CHECKLIST.md      # Current relevance decision (intake)
│   │   └── _templates/
│   │       └── CONTEXT_CHECKLIST.md  # Checklist template
│   ├── domain/                  # L2/L3 — durable product truth
│   │   ├── rules.yaml           # L2 — business invariants
│   │   ├── SCHEMA.md            # L3 — entities & state machines
│   │   ├── glossary.yaml        # L3 — domain terminology
│   │   └── fields.yaml          # L3 — DB columns, enums, env contracts
│   ├── engineering/             # L3 — how we build
│   │   ├── PATTERNS.md          # Codebase invariants
│   │   ├── design.md            # Design tokens & UI rules
│   │   └── sentry.md            # Observability standards
│   ├── platform/                # L3 — runtime topology & flags
│   │   ├── features.yaml        # Feature flags & rollouts
│   │   ├── dependencies.yaml    # Services & external APIs
│   │   └── connections.yaml     # Infra topology
│   └── specs/
│       ├── _templates/
│       │   ├── TEMPLATE.md
│       │   └── TEMPLATE.yaml
│       └── <NNN>-<topic>/
│           ├── spec.md
│           └── spec.yaml
├── AGENTS.md                    # Thin pointer → AGENT.md + layer map
├── .cursorrules                 # Cursor entrypoint → AGENT.md
├── .clauderc                    # Claude Code entrypoint → AGENT.md
└── README.md
```

---

## Bootstrap checklist

Replace `{{PLACEHOLDERS}}` and starter examples before product work:

- [ ] Update `.context/project.json` (name, stack, owners, repository URL)
- [ ] Set `agent_context.mode` to `full` or `layered`
- [ ] Rewrite `.context/domain/glossary.yaml` with real domain terms
- [ ] Replace placeholder entities in `.context/domain/SCHEMA.md` and `.context/domain/fields.yaml`
- [ ] Adjust `.context/domain/rules.yaml` for your business invariants
- [ ] Fill `.context/platform/dependencies.yaml` and `.context/platform/connections.yaml`
- [ ] Set design tokens in `.context/engineering/design.md`
- [ ] Refresh `.context/session/context.md` for your first sprint
- [ ] Create your first spec (ask an agent: *create a spec for [topic]*)

---

## Creating a feature spec

Say *create a spec for [topic]*.

- In **`full`** mode: agent creates the numbered spec from templates and registers it.
- In **`layered`** mode: agent runs checklist intake first, then creates the spec.

Statuses: `draft` → `in_progress` → `implemented` (or `deprecated`).

---

## Tool entrypoints

| Tool | Entrypoint |
| :--- | :--- |
| Cursor | `.cursorrules` → `.context/AGENT.md` |
| Claude Code | `.clauderc` → `.context/AGENT.md` |
| Other agents | `AGENTS.md` / system prompt → `.context/AGENT.md` |

---

## After implementation

1. Update `.context/domain/fields.yaml` / `.context/domain/SCHEMA.md` if durable state changed.
2. Update platform contracts if flags, deps, or infra changed.
3. Set spec + manifest status to `implemented`.
4. Park leftovers in `.context/session/inbox.md`.
5. Refresh `.context/session/context.md` for the next session.

---

## License

MIT — see [LICENSE](./LICENSE).
