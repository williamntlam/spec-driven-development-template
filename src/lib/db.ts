/**
 * In-memory stand-in for Postgres. Specs/schema still describe durable tables.
 * Eval tasks may extend this store — keep field names aligned with `.context/domain/fields.yaml`.
 */

export type User = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  url: string;
  title: string;
  created_at: string;
  updated_at: string;
};

const users = new Map<string, User>();
const bookmarks = new Map<string, Bookmark>();

export const db = {
  users: {
    get: (id: string) => users.get(id),
    findByEmail: (email: string) =>
      [...users.values()].find((u) => u.email === email),
    upsert: (user: User) => {
      users.set(user.id, user);
      return user;
    },
  },
  bookmarks: {
    get: (id: string) => bookmarks.get(id),
    listByUser: (userId: string) =>
      [...bookmarks.values()].filter((b) => b.user_id === userId),
    upsert: (bookmark: Bookmark) => {
      bookmarks.set(bookmark.id, bookmark);
      return bookmark;
    },
    delete: (id: string) => bookmarks.delete(id),
  },
  _resetForTests() {
    users.clear();
    bookmarks.clear();
  },
};
