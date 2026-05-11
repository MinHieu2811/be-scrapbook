import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to enforce a global timeout on all API requests.
 * Ensures the Express app doesn't hang indefinitely, improving availability.
 */
export const timeoutMiddleware = (timeoutMs: number = 15000) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Set a timeout
    const id = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({
          success: false,
          error: 'Gateway Timeout: The server took too long to respond.',
        });
      }
    }, timeoutMs);

    // Clear the timeout when the response finishes
    res.on('finish', () => {
      clearTimeout(id);
    });

    res.on('close', () => {
      clearTimeout(id);
    });

    next();
  };
};
