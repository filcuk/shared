# Shared assets

Canonical catalog: [`dir/links.json`](dir/links.json) (schema: [`dir/links.schema.json`](dir/links.schema.json)).

The legacy file [`apps/links.json`](apps/links.json) remains until dependent apps migrate.

## Validate

```bash
npm ci
npm run validate:links
```

CI runs the same check on changes to the catalog, schema, or validator.

## Consumer notes

- **Order** — array order is display order (topics and items).
- **Icons** — if `icon` / `iconDark` has no scheme/host, resolve with `new URL(icon, url)` (ensure `url` ends with `/` when it is a site root).
- **Accents** — use `accent`; prefer `accentDark` when the UI is dark.
- **Visibility** — skip any topic or item with `hidden: true` unless you intentionally show drafts/examples.
- **Featured** — `featured: true` marks highlight candidates; omit when false.
- **repo** — present when the source repository differs from `url` (Pages apps, packages, releases pages, store listings).
