import React from 'react';

export default {
  title: 'Documentation/USX/Utilities',
  tags: ['autodocs']
};

const COLOR_NAMES = [
  'primary', 'primary-dark', 'primary-darker', 'secondary', 'accent-cool',
  'accent-warm', 'base', 'info', 'warning', 'success', 'error', 'emergency',
  'disabled', 'beta', 'dev', 'test'
];
const TEXT_COLOR_NAMES = ['text-ink', 'usx-text-muted', 'usx-text-subtle', 'usx-text-inverse'];
const SURFACE_COLOR_NAMES = ['usx-surface-1', 'usx-surface-2', 'usx-surface-3'];

function Swatch({ label, style }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0.75rem 0.25rem 0', padding: '0.4rem 0.6rem', border: '1px solid #dfe1e2', borderRadius: '4px' }}>
      <span style={{ width: '1.25rem', height: '1.25rem', borderRadius: '3px', ...style }} />
      <code style={{ fontSize: '0.8rem' }}>{label}</code>
    </div>
  );
}

export const Utilities = {
  render: () => (
    <div className="usa-prose" style={{ maxWidth: '960px' }}>
      <h1>Utilities &amp; SCSS Helpers</h1>
      <p>
        <code>@solexllc/usx</code> provides both compile-time SCSS helpers (functions, mixins, and layout variables in <code>_variables.scss</code>)
        and runtime-themeable CSS utility classes (in <code>_utilities.scss</code>, importable standalone via <code>@solexllc/usx/utilities</code>).
      </p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>1. SCSS Helpers &amp; Functions (<code>_variables.scss</code>)</h2>
      <p>
        Import variables and functions in your SCSS modules via <code>@use 'pkg:@solexllc/usx-theme/variables' as *;</code> or <code>@use '@solexllc/usx/variables' as *;</code>.
      </p>

      <h3>Spacing Function: <code>units($value)</code></h3>
      <p>
        Calculates pixel values based on an 8px grid multiplier (<code>$value * 8px</code>). Ensures spacing values remain consistent across component SCSS.
      </p>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr><th>Input (units)</th><th>Calculated Value</th><th>Example SCSS Usage</th></tr>
        </thead>
        <tbody>
          <tr><td><code>units(0.5)</code></td><td><code>4px</code></td><td><code>padding: units(0.5);</code></td></tr>
          <tr><td><code>units(1)</code></td><td><code>8px</code></td><td><code>margin-bottom: units(1);</code></td></tr>
          <tr><td><code>units(1.5)</code></td><td><code>12px</code></td><td><code>gap: units(1.5);</code></td></tr>
          <tr><td><code>units(2)</code></td><td><code>16px</code></td><td><code>padding-inline: units(2);</code></td></tr>
          <tr><td><code>units(3)</code></td><td><code>24px</code></td><td><code>margin-block: units(3);</code></td></tr>
          <tr><td><code>units(4)</code></td><td><code>32px</code></td><td><code>min-height: units(4);</code></td></tr>
          <tr><td><code>units(5)</code></td><td><code>40px</code></td><td><code>height: units(5);</code></td></tr>
          <tr><td><code>units(6)</code></td><td><code>48px</code></td><td><code>padding: units(6);</code></td></tr>
        </tbody>
      </table>

      <h3>Responsive Media Query Mixin: <code>at-media($breakpoint)</code></h3>
      <p>
        Generates standard media queries matching USX's breakpoint definitions.
      </p>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr><th>Breakpoint Name</th><th>Media Query Condition</th><th>Target Display Device</th></tr>
        </thead>
        <tbody>
          <tr><td><code>'mobile'</code></td><td><code>(max-width: 639px)</code></td><td>Mobile phones / small screens</td></tr>
          <tr><td><code>'tablet'</code></td><td><code>(min-width: 640px)</code></td><td>Tablets and wider viewports</td></tr>
          <tr><td><code>'desktop'</code></td><td><code>(min-width: 1024px)</code></td><td>Desktop displays and monitors</td></tr>
        </tbody>
      </table>
      <pre style={{ background: '#f0f4f8', padding: '1rem', borderRadius: '6px' }}>
        <code>{`// SCSS Usage Example:
.my-custom-card {
  padding: units(1.5);

  @include at-media('desktop') {
    padding: units(3);
  }
}`}</code>
      </pre>

      <h3>Theming &amp; Utility Functions</h3>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr><th>Function</th><th>Signature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>usx-var()</code></td>
            <td><code>usx-var($hook, $fallback: null)</code></td>
            <td>Returns <code>var(#&#123;$hook&#125;)</code> when the custom property hook is configured; otherwise returns <code>$fallback</code>.</td>
          </tr>
          <tr>
            <td><code>usx-when()</code></td>
            <td><code>usx-when($condition, $value)</code></td>
            <td>Guards composite property values: returns <code>$value</code> only when <code>$condition</code> is non-null (prevents invalid output like <code>1px solid null</code>).</td>
          </tr>
          <tr>
            <td><code>color()</code></td>
            <td><code>color($name)</code></td>
            <td>Literal color lookup function. Resolves <code>'white'</code> to <code>#ffffff</code> and <code>'black'</code> to <code>#000000</code>.</td>
          </tr>
        </tbody>
      </table>

      <h3>Layout &amp; Breakpoint SCSS Variables</h3>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr><th>Variable</th><th>Default Value</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><code>$max-layout-width</code></td><td><code>60rem</code> (960px)</td><td>Maximum width container for content layouts</td></tr>
          <tr><td><code>$max-sidebar-width</code></td><td><code>16rem</code> (256px)</td><td>Standard layout sidebar width</td></tr>
          <tr><td><code>$dynamic-content-width</code></td><td><code>calc(50% + 22rem)</code></td><td>Fluid content region offset width</td></tr>
          <tr><td><code>$breakpoint-mobile</code></td><td><code>640px</code></td><td>Mobile breakpoint threshold</td></tr>
          <tr><td><code>$breakpoint-tablet</code></td><td><code>640px</code></td><td>Tablet breakpoint threshold</td></tr>
          <tr><td><code>$breakpoint-desktop</code></td><td><code>1024px</code></td><td>Desktop breakpoint threshold</td></tr>
        </tbody>
      </table>

      <hr style={{ margin: '2.5rem 0' }} />

      <h2>2. CSS Utility Classes (<code>_utilities.scss</code>)</h2>
      <p>
        Import standalone CSS utilities via <code>import '@solexllc/usx/utilities'</code> or via the main <code>@solexllc/usx</code> bundle.
        All utility classes automatically update when switching themes.
      </p>

      <h3>Color Utilities</h3>
      <p>
        Generated for every non-null entry in the <code>$colors</code> map (theme, state, and environment roles):
      </p>
      <ul>
        <li><code>.bg-{'{name}'}</code> — background color (<code>!important</code>)</li>
        <li><code>.text-{'{name}'}</code> — text color (<code>!important</code>)</li>
        <li><code>.usx-border-{'{name}'}</code> — border color (<code>!important</code>)</li>
        <li><code>.before-bg-{'{name}'}::before</code> / <code>.after-bg-{'{name}'}::after</code> — pseudo-element background fill</li>
      </ul>
      
      <h4>Background Utilities (<code>.bg-*</code>)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {COLOR_NAMES.map((name) => (
          <div key={name} style={{ border: '1px solid #dfe1e2', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ height: '40px', background: `var(--usx-color-${name})` }} />
            <div style={{ padding: '0.4rem 0.6rem' }}>
              <code style={{ fontSize: '0.8rem' }}>.bg-{name}</code>
            </div>
          </div>
        ))}
      </div>

      <h4>Text Color Utilities (<code>.text-*</code>)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {COLOR_NAMES.map((name) => (
          <div key={name} style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '0.6rem', background: '#f8f9fa' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: `var(--usx-color-${name})` }}>
              Sample Text
            </span>
            <div><code style={{ fontSize: '0.8rem' }}>.text-{name}</code></div>
          </div>
        ))}
      </div>

      <h3>Text-Role Utilities (<code>.text-ink</code>, <code>.usx-text*</code>)</h3>
      <p>
        Generated from the <code>$text-colors</code> map. Class names use the bare token role (no <code>text-</code> prefix):
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '0.75rem', background: '#ffffff' }}>
          <div className="text-ink" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Primary body ink</div>
          <code style={{ fontSize: '0.8rem' }}>.text-ink</code>
        </div>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '0.75rem', background: '#ffffff' }}>
          <div className="usx-text-muted" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Nav &amp; pending ink</div>
          <code style={{ fontSize: '0.8rem' }}>.usx-text-muted</code>
        </div>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '0.75rem', background: '#ffffff' }}>
          <div className="usx-text-subtle" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Secondary/eyebrow ink</div>
          <code style={{ fontSize: '0.8rem' }}>.usx-text-subtle</code>
        </div>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '0.75rem', background: '#1b1b1b' }}>
          <div className="usx-text-inverse" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Dark surface ink</div>
          <code style={{ fontSize: '0.8rem', color: '#dfe1e2' }}>.usx-text-inverse</code>
        </div>
      </div>

      <h3>Surface Utilities (<code>.bg-usx-surface*</code>)</h3>
      <p>Generated from the <code>$surface-colors</code> map:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '1rem', background: 'var(--usx-surface-1)' }}>
          <code style={{ fontSize: '0.85rem' }}>.bg-usx-surface-1</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65', marginTop: '0.25rem' }}>Primary page surface / main background</div>
        </div>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '1rem', background: 'var(--usx-surface-2)' }}>
          <code style={{ fontSize: '0.85rem' }}>.bg-usx-surface-2</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65', marginTop: '0.25rem' }}>Card, accordion header &amp; callout surface</div>
        </div>
        <div style={{ border: '1px solid #dfe1e2', borderRadius: '6px', padding: '1rem', background: 'var(--usx-surface-3)' }}>
          <code style={{ fontSize: '0.85rem' }}>.bg-usx-surface-3</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65', marginTop: '0.25rem' }}>Header bar, footer &amp; carousel media background</div>
        </div>
      </div>

      <h3>Border Radius Utilities</h3>
      <p>Classes set <code>border-radius</code> and clip overflowing content.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', margin: '1rem 0 2rem 0' }}>
        <div style={{ padding: '1rem', border: '2px solid #005ea2', background: '#f0f4f8' }} className="usx-rounded-sm">
          <code>.usx-rounded-sm</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65' }}>$usx-radius-sm (0.25rem)</div>
        </div>
        <div style={{ padding: '1rem', border: '2px solid #005ea2', background: '#f0f4f8' }} className="usx-rounded-md">
          <code>.usx-rounded-md</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65' }}>$usx-radius-md (0.5rem)</div>
        </div>
        <div style={{ padding: '1rem', border: '2px solid #005ea2', background: '#f0f4f8' }} className="usx-rounded-lg">
          <code>.usx-rounded-lg</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65' }}>$usx-radius-lg (1rem)</div>
        </div>
        <div style={{ padding: '1rem', border: '2px solid #005ea2', background: '#f0f4f8' }} className="usx-rounded-xl">
          <code>.usx-rounded-xl</code>
          <div style={{ fontSize: '0.75rem', color: '#565c65' }}>$usx-radius-xl (2rem)</div>
        </div>
        <div style={{ padding: '1rem', border: '2px solid #005ea2', background: '#f0f4f8', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} className="usx-circle">
          <code>.usx-circle</code>
        </div>
      </div>

      <h3>Simple Animations</h3>
      <p>CSS animations for status indicators and attention-grabbing elements:</p>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: '1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00a91c', display: 'inline-block' }} className="usx-ping" />
          <code>.usx-ping</code> (Live status ring)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#005ea2', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} className="usx-pulse">
            Pulsing Badge
          </span>
          <code>.usx-pulse</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#d83933', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} className="usx-bounce">
            Bouncing Alert
          </span>
          <code>.usx-bounce</code>
        </div>
      </div>

      <h3>Sizing Utilities</h3>
      <table className="usa-table usa-table--borderless" style={{ width: '100%' }}>
        <thead>
          <tr><th>Class</th><th>CSS Declaration</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>.usx-width-min</code> / <code>.usx-height-min</code></td><td><code>width: min-content</code> / <code>height: min-content</code></td><td>Sizes element to its intrinsic minimum content width/height.</td></tr>
          <tr><td><code>.usx-width-max</code> / <code>.usx-height-max</code></td><td><code>width: max-content</code> / <code>height: max-content</code></td><td>Sizes element to its intrinsic maximum content width/height.</td></tr>
          <tr><td><code>.usx-width-fit</code> / <code>.usx-height-fit</code></td><td><code>width: fit-content</code> / <code>height: fit-content</code></td><td>Sizes element to fit available space up to max-content.</td></tr>
        </tbody>
      </table>
    </div>
  )
};
