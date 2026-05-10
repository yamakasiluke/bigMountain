# BigMountain

China-first salary, company review, anonymous community, and job discovery platform.

This repo now starts as a small monorepo with separate client surfaces and shared contracts:

- `apps/web` - website experience for salary search, company pages, jobs, and gated community content.
- `apps/admin` - moderation and operations console.
- `apps/miniapp` - native WeChat Mini Program starter.
- `services/api` - shared HTTP API used by the website, Mini Program, and admin console.
- `packages/shared` - common data contracts, seed data, release gates, and moderation states.

## First Run

```sh
npm test
npm run build
npm run dev:api
npm run dev:web
```

Optional dev servers:

```sh
npm run dev:admin
```

## CI/CD

- CI runs `npm test` and `npm run build` on GitHub Actions.
- CD deploys the website starter to GitHub Pages from the `main` branch.
- The API and admin console still need a real hosting target later; only the public web starter is deployed automatically.

Open `apps/miniapp` in WeChat DevTools to preview the Mini Program starter.

## Release Gates

The code includes all four requested product areas, but the public rollout should stay gated:

1. Salary search, company pages, and read-only jobs.
2. Moderated job submissions.
3. Anonymous posts and company reviews after company registration, ICP/Beian, content moderation, and legal pages are ready.
