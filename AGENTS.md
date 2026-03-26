# BE-Scrapbook — Project Rules

> This document defines conventions for any developer (human or AI) working on this codebase.

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel Serverless Functions

## Project Structure

```
api/          → Vercel serverless entry point(s)
src/
  config/     → External service configs (Supabase client)
  types/      → TypeScript interfaces and DTOs
  controllers/→ Route handlers (business logic)
  routes/     → Express Router definitions
  middlewares/ → Express middleware
rules/        → Best-practice documentation
```

## Conventions

- **All code in TypeScript** — no `.js` files in `src/`.
- **No `any` types** — use proper typing or `unknown` + type guards.
- **snake_case** for database columns, **camelCase** for TS variables.
- **Async/await** only — no raw `.then()` chains.
- **Consistent API response** format: `{ success, data?, message?, error? }`.
- Every route handler must return `void` (sends response via `res`).

## Commands

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Start local dev server with hot reload |
| `build` | `npm run build` | Compile TypeScript |
| `lint` | `npm run lint` | Run ESLint |
| `format` | `npm run format` | Run Prettier |

## Environment Variables

Copy `.env.example` → `.env` and fill in values. Required:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Deployment

Push to GitHub → Vercel auto-deploys. Set env vars in Vercel dashboard.
