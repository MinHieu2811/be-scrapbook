# Deployment (Vercel)

## How It Works

- Vercel treats `api/index.ts` as a serverless function.
- `vercel.json` routes all requests `(.*)` to this function.
- The Express app is exported as the default export.

## Environment Variables

Set these in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | ✅ | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service role key (server-side only) |
| `NODE_ENV` | ✅ | Set to `production` |
| `ALLOWED_ORIGINS` | Optional | Comma-separated list of allowed CORS origins |

> ⚠️ Never commit `.env` to Git. Use `.env.example` as reference.

## Cold Starts

Vercel serverless functions may experience cold starts. Tips:

- Keep the function bundle small — avoid heavy dependencies.
- Supabase client is lightweight and good for serverless.
- Avoid top-level `await` that delays cold boot.

## Deploy Process

1. Push code to GitHub.
2. Vercel auto-deploys from the connected repository.
3. Verify via the Vercel dashboard or `https://your-project.vercel.app/api/health`.

## Supabase Table Setup

Run this SQL in Supabase SQL Editor to create the `scrapbooks` table:

```sql
CREATE TABLE scrapbooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  birthday_date DATE NOT NULL,
  message TEXT,
  photos TEXT[] DEFAULT '{}',
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, recommended)
ALTER TABLE scrapbooks ENABLE ROW LEVEL SECURITY;

-- Allow all operations for service role (used by the backend)
CREATE POLICY "Service role full access" ON scrapbooks
  FOR ALL
  USING (true)
  WITH CHECK (true);
```
