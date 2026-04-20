# ── Storybook (React / Vite) ───────────────────────────────────────────────
# Build context: repo root  (docker build -f deploy/storybook/Dockerfile .)
FROM node:22-slim AS base

# Enable corepack so pnpm is available without a separate install step.
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ── Install dependencies ───────────────────────────────────────────────────
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/core/package.json   packages/core/
COPY packages/tokens/package.json packages/tokens/
COPY apps/storybook/package.json  apps/storybook/

RUN pnpm install --frozen-lockfile

# ── Copy source ────────────────────────────────────────────────────────────
COPY packages/ packages/
COPY apps/storybook/ apps/storybook/

# ── Build static Storybook ─────────────────────────────────────────────────
RUN pnpm storybook:build

# ── Serve with nginx ─────────────────────────────────────────────────────
FROM nginx:alpine AS serve
COPY --from=base /app/apps/storybook/storybook-static /storybook-static

# Runtime environment — set the URL the *browser* will use to reach Django.
# Written into /storybook-static/env-config.js at container startup.
ENV USX_DJANGO_URL=http://localhost:9090

COPY deploy/storybook/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/storybook/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 6006
ENTRYPOINT ["/entrypoint.sh"]
