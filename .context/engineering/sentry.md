# Harbor Observability

- Never log PII (`email`, passwords, tokens, `Authorization`).
- Prefer fields: `user_id`, `bookmark_id`, `trace_id`, `route`.
- Levels: `error` / `warn` / `info` / `debug` via `src/lib/log.ts`.
- Login failures: log `reason` only, not the email attempted.
