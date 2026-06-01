export const API     = import.meta.env.VITE_API_URL;
export const token   = () => sessionStorage.getItem('admin_token');
export const authHdr = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token()}`,
});

// No-op — cache removed, kept to avoid import errors
export function invalidatePortfolioCache() {}