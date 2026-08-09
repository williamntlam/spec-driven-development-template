# AI Coding Assistant Directives

You are operating inside a repository managed by **Spec-Driven Development (SDD)** (schema version `2.0.0`).

## 0. Choose context mode (required first step)

1. Read `.context/project.json`.
2. Read `agent_context.mode` (`full` or `layered`).
3. Follow **only** the matching playbook below.

| Mode | Behavior |
| :--- | :--- |
| `full` | Load as much `.context/` as practical. **No** L0–L3 gating. Checklist / `task_routes` optional. |
| `layered` | L0→L3 + optional Context Checklist intake + `task_routes` (current layered system). |

If `agent_context.mode` is missing, default to `full`.

---

## Layout

```text
.context/
├── AGENT.md              # this file
├── project.json          # identity, stack, agent_context.mode
├── sync-manifest.yaml    # index + task router (used heavily in layered mode)
├── session/              # working state (+ CONTEXT_CHECKLIST.md)
├── domain/               # durable product truth
├── engineering/          # how we build
├── platform/             # runtime topology & flags
└── specs/                # numbered feature contracts
    └── _templates/
```

---

# Playbook A — `full` mode

**Goal:** Maximize useful context. Skip layer ceremony.

### Load (in order, as far as the task needs)

1. `.context/AGENT.md` (this file) and `.context/project.json`
2. `.context/session/context.md`
3. `.context/sync-manifest.yaml` (use `global_context` + `specs_index` as a catalog of what exists)
4. Broadly read durable context when doing real work:
   - `.context/domain/rules.yaml`
   - `.context/domain/SCHEMA.md`
   - `.context/domain/fields.yaml`
   - `.context/domain/glossary.yaml`
   - `.context/engineering/PATTERNS.md`
   - `.context/engineering/design.md` (if UI)
   - `.context/engineering/sentry.md` (if logging/telemetry)
   - `.context/platform/*.yaml` (if infra/flags/deps matter)
5. Active specs in `specs_index` (`draft` / `in_progress`) that touch the task — read `spec.yaml` + `spec.md`
6. `session/inbox.md` if triage / leftovers matter

### Do not require

- Context Checklist intake before drafting
- Matching `task_routes` before reading a file
- Staying inside an include list

### Still required

- Honor `.context/domain/rules.yaml` invariants
- Prefer glossary terms and fields contracts when naming or changing durable state
- After implementation, sync fields/SCHEMA/manifest/spec status as usual

### Spec creation (`full`)

1. Inspect `.context/specs/` for highest `NNN-*` (ignore `_templates/`).
2. Create `.context/specs/<next>-<topic>/` from templates.
3. Register in `sync-manifest.yaml` → `specs_index`.
4. Checklist is optional documentation, not a gate.

---

# Playbook B — `layered` mode

**Goal:** Cheap orientation, forced invariants, routed deep dives.

**Default workflow:** decide relevance → Context Checklist → load includes → draft.

## Intake Protocol (Relevance → Checklist → Draft)

Use for **new specs**, **implementation prompts**, and non-trivial implementation.

### Phase A — Relevance (no drafting)

1. Read L0: `AGENT.md`, `project.json`, `sync-manifest.yaml`.
2. Read L1: `session/context.md` (and `inbox.md` if triage).
3. Match `task_routes` in the manifest.
4. Write `.context/session/CONTEXT_CHECKLIST.md` from `_templates/CONTEXT_CHECKLIST.md`.
5. Stop after the checklist if the user asked for intake only, or questions are blocking.

### Phase B — Load

1. Read every **Context Includes** path.
2. For code/contracts: also `domain/rules.yaml` + relevant active specs.
3. Set checklist status to `loaded`.

### Phase C — Draft

| Outcome | Action |
| :--- | :--- |
| `spec` | Specification Creation Protocol |
| `implementation_prompt` | Execution prompt from loaded checklist + specs |
| `implementation` | Implement against loaded checklist + specs |

## Layers (L0 → L3)

### L0 — Entrypoint (always)

1. `.context/AGENT.md`
2. `.context/project.json`
3. `.context/sync-manifest.yaml`

### L1 — Session (always)

1. `.context/session/context.md`
2. `.context/session/CONTEXT_CHECKLIST.md` when intake applies
3. `.context/session/inbox.md` when triage applies

### L2 — Invariants (code / contract changes)

1. `.context/domain/rules.yaml`
2. Relevant active specs (`draft` \| `in_progress`)

### L3 — Routed

Only checklist includes / matched `task_routes`. Do not preload the whole tree.

## Decision Rule (`layered`)

```text
L0 + L1
  → Phase A: Context Checklist
    → Phase B: load includes (+ L2)
      → Phase C: spec | prompt | implementation
```

### Spec creation (`layered`)

1. Complete Intake A–B first.
2. Create numbered spec from templates; register in `specs_index`.
3. Mark checklist `consumed` when done.

### Implementation (`layered`)

1. Prefer `spec.yaml` for contracts; `spec.md` for rationale.
2. Never bypass `domain/rules.yaml`.
3. Stay inside the loaded checklist unless you expand and reload it.
4. Set spec status `in_progress` when coding starts.

---

# Shared rules (both modes)

## Post-Implementation Synchronization

1. New env vars / DB columns → `.context/domain/fields.yaml`
2. Entity / relationship changes → `.context/domain/SCHEMA.md`
3. Feature flags → `.context/platform/features.yaml`
4. Dependencies / infra → `.context/platform/dependencies.yaml` and/or `connections.yaml`
5. Spec status → `implemented` in `spec.yaml` and `specs_index`
6. Leftovers → `.context/session/inbox.md`
7. Refresh `.context/session/context.md`
8. Reset `.context/session/CONTEXT_CHECKLIST.md` when used

## File Creation & Change Discipline

- Do not invent parallel docs outside `.context/` when an existing file owns the concern.
- Prefer updating a numbered spec over scattering requirements in chat or tickets.
- Keep narrative (`.md`) and declarative (`.yaml` / `.json`) layers aligned.
- Code conforms to specs — not the reverse — unless an intentional spec change is requested.

## Conflict Resolution Order

1. `.context/domain/rules.yaml`
2. Active feature `spec.yaml` / `spec.md`
3. `.context/domain/SCHEMA.md` + `.context/domain/fields.yaml`
4. `.context/engineering/PATTERNS.md`
5. `.context/session/context.md` (focus only; never overrides contracts)
