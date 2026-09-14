import React from 'react';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';
import { useLiveTokenValues, getLiveValue } from '../utils/useLiveTokenValues.js';
import Code from '../../../core/src/components/code/Code';

export default {
  title: 'Documentation/Theme/Typography',
  tags: ['autodocs']
};

export const Typography = {
  render: (args, context) => {
    const live = useLiveTokenValues(context.globals.theme);
    const typographyTokens = themeManifest.filter((t) => t.group === 'typography');

    return (
      <div className="usa-prose" style={{ maxWidth: '840px' }}>
        <h1>Typography</h1>

        <h2>Tokens</h2>
        <p>The <strong>Current</strong> column reflects whichever theme is active in the toolbar above.</p>
        <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Default</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {typographyTokens.map((t) => (
              <tr key={t.name}>
                <td><code>${t.name}</code></td>
                <td><code>{t.defaultValue}</code></td>
                <td><code>{getLiveValue(live, t)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontFamily: 'var(--usx-font-family)', fontSize: 'var(--usx-font-size-base)', lineHeight: 'var(--usx-line-height-base)' }}>
          Sample text rendered with the current <code>--usx-font-family</code>,{' '}
          <code>--usx-font-size-base</code>, and <code>--usx-line-height-base</code>.
        </p>

        <h2>@solexllc/usx-theme does not load fonts</h2>
        <p>
          <code>$usx-font-family</code>/<code>$usx-font-family-heading</code> are{' '}
          <strong>CSS variable pointers only</strong>. Their default value is a
          font <em>stack</em> (<code>"Source Sans Pro Web", Helvetica Neue, Helvetica,
          Roboto, Arial, sans-serif</code>) that matches the precompiled USWDS
          bundle byte-for-byte — but USX never fetches, bundles, or
          <code>@font-face</code>-declares any font file, including that one. Your
          application is always responsible for making sure the font named in{' '}
          <code>--usx-font-family</code> is actually loaded and available;
          otherwise the browser silently falls through to the next font in the
          stack.
        </p>

        <h3>Using USWDS's own bundled fonts</h3>
        <p>
          If you're already loading USWDS's compiled CSS (<code>@uswds/uswds/css/uswds.min.css</code>),
          its <code>@font-face</code> rules for Source Sans Pro / Merriweather /
          Public Sans are already on the page — no extra work needed, and the
          default token value already points at the right family name.
        </p>

        <h3>Bringing your own font</h3>
        <p>Two supported approaches:</p>
        <ol>
          <li>
            <strong>Self-hosted / <code>@font-face</code>:</strong>
            <Code
              lines={[
                { code: '@font-face {' },
                { code: '  font-family: "Acme Sans";' },
                { code: '  src: url("/fonts/acme-sans.woff2") format("woff2");' },
                { code: '  font-weight: 400;' },
                { code: '  font-display: swap;' },
                { code: '}' },
                { code: '' },
                { code: ':root {' },
                { code: '  --usx-font-family: "Acme Sans", Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;' },
                { code: '}' },
              ]}
            />
          </li>
          <li>
            <strong>Hosted (e.g. Google Fonts) — link the stylesheet, then point the token at it:</strong>
            <Code
              lines={[
                { code: '&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;display=swap"&gt;' },
              ]}
            />
            <Code
              lines={[
                { code: ':root {' },
                { code: '  --usx-font-family: Inter, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;' },
                { code: '}' },
              ]}
            />
          </li>
        </ol>
        <p>
          Keep a sane fallback stack after your font — the token is a plain CSS{' '}
          <code>font-family</code> value, so normal font-stack fallback rules
          apply if the named font fails to load.
        </p>

        <h3>A distinct heading font</h3>
        <p>
          <code>--usx-font-family-heading</code> chains to{' '}
          <code>--usx-font-family</code> by default (most themes use one family
          everywhere) but is its own token, so a theme with a separate display/serif
          face for headings only (e.g. a serif paired with a sans body font) can
          override just this one:
        </p>
        <Code
          lines={[
            { code: ':root {' },
            { code: '  --usx-font-family-heading: Bitter, Georgia, Cambria, "Times New Roman", Times, serif;' },
            { code: '}' },
          ]}
        />

        <h3>Try it live</h3>
        <p>
          The <strong>Documentation/Theme → Playground</strong> font-family
          control includes a curated preset list (with the matching{' '}
          <code>@font-face</code>/link already loaded in Storybook) plus a
          free-text option for any stack you want to preview against every
          component before shipping it.
        </p>
      </div>
    );
  }
};
