import { NextResponse } from 'next/server';

/**
 * API Response helpers for optimized performance and caching
 */

export interface ApiResponseOptions {
  status?: number;
  cache?: {
    maxAge?: number; // in seconds
    swr?: number; // stale-while-revalidate in seconds
    public?: boolean;
  };
  etag?: boolean;
}

/**
 * Create an optimized JSON response with caching headers
 * @param data - Response data
 * @param options - Response options
 */
export function apiResponse<T>(data: T, options: ApiResponseOptions = {}): NextResponse {
  const { status = 200, cache, etag = false } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add cache control headers
  if (cache) {
    const { maxAge = 0, swr = 0, public: isPublic = true } = cache;
    const cacheControl = [
      isPublic ? 'public' : 'private',
      `max-age=${maxAge}`,
      swr > 0 ? `stale-while-revalidate=${swr}` : null,
    ]
      .filter(Boolean)
      .join(', ');

    headers['Cache-Control'] = cacheControl;
  } else {
    // Default: no cache for API responses
    headers['Cache-Control'] = 'no-store, must-revalidate';
  }

  // Generate ETag if requested
  if (etag && data) {
    const hash = generateSimpleHash(JSON.stringify(data));
    headers['ETag'] = `"${hash}"`;
  }

  return NextResponse.json(data, { status, headers });
}

/**
 * Create a cached response for public, rarely-changing data
 * Cache for 5 minutes with 30 seconds stale-while-revalidate
 */
export function cachedApiResponse<T>(data: T, maxAge: number = 300): NextResponse {
  return apiResponse(data, {
    cache: {
      maxAge,
      swr: 30,
      public: true,
    },
    etag: true,
  });
}

/**
 * Create an error response with consistent format
 */
export function apiError(message: string, status: number = 500): NextResponse {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

/**
 * Simple hash function for ETags
 * Not cryptographic - just for cache validation
 */
function generateSimpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Performance timing decorator for API routes
 * Adds X-Response-Time header to track performance
 */
export function withTiming<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    const start = Date.now();
    const response = await handler(...args);
    const duration = Date.now() - start;

    // Add performance header
    response.headers.set('X-Response-Time', `${duration}ms`);

    return response;
  }) as T;
}

/**
 * Rate limiting state (in-memory)
 * For production, use Redis or a distributed cache
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

/**
 * Simple rate limiter for API routes
 * @param key - Rate limit key (e.g., IP address or user ID)
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if rate limit exceeded
 */
export function isRateLimited(
  key: string,
  limit: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    // First request or window expired
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  // Increment counter
  record.count++;
  return false;
}

/**
 * Rate limit error response
 */
export function rateLimitError(retryAfter: number = 60): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests, please try again later' },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
      },
    }
  );
}

/**
 * Clean up expired rate limit records
 */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // Cleanup every minute
}
