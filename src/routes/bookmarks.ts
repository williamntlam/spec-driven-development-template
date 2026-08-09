import type { IncomingMessage, ServerResponse } from "node:http";
import { requireUser } from "../lib/auth.ts";
import { db, type Bookmark } from "../lib/db.ts";
import { log } from "../lib/log.ts";
import { readJson, sendJson } from "./http.ts";

function now() {
  return new Date().toISOString();
}

/** GET /api/v1/bookmarks */
export async function listBookmarks(req: IncomingMessage, res: ServerResponse) {
  const user = requireUser(req);
  if (!user) return sendJson(res, 401, { error: "auth_required" });

  const items = db.bookmarks.listByUser(user.id);
  log("info", "bookmarks_listed", { user_id: user.id, count: items.length });
  return sendJson(res, 200, { items });
}

/** POST /api/v1/bookmarks  Body: { url, title } */
export async function createBookmark(req: IncomingMessage, res: ServerResponse) {
  const user = requireUser(req);
  if (!user) return sendJson(res, 401, { error: "auth_required" });

  const body = (await readJson(req)) as { url?: string; title?: string };
  if (!body.url || !body.title) {
    return sendJson(res, 400, { error: "url_and_title_required" });
  }

  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    user_id: user.id,
    url: body.url,
    title: body.title,
    created_at: now(),
    updated_at: now(),
  };
  db.bookmarks.upsert(bookmark);
  log("info", "bookmark_created", { user_id: user.id, bookmark_id: bookmark.id });
  return sendJson(res, 201, { bookmark });
}

/** DELETE /api/v1/bookmarks/:id */
export async function deleteBookmark(
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) {
  const user = requireUser(req);
  if (!user) return sendJson(res, 401, { error: "auth_required" });

  const existing = db.bookmarks.get(id);
  if (!existing || existing.user_id !== user.id) {
    return sendJson(res, 404, { error: "not_found" });
  }
  db.bookmarks.delete(id);
  log("info", "bookmark_deleted", { user_id: user.id, bookmark_id: id });
  return sendJson(res, 204, null);
}

/**
 * INTENTIONAL GAPS for eval tasks:
 * - No `notes` field on bookmarks
 * - No public share links
 * - No view/analytics endpoint
 */
