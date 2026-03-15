Storybook app for documenting agency-ui-platform components.

This app is the Storybook host. It can render local stories and compose other Storybook instances for framework-specific implementations.

Local stories document components from `packages/core`, including:

- React wrappers in each component folder (`react.jsx`)
- Canonical raw HTML markup examples (`*.html`)

## Story hierarchy

- `Admin/*`: library overview and usage guidance
- `Foundations/*`: tokens, color, spacing, and typography
- `Components/*`: one story file per component (`Button`, `Input`, `Alert`) with technology-focused stories:
	- `React`
	- `HTML`
	- `JS`
	- `DjangoTemplateTag`
	- `DjangoRenderedEquivalent`

## Storybook Composition

The host is configured with `refs` in `.storybook/main.js` and expects external Storybooks at:

- React: `http://localhost:7007`
- HTML: `http://localhost:7008`
- JavaScript: `http://localhost:7009`
- Django: `http://localhost:7010`

Remote app locations in this monorepo:

- `apps/storybook-react`
- `apps/storybook-html`
- `apps/storybook-js`
- `apps/storybook-django`

Override each URL with environment variables:

- `STORYBOOK_REACT_URL`
- `STORYBOOK_HTML_URL`
- `STORYBOOK_JS_URL`
- `STORYBOOK_DJANGO_URL`

## Run

From this directory:

- `npm install`
- `npm run dev`

For composition, start the framework-specific Storybooks on their ports first, then run the host.

From repository root, you can launch host + remotes together with:

- `pnpm dev:storybook:all`

Build static Storybook:

- `npm run build`