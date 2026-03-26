# Coding Standards

## TypeScript

- **Strict mode** is enabled — do not bypass with `// @ts-ignore`.
- **Never use `any`**. Use `unknown` with type guards instead.
- **Prefer interfaces** over type aliases for object shapes.
- **Use `const` by default**. Use `let` only when re-assignment is required. Never use `var`.
- **Export explicitly** — avoid `export default` in most files (routes are the exception).

## Async / Await

- Always use `async/await` — no raw `.then()` / `.catch()` chains.
- `express-async-errors` is installed, so unhandled promise rejections in route handlers are caught automatically by the global error handler.

## Functions

- **One function, one purpose** — keep handlers focused.
- Controllers should handle: parse input → call Supabase → format response.
- Move complex business logic into a separate `services/` layer if it grows.

## Imports

- Order imports: (1) node built-ins, (2) external packages, (3) local modules.
- Use path aliases or relative paths consistently.

## Comments

- Use `/** JSDoc */` for exported functions.
- Inline comments only for non-obvious logic.
- Section separators: `// ========` blocks for readability.
