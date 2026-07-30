import React from 'react';

export default {
  title: 'Foundations/Overview',
  tags: ['autodocs']
};

export const LibraryOverview = {
  render: () => (
    <div style={{ maxWidth: '840px', lineHeight: 1.5 }}>
      <h2>agency-ui-platform</h2>
      <p>
        Token-driven component layer on top of USWDS. Core components keep USWDS classes and add passive
        <code> usx-*</code> hooks for agency-level customization.
      </p>
      <h3>How to use</h3>
      <ol>
        <li>Load USWDS styles in your application.</li>
        <li>Load design tokens and core styles.</li>
        <li>Use HTML, JS, React, or Django wrappers based on your stack.</li>
        <li>Configure <code>--usx-*</code> tokens to opt into overrides.</li>
      </ol>
    </div>
  )
};
