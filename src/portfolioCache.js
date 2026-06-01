/**
 * portfolioCache.js
 * Stale-while-revalidate cache for portfolio data.
 *
 * Uses localStorage as persistent storage so data survives page reloads.
 * Falls back to in-memory cache if localStorage is blocked
 * (Edge tracking prevention, private browsing, etc.)
 *
 * TTL: 5 minutes — after that the cache is considered stale.
 * Stale data is still shown immediately while fresh data loads in background.
 */

const CACHE_KEY = 'portfolio_data';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// In-memory fallback when localStorage is unavailable
let _memoryCache = null;

/**
 * Read cached portfolio data.
 * Returns { data, stale } or null if no cache exists.
 */
export function getCached() {
  try {
    // Try localStorage first
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return _memoryCache;

    const { data, timestamp } = JSON.parse(raw);
    const age = Date.now() - timestamp;

    return { data, stale: age > CACHE_TTL };
  } catch {
    // localStorage blocked or corrupted — use memory fallback
    return _memoryCache;
  }
}

/**
 * Write portfolio data to cache.
 * Writes to both localStorage and memory fallback.
 */
export function setCache(data) {
  const entry = { data, timestamp: Date.now() };

  // Always update memory cache
  _memoryCache = { data, stale: false };

  // Try localStorage — fails silently if blocked
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage blocked (Edge tracking prevention, storage quota, etc.)
    // Memory cache still works for this session
  }
}

/**
 * Clear the cache — useful after admin updates portfolio content.
 */
export function clearCache() {
  _memoryCache = null;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // fail silently
  }
}