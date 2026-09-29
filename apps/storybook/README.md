Storybook app for documenting USX components.

This is a single Storybook host (no composed/remote Storybooks) that renders
stories from `packages/usx-stories/src/**`. Each component in `packages/usx-react`
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
- `Patterns/Building Blocks`: Page Header, Form Section, Status/Metric Card,
  Empty State, Destructive Action, and Review/Confirmation compositions
- `Patterns/Search Results`, `Patterns/Data Table`: interactive compositions
  with normal, loading, empty/no-results, server-error, permission-denied,
  and incomplete-data stories
- `Examples/*`: concrete pages using patterns, including Applications and
  ordered Step Indicator / unordered Task List workflows
- `States/Form Controls`: the existing React/Django field-error reference

Pattern implementations live alongside their stories in
`packages/usx-stories/src/patterns`. They compose existing USX components and
utilities; they are not new exports from `@solexllc/usx-react`. Full-page examples
reuse these implementations rather than maintaining separate versions.

SearchResults and AdvancedSearchFilters are consolidated into one search pattern.
The documentation search retains `examples-data-display--search-results`; funding
and deadline filters are available in `examples-data-display--funding-programs`.
Login and Address now live under Authentication and Data Collection respectively,
instead of Examples/Patterns. Their IDs are `examples-authentication--login` and
`examples-data-collection--address-form`.

The remaining audited pages (Blog, FAQ, Product Showcase, Profile, Dashboard,
Contact, Settings, Address, and Login) represent distinct page archetypes and
are retained. Dashboard reuses the Metric Card pattern. This consolidation does
not imply that every older example has been converted to a working application.

New search, application-table, and workflow stories use deterministic local data.
Search and filters work locally; table exports download JSON; deletion and
workflow submission only update in-memory state. Reloading resets the examples.
Workflow validation, review/edit, success, and submission-error states share the
same compositions as the normal workflow. Error recovery is simulated, not a
backend integration.

A "Filter by technology" toolbar control (`.storybook/technologyToggle.jsx`)
lets you switch the sidebar between React/Django/HTML/All without losing your
place, by jumping to the matching story in the target technology when one
exists.

> Collapsing the React/Django/HTML trees into a single per-component node with
> the technology as a per-story toggle (rather than a separate top-level tree)
> is a larger, not-yet-implemented restructuring — see
> [plan-storybookArchitecture.md](../../plan-storybookArchitecture.md).

## Running the Django-rendered stories

Django stories require the companion Django app to be running — see
[../storybook-django/README.md](../storybook-django/README.md) for setup.

Storybook resolves the Django server URL from `window.USX_DJANGO_URL` (set via
`env-config.js` at container/deploy time) or falls back to
`http://<current-hostname>:9090`. React and HTML stories work without the
Django server running.

## Run

From the repository root:

- `pnpm dev` — starts the `tokens` watcher and this app's Storybook dev server
  on port 6006; Sass under `packages/*/src` recompiles and reloads live
- `pnpm storybook:build` — static build into `storybook-static/`

Both of this app's own scripts (`dev`, `build`) build `packages/usx-theme` first so
`theme.css` exists before Storybook starts.

### Focused Development

Limit the development story index to a folder, a technology, or both:

```bash
STORYBOOK_STORY_PATH=components/footer pnpm dev
STORYBOOK_TECHNOLOGY=React pnpm dev
STORYBOOK_STORY_PATH=components/footer STORYBOOK_TECHNOLOGY=React pnpm dev
STORYBOOK_STORY_PATH=examples pnpm dev
```

`STORYBOOK_STORY_PATH` is a folder relative to `packages/usx-stories/src`.
`STORYBOOK_TECHNOLOGY` accepts `React`, `Django`, or `HTML`; stories without a
technology suffix (such as examples and documentation) remain included within
the selected folder. Imported dependencies can still load across technologies.
Restart the dev server after changing these environment variables. Without them,
all stories are indexed. Production builds always include the full catalog.

JS and story edits use Vite's normal HMR. The custom full-reload fallback is
limited to package Sass files, including theme source variables and generated
hooks. Runtime theme CSS uses normal CSS HMR, and the theme builder only writes
outputs whose contents changed. Filesystem polling remains enabled for this
workspace's mount.

Run the development-config regression checks with:

```bash
node --test apps/storybook/.storybook/main.test.mjs
```

## Login example provider buttons

The login pattern uses USX components and SOLEX branding. Account, recovery, and
provider actions only announce a demo status; they do not send credentials or
start OAuth. A consuming application must supply its own authentication handlers.

Provider options are plain USX `Button` placeholders using different color variants,
not branded authentication controls. Production integrations must follow the
respective provider's current branding requirements.
