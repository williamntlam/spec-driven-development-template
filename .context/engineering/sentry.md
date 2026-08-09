# Observability & Telemetry Standards

> Logging, metrics, tracing, and error-reporting conventions.
> Applies whether you use Sentry, OpenTelemetry, Datadog, or another stack.

---

## 1. Principles

- Never log PII (emails, phone numbers, full names, payment data, tokens, passwords).
- Always include a correlation / trace identifier on API errors and structured logs.
- Prefer structured logs (JSON key/value) over free-form strings.
- Errors that affect users should be reportable to the error tracker with useful context, not full request bodies.

---

## 2. Log Levels

| Level | When to use |
| :--- | :--- |
| `error` | Operation failed; user or system impact; needs attention |
| `warn` | Unexpected but recoverable; degraded path taken |
| `info` | Significant business/system events (start, complete, state change) |
| `debug` | Detailed diagnostics; disabled or sampled in production |

---

## 3. Required Context Tags

Attach these fields when available:

| Tag | Description |
| :--- | :--- |
| `trace_id` | Distributed trace / request correlation ID |
| `request_id` | Per-request identifier if distinct from trace |
| `service` | Service or package name |
| `environment` | `development` \| `staging` \| `production` |
| `user_id_hash` | Hashed/opaque user identifier — never raw email |
| `feature` | Feature flag or spec slug when relevant |

---

## 4. Error Reporting

- Capture unexpected exceptions in the global error boundary / middleware.
- Add breadcrumbs for meaningful user/system actions, not every mouse move.
- Scrub headers such as `Authorization`, cookies, and secret query params before send.
- Group related failures with stable error codes from domain/application layers.

---

## 5. Metrics & Alerts (Starter)

| Signal | Suggestion |
| :--- | :--- |
| Request latency | Track p50 / p95 per critical endpoint |
| Error rate | Alert on sustained elevation vs baseline |
| Dependency health | Monitor DB, cache, and third-party API failures |
| Saturation | CPU, memory, queue depth as applicable |

---

## 6. Checklist for New Code

- [ ] No PII in logs or error payloads
- [ ] Trace/correlation ID propagated across service boundaries
- [ ] Failures map to clear log level and (when needed) error events
- [ ] Sensitive headers/fields scrubbed
