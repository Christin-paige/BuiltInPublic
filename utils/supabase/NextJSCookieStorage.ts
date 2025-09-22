import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export class NextJSCookieStorage {
  private cookieStore: ReadonlyRequestCookies;
  private maxChunkSize: number;

  constructor(
    cookieStore: ReadonlyRequestCookies,
    maxChunkSize: number = 3000
  ) {
    this.cookieStore = cookieStore;
    this.maxChunkSize = maxChunkSize; // Leave buffer under 4096 limit
  }

  getItem(key: string): string | null {
    try {
      const singleValue = this.cookieStore.get(key)?.value;
      if (singleValue) {
        return singleValue;
      }

      return this.getChunkedItem(key);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error getting cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
      return null;
    }
  }

  private getChunkedItem(key: string): string | null {
    try {
      const chunkCountCookie = this.cookieStore.get(`${key}_count`);
      if (!chunkCountCookie?.value) {
        return null;
      }

      const chunkCount = parseInt(chunkCountCookie.value);
      if (isNaN(chunkCount) || chunkCount <= 0) {
        return null;
      }

      let reconstructed = '';
      for (let i = 0; i < chunkCount; i++) {
        const chunkCookie = this.cookieStore.get(`${key}_${i}`);
        if (!chunkCookie?.value) {
          console.warn(`[AUTH DEBUG] Missing chunk ${i} for cookie ${key}`);
          return null;
        }
        reconstructed += chunkCookie.value;
      }

      return reconstructed;
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error reconstructing chunked cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (value.length <= this.maxChunkSize) {
        // clean up any existing chunks first
        this.removeChunkedItem(key);

        const cookieOptions = {
          name: key,
          value: value,
          httpOnly: true,
          secure: true,
          sameSite: 'none' as const,
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        };
        this.cookieStore.set(cookieOptions);
        return;
      }

      this.setChunkedItem(key, value);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error setting cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  private setChunkedItem(key: string, value: string): void {
    try {
      // remove any existing single cookie
      this.cookieStore.set({
        name: key,
        value: '',
        httpOnly: true,
        maxAge: 0,
      });

      const chunks: string[] = [];
      for (let i = 0; i < value.length; i += this.maxChunkSize) {
        chunks.push(value.slice(i, i + this.maxChunkSize));
      }

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      };

      this.cookieStore.set({
        name: `${key}_count`,
        value: chunks.length.toString(),
        ...cookieOptions,
      });

      chunks.forEach((chunk, index) => {
        this.cookieStore.set({
          name: `${key}_${index}`,
          value: chunk,
          ...cookieOptions,
        });
      });
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error setting chunked cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
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

      this.removeChunkedItem(key);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error removing cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  private removeChunkedItem(key: string): void {
    try {
      const chunkCountCookie = this.cookieStore.get(`${key}_count`);
      if (chunkCountCookie?.value) {
        const chunkCount = parseInt(chunkCountCookie.value);

        if (!isNaN(chunkCount)) {
          for (let i = 0; i < chunkCount; i++) {
            this.cookieStore.set({
              name: `${key}_${i}`,
              value: '',
              httpOnly: true,
              maxAge: 0,
            });
          }
        }
      }

      this.cookieStore.set({
        name: `${key}_count`,
        value: '',
        httpOnly: true,
        maxAge: 0,
      });
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error removing chunked cookies for ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  isChunked(key: string): boolean {
    try {
      return !!this.cookieStore.get(`${key}_count`)?.value;
    } catch {
      return false;
    }
  }
}
