Core component library for agency-ui-platform.

This package uses a self-contained component structure where each component owns its canonical HTML, CSS, optional JavaScript behavior, and framework wrappers.

USWDS is treated as an external foundation. This package does not bundle USWDS assets; consuming applications should load USWDS styles in their own application bundle.

## Structure

- `src/components/<component>/`
	- `<component>.html`: canonical HTML markup
	- `<component>.css`: token-based component styling
	- `<component>.js`: optional browser behavior helper
	- `react.jsx`: React wrapper for the same HTML/class structure
	- `django.py`: Django rendering helpers/template tags
	- `README.md`: usage documentation for HTML, React, and Django
- `src/styles/`
	- `_variables.scss`: token variable import layer
	- `core.scss`: global import bundle for core component styles
- `src/scripts/`
	- `global.js`: global interactive helpers/factory
- `src/index.js`: exports all React wrappers from component folders
- `dist/`: build output target

## Components

- `button`
- `input`
- `alert`

## Token usage

Component CSS files consume design token variables (for example `--color-primary`, `--spacing-md`, `--radius-md`, and typography variables).

Load `src/styles/core.scss` (or equivalent compiled output) so tokens and component styles are available together.

All `usx-*` classes are passive override hooks by default. They are intentionally no-op until a consuming application provides custom overrides.