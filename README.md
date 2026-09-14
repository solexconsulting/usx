# agency-ui-platform

`agency-ui-platform` is a token-driven design system platform for building extensible agency design systems and component libraries based on USWDS.

This repository builds styles and wrappers on top of USWDS conventions. The platform packages do not bundle USWDS for downstream clients; consuming applications are responsible for including USWDS stylesheets themselves.

The repository is organized as a monorepo so teams can define design tokens once and reuse them across framework packages, documentation apps, and implementation examples.

## Repository structure

### `packages/`
Reusable libraries that power the platform:

- `tokens/` (`@solexllc/usx-theme`): source design tokens (color, spacing, radius, typography) and compiled outputs (CSS variables, JS exports, theme manifest)
- `usx/` (`@solexllc/usx`): compiled USWDS-based component styles (`.usx-*`), themeable via `usx-theme`
- `usx-uswds-fixes/` (`@solexllc/usx-uswds-fixes`): small SCSS patches/overrides layered on top of upstream USWDS
- `core/` (`@solexllc/usx-react`): React component wrappers, each co-located with its Django template, canonical static HTML, and `config.json` prop schema — see [packages/core/README.md](packages/core/README.md)
- `usx-stories/` (`@solexllc/usx-stories`): Storybook stories and story-rendering helpers (dev-infra only, not published)

### `apps/`
Applications used to develop and document the system:

- `storybook/`: the Storybook host — renders React, static HTML, and Django-rendered stories for every component in `packages/core`. See [apps/storybook/README.md](apps/storybook/README.md)
- `storybook-django/`: a Django project that renders `*.django.html` templates on demand over HTTP, so Storybook's "Django" stories can fetch real server-rendered markup
- `docs/`: platform documentation site (guides, usage, design guidelines) — not yet built out

### `examples/`
Reference implementations that demonstrate integration patterns (currently stubs, not yet built out):

- `django-demo/`: example Django application using platform packages
- `react-demo/`: example React application using platform packages

### `deploy/`
Docker artifacts (Dockerfiles, nginx/gunicorn config, `docker-compose.yml`) for running the Storybook and Django apps in containers.

### `scripts/`
Repo-wide tooling: component scaffolding (`new-component.js`), export/registry generation (`generate-exports.cjs`), and `config.json` validation (`validate-configs.js`).

## Run commands from root

```bash
pnpm install
pnpm build          # build every package (pnpm -r build)
pnpm dev             # run every package's dev script in parallel
pnpm test            # run every package's test script (pnpm -r test)
pnpm lint            # eslint + stylelint across the repo
pnpm format          # prettier --write .
pnpm storybook       # start the Storybook host (see apps/storybook/README.md)
```

Other useful scripts:

```bash
pnpm new-component        # scaffold a new component under packages/core/src/components
pnpm generate-exports      # regenerate packages/core/src/index.js barrel exports
pnpm validate:configs      # validate every component's config.json against the schema
pnpm tokens:build          # build packages/tokens only
```

## Local development

```bash
pnpm install
pnpm storybook
```

`pnpm storybook` runs the `tokens`/`usx` Sass watchers alongside the Storybook
dev server, so SCSS changes recompile live. The Django-rendered stories in
Storybook additionally require the Django dev server from
`apps/storybook-django` to be running separately (see that app's
`requirements.txt` for setup) — React and HTML stories work without it.

