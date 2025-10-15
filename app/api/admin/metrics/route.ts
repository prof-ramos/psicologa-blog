import { NextRequest, NextResponse } from 'next/server';
import { performanceMonitor } from '@/lib/performance';
import { cache } from '@/lib/cache';

/**
 * GET /api/admin/metrics - View performance metrics and cache statistics
 * This endpoint is for monitoring and debugging purposes
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metricName = searchParams.get('metric');

    const summary = performanceMonitor.getSummary(metricName || undefined);
    const cacheStats = performanceMonitor.getCacheStats();
    const cacheInfo = cache.getStats();
    const recentMetrics = performanceMonitor.getRecentMetrics(20);

    const response = {
      timestamp: new Date().toISOString(),
      performance: {
        summary: {
          totalRequests: summary.totalRequests,
          avgResponseTime: `${summary.avgResponseTime.toFixed(2)}ms`,
          minResponseTime: `${summary.minResponseTime.toFixed(2)}ms`,
          maxResponseTime: `${summary.maxResponseTime.toFixed(2)}ms`,
          p50ResponseTime: `${summary.p50ResponseTime.toFixed(2)}ms`,
          p95ResponseTime: `${summary.p95ResponseTime.toFixed(2)}ms`,
          p99ResponseTime: `${summary.p99ResponseTime.toFixed(2)}ms`,
          errorRate: `${summary.errorRate.toFixed(2)}%`,
        },
        recentRequests: recentMetrics.map((m) => ({
          name: m.name,
          duration: `${m.duration}ms`,
          timestamp: new Date(m.timestamp).toISOString(),
          metadata: m.metadata,
        })),
      },
      cache: {
        stats: {
          hits: cacheStats.hits,
          misses: cacheStats.misses,
          total: cacheStats.total,
          hitRate: `${cacheStats.hitRate.toFixed(2)}%`,
        },
        keys: {
          total: cacheInfo.size,
          keys: cacheInfo.keys,
        },
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
        memory: {
          used: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          total: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/metrics/reset - Reset metrics
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'reset') {
      performanceMonitor.reset();
      return NextResponse.json({ success: true, message: 'Metrics reset successfully' });
    }

    if (action === 'clear-cache') {
      cache.clear();
      return NextResponse.json({ success: true, message: 'Cache cleared successfully' });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use ?action=reset or ?action=clear-cache' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error resetting metrics:', error);
    return NextResponse.json(
      { error: 'Failed to reset metrics' },
      { status: 500 }
    );
  }
}
