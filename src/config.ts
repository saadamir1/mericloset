/** Shared API config — never hardcode Heroku or random ports in pages. */
const rawBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") || "";

/** e.g. http://localhost:3000/api/v1 */
export const API_BASE = rawBase;

/** e.g. http://localhost:3000 — for Stripe/COD + /uploads */
export const API_ORIGIN = rawBase.replace(/\/api\/v1\/?$/i, "") || "http://localhost:3000";

export function mediaUrl(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function normalizeUser<T extends Record<string, unknown>>(user: T | null | undefined) {
  if (!user) return {} as T & { id?: string };
  const id = (user.id || user._id) as string | undefined;
  return { ...user, id, _id: (user._id || user.id) as string | undefined };
}
