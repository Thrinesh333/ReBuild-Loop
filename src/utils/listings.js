import jsonListings from '../data/materials.json';
import { loadLocalListings } from './storage';

/**
 * Returns combined listings: JSON predefined + LocalStorage user listings.
 * LocalStorage listings come first (most recent).
 */
export function getAllListings() {
  const local = loadLocalListings();
  return [...local, ...jsonListings];
}

/**
 * Search listings based on:
 *   - materialType: keyword match against name or category
 *   - requiredQuantity: available quantity must be >= required
 *   - preferredLocation: soft match (location text contains keyword)
 */
export function searchListings({ materialType = '', requiredQuantity = 0, preferredLocation = '' }) {
  const all = getAllListings();

  const typeKw = materialType.trim().toLowerCase();
  const locKw = preferredLocation.trim().toLowerCase();
  const qty = Number(requiredQuantity) || 0;

  return all.filter((listing) => {
    // Must match material type (name or category)
    if (typeKw) {
      const nameMatch = listing.name.toLowerCase().includes(typeKw);
      const catMatch = listing.category.toLowerCase().includes(typeKw);
      if (!nameMatch && !catMatch) return false;
    }

    // Must have enough quantity
    if (qty > 0 && listing.quantity < qty) return false;

    // Location preference (soft filter — only applied if provided)
    if (locKw) {
      const locMatch = listing.location.toLowerCase().includes(locKw);
      if (!locMatch) return false;
    }

    return true;
  });
}

/** Get a single listing by id across both sources */
export function getListingById(id) {
  return getAllListings().find((l) => l.id === id) || null;
}

/** Get unique categories from all listings */
export function getAllCategories() {
  const all = getAllListings();
  return [...new Set(all.map((l) => l.category))].sort();
}
