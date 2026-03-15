# agency-ui-platform

`agency-ui-platform` is a token-driven design system platform for building extensible agency design systems and component libraries based on USWDS.

This repository builds styles and wrappers on top of USWDS conventions. The platform packages do not bundle USWDS for downstream clients; consuming applications are responsible for including USWDS stylesheets themselves.

The repository is organized as a monorepo so teams can define design tokens once and reuse them across framework packages, documentation apps, and implementation examples.

## Repository structure

### `packages/`
Reusable libraries and tooling that power the platform:

- `tokens/`: source design tokens and build outputs (CSS variables and JS exports)
- `core/`: framework-agnostic component primitives (HTML/CSS/JS)
- `cli/`: command-line tooling for scaffolding and workflow automation

### `apps/`
Applications used to document and develop the system:

- `storybook/`: interactive component documentation for core and React components (includes local USWDS dependency for development/rendering)
- `docs/`: platform documentation site (guides, usage, and references)

### `examples/`
Reference implementations that demonstrate integration patterns:

- `django-demo/`: example Django application using platform packages
- `react-demo/`: example React application using platform packages

## Run commands from root

Use the root `package.json` scripts to run tasks across the monorepo:

```bash
pnpm build
pnpm dev
pnpm lint
pnpm test
```

These scripts are already configured to run recursively across workspaces.

## Storybook composition workflow

Run all framework Storybooks plus the host Storybook (for composition refs):

```bash
pnpm dev:storybook:all
```

Run only framework remotes:

```bash
pnpm dev:storybook:remotes
```

Run only the host:

```bash
pnpm dev:storybook:host
```

Build all Storybooks:

```bash
pnpm build:storybook:all
```

## Local development

From the repository root, run dev-mode scripts everywhere they exist:

```bash
pnpm install
pnpm dev
```
