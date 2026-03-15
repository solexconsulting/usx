import React from 'react';
import colors from '../../../../packages/tokens/src/color.json';
import spacing from '../../../../packages/tokens/src/spacing.json';
import typography from '../../../../packages/tokens/src/typography.json';

export default {
  title: 'Tokens',
  tags: ['autodocs']
};

function TokenTable({ title, values }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3>{title}</h3>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(values).map(([token, value]) => (
            <tr key={token}>
              <td><code>{token}</code></td>
              <td><code>{String(value)}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Color = {
  render: () => <TokenTable title="Color" values={colors} />
};

export const Spacing = {
  render: () => <TokenTable title="Spacing" values={spacing} />
};

export const Typography = {
  render: () => <TokenTable title="Typography" values={typography} />
};
