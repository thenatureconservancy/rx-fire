/**
 * Health check routes
 * 
 * Provides endpoints for monitoring the health and status of the API.
 * This is useful for load balancers, monitoring tools, and orchestration platforms.
 */

import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';

export const healthRouter = Router();

/**
 * GET /api/health
 * Returns the current health status of the API
 */
healthRouter.get('/', getHealth);
