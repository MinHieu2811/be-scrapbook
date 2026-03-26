import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/scrapbook';

/**
 * Global error handler middleware.
 * Catches unhandled errors and returns a consistent JSON response.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // eslint-disable-next-line no-console
  console.error('[ErrorHandler]', err.message, err.stack);

  const response: ApiResponse = {
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  };

  res.status(500).json(response);
};
