import React from 'react';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';
import { useLiveTokenValues, getLiveValue } from '../utils/useLiveTokenValues.js';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';

export default {
  title: 'Documentation/Theme/Colors',
  tags: ['autodocs']
};

function Swatch({ token, current }) {
  return (
    <div style={{ border: '1px solid #dfe1e2', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ height: '56px', background: current }} />
      <div style={{ padding: '0.6rem' }}>
        <code style={{ fontSize: '0.85rem' }}>${token.name}</code>
        <div><code style={{ fontSize: '0.8rem', opacity: 0.7 }}>{current}</code></div>
      </div>
    </div>
  );
}

function Grid({ tokens, live }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {tokens.map((t) => (
        <Swatch key={t.name} token={t} current={getLiveValue(live, t)} />
      ))}
    </div>
  );
}

const THEME_BASE_NAMES = ['color-primary', 'color-secondary', 'color-accent-cool', 'color-accent-warm', 'color-base'];
const STATE_BASE_NAMES = ['color-info', 'color-warning', 'color-success', 'color-error', 'color-emergency', 'color-disabled', 'color-focus', 'color-visited'];
const SURFACE_TEXT_NAMES = ['surface-1', 'surface-2', 'surface-3', 'text-ink', 'text-muted', 'text-subtle', 'text-inverse', 'color-border'];
const ENVIRONMENT_NAMES = ['color-beta', 'color-test', 'color-dev'];

export const Palette = {
  render: (args, context) => {
    const live = useLiveTokenValues(context.globals.theme);
    const colorTokens = themeManifest.filter((t) => t.group === 'color' && !t.internal);

    // Base Token Groups
    const themeBase = colorTokens.filter((t) => THEME_BASE_NAMES.includes(t.name));
    const stateBase = colorTokens.filter((t) => STATE_BASE_NAMES.includes(t.name));
    const surfaceTextBase = colorTokens.filter((t) => SURFACE_TEXT_NAMES.includes(t.name));
    const environmentBase = colorTokens.filter((t) => ENVIRONMENT_NAMES.includes(t.name));

    // Derived Shade Groups
    const derivedTheme = colorTokens.filter((t) => t.derivedFrom && THEME_BASE_NAMES.includes(t.derivedFrom));
    const derivedState = colorTokens.filter((t) => t.derivedFrom && STATE_BASE_NAMES.includes(t.derivedFrom));

    return (
      <div className="usa-prose usx-prose" style={{ maxWidth: '960px' }}>
        <h1>Color tokens</h1>
        <p>
          USX color tokens are structured into semantic categories so themes can swap identities seamlessly
          without breaking UI contrast or hardcoding gray steps. Every swatch below is a runtime{' '}
          <code>--usx-*</code> custom property that dynamically updates when you switch themes in the toolbar above.
          Override any of them or use <strong>Documentation/Theme → Playground</strong> to pick colors visually.
        </p>

        <Alert
          variant="info"
          heading="Color Taxonomy Overview"
          text={
          <ul className="usa-list usx-list">
            <li>
              <strong>System colors (<code>[system]</code>):</strong> The immutable USWDS color palette (e.g. <code>blue-60v</code>, <code>red-50</code>). System tokens operate in the background as raw color values; they are not overridden directly, but serve as default targets for theme/state roles.
            </li>
            <li>
              <strong>Theme colors:</strong> Primary brand, secondary, and accent colors that define visual identity.
            </li>
            <li>
              <strong>State colors:</strong> Interactive and status feedback colors (info, warning, success, error, emergency, disabled, focus, visited).
            </li>
            <li>
              <strong>Surface &amp; Text colors:</strong> Theme-responsive background layers (<code>surface-1/2/3</code>) and ink roles (<code>text</code>, <code>text-muted</code>, <code>text-subtle</code>, <code>text-inverse</code>) that automatically adapt across light and dark modes.
            </li>
            <li>
              <strong>Environment colors:</strong> Special indicator tokens (<code>color-beta</code>, <code>color-test</code>, <code>color-dev</code>) for environment badges and headers.
            </li>
          </ul>
          }
        />

        <h2>Base colors</h2>
        <p>The core theme, state, surface, and environment role tokens components ultimately chain to.</p>

        <h3>Theme colors</h3>
        <p>Primary brand, secondary, and accent colors defining visual identity.</p>
        <Grid tokens={themeBase} live={live} />

        <h3>State colors</h3>
        <p>Status feedback, form validation, interaction states, and accessibility focus indicators.</p>
        <Grid tokens={stateBase} live={live} />

        <h3>Surface &amp; Text colors</h3>
        <p>Structural surface layers, typography ink roles, and shared border tokens.</p>
        <Grid tokens={surfaceTextBase} live={live} />

        <h3>Environment colors</h3>
        <p>Indicator tokens for environment banners, badges, and dev tool ribbons.</p>
        <Grid tokens={environmentBase} live={live} />

        <hr style={{ margin: '2.5rem 0' }} />

        <h2>Derived shades</h2>
        <p>
          Each shade (<code>-light</code>, <code>-dark</code>, <code>-hover</code>, <code>-active</code>, etc.) is an
          independent token. The <strong>Documentation/Theme → Playground</strong> tool automatically re-derives matching
          shades when base colors are adjusted.
        </p>

        <h3>Derived theme shades</h3>
        <p>Lightness steps and interaction state aliases for primary, secondary, and accent scales.</p>
        <Grid tokens={derivedTheme} live={live} />

        <h3>Derived state shades</h3>
        <p>Tint and shade variants for callout backgrounds, alerts, and disabled states.</p>
        <Grid tokens={derivedState} live={live} />

      </div>
    );
  }
};
