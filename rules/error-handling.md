# Error Handling

## Strategy

1. **`express-async-errors`** — automatically catches rejected promises in route handlers.
2. **Global error handler** in `src/middlewares/errorHandler.ts` — last middleware registered.
3. **Controller-level validation** — return `400` early for invalid input.

## Error Response

Always return the `ApiResponse` format:

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

## Production vs Development

- **Production** (`NODE_ENV=production`): Return generic `"Internal Server Error"` — never expose stack traces.
- **Development**: Return the actual `err.message` for debugging.

## Supabase Error Codes

| Code | Meaning | HTTP Status |
|---|---|---|
| `PGRST116` | No rows found (`.single()`) | `404` |
| `23505` | Unique constraint violation | `409` |
| `23503` | Foreign key violation | `400` |

## Logging

- Use `console.error` in the global error handler (Vercel captures stdout/stderr).
- Prefix logs with `[ErrorHandler]` for easy filtering.
- In the future, consider structured logging (e.g., `pino`).
