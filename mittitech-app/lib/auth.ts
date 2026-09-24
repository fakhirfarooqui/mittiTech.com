export const AUTH_STORAGE_KEY = 'mitti_auth_session';
export const AUTH_COOKIE_KEY = 'mitti_auth';

/**
 * Returns true if the user has an active authenticated session
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    const hasCookie = document.cookie
      .split('; ')
      .some((row) => row.startsWith(`${AUTH_COOKIE_KEY}=true`));
    return session === 'true' || hasCookie;
  } catch {
    return false;
  }
}

/**
 * Sets local session and browser cookie for authentication
 */
export function loginUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    // Set cookie for 7 days
    document.cookie = `${AUTH_COOKIE_KEY}=true; path=/; max-age=604800; SameSite=Lax`;
  } catch (e) {
    console.error('Failed to set login session:', e);
  }
}

/**
 * Clears session and expires cookie
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch (e) {
    console.error('Failed to clear login session:', e);
  }
}
