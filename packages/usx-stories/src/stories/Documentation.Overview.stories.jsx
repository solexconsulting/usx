import React from 'react';

export default {
  title: 'Documentation/Overview',
  tags: ['autodocs']
};

export const Overview = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
      <h1>USX</h1>
      <p>
        USX is a token-driven layer on top of the{' '}
        <a href="https://designsystem.digital.gov/" target="_blank" rel="noopener noreferrer">
          U.S. Web Design System (USWDS)
        </a>. It does not replace or fork USWDS — every component keeps its
        original <code>usa-*</code> classes and markup. USX adds passive{' '}
        <code>usx-*</code> hooks alongside them for agency-level branding and
        runtime theming, and fills in a handful of components USWDS doesn't
        ship (Attribution, Avatar, Block, Swap, Switch, and more).
      </p>

      <h2>Packages</h2>
      <p>This repository (<code>agency-ui-platform</code>) publishes four scoped packages:</p>
      <table className="usa-table usx-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Package</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@solexllc/usx</code></td>
            <td>
              The component Sass layer — <code>.usx-*</code> classes compiled on top of
              USWDS, plus utility classes. Framework-agnostic; works with plain HTML,
              Django templates, or any JS framework. See <strong>Documentation/USX</strong>.
            </td>
          </tr>
          <tr>
            <td><code>@solexllc/usx-theme</code></td>
            <td>
              Design tokens and the runtime theming system: Sass variables, generated
              CSS custom properties, and the theme manifest that drives the Theme
              Playground. See <strong>Documentation/Theme</strong>.
            </td>
          </tr>
          <tr>
            <td><code>@solexllc/usx-react</code></td>
            <td>
              React component wrappers around the same markup/classes as{' '}
              <code>@solexllc/usx</code>. Optional — you can use USX's CSS without it.
              See <strong>Documentation/USX React</strong>.
            </td>
          </tr>
          <tr>
            <td><code>@solexllc/usx-uswds-fixes</code></td>
            <td>
              Small, unbranded corrections to upstream USWDS component CSS (no USX
              theming involved). Loaded automatically by <code>@solexllc/usx-react</code>'s
              styles; can be loaded standalone by non-React consumers.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Minimal setup</h2>
      <ol>
        <li>Load USWDS's own CSS/JS in your application (USX does not bundle it).</li>
        <li>Add <code>@solexllc/usx-theme</code> and <code>@solexllc/usx</code>, and compile <code>@solexllc/usx</code>'s Sass entry point into your build.</li>
        <li>
          Optionally add <code>@solexllc/usx-react</code> if you're building in React;
          otherwise use plain HTML/Django markup with the same <code>usx-*</code> classes.
        </li>
        <li>Configure branding by setting <code>--usx-*</code> CSS custom properties, or leave everything at its USWDS-matching default.</li>
      </ol>

      <h2>Where to go next</h2>
      <ul>
        <li><strong>Documentation/Theme → Getting Started</strong> — installing and wiring up <code>@solexllc/usx-theme</code>.</li>
        <li><strong>Documentation/Theme → Playground</strong> — a live theme editor that exports a ready-to-use CSS block.</li>
        <li><strong>Documentation/USX → Overview</strong> — the architecture and design principles behind the component layer.</li>
        <li><strong>Documentation/USX React → Overview</strong> — using the React wrappers.</li>
        <li><strong>Components/*</strong> — every component, with React, Django, and HTML story variants.</li>
      </ul>
    </div>
  )
};
