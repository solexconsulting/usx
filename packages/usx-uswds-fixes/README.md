Small SCSS patches and overrides layered on top of upstream USWDS.

This package fixes specific USWDS component styling gaps/regressions (no USX
branding or theming) — a place for generic corrections that should apply
regardless of which design system (USX or plain USWDS) a consumer is using.

## Structure

- `src/index.scss`: aggregated entry point — `@forward`s every fix module below
- `src/components/`: one partial per fixed USWDS component (`_checkbox.scss`, `_header.scss`, `_radio-buttons.scss`, `_search.scss`, `_step-indicator.scss`)

## Usage

```scss
@use 'pkg:@solexllc/usx-uswds-fixes';
```

`@solexllc/usx-react`'s `src/styles/core.scss` already includes this
alongside `@solexllc/usx`, so most consumers get it for free — see
[packages/usx-react/README.md](../usx-react/README.md).

## Adding a fix

Add a new `_<component>.scss` partial under `src/components/` and `@forward`
it from `src/index.scss`.
