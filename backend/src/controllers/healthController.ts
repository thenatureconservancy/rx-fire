/**
 * Health controller
 * 
 * Handles health check requests and returns system status information.
 */

import { Request, Response } from 'express';
import { HealthResponse } from '../types/index.js';

/**
 * Get health status
 * 
 * Returns a simple health check response indicating the service is running.
 * Can be extended to include more detailed health metrics (database connectivity,
 * external service status, etc.)
 */
export const getHealth = (req: Request, res: Response): void => {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  res.status(200).json(response);
};
