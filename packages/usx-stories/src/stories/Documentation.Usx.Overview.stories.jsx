import React from 'react';

export default {
  title: 'Documentation/USX/Overview',
  tags: ['autodocs']
};

export const Overview = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
      <h1>@solexllc/usx</h1>
      <p>
        <code>@solexllc/usx</code> is the Sass/CSS layer of USX — a set of{' '}
        <code>.usx-*</code> classes compiled on top of USWDS, plus a small
        utility-class library. It is framework-agnostic: the same compiled CSS
        works with plain HTML, Django templates, or the{' '}
        <code>@solexllc/usx-react</code> component wrappers, because none of
        them are required to produce the markup — they're just three ways of
        writing the same classes.
      </p>

      <h2>Design principle: additive, never a fork</h2>
      <p>
        Every USX component keeps a real USWDS component's original{' '}
        <code>usa-*</code> class names and DOM structure untouched. USX never
        redefines a <code>usa-*</code> selector's own rules — it only adds new,
        separate <code>usx-*</code>-scoped selectors alongside them (e.g.{' '}
        <code>.usx-accordion .usa-accordion__button</code>, not{' '}
        <code>.usa-accordion__button</code> on its own). Concretely, that means:
      </p>
      <ul>
        <li>Remove USX entirely and every component still renders and behaves as plain USWDS.</li>
        <li>A future USWDS upgrade only has to reconcile the small, additive USX layer — not a divergent fork of USWDS's own CSS.</li>
        <li>Consumers who don't need branding pay no cost: an unthemed build's <code>usx-*</code> rules are either absent or resolve to the exact value USWDS already used.</li>
      </ul>

      <h2>How theming plugs in without breaking that rule</h2>
      <p>
        Tokens live entirely in <code>@solexllc/usx-theme</code> (see{' '}
        <strong>Documentation/Theme</strong>) and reach USX components only
        through published Sass variables — component Sass never references a
        raw hex value or writes a <code>var()</code> literally. Each token
        resolves one of three ways depending on how the token's hook is
        configured:
      </p>
      <ol>
        <li><strong>Hook unset (default):</strong> the token is <code>null</code>, so any Sass rule that reads it is dropped entirely by the compiler — output is byte-identical to not having the rule at all.</li>
        <li><strong>Compile-time override:</strong> configuring the token via Sass <code>with (...)</code> bakes a static value into the compiled CSS.</li>
        <li><strong>Runtime hook enabled:</strong> the token compiles to <code>var(--usx-*, &lt;default&gt;)</code>, themeable by any CSS custom property in the cascade — no rebuild needed.</li>
      </ol>
      <p>
        This is why USX can offer full runtime theming without ever hand-coding
        <code>var()</code> inside a component file, and why unthemed output is
        provably identical to USWDS defaults instead of "close, hopefully".
      </p>

      <h2>Components USWDS doesn't ship</h2>
      <p>
        A handful of components in this library have no real USWDS
        counterpart at all (Attribution, Avatar, Block, Swap, Switch, and more). These
        are USX-original — they follow the same token-driven pattern as
        everything else, but their sensible-default values are baked directly
        into the component's own Sass file (since there's no upstream USWDS
        rule to fall back to) rather than living in the shared token file.
        They're badged <strong>USX</strong> in the Storybook sidebar, versus{' '}
        <strong>USWDS</strong> for components with a real upstream original, or{' '}
        <strong>USWDS-Inspired</strong> for components that extend a USWDS
        pattern beyond what USWDS itself defines.
      </p>

      <h2>Utility classes</h2>
      <p>
        Beyond components, <code>@solexllc/usx</code> ships a small set of
        token-driven utility classes (color, radius, sizing, and simple
        animations) — see <strong>Documentation/USX → Utilities</strong> for
        the full list.
      </p>

      <h2>Build entry points</h2>
      <table className="usa-table usx-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Import</th>
            <th>Produces</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@solexllc/usx</code></td>
            <td>Static CSS with values baked in at compile time.</td>
          </tr>
          <tr>
            <td><code>@solexllc/usx/themed</code></td>
            <td>Runtime-themeable CSS (bare <code>var(--usx-*)</code>, no fallback) — pairs with <code>@solexllc/usx-theme/theme.css</code>.</td>
          </tr>
          <tr>
            <td><code>@solexllc/usx/utilities</code></td>
            <td>Just the utility classes, without any component styles.</td>
          </tr>
        </tbody>
      </table>
      <p>See <strong>Documentation/Theme → Getting Started</strong> for the full setup walkthrough.</p>
    </div>
  )
};
