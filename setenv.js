if (process.env.NODE_ENV === 'production') {
  console.log(`TIME_TRACKER_API_BASE_URL=${process.env.TIME_TRACKER_API_BASE_URL}`);
} else {
  console.log(`TIME_TRACKER_API_BASE_URL=localhost:9000`);
}
