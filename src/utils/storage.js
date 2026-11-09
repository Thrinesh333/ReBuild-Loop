// LocalStorage key constants
const LISTINGS_KEY = 'rebuild_loop_listings';
const SEARCH_KEY = 'rebuild_loop_searches';

/** Load user-published listings from LocalStorage */
export function loadLocalListings() {
  try {
    const raw = localStorage.getItem(LISTINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** Save a new listing to LocalStorage */
export function saveLocalListing(listing) {
  const existing = loadLocalListings();
  // Prevent duplicate IDs
  const filtered = existing.filter((l) => l.id !== listing.id);
  const updated = [listing, ...filtered];
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
}

/** Delete a listing from LocalStorage by id */
export function deleteLocalListing(id) {
  const existing = loadLocalListings();
  const updated = existing.filter((l) => l.id !== id);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
}

/** Save a buyer search query */
export function saveSearch(query) {
  try {
    const raw = localStorage.getItem(SEARCH_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [{ ...query, searchedAt: new Date().toISOString() }, ...existing].slice(0, 20);
    localStorage.setItem(SEARCH_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/** Generate a unique listing ID */
export function generateId() {
  return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}
