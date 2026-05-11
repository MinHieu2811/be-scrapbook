import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to set Cache-Control headers for Vercel CDN.
 * This caches the response on the edge for `sMaxAge` seconds,
 * and serves stale content while revalidating for `staleWhileRevalidate` seconds.
 */
export const cacheMiddleware = (sMaxAge: number = 60, staleWhileRevalidate: number = 300) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method === 'GET') {
      res.setHeader(
        'Cache-Control',
        `public, s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
      );
    }
    next();
  };
};
