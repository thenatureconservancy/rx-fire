/**
 * Main server entry point
 * 
 * This file initializes the Express application, loads environment variables,
 * sets up middleware, registers routes, and starts the HTTP server.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/config.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Security middleware - adds various HTTP headers for security
app.use(helmet());

// CORS middleware - allows cross-origin requests from the frontend
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Compression middleware - compresses response bodies
app.use(compression());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/health', healthRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
  console.log(`\n✅ Health check available at: http://localhost:${PORT}/api/health`);
});

export default app;
