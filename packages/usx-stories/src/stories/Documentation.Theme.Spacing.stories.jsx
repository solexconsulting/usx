import React from 'react';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';
import { useLiveTokenValues, getLiveValue } from '../utils/useLiveTokenValues.js';

export default {
  title: 'Documentation/Theme/Spacing',
  tags: ['autodocs']
};

export const Scale = {
  render: (args, context) => {
    const live = useLiveTokenValues(context.globals.theme);
    const spacingTokens = themeManifest.filter((t) => t.group === 'spacing');

    return (
      <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
        <h1>Spacing tokens</h1>
        <p>
          Five runtime-themeable steps, used for padding/margin/gap values
          across USX components. Override any step via its custom property,
          same as color tokens. Bars reflect whichever theme is active in the
          toolbar above — switch it to see them update.
        </p>
        {spacingTokens.map((t) => {
          const current = getLiveValue(live, t);
          return (
            <div key={t.name} style={{ marginBottom: '1rem' }}>
              <div>
                <code>${t.name}</code> / <code>{t.cssVar}</code> — default <code>{t.defaultValue}</code>, current <code>{current}</code>
              </div>
              <div style={{ height: '0.75rem', width: current, background: '#005ea2', marginTop: '0.25rem' }} />
            </div>
          );
        })}
        <p>
          Component-specific radius and border-width scales (e.g.{' '}
          <code>$usx-radius-button</code>, <code>$usx-accordion-border-width</code>)
          are documented on <strong>Documentation/Theme → Tokens</strong>.
        </p>
        <p>
          For compile-time SCSS spacing calculations using the 8px grid multiplier (<code>units($val)</code>)
          and layout/breakpoint helper variables, see <strong>Documentation/USX → Utilities</strong>.
        </p>
      </div>
    );
  }
};
