import React from 'react';
import colors from '../../../../packages/tokens/src/color.json';

export default {
  title: 'Colors',
  tags: ['autodocs']
};

export const Palette = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: '1rem' }}>
      {Object.entries(colors).map(([name, value]) => (
        <div key={name} style={{ border: '1px solid #dfe1e2', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ height: '64px', background: value }} />
          <div style={{ padding: '0.75rem' }}>
            <strong>{name}</strong>
            <div><code>{value}</code></div>
          </div>
        </div>
      ))}
    </div>
  )
};
