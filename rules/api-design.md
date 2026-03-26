# API Design

## Base URL

All endpoints are prefixed with `/api`.

## Response Format

Every endpoint returns a consistent JSON envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

On error:

```json
{
  "success": false,
  "error": "Human-readable error description"
}
```

## HTTP Methods & Status Codes

| Action | Method | Success Status | Error Statuses |
|---|---|---|---|
| List resources | `GET` | `200` | `500` |
| Get one resource | `GET` | `200` | `404`, `500` |
| Create resource | `POST` | `201` | `400`, `500` |
| Update resource | `PUT` | `200` | `400`, `404`, `500` |
| Delete resource | `DELETE` | `200` | `404`, `500` |

## Path Conventions

- Use **plural nouns**: `/api/scrapbooks`, not `/api/scrapbook`.
- Use URL params for identifiers: `/api/scrapbooks/:id`.
- Use query params for filtering/sorting: `/api/scrapbooks?created_by=john`.

## Validation

- Validate required fields at the controller level before hitting the DB.
- Return `400` with a clear message listing missing/invalid fields.
