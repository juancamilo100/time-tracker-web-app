const env = process.env.NODE_ENV;

if (env === 'production') {
  console.log(`
    TIME_TRACKER_API_BASE_URL=${process.env.TIME_TRACKER_API_BASE_URL}
    TIME_TRACKER_API_PORT=${process.env.TIME_TRACKER_API_PORT}
  `);
} else {
  console.log(`
    TIME_TRACKER_API_BASE_URL=localhost
    TIME_TRACKER_API_PORT=9000
  `);
}
