import type { IncomingMessage, ServerResponse } from "node:http";
import { createSession } from "../lib/auth.ts";
import { db } from "../lib/db.ts";
import { log } from "../lib/log.ts";
import { readJson, sendJson } from "./http.ts";

/**
 * POST /api/v1/auth/login
 * Body: { email, password }
 *
 * GAP (intentional for evals): no rate limiting, plaintext password compare toy.
 */
export async function loginHandler(req: IncomingMessage, res: ServerResponse) {
  const body = (await readJson(req)) as { email?: string; password?: string };
  if (!body.email || !body.password) {
    return sendJson(res, 400, { error: "email_and_password_required" });
  }

  const user = db.users.findByEmail(body.email);
  if (!user || user.password_hash !== `hash:${body.password}`) {
    log("warn", "login_failed", { reason: "invalid_credentials" });
    return sendJson(res, 401, { error: "invalid_credentials" });
  }

  const token = createSession(user.id);
  log("info", "login_ok", { user_id: user.id });
  return sendJson(res, 200, { token, user: { id: user.id, email: user.email } });
}
