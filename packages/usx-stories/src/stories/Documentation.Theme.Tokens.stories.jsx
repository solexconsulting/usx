import React from 'react';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';
import { useLiveTokenValues, getRawLiveValue } from '../utils/useLiveTokenValues.js';

export default {
  title: 'Documentation/Theme/Tokens',
  tags: ['autodocs']
};

const GROUP_LABELS = {
  color: 'Color',
  spacing: 'Spacing',
  radius: 'Radius (primitive)',
  'radius-advanced': 'Radius (per-component override)',
  border: 'Border width',
  'border-advanced': 'Border width (per-component override)',
  typography: 'Typography',
  'typography-advanced': 'Typography (per-component override)',
  component: 'Component'
};

const GROUP_ORDER = Object.keys(GROUP_LABELS);

function TokenTable({ tokens, live }) {
  return (
    <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Token</th>
          <th>CSS variable</th>
          <th>Default</th>
          <th>Current</th>
          <th>Derived from</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((t) => {
          const current = getRawLiveValue(live, t);
          const isSame = current === t.defaultValue;

          return (
            <tr key={t.name}>
              <td><code>${t.name}</code></td>
              <td><code>{t.cssVar}</code></td>
              <td><code>{t.defaultValue}</code></td>
              <td>
                {isSame ? (
                  <span
                    title="Unchanged from default"
                    style={{ color: '#71767a', cursor: 'help', fontWeight: 'bold' }}
                  >
                    ←
                  </span>
                ) : (
                  <code>{current}</code>
                )}
              </td>
              <td>{t.derivedFrom ? <code>${t.derivedFrom}</code> : '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const AllTokens = {
  render: (args, context) => {
    const live = useLiveTokenValues(context.globals.theme);
    // Internal tokens (e.g. paired padding values a select control writes
    // alongside its own public token) are implementation detail, not part of
    // the public theming surface — leave them out of the reference table.
    const publicTokens = themeManifest.filter((t) => !t.internal);
    const byGroup = GROUP_ORDER.map((group) => ({
      group,
      label: GROUP_LABELS[group],
      tokens: publicTokens.filter((t) => t.group === group)
    })).filter((g) => g.tokens.length > 0);

    return (
      <div className="usa-prose" style={{ maxWidth: '960px' }}>
        <h1>Theme tokens</h1>
        <p>
          Generated directly from <code>@solexllc/usx-theme</code>'s theme
          manifest ({publicTokens.length} public tokens) — this table can never
          drift out of sync with the compiled CSS. The <strong>Current</strong>{' '}
          column reflects whichever theme is active in the toolbar above —
          switch it to see these values update. See{' '}
          <strong>Documentation/Theme → Getting Started</strong> for how to
          override any of these, and <strong>Documentation/Theme →
          Playground</strong> for a live editor.
        </p>
        {byGroup.map(({ group, label, tokens }) => (
          <section key={group} style={{ marginBottom: '2rem' }}>
            <h2>{label}</h2>
            <TokenTable tokens={tokens} live={live} />
          </section>
        ))}
      </div>
    );
  }
};
