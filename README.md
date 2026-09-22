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

## Releasing packages

Publishing to npm is automated with [Changesets](https://github.com/changesets/changesets)
(`.github/workflows/release.yml`) and is a two-step, PR-gated process — a plain
commit or push never publishes anything on its own.

1. **Describe your change.** After making a change to a publishable package
   (`usx`, `usx-contracts`, `usx-react`, `usx-theme`, or `usx-uswds-fixes`), run:

   ```bash
   pnpm changeset
   ```

   Select the affected package(s), pick a semver bump (patch/minor/major), and
   write a short summary. Commit the generated `.changeset/*.md` file along
   with your code change and push to `main`.

2. **CI opens a "Version Packages" PR.** Seeing a pending changeset file, the
   release workflow bumps the affected `package.json` versions, writes/updates
   each package's `CHANGELOG.md`, deletes the consumed changeset file, and
   opens (or updates) a PR titled **Version Packages** on the
   `changeset-release/main` branch. This step makes no npm changes yet.

3. **Merge that PR when you're ready to release.** Merging it is itself a push
   to `main`. With no changesets left pending, the workflow instead runs
   `changeset publish`, which publishes only the packages whose version isn't
   already on the npm registry (via OIDC trusted publishing — no npm token
   needed) and creates matching GitHub Releases.

Because publishing only happens for versions that don't already exist on the
registry, and ordinary pushes without a changeset file are a no-op for both
steps, this pipeline can't accidentally re-publish or overwrite a released
version. Published changelogs are rendered in Storybook under
**Documentation / Release Notes** — restart the Storybook dev server after
pulling a release merge, since its `CHANGELOG.md` lookup is resolved at
server start.

