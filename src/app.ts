import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import scrapbookRoutes from './routes/scrapbook.routes';
import giftRoutes from './routes/gift.routes';
import trackingRoutes from './routes/tracking.routes';
import { errorHandler } from './middlewares/errorHandler';
import { timeoutMiddleware } from './middlewares/timeout';

const app = express();

// ============================================
// Middleware
// ============================================
// Enforce a 15-second timeout on all API requests to prevent hanging connections
app.use(timeoutMiddleware(15000));
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()) ?? [];
      // eslint-disable-next-line no-console
      console.log('[CORS] request origin:', origin, '| allowed list:', allowed);

      // Block requests with no origin (non-browser or same-origin)
      if (!origin) {
        return callback(new Error('CORS: Origin header is required'));
      }

      // Only allow if the origin is in our allowlist
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin "${origin}" not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());

// ============================================
// Routes
// ============================================
app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is running 🚀' });
});

app.use('/api/scrapbooks', scrapbookRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/tracking', trackingRoutes);

// ============================================
// Error Handler (must be last)
// ============================================
app.use(errorHandler);

export default app;
