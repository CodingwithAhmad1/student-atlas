# Student Atlas Frontend

React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + shadcn/ui (base-nova theme).

## Development

```bash
npm install
npm run dev            # dev server
npm run build          # content check, type-check, production build
npm run check:content  # content integrity only (scripts/check-content.ts)
npm run lint
```

## Content

All visa/immigration content lives in `src/data/`. See `src/data/CONTENT-GUIDE.md`
for the content model, the alert-review workflow, and the MCP tool reference.
Monitoring data (`src/data/monitoring/`) is written by the source monitor and the
review tools and bundled at build time.
