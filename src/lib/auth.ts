import type { IncomingMessage } from "node:http";
import { db } from "./db.ts";

/** Toy session map: token → user_id. Not production-safe. */
const sessions = new Map<string, string>();

export function createSession(userId: string): string {
  const token = `sess_${Math.random().toString(36).slice(2)}`;
  sessions.set(token, userId);
  return token;
}

export function userIdFromRequest(req: IncomingMessage): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return sessions.get(token) ?? null;
}

export function requireUser(req: IncomingMessage) {
  const userId = userIdFromRequest(req);
  if (!userId) return null;
  return db.users.get(userId) ?? null;
}
