import 'dotenv/config';

import app from '../src/app';

const PORT = process.env.PORT || 3000;

// ============================================
// Local development: start listening
// In Vercel, the default export is used instead
// ============================================
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;
