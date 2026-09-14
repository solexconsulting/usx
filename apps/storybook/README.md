Storybook app for documenting agency-ui-platform components.

This is a single Storybook host (no composed/remote Storybooks) that renders
stories from `packages/usx-stories/src/**`. Each component in `packages/core`
can have up to three story files, one per rendering technology:

- `<Name>.React.stories.jsx` — imports and renders the React component directly
- `<Name>.HTML.stories.jsx` — renders the component's canonical static
  `<component>.html` file via `?raw` import (no args/controls — it's a fixed
  reference snippet)
- `<Name>.Django.stories.jsx` — fetches server-rendered HTML from the Django
  app in `apps/storybook-django` (see below) and injects it into the page

React and Django stories share the same `storyDefs` (arg presets) defined in
the `.React.stories.jsx` file, so most components only need one set of props
maintained in one place.

## Story hierarchy

- `React/USWDS/*`, `Django/USWDS/*`, `HTML/USWDS/*`: one story tree per
  technology, mirroring the same component list
- `React/USWDS-Inspired/*`, `React/USX/*` (and Django/HTML equivalents):
  components that extend or go beyond upstream USWDS
- `Foundations/*` / `Documentation/*`: theme playground, tokens, colors,
  spacing, typography
- `Patterns/*`: composite, multi-component example pages

A "Filter by technology" toolbar control (`.storybook/technologyToggle.jsx`)
lets you switch the sidebar between React/Django/HTML/All without losing your
place, by jumping to the matching story in the target technology when one
exists.

> Collapsing the React/Django/HTML trees into a single per-component node with
> the technology as a per-story toggle (rather than a separate top-level tree)
> is a larger, not-yet-implemented restructuring — see
> [plan-storybookArchitecture.md](../../plan-storybookArchitecture.md).

## Running the Django-rendered stories

Django stories require the companion Django app to be running:

```bash
cd apps/storybook-django
source venv/bin/activate   # or create one: python -m venv venv && pip install -r requirements.txt
python manage.py runserver 9090
```

Storybook resolves the Django server URL from `window.USX_DJANGO_URL` (set via
`env-config.js` at container/deploy time) or falls back to
`http://<current-hostname>:9090`. React and HTML stories work without the
Django server running.

## Run

From this directory:

- `npm install` (or `pnpm install` from the repo root)
- `npm run dev` — starts Storybook on port 6006

From the repository root:

- `pnpm storybook` — starts this app together with the `tokens`/`usx` Sass
  watchers, so SCSS changes recompile live

Build static Storybook:

- `npm run build`
