import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export class NextJSCookieStorage {
  private cookieStore: ReadonlyRequestCookies;

  constructor(cookieStore: ReadonlyRequestCookies) {
    this.cookieStore = cookieStore;
  }

  getItem(key: string): string | null {
    try {
      const value = this.cookieStore.get(key)?.value ?? null;
      return value;
    } catch (error) {
      console.error(`[AUTH DEBUG] Error getting cookie ${key}:`, error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (value.length > 4000) {
        console.warn(
          `[AUTH DEBUG] Cookie ${key} is very large (${value.length} chars) - may exceed browser limits`
        );
      }

      const cookieOptions = {
        name: key,
        value: value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      };

      this.cookieStore.set(cookieOptions);
    } catch (error) {
      console.error(`[AUTH DEBUG] Error setting cookie ${key}:`, error);
    }
  }

  removeItem(key: string): void {
    try {
      this.cookieStore.set({
        name: key,
        value: '',
        httpOnly: true,
        maxAge: 0,
      });
    } catch (error) {
      console.error(`[AUTH DEBUG] Error removing cookie ${key}:`, error);
    }
  }
}
