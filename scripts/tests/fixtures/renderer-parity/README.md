# Renderer parity

Run `pnpm test:parity` from the repository root. It runs two shared checks:

- `scripts/tests/renderer-parity.mjs` renders every component's contract example
  and the `.jsx` regression fixtures in this directory through React and Django directly.
  It uses the strict shared comparator, without ignored attributes or exceptions.
- `snapshots check` then compares the committed React and Django snapshots for
  every component with stories, using the existing snapshot expectations.

Direct results are saved per component in `reports/results/parity/` and included
permanently in the Storybook **Snapshot report**. Each run updates the report even
when cases fail. The report shows case counts, failures with their props and
markup excerpts, and the last run time. Changes to renderers, contracts, fixtures,
or shared rendering dependencies mark saved results stale when the report is
rebuilt. A change to a nested renderer can affect any parent, so freshness is
conservative across the library. `pnpm snapshots report` rebuilds the report from
saved results without rerunning checks. Missing results appear as **Not run**;
the generated reports are local artifacts, not committed test baselines.

The direct check uses `apps/storybook-django/venv/bin/python`, or `USX_TEST_PYTHON`
for another interpreter with the Django requirements installed. No server is
needed. Both renderers use the same static asset root.
Contract examples serialize rich slots as HTML; only props declared as slots
are decoded to equivalent React nodes. Ordinary strings stay strings.

Each fixture exports an array of component groups:

```jsx
export default [{
  component: 'tag',
  bases: [{ children: 'Status' }],
  edges: [{ children: 0 }],
  cases: [{ label: 'custom class', props: { className: 'host-tag' } }],
}];
```

For each base, the runner also varies contract booleans, select options, empty
strings/arrays, and scalar slots. Edges extend the first base. Named cases use
their supplied props directly; optional `reactProps` supports equivalent React
nodes and Django HTML in composition slots. Component-specific setup belongs in
fixtures, not branches in the runner.
Use `safeProps: ['title']` on a named case to pass explicitly trusted Django
markup for a slot. Without it, Django receives an ordinary string, which may be
escaped by the component.

Every component has a direct contract-example check; regression fixtures add
coverage for Chat and other components. Neither finite test suite proves parity for every possible prop
combination. Existing snapshot expectations are not exemptions from the
same-props requirement. Add direct regression cases when fixing differences in
other components. Authored HTML examples and snapshot interactions continue to
use the existing HTML story play tests.
