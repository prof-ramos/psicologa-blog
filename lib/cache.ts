/**
 * In-memory caching utility for API responses
 * Optimizes performance by reducing database queries for frequently accessed data
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Set a value in cache with TTL (Time To Live)
   * @param key - Cache key
   * @param data - Data to cache
   * @param ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Get a value from cache if not expired
   * @param key - Cache key
   * @returns Cached data or null if expired/not found
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    const age = now - entry.timestamp;

    // Check if cache entry has expired
    if (age > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if a key exists and is not expired
   * @param key - Cache key
   * @returns true if key exists and not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Invalidate cache entries by key or pattern
   * @param keyOrPattern - Exact key or pattern to match (use * for wildcard)
   */
  invalidate(keyOrPattern: string): void {
    if (keyOrPattern.includes('*')) {
      // Pattern matching for wildcard invalidation
      const pattern = keyOrPattern.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);

      const keysToDelete: string[] = [];
      this.cache.forEach((_, key) => {
        if (regex.test(key)) {
          keysToDelete.push(key);
        }
      });

      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      // Exact key match
      this.cache.delete(keyOrPattern);
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Remove expired entries (garbage collection)
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      const age = now - entry.timestamp;
      if (age > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

// Singleton instance
export const cache = new MemoryCache();

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cache.cleanup(), 10 * 60 * 1000);
}

/**
 * Cache key generators for consistent naming
 */
export const CacheKeys = {
  allPosts: () => 'posts:all',
  publishedPosts: () => 'posts:published',
  postBySlug: (slug: string) => `post:slug:${slug}`,
  postById: (id: string) => `post:id:${id}`,
  postsByCategory: (category: string) => `posts:category:${category}`,
  featuredPosts: () => 'posts:featured',
} as const;

/**
 * Cache TTL configurations (in milliseconds)
 */
export const CacheTTL = {
  SHORT: 1 * 60 * 1000,      // 1 minute
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 15 * 60 * 1000,      // 15 minutes
  HOUR: 60 * 60 * 1000,      // 1 hour
} as const;
