# Domain Schema

> Authoritative narrative definition of database entities, relationships, and state machines.
> Keep column-level contracts in `.context/domain/fields.yaml`; keep this file focused on structure and behavior.

---

## 1. Overview

Describe the core domain model for this project. Replace the placeholders below with real entities.

```text
[ EntityA ] 1──* [ EntityB ] *──1 [ EntityC ]
```

---

## 2. Entities

### Entity: `ExampleEntity`

| Attribute | Value |
| :--- | :--- |
| **Table** | `example_entities` |
| **Primary Key** | `id` (uuid) |
| **Purpose** | Placeholder entity — replace with your domain |

#### Fields

| Column | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `id` | uuid | yes | Stable identifier |
| `name` | string | yes | Display name |
| `status` | enum(`draft`, `active`, `archived`) | yes | Lifecycle state |
| `created_at` | timestamp | yes | Immutable create time |
| `updated_at` | timestamp | yes | Last mutation time |

#### Relationships

- _(none yet — document foreign keys and cardinalities here)_

---

## 3. State Machines

### `ExampleEntity.status`

```text
draft --> active --> archived
  |                    ^
  +--------------------+
```

| Transition | From | To | Guard |
| :--- | :--- | :--- | :--- |
| `publish` | `draft` | `active` | Validated payload; actor authorized |
| `archive` | `draft` \| `active` | `archived` | Soft-delete only; no hard delete |

---

## 4. Surface Models

Describe DTOs / API resource shapes that differ from raw tables (aggregates, projections, public vs internal views).

| Surface | Backed By | Notes |
| :--- | :--- | :--- |
| `ExampleResource` | `example_entities` | Public API representation |

---

## 5. Migration Notes

- Schema changes must be reflected here **and** in `.context/domain/fields.yaml`.
- Specs that mutate durable tables must declare `data_model` impacts in `spec.yaml`.
