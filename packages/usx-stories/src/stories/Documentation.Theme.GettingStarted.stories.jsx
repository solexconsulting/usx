import React from 'react';
import Code from '../../../usx-react/src/components/code/Code';

export default {
  title: 'Documentation/Theme/Getting Started',
  tags: ['autodocs']
};

export const GettingStarted = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
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
      <Code
        lines={[
          {
            code: "pnpm add @solexllc/usx @solexllc/usx-theme",
          },
        ]}
      />

      <h2>2. Load the runtime defaults</h2>
      <p>
        <code>@solexllc/usx-theme</code> ships a generated stylesheet that defines
        every themeable <code>--usx-*</code> custom property on <code>:root</code> at
        its USWDS-matching default value. Your compiled <code>@solexllc/usx</code> CSS
        emits bare <code>var(--usx-*)</code> references with no fallback, so this file
        must be loaded for the themed build to render anything.
      </p>
      <Code
        lines={[
          {
            code: "// once, at your app's entry point",
          },
          {
            code: "import '@solexllc/usx-theme/theme.css';",
          },
        ]}
      />

      <h2>3. Compile the themed entry point</h2>
      <p>
        <code>@solexllc/usx</code> ships two Sass entry points. Pick one — they are
        not meant to be combined:
      </p>
      <table className="usa-table usx-table usa-table--borderless" style={{ width: '100%' }}>
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
      <Code
        lines={[
          {
            code: "// your application's Sass entry point",
          },
          {
            code: "@use 'pkg:@solexllc/usx/themed';",
          },
        ]}
      />
      <p>
        The themed entry point internally loads <code>@solexllc/usx-theme/hooks</code> — a
        generated partial that turns on every CSS-variable hook — before compiling
        component styles, so you don't need to load it yourself.
      </p>

      <h2>Overriding tokens</h2>
      <p>Once the themed build is in place, override any token by setting its custom property anywhere in the cascade:</p>
      <Code
        lines={[
          {
            code: ":root {",
          },
          {
            code: "  --usx-color-primary: #b00020;",
          },
          {
            code: "  --usx-color-primary-hover: #8a0018;",
          },
          {
            code: "  --usx-color-primary-active: #6c0013;",
          },
          {
            code: "}",
          },
        ]}
      />
      <p>
        The fastest way to build that block is the <strong>Documentation/Theme →
        Playground</strong> page: it renders every component live against your
        edits and exports a ready-to-paste block (changed tokens only, or the
        full set) in any of the formats below.
      </p>

      <h2>Prebuilt themes</h2>
      <p>
        The Playground's presets (Forest, Ocean, Carbon, GOV.UK, …) ship prebuilt.
        List the ones you want in your Sass entry point — anything you don't list
        stays out of your bundle. Themes apply via a <code>data-theme</code>{' '}
        attribute; <code>$default</code> also applies with no attribute at all, and{' '}
        <code>$prefersdark</code> under <code>prefers-color-scheme: dark</code>.
      </p>
      <Code
        lines={[
          { code: "// your application's Sass entry point" },
          { code: "@use 'pkg:@solexllc/usx/themed';" },
          { code: "@use 'pkg:@solexllc/usx-theme/themes' with (" },
          { code: "  $themes: (forest, carbon, gov-uk)," },
          { code: "  $default: forest," },
          { code: "  $prefersdark: carbon," },
          { code: ");" },
        ]}
      />
      <Code
        lines={[
          { code: '<html data-theme="gov-uk">' },
        ]}
      />
      <p>
        Every theme block emits the union of tokens across the themes you
        included (falling back to the <code>:root</code> default), so switching{' '}
        <code>data-theme</code> — even on a nested element — never leaks a value
        from the previous theme.
      </p>
      <p>
        Not using Sass for this? Each theme is also a plain stylesheet you can
        import individually (or all at once via{' '}
        <code>@solexllc/usx-theme/themes.css</code>) and switch with{' '}
        <code>data-theme</code>; there's no default/prefers-dark wiring in that form.
      </p>
      <Code
        lines={[
          { code: "import '@solexllc/usx-theme/theme.css';" },
          { code: "import '@solexllc/usx-theme/themes/forest.css';" },
          { code: "import '@solexllc/usx-theme/themes/carbon.css';" },
        ]}
      />

      <h3>Adding your own theme</h3>
      <p>
        Build it in the Playground, give it a name, and copy the{' '}
        <strong>Sass theme entry</strong> export. It pastes straight into the same{' '}
        <code>$themes</code> map, alongside — or instead of — the prebuilt ones,
        and can be your <code>$default</code> like any other:
      </p>
      <Code
        lines={[
          { code: "@use 'pkg:@solexllc/usx-theme/themes' with (" },
          { code: "  $themes: (" },
          { code: "    forest: ()," },
          { code: "    acme: (" },
          { code: "      color-scheme: light," },
          { code: "      --usx-color-primary: #b00020," },
          { code: "      --usx-color-primary-hover: #8a0018," },
          { code: "      --usx-color-primary-active: #6c0013," },
          { code: "      --usx-font-family: (\"Acme Sans\", Helvetica, sans-serif)," },
          { code: "    )," },
          { code: "  )," },
          { code: "  $default: acme," },
          { code: ");" },
        ]}
      />
      <p>
        A prebuilt theme can be tweaked the same way — give it a map of the tokens
        to change instead of <code>()</code>. The Playground's{' '}
        <strong>CSS ([data-theme])</strong> export is the equivalent for the
        plain-stylesheet route.
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
      <Code
        lines={[
          {
            code: "@use 'pkg:@solexllc/usx-theme/variables' with (",
          },
          {
            code: "  $usx-color-primary-var: null,   // opt this one token out of runtime theming",
          },
          {
            code: ");",
          },
          {
            code: "@use 'pkg:@solexllc/usx';",
          },
        ]}
      />

      <h2>Where tokens live</h2>
      <p>
        Every token is declared once in{' '}
        <code>packages/usx-theme/src/_variables.scss</code> (the Sass side) and mirrored
        in <code>packages/usx-theme/src/theme-manifest.js</code> (name, CSS variable,
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
