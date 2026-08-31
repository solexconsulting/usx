import React from 'react';

export default {
  title: 'Documentation/Theme/Getting Started',
  tags: ['autodocs']
};

export const GettingStarted = {
  render: () => (
    <div className="usa-prose" style={{ maxWidth: '840px' }}>
      <h1>Getting started with @solexllc/usx-theme</h1>
      <p>
        <code>@solexllc/usx-theme</code> is the design-token and runtime-theming
        layer that <code>@solexllc/usx</code> is built on. If you already have{' '}
        <code>@solexllc/usx</code> compiling, adding theming is a two-step change:
        load one generated stylesheet, and (optionally) forward one Sass partial
        before your component styles.
      </p>

      <h2>1. Install</h2>
      <p>Both packages are published together; install whichever you don't already have:</p>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0', overflowX: 'auto' }}>
{`pnpm add @solexllc/usx @solexllc/usx-theme`}
      </pre>

      <h2>2. Load the runtime defaults</h2>
      <p>
        <code>@solexllc/usx-theme</code> ships a generated stylesheet that defines
        every themeable <code>--usx-*</code> custom property on <code>:root</code> at
        its USWDS-matching default value. Your compiled <code>@solexllc/usx</code> CSS
        emits bare <code>var(--usx-*)</code> references with no fallback, so this file
        must be loaded for the themed build to render anything.
      </p>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0', overflowX: 'auto' }}>
{`// once, at your app's entry point
import '@solexllc/usx-theme/theme.css';`}
      </pre>

      <h2>3. Compile the themed entry point</h2>
      <p>
        <code>@solexllc/usx</code> ships two Sass entry points. Pick one — they are
        not meant to be combined:
      </p>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Entry point</th>
            <th>Output</th>
            <th>Use when</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@solexllc/usx</code> (<code>src/index.scss</code>)</td>
            <td>Static values baked in at build time.</td>
            <td>You never need to re-theme without a rebuild.</td>
          </tr>
          <tr>
            <td><code>@solexllc/usx/themed</code> (<code>src/themed.scss</code>)</td>
            <td>Bare <code>var(--usx-*)</code> references, no fallback.</td>
            <td>
              You want to theme at runtime — via the Playground's exported CSS, a
              per-tenant stylesheet, or live user customization.
            </td>
          </tr>
        </tbody>
      </table>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0', overflowX: 'auto' }}>
{`// your application's Sass entry point
@use 'pkg:@solexllc/usx/themed';`}
      </pre>
      <p>
        The themed entry point internally loads <code>@solexllc/usx-theme/hooks</code> — a
        generated partial that turns on every CSS-variable hook — before compiling
        component styles, so you don't need to load it yourself.
      </p>

      <h2>Overriding tokens</h2>
      <p>Once the themed build is in place, override any token by setting its custom property anywhere in the cascade:</p>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0', overflowX: 'auto' }}>
{`:root {
  --usx-color-primary: #b00020;
  --usx-color-primary-hover: #8a0018;
  --usx-color-primary-active: #6c0013;
}`}
      </pre>
      <p>
        The fastest way to build that block is the <strong>Documentation/Theme →
        Playground</strong> page: it renders every component live against your
        edits and exports a ready-to-paste <code>:root</code> block (changed
        tokens only, or the full set).
      </p>

      <h3>Two important rules</h3>
      <ul>
        <li>
          <strong>Derived shades are independent tokens.</strong> Overriding{' '}
          <code>--usx-color-primary</code> does <em>not</em> recompute{' '}
          <code>--usx-color-primary-hover</code> or <code>-darker</code>/<code>-lighter</code> variants —
          set each shade you care about. The Playground's auto-derive toggle does
          this math for you and includes the results in its export.
        </li>
        <li>
          <strong>Compile-time-only values can't be themed at runtime.</strong> Breakpoints,
          media queries, and the <code>units()</code> function are plain Sass — CSS
          cannot substitute a <code>var()</code> inside a media query.
        </li>
      </ul>

      <h2>Compile-time configuration instead</h2>
      <p>
        If you don't need runtime theming, skip the themed entry point and
        configure tokens at build time via Sass module configuration instead —
        the output contains zero <code>var()</code> references:
      </p>
      <pre style={{ padding: '0.75rem', background: '#f0f0f0', overflowX: 'auto' }}>
{`@use 'pkg:@solexllc/usx-theme/variables' with (
  $usx-color-primary-var: null,   // opt this one token out of runtime theming
);
@use 'pkg:@solexllc/usx';`}
      </pre>

      <h2>Where tokens live</h2>
      <p>
        Every token is declared once in{' '}
        <code>packages/tokens/src/_variables.scss</code> (the Sass side) and mirrored
        in <code>packages/tokens/src/theme-manifest.js</code> (name, CSS variable,
        default value, and grouping — the single source of truth for the
        generated <code>theme.css</code>, <code>_hooks.scss</code>, and the
        Playground's controls). See <strong>Documentation/Theme → Tokens</strong>{' '}
        for the full generated reference, and <strong>Documentation/Theme →
        Colors</strong> / <strong>Spacing</strong> / <strong>Typography</strong> for
        topic-specific breakdowns.
      </p>
    </div>
  )
};
