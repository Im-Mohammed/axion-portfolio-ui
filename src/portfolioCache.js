// src/portfolioCache.js
// Simple in-memory + localStorage cache for portfolio data
// Stale-while-revalidate pattern

const CACHE_KEY = 'portfolio_data';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    const age = Date.now() - timestamp;
    return { data, stale: age > CACHE_TTL };
  } catch {
    return null;
  }
}

export function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch {
    // localStorage blocked (Edge tracking prevention) — fail silently
  }
}