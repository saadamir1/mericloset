const KEY = "mc_recent_views";
const MAX = 12;

export type RecentItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  slug?: string;
  brand?: string;
  viewedAt: number;
};

export function getRecentViews(): RecentItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function pushRecentView(item: Omit<RecentItem, "viewedAt">) {
  const list = getRecentViews().filter((x) => x.id !== item.id);
  list.unshift({ ...item, viewedAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
}

const STYLE_KEY = "mc_style_profile";

export type StyleProfile = {
  occasions: string[];
  vibes: string[];
  budget: "value" | "mid" | "premium";
  colors: string[];
  updatedAt: number;
};

export function getStyleProfile(): StyleProfile | null {
  try {
    const raw = localStorage.getItem(STYLE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStyleProfile(profile: Omit<StyleProfile, "updatedAt">) {
  const full: StyleProfile = { ...profile, updatedAt: Date.now() };
  localStorage.setItem(STYLE_KEY, JSON.stringify(full));
  return full;
}

export function styleQueryFromProfile(p: StyleProfile): string {
  const bits = [...p.occasions, ...p.vibes, ...p.colors];
  return bits.slice(0, 4).join(" ") || "shalwar";
}
