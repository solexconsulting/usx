Django app for server-rendering USX components in Storybook's `Django/*` stories.

Components in `packages/usx-react/src/components/**` can ship a Django template
(e.g. `icon.django.html`) alongside their React implementation. This app
discovers those templates and renders them on demand, so the
`<Name>.Django.stories.jsx` files in `packages/usx-stories` can fetch real
server-rendered HTML instead of just simulating it.

## Structure

- `project/components/` — component registry and renderer (`core/registry.py`,
  `core/render.py`) that resolve templates from
  `packages/usx-react/src/components/**`, plus template tags used by those
  templates
- `project/storybook/` — HTTP endpoints Storybook calls:
  - `GET /components/` — JSON metadata (name + props) for every registered component
  - `GET /render/<component_name>/?props=<json>` — server-rendered HTML for a component with the given props
  - `GET /test/` — trivial health check ("Hello, Storybook!")
- `project/settings/` — `base.py` (shared), `development.py` (used by default
  via `manage.py`), `production.py` (used by the Docker image; reads
  `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CORS_ALLOWED_ORIGINS`,
  etc. from the environment)

## Setup

```bash
cd apps/storybook-django
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python manage.py runserver 9090
```

`manage.py` defaults to `project.settings.development` (`DEBUG=True`, all
hosts/origins allowed) — not safe for production. Storybook's Django stories
look for this server at `http://<current-hostname>:9090`, or
`window.USX_DJANGO_URL` if set; see
[../storybook/README.md](../storybook/README.md).

## Production

`deploy/storybook-django/Dockerfile` builds a Gunicorn image that runs with
`project.settings.production` (see `deploy/docker-compose.yml` and
`deploy/storybook-django/gunicorn.conf.py`).
