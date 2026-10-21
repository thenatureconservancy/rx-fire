/**
 * Error handling middleware
 * 
 * Catches all errors thrown in the application and returns a consistent
 * JSON error response. In development mode, includes stack traces.
 */

import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types/index.js';
import { config } from '../config/config.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging
  console.error('❌ Error:', err.message);
  console.error(err.stack);

  // Prepare error response
  const errorResponse: ErrorResponse = {
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred',
  };

  // Include stack trace in development mode
  if (config.nodeEnv === 'development') {
    errorResponse.stack = err.stack;
  }

  // Send error response
  const statusCode = (err as any).statusCode || 500;
  res.status(statusCode).json(errorResponse);
};
