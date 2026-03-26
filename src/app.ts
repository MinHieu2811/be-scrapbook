import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import scrapbookRoutes from './routes/scrapbook.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// ============================================
// Middleware
// ============================================
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

// ============================================
// Error Handler (must be last)
// ============================================
app.use(errorHandler);

export default app;
