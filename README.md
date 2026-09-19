# USX

USX is a token-driven design system platform for building extensible agency design systems and component libraries based on USWDS.

This repository builds styles and wrappers on top of USWDS conventions. The platform packages do not bundle USWDS for downstream clients; consuming applications are responsible for including USWDS stylesheets themselves.

The repository is organized as a monorepo so teams can define design tokens once and reuse them across framework packages, documentation apps, and implementation examples.

## Repository structure

### `packages/`
Reusable libraries that power the platform:

- `usx-theme/` (`@solexllc/usx-theme`): source design tokens (color, spacing, radius, typography) and compiled outputs (CSS variables, JS exports, theme manifest)
- `usx/` (`@solexllc/usx`): compiled USWDS-based component styles (`.usx-*`), themeable via `usx-theme`
- `usx-uswds-fixes/` (`@solexllc/usx-uswds-fixes`): small SCSS patches/overrides layered on top of upstream USWDS
- `usx-react/` (`@solexllc/usx-react`): React component wrappers, each co-located with its Django template, canonical static HTML, and `config.json` prop schema — see [packages/usx-react/README.md](packages/usx-react/README.md)
- `usx-contracts/` (`@solexllc/usx-contracts`): generated CMS contract manifest aggregated from every component's `config.json` — see [packages/usx-contracts/README.md](packages/usx-contracts/README.md)
- `usx-stories/` (`@solexllc/usx-stories`): Storybook stories and story-rendering helpers (dev-infra only, not published)

### `apps/`
Applications used to develop and document the system:

- `storybook/`: the Storybook host — renders React, static HTML, and Django-rendered stories for every component in `packages/usx-react`. See [apps/storybook/README.md](apps/storybook/README.md)
- `storybook-django/`: a Django project that renders `*.django.html` templates on demand over HTTP, so Storybook's "Django" stories can fetch real server-rendered markup
- `docs/`: platform documentation site (guides, usage, design guidelines) — not yet built out

### `examples/`
Reference implementations that demonstrate integration patterns (currently stubs, not yet built out):

- `django-demo/`: example Django application using platform packages
- `react-demo/`: example React application using platform packages

### `deploy/`
Docker artifacts (Dockerfiles, nginx/gunicorn config, `docker-compose.yml`) for running the Storybook and Django apps in containers.

### `scripts/`
Repo-wide tooling: component scaffolding (`new-component.js`), the `packages/usx-react` export barrel and CMS contract generators (`generate-exports.js`, `generate-contracts.js`), and the metadata validator (`validate-configs.js`). All share `scripts/lib/component-configs.js`.

## Run commands from root

```bash
pnpm install
pnpm dev             # tokens watcher + Storybook dev server (http://localhost:6006)
pnpm build           # build every package (pnpm -r build)
pnpm test            # validate component metadata, then run every package's tests
pnpm lint            # eslint + stylelint across the repo
pnpm format          # prettier --write .
pnpm storybook:build # static Storybook build (used by deploy/storybook/Dockerfile)
```

Component tooling:

```bash
pnpm new-component <Name>   # scaffold a component across usx-react, usx and usx-stories
pnpm generate:exports       # regenerate packages/usx-react/src/index.js
pnpm generate:contracts     # regenerate packages/usx-contracts/src/contracts.js
pnpm validate:configs       # schema + cross-ref + file-presence + generated-file freshness
```

`generate:exports` and `generate:contracts` write committed files; `validate:configs`
(and therefore `pnpm test`) fails if either is out of date.

## Local development

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs the `usx-theme` build watcher alongside the Storybook dev server;
Storybook compiles the USX Sass itself and reloads on any change under
`packages/*/src`. The Django-rendered stories additionally require the Django
dev server from `apps/storybook-django` to be running separately (see that
app's `requirements.txt` for setup) — React and HTML stories work without it.

