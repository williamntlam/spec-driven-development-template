import http from "node:http";
import { loadConfig } from "./config.ts";
import { db } from "./lib/db.ts";
import { log } from "./lib/log.ts";
import { loginHandler } from "./routes/auth.ts";
import {
  createBookmark,
  deleteBookmark,
  listBookmarks,
} from "./routes/bookmarks.ts";
import { sendJson } from "./routes/http.ts";

function seed() {
  db.users.upsert({
    id: "11111111-1111-1111-1111-111111111111",
    email: "demo@harbor.local",
    password_hash: "hash:password",
    created_at: new Date().toISOString(),
  });
}

const config = loadConfig();
seed();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const { pathname } = url;
  const method = req.method ?? "GET";

  try {
    if (method === "GET" && pathname === "/health") {
      return sendJson(res, 200, { ok: true, service: "harbor" });
    }
    if (method === "POST" && pathname === "/api/v1/auth/login") {
      return await loginHandler(req, res);
    }
    if (method === "GET" && pathname === "/api/v1/bookmarks") {
      return await listBookmarks(req, res);
    }
    if (method === "POST" && pathname === "/api/v1/bookmarks") {
      return await createBookmark(req, res);
    }
    const del = pathname.match(/^\/api\/v1\/bookmarks\/([^/]+)$/);
    if (method === "DELETE" && del) {
      return await deleteBookmark(req, res, del[1]);
    }
    return sendJson(res, 404, { error: "not_found" });
  } catch (err) {
    log("error", "unhandled", {
      err: err instanceof Error ? err.message : String(err),
    });
    return sendJson(res, 500, { error: "internal_error" });
  }
});

server.listen(config.port, () => {
  log("info", "harbor_listening", { port: config.port, env: config.appEnv });
});
