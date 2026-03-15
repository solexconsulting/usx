Design tokens package for agency-ui-platform.

This package stores platform-agnostic tokens in JSON source files and compiles them for CSS and JavaScript consumers.

## Structure

- `src/color.json`: color tokens (`primary`, `secondary`, `background`, `surface`, `text`)
- `src/spacing.json`: spacing scale tokens (`xs`, `sm`, `md`, `lg`, `xl`)
- `src/typography.json`: typography tokens
- `src/radius.json`: border radius tokens
- `dist/tokens.css`: generated CSS variables
- `dist/tokens.js`: generated JS export

## Build

Run:

`pnpm build`

from this package directory to compile source tokens into `dist/`.