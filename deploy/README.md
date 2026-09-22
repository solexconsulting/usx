Docker build/deploy config for the two runnable apps in [`apps/`](../apps):
`storybook` (React Storybook, served by nginx) and `storybook-django` (Django
render server, served by Gunicorn).

## Structure

- `docker-compose.yml` — builds and runs both images together
- `storybook/Dockerfile` — builds static Storybook (`pnpm storybook:build`) and serves it with nginx
- `storybook/entrypoint.sh` — writes `USX_DJANGO_URL` into `env-config.js` at container start, so the browser knows where to reach Django without rebuilding the image
- `storybook/nginx.conf` — static file serving config (no SPA fallback)
- `storybook-django/Dockerfile` — installs `requirements.txt` and runs the Django app with Gunicorn
- `storybook-django/gunicorn.conf.py` — Gunicorn settings (port 9090, unlimited request line, trusts `X-Forwarded-Proto`)

Both Dockerfiles use the repo root as their build context (they need
`packages/` and, for storybook, the pnpm workspace files), so always build via
`docker compose -f deploy/docker-compose.yml ...` or `docker build -f
deploy/<app>/Dockerfile ..` from `deploy/`, not from inside the app's own
directory.

## Configuration

Compose reads env vars from `deploy/.env` automatically when run from the
`deploy/` directory. Copy the example and fill in real values (gitignored,
never commit real secrets):

```bash
cd deploy
cp .env.example .env
```

See `.env.example` for what each variable does.

## Build and run

```bash
cd deploy
docker compose build
docker compose up
```

- Storybook: `http://localhost:${STORYBOOK_PORT:-6006}`
- Django render server: `http://localhost:${DJANGO_PORT:-9090}/health/`

## Pushing to the registry

`docker compose build` only builds and tags images locally — it does not push
them. Push separately once the build succeeds:

```bash
cd deploy
docker compose build
docker compose push
```

`docker compose push` pushes each service's `image:` (e.g.
`${REGISTRY}/usx-storybook:${TAG}`) to `REGISTRY`. To push a single service,
pass its name (e.g. `docker compose push storybook`).
