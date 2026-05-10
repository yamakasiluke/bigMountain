# Implementation Roadmap

## Current Slice

The repo now has the first runnable product skeleton:

- Website salary search and read-only company/job discovery in `apps/web`.
- Moderation queue starter in `apps/admin`.
- Native WeChat Mini Program starter in `apps/miniapp`.
- Shared API service in `services/api`.
- Shared product contracts and seed data in `packages/shared`.

## Build Order

1. Stabilize the shared domain model for companies, salaries, jobs, posts, reviews, reports, and moderation cases.
2. Replace seed data with a database-backed API.
3. Add login and role-aware access rules.
4. Add create flows behind feature gates.
5. Connect automated content safety checks before any UGC launch.
6. Expand admin actions from mock buttons to real approve, reject, hide, and audit operations.
7. Wire Mini Program pages to the shared API after the backend is reachable from the WeChat runtime.

## Launch Gates

1. Public read: salary search, company pages, and curated jobs.
2. Moderated submit: employer job submission and admin approval.
3. Anonymous community: posts and reviews after company setup, ICP/Beian, legal pages, automated moderation, and human review operations are ready.
