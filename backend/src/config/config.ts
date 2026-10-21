/**
 * Configuration module
 * 
 * Centralizes all environment variable access and provides type-safe
 * configuration values throughout the application.
 */

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // Future integration endpoints (currently unused)
  rAnalyticsServiceUrl: process.env.R_ANALYTICS_SERVICE_URL,
  arcgisApiKey: process.env.ARCGIS_API_KEY,
  arcgisFeatureLayerUrl: process.env.ARCGIS_FEATURE_LAYER_URL,
} as const;
