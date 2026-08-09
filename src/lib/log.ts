/**
 * Structured logger. Follow `.context/engineering/sentry.md` — never log PII.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string,
  fields: Record<string, unknown> = {},
) {
  const line = JSON.stringify({
    level,
    message,
    ...fields,
    ts: new Date().toISOString(),
  });
  // eslint-disable-next-line no-console
  console[level === "debug" ? "log" : level](line);
}
