import React from 'react';
import typography from '../../../tokens/src/primitives/typography.json';

export default {
  title: 'Typography',
  tags: ['autodocs']
};

export const TypeScale = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Typography tokens</h2>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0' }}>
        {JSON.stringify(typography, null, 2)}
      </pre>
      <p style={{ fontFamily: typography.fontFamilyBase, fontSize: typography.fontSizeBase, lineHeight: typography.lineHeightBase }}>
        Sample text using base typography tokens.
      </p>
    </div>
  )
};
