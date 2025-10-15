/**
 * Performance monitoring and metrics collection
 * Tracks API response times, cache hit rates, and database query performance
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface MetricsSummary {
  totalRequests: number;
  avgResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  cacheHitRate: number;
  errorRate: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 1000; // Keep last 1000 metrics
  private cacheHits = 0;
  private cacheMisses = 0;
  private errors = 0;

  /**
   * Record a performance metric
   */
  recordMetric(name: string, duration: number, metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  /**
   * Record cache hit
   */
  recordCacheHit(): void {
    this.cacheHits++;
  }

  /**
   * Record cache miss
   */
  recordCacheMiss(): void {
    this.cacheMisses++;
  }

  /**
   * Record error
   */
  recordError(): void {
    this.errors++;
  }

  /**
   * Get metrics summary
   */
  getSummary(metricName?: string): MetricsSummary {
    const filteredMetrics = metricName
      ? this.metrics.filter((m) => m.name === metricName)
      : this.metrics;

    if (filteredMetrics.length === 0) {
      return {
        totalRequests: 0,
        avgResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0,
        p50ResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
      };
    }

    const durations = filteredMetrics.map((m) => m.duration).sort((a, b) => a - b);
    const sum = durations.reduce((acc, d) => acc + d, 0);
    const totalCacheRequests = this.cacheHits + this.cacheMisses;
    const totalRequests = filteredMetrics.length;

    return {
      totalRequests,
      avgResponseTime: sum / durations.length,
      minResponseTime: durations[0],
      maxResponseTime: durations[durations.length - 1],
      p50ResponseTime: this.percentile(durations, 50),
      p95ResponseTime: this.percentile(durations, 95),
      p99ResponseTime: this.percentile(durations, 99),
      cacheHitRate: totalCacheRequests > 0 ? (this.cacheHits / totalCacheRequests) * 100 : 0,
      errorRate: totalRequests > 0 ? (this.errors / totalRequests) * 100 : 0,
    };
  }

  /**
   * Calculate percentile
   */
  private percentile(sortedArray: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * sortedArray.length) - 1;
    return sortedArray[Math.max(0, index)];
  }

  /**
   * Get recent metrics
   */
  getRecentMetrics(limit: number = 10): PerformanceMetric[] {
    return this.metrics.slice(-limit);
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.metrics = [];
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.errors = 0;
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const total = this.cacheHits + this.cacheMisses;
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      total,
      hitRate: total > 0 ? (this.cacheHits / total) * 100 : 0,
    };
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Timing decorator for functions
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  name: string,
  fn: T
): T {
  return ((...args: any[]) => {
    const start = Date.now();
    const result = fn(...args);

    // Handle promises
    if (result instanceof Promise) {
      return result
        .then((value) => {
          performanceMonitor.recordMetric(name, Date.now() - start);
          return value;
        })
        .catch((error) => {
          performanceMonitor.recordMetric(name, Date.now() - start);
          performanceMonitor.recordError();
          throw error;
        });
    }

    performanceMonitor.recordMetric(name, Date.now() - start);
    return result;
  }) as T;
}

/**
 * Database query performance tracking
 */
export class QueryTimer {
  private start: number;
  private queryName: string;

  constructor(queryName: string) {
    this.queryName = queryName;
    this.start = Date.now();
  }

  end(metadata?: Record<string, any>): void {
    const duration = Date.now() - this.start;
    performanceMonitor.recordMetric(`db:${this.queryName}`, duration, metadata);

    // Log slow queries (> 500ms)
    if (duration > 500) {
      console.warn(`[SLOW QUERY] ${this.queryName} took ${duration}ms`, metadata);
    }
  }
}

/**
 * Track database query performance
 */
export function trackQuery(queryName: string): QueryTimer {
  return new QueryTimer(queryName);
}

/**
 * Log performance metrics (development only)
 */
export function logPerformanceMetrics(): void {
  if (process.env.NODE_ENV === 'development') {
    const summary = performanceMonitor.getSummary();
    const cacheStats = performanceMonitor.getCacheStats();

    console.log('\n=== Performance Metrics ===');
    console.log(`Total Requests: ${summary.totalRequests}`);
    console.log(`Avg Response Time: ${summary.avgResponseTime.toFixed(2)}ms`);
    console.log(`P50 Response Time: ${summary.p50ResponseTime.toFixed(2)}ms`);
    console.log(`P95 Response Time: ${summary.p95ResponseTime.toFixed(2)}ms`);
    console.log(`P99 Response Time: ${summary.p99ResponseTime.toFixed(2)}ms`);
    console.log(`Cache Hit Rate: ${cacheStats.hitRate.toFixed(2)}%`);
    console.log(`Error Rate: ${summary.errorRate.toFixed(2)}%`);
    console.log('===========================\n');
  }
}

// Log metrics every 5 minutes in development
if (process.env.NODE_ENV === 'development' && typeof setInterval !== 'undefined') {
  setInterval(() => logPerformanceMetrics(), 5 * 60 * 1000);
}
