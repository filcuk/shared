# AGENTS.md

## Purpose

This repo hosts shared cross-app assets. The primary catalog is `dir/links.json`, described by `dir/links.schema.json`.

## Links catalog

- Edit `dir/links.json` only for new/changed entries; keep `id` stable.
- Run `npm run validate:links` before pushing catalog changes.
- Do not treat `apps/links.json` as canonical; it is legacy until consumers migrate.
- Conventions (relative icons, `hidden`, `featured`, `repo`) are documented in `README.md` and the schema `$defs` descriptions.

## Validation

`scripts/validate-links.mjs` checks JSON Schema (Draft 2020-12) and unique item `id` values against `dir/links.json`. GitHub Actions workflow: `.github/workflows/validate-links.yml`.
