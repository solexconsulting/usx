import React from 'react';
import spacing from '../../../tokens/src/primitives/spacing.json';

export default {
  title: 'Spacing',
  tags: ['autodocs']
};

export const Scale = {
  render: () => (
    <div>
      {Object.entries(spacing).map(([name, value]) => (
        <div key={name} style={{ marginBottom: '1rem' }}>
          <div><strong>{name}</strong> — <code>{value}</code></div>
          <div style={{ height: '0.75rem', width: value, background: '#005ea2', marginTop: '0.25rem' }} />
        </div>
      ))}
    </div>
  )
};
