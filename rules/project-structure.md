# Project Structure

## Directory Layout

```
BE-scrapbook/
├── api/                 # Vercel serverless entry points
│   └── index.ts         # Main app export — DO NOT add business logic here
├── src/
│   ├── app.ts           # Express app assembly (middleware + routes)
│   ├── config/          # External service clients (Supabase, etc.)
│   ├── types/           # Interfaces, DTOs, enums
│   ├── routes/          # Express Router files — one per resource
│   ├── controllers/     # Handler functions — one per resource
│   └── middlewares/     # Reusable middleware (auth, validation, errors)
├── rules/               # This folder — best-practice docs
└── [config files]       # tsconfig, eslint, prettier, vercel, etc.
```

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | `kebab-case` or `dot-notation` | `scrapbook.controller.ts` |
| Folders | `lowercase` | `controllers/` |
| Interfaces | `PascalCase` | `CreateScrapbookDto` |
| Functions | `camelCase` | `getAllScrapbooks` |
| DB columns | `snake_case` | `recipient_name` |
| Env vars | `UPPER_SNAKE_CASE` | `SUPABASE_URL` |

## Adding a New Resource

1. Create type in `src/types/<resource>.ts`
2. Create controller in `src/controllers/<resource>.controller.ts`
3. Create routes in `src/routes/<resource>.routes.ts`
4. Register routes in `src/app.ts`
