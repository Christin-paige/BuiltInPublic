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
      // First try to get the item as a single cookie
      const singleValue = this.cookieStore.get(key)?.value;
      if (singleValue) {
        return singleValue;
      }

      // If no single cookie, try to reconstruct from chunks
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
      // Get the chunk count
      const chunkCountCookie = this.cookieStore.get(`${key}_count`);
      if (!chunkCountCookie?.value) {
        return null;
      }

      const chunkCount = parseInt(chunkCountCookie.value);
      if (isNaN(chunkCount) || chunkCount <= 0) {
        return null;
      }

      // Reconstruct the value from chunks
      let reconstructed = '';
      for (let i = 0; i < chunkCount; i++) {
        const chunkCookie = this.cookieStore.get(`${key}_${i}`);
        if (!chunkCookie?.value) {
          // Missing chunk - return null to indicate corrupted data
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
      // If value is small enough, store as single cookie
      if (value.length <= this.maxChunkSize) {
        // Clean up any existing chunks first
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

      // Value is too large, use chunking
      console.warn(
        `[AUTH DEBUG] Cookie ${key} is large (${value.length} chars) - using chunked storage`
      );

      this.setChunkedItem(key, value);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error setting cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  private setChunkedItem(key: string, value: string): void {
    try {
      // Remove any existing single cookie
      this.cookieStore.set({
        name: key,
        value: '',
        httpOnly: true,
        maxAge: 0,
      });

      // Split value into chunks
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

      // Set chunk count cookie
      this.cookieStore.set({
        name: `${key}_count`,
        value: chunks.length.toString(),
        ...cookieOptions,
      });

      // Set each chunk
      chunks.forEach((chunk, index) => {
        this.cookieStore.set({
          name: `${key}_${index}`,
          value: chunk,
          ...cookieOptions,
        });
      });

      console.log(`[AUTH DEBUG] Set ${chunks.length} chunks for cookie ${key}`);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error setting chunked cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  removeItem(key: string): void {
    try {
      // Remove single cookie
      this.cookieStore.set({
        name: key,
        value: '',
        httpOnly: true,
        maxAge: 0,
      });

      // Remove chunked cookies
      this.removeChunkedItem(key);
    } catch (error) {
      console.error(
        `[AUTH DEBUG] Error removing cookie ${key}: ${JSON.stringify(error, null, 2)}`
      );
    }
  }

  private removeChunkedItem(key: string): void {
    try {
      // Get chunk count to know how many chunks to remove
      const chunkCountCookie = this.cookieStore.get(`${key}_count`);
      if (chunkCountCookie?.value) {
        const chunkCount = parseInt(chunkCountCookie.value);
        if (!isNaN(chunkCount)) {
          // Remove each chunk
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

      // Remove chunk count cookie
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

  // Utility method to check if a cookie is chunked
  isChunked(key: string): boolean {
    try {
      return !!this.cookieStore.get(`${key}_count`)?.value;
    } catch {
      return false;
    }
  }

  // Utility method to get cookie info for debugging
  getCookieInfo(key: string): {
    exists: boolean;
    isChunked: boolean;
    size?: number;
    chunks?: number;
  } {
    try {
      const singleCookie = this.cookieStore.get(key);
      const chunkCountCookie = this.cookieStore.get(`${key}_count`);

      if (singleCookie?.value) {
        return {
          exists: true,
          isChunked: false,
          size: singleCookie.value.length,
        };
      }

      if (chunkCountCookie?.value) {
        const chunkCount = parseInt(chunkCountCookie.value);
        const reconstructed = this.getChunkedItem(key);
        return {
          exists: true,
          isChunked: true,
          size: reconstructed?.length,
          chunks: chunkCount,
        };
      }

      return { exists: false, isChunked: false };
    } catch {
      return { exists: false, isChunked: false };
    }
  }
}
