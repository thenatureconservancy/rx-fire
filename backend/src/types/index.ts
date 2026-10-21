/**
 * Type definitions
 * 
 * Shared TypeScript types and interfaces used throughout the application.
 */

import { Request, Response } from 'express';

/**
 * Health check response structure
 */
export interface HealthResponse {
  status: 'ok';
  timestamp?: string;
  uptime?: number;
}

/**
 * Standard error response structure
 */
export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}

/**
 * Extended Express Request type for future use with authentication, etc.
 */
export interface AppRequest extends Request {
  // Add custom properties here as needed
  // Example: user?: User;
}

/**
 * Extended Express Response type
 */
export interface AppResponse extends Response {
  // Add custom properties here as needed
}
