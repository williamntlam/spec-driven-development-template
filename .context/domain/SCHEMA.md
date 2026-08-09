# Harbor Domain Schema

Column-level contracts: `.context/domain/fields.yaml`.

---

## Overview

```text
[ User ] 1──* [ Bookmark ]
```

---

## Entity: `User`

| Attribute | Value |
| :--- | :--- |
| **Table** | `users` |
| **Primary Key** | `id` (uuid) |

| Column | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `id` | uuid | yes | PK |
| `email` | string | yes | Unique; **PII** — never log |
| `password_hash` | string | yes | Never return in API responses |
| `created_at` | timestamp | yes | |

---

## Entity: `Bookmark`

| Attribute | Value |
| :--- | :--- |
| **Table** | `bookmarks` |
| **Primary Key** | `id` (uuid) |
| **Owner** | `user_id` → `users.id` |

| Column | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `id` | uuid | yes | PK |
| `user_id` | uuid | yes | FK owner |
| `url` | string | yes | Absolute URL |
| `title` | string | yes | Display title |
| `created_at` | timestamp | yes | |
| `updated_at` | timestamp | yes | |

### Not implemented (eval gaps)

- `notes` text on bookmarks
- `ShareLink` entity / public read
- view/analytics events

---

## State

Bookmarks have no lifecycle enum today — create + delete only.
