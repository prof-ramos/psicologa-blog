/**
 * Load testing script for API performance
 *
 * Usage:
 *   node tests/performance/load-test.js
 *
 * Or with custom URL:
 *   BASE_URL=https://your-domain.com node tests/performance/load-test.js
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Test configuration
const CONCURRENT_USERS = 10;
const REQUESTS_PER_USER = 50;
const ENDPOINTS = [
  '/api/posts',
  '/api/posts?metadata=true',
  '/api/posts?featured=true',
  '/api/posts?limit=10',
];

// Results tracking
const results = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimes: [],
  errors: [],
};

/**
 * Make a single request and track timing
 */
async function makeRequest(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const start = Date.now();

  try {
    const response = await fetch(url);
    const duration = Date.now() - start;

    results.totalRequests++;
    results.responseTimes.push(duration);

    if (response.ok) {
      results.successfulRequests++;
    } else {
      results.failedRequests++;
      results.errors.push({
        endpoint,
        status: response.status,
        statusText: response.statusText,
      });
    }

    return {
      success: response.ok,
      duration,
      status: response.status,
    };
  } catch (error) {
    const duration = Date.now() - start;
    results.totalRequests++;
    results.failedRequests++;
    results.responseTimes.push(duration);
    results.errors.push({
      endpoint,
      error: error.message,
    });

    return {
      success: false,
      duration,
      error: error.message,
    };
  }
}

/**
 * Simulate a single user making multiple requests
 */
async function simulateUser(userId) {
  console.log(`User ${userId} starting...`);

  for (let i = 0; i < REQUESTS_PER_USER; i++) {
    const endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
    await makeRequest(endpoint);

    // Random delay between 100-500ms
    const delay = Math.random() * 400 + 100;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  console.log(`User ${userId} completed`);
}

/**
 * Calculate statistics from results
 */
function calculateStats() {
  const sorted = results.responseTimes.sort((a, b) => a - b);
  const sum = sorted.reduce((acc, val) => acc + val, 0);

  const stats = {
    totalRequests: results.totalRequests,
    successfulRequests: results.successfulRequests,
    failedRequests: results.failedRequests,
    successRate: (results.successfulRequests / results.totalRequests * 100).toFixed(2) + '%',
    avgResponseTime: (sum / sorted.length).toFixed(2) + 'ms',
    minResponseTime: sorted[0] + 'ms',
    maxResponseTime: sorted[sorted.length - 1] + 'ms',
    p50: sorted[Math.floor(sorted.length * 0.5)] + 'ms',
    p90: sorted[Math.floor(sorted.length * 0.9)] + 'ms',
    p95: sorted[Math.floor(sorted.length * 0.95)] + 'ms',
    p99: sorted[Math.floor(sorted.length * 0.99)] + 'ms',
  };

  return stats;
}

/**
 * Run the load test
 */
async function runLoadTest() {
  console.log('\n=== Starting Load Test ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Concurrent Users: ${CONCURRENT_USERS}`);
  console.log(`Requests per User: ${REQUESTS_PER_USER}`);
  console.log(`Total Requests: ${CONCURRENT_USERS * REQUESTS_PER_USER}`);
  console.log('==========================\n');

  const startTime = Date.now();

  // Create array of user simulations
  const users = Array.from({ length: CONCURRENT_USERS }, (_, i) => simulateUser(i + 1));

  // Run all users concurrently
  await Promise.all(users);

  const totalDuration = Date.now() - startTime;

  console.log('\n=== Load Test Complete ===');
  console.log(`Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log(`Requests per Second: ${(results.totalRequests / (totalDuration / 1000)).toFixed(2)}`);
  console.log('\n=== Results ===');

  const stats = calculateStats();
  Object.entries(stats).forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    console.log(`${label}: ${value}`);
  });

  if (results.errors.length > 0) {
    console.log('\n=== Errors ===');
    console.log(`Total Errors: ${results.errors.length}`);
    console.log('First 10 errors:');
    results.errors.slice(0, 10).forEach((error, i) => {
      console.log(`${i + 1}.`, JSON.stringify(error, null, 2));
    });
  }

  console.log('\n==========================\n');

  // Exit with error code if success rate is below 95%
  const successRate = (results.successfulRequests / results.totalRequests) * 100;
  if (successRate < 95) {
    console.error('FAILED: Success rate below 95%');
    process.exit(1);
  }

  console.log('SUCCESS: Load test passed!');
}

// Run the test
runLoadTest().catch((error) => {
  console.error('Load test failed:', error);
  process.exit(1);
});
