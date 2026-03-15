Node CLI package for agency-ui-platform.

This package exposes the `agency-ui` command for scaffolding UI-related files.

## Structure

- `src/index.js`: CLI entry point
- `src/commands/create-component.js`: component scaffold command
- `src/commands/create-theme.js`: theme scaffold command

## Commands

- `agency-ui create-component <name>`
- `agency-ui create-theme <name>`

Examples:

- `agency-ui create-component button`
- `agency-ui create-theme nih`

For local development without global install:

- `node src/index.js create-component button`
- `node src/index.js create-theme nih`