# @solexllc/usx-contracts

Machine-readable contracts for USX components. The manifest describes component
props, versions, and React and Django renderer bindings so consuming applications
can discover and use the library through a single contract interface.

## Usage

Install the package:

```sh
pnpm add @solexllc/usx-contracts
```

Import the manifest in JavaScript:

```js
import { componentContracts } from '@solexllc/usx-contracts';

const button = componentContracts.components.button;
const { version, props, required, renderers } = button;
```

The same manifest is available as plain JSON through the package export
`@solexllc/usx-contracts/contracts.json`, backed by
`dist/component-contracts.json`. The Python distribution, `solex-usx-django`,
bundles the same manifest.

The contracts package supplies metadata. Install the renderer package and USX
styles needed by your application separately.

## Manifest structure

| Field | Description |
| --- | --- |
| `library` | Library identifier: `usx`. |
| `schemaVersion` | Version of the manifest format. |
| `packages` | Package names mapped to their registry (`npm` or `pypi`) and exact version represented by the manifest. Includes contracts, React, styles, and Django packages. |
| `components` | Component contracts keyed by component name. |

Each component contract contains:

| Field | Description |
| --- | --- |
| `component` | Component name, matching its key in `components`. |
| `version` | Version of this component's contract. |
| `required` | Names of props consumers must supply for meaningful rendering. |
| `props` | Prop definitions, including types, descriptions, and optional defaults or nested shapes. |
| `renderers` | Bindings to the React and Django implementations. |
| `examples.default` | Optional sample props from the component's source metadata. |

### Props and examples

Prop types include `string`, `number`, `boolean`, `select`, `array`, `object`,
`function`, and `slot`. A type can also be an array describing a union. Definitions
can include `options`, `items`, and `properties` for selectable values and nested
shapes. These definitions use the USX contract vocabulary.

A prop's `component` field references another entry in the same manifest. Resolve
that entry's props, exclude names listed in `omit`, and apply the referencing
node's `properties` as overrides or additions. On an array prop, the reference
describes each item's shape. References are kept by name; consumers should account
for cycles when traversing them.

`examples.default` contains sample content from the source `config.default`.
Declared prop defaults are recorded at `props[name].default`. Renderer behavior
can differ when props are omitted; supply explicit values where reproducible
rendering matters.

### Renderer metadata

`renderers.react` identifies the npm `package` and named `export` for a component.
For example, the `sidenav` component's export is `SideNav`.

`renderers.django` identifies the Python `package`, `module`, rendering `function`,
`component` argument, `template`, and template `tag`. These bindings describe the
implementation entry points; the manifest does not load or execute them.

Individual props can describe renderer differences through their own `renderers`
field. For example, the icon's inline style prop accepts different types:

```json
{
  "type": ["string", "object"],
  "description": "Inline styles for an icon.",
  "renderers": {
    "react": { "type": "object" },
    "django": { "type": "string" }
  }
}
```

A renderer annotation with `supported: false` means that implementation does not
consume the prop. Consuming applications use this metadata to determine their
editing, validation, and rendering behavior.

## Versioning

Manifest format versions (`schemaVersion`), individual component contract
versions (`components[name].version`), and package release versions (`packages`)
are independent identifiers.

Each manifest describes a snapshot of the library. Applications that persist
content should retain its component contract versions and the complete manifest
snapshot or corresponding package releases. Resolve cross-component references
within that snapshot.

Historical contracts describe the implementations from their associated releases;
they do not guarantee compatibility with newer renderer packages. Consuming
applications manage historical package resolution and content migrations.

## Development

Component contracts are authored in each component's `config.json` under
`packages/usx-react/src/components/`. Package identities and renderer bindings are
added during generation. Do not edit generated manifest files by hand.

Run these commands from the repository root:

```sh
pnpm generate:contracts
pnpm --filter @solexllc/usx-contracts build
pnpm validate:configs
pnpm test:contracts
```

`generate:contracts` writes `src/contracts.js`. The package build regenerates that
file and writes `dist/component-contracts.json`; the JSON build output is
gitignored. Regenerate after component metadata or package versions change.

`validate:configs` checks component metadata and generated-manifest freshness.
`test:contracts` checks renderer bindings, example/default separation, and prop
metadata. `pnpm generate:django` embeds the manifest in the Python package.
