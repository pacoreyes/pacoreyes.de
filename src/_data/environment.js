/**
 * Provides environment-specific settings
 */
module.exports = {
  // Determine if we're in development or production mode
  // This can be used to conditionally enable/disable features
  isDevelopment: () => process.env.ELEVENTY_ENV !== 'production',
  
  // Get the current environment
  environment: process.env.ELEVENTY_ENV || 'development'
};