/**
 * Runtime config — env contracts live in `.context/domain/fields.yaml`.
 */

export type AppConfig = {
  appEnv: "development" | "staging" | "production";
  port: number;
  databaseUrl: string;
  logLevel: "debug" | "info" | "warn" | "error";
  sessionSecret: string;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const appEnv = (env.APP_ENV ?? "development") as AppConfig["appEnv"];
  return {
    appEnv,
    port: Number(env.PORT ?? 3000),
    databaseUrl: env.DATABASE_URL ?? "postgres://localhost:5432/harbor",
    logLevel: (env.LOG_LEVEL ?? "info") as AppConfig["logLevel"],
    sessionSecret: env.SESSION_SECRET ?? "dev-only-change-me",
  };
}
