# Harbor Codebase Patterns

## Layout

```text
src/
  server.ts           # HTTP router
  config.ts           # env → config
  lib/db.ts           # data access (in-memory stand-in)
  lib/auth.ts         # sessions
  lib/log.ts          # structured logs
  routes/*.ts         # handlers
```

## Rules of the road

- Keep handlers thin; mutate data through `db.*` helpers.
- Mutating bookmark routes must call `requireUser`.
- Log with `log(level, message, fields)` — never put `email` or raw tokens in fields.
- New env vars → `.context/domain/fields.yaml` first.
- New durable columns → spec + `fields.yaml` + `SCHEMA.md` + `db.ts` types together.
- Prefer named exports; match glossary terms (`Bookmark`, not `Link`).

## Testing expectation for evals

- After an eval task, types in `src/lib/db.ts` should match `fields.yaml`.
- API payloads should match declared `payloads` in `fields.yaml` when extended.
