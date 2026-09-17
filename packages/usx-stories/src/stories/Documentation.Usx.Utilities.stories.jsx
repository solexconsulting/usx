import React from 'react';
import Code from '../../../core/src/components/code/Code';
import Status from '../../../core/src/components/status/Status';
import Tag from '../../../core/src/components/tag/Tag';

export default {
  title: 'Documentation/USX/Utilities',
  tags: ['autodocs']
};

const COLOR_NAMES = [
  'primary', 'primary-dark', 'primary-darker', 'secondary', 'accent-cool',
  'accent-warm', 'base', 'info', 'warning', 'success', 'error', 'emergency',
  'disabled', 'beta', 'dev', 'test'
];

export const Utilities = {
  render: () => (
    <div className="usa-prose maxw-desktop">
      <h1>Utilities &amp; SCSS Helpers</h1>
      <p>
        <code>@solexllc/usx</code> provides both compile-time SCSS helpers (functions, mixins, and layout variables in <code>_variables.scss</code>)
        and runtime-themeable CSS utility classes (in <code>_utilities.scss</code>, importable standalone via <code>@solexllc/usx/utilities</code>).
      </p>

      <hr className="margin-y-4" />

      <h2>1. SCSS Helpers &amp; Functions (<code>_variables.scss</code>)</h2>
      <p>
        Import variables and functions in your SCSS modules via <code>@use 'pkg:@solexllc/usx-theme/variables' as *;</code> or <code>@use '@solexllc/usx/variables' as *;</code>.
      </p>

      <h3>Spacing Function: <code>units($value)</code></h3>
      <p>
        Calculates pixel values based on an 8px grid multiplier (<code>$value * 8px</code>). Ensures spacing values remain consistent across component SCSS.
      </p>
      <table className="usa-table usx-table usa-table--borderless width-full">
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
      <table className="usa-table usx-table usa-table--borderless width-full">
        <thead>
          <tr><th>Breakpoint Name</th><th>Media Query Condition</th><th>Target Display Device</th></tr>
        </thead>
        <tbody>
          <tr><td><code>'mobile'</code></td><td><code>(max-width: 639px)</code></td><td>Mobile phones / small screens</td></tr>
          <tr><td><code>'tablet'</code></td><td><code>(min-width: 640px)</code></td><td>Tablets and wider viewports</td></tr>
          <tr><td><code>'desktop'</code></td><td><code>(min-width: 1024px)</code></td><td>Desktop displays and monitors</td></tr>
        </tbody>
      </table>
      <Code
        lines={[
          { code: '// SCSS Usage Example:' },
          { code: '.my-custom-card {' },
          { code: '  padding: units(1.5);' },
          { code: '' },
          { code: "  @include at-media('desktop') {" },
          { code: '    padding: units(3);' },
          { code: '  }' },
          { code: '}' },
        ]}
      />

      <h3>Theming &amp; Utility Functions</h3>
      <table className="usa-table usx-table usa-table--borderless width-full">
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
      <table className="usa-table usx-table usa-table--borderless width-full">
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

      <hr className="margin-y-5" />

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-3">
        {COLOR_NAMES.map((name) => (
          <div key={name} className="border usx-rounded-md">
            <div className={`bg-${name} height-5`} />
            <div className="padding-y-05 padding-x-1">
              <code className="font-mono-2xs">.bg-{name}</code>
            </div>
          </div>
        ))}
      </div>

      <h4>Text Color Utilities (<code>.text-*</code>)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-3">
        {COLOR_NAMES.map((name) => (
          <div key={name} className={`${name === "inverse" ? "bg-surface-inverse" : ""} border padding-1 usx-rounded-md`}>
            <span className={`text-${name} font-sans-md text-bold`}>
              Sample Text
            </span>
            <div><code className="font-mono-xs">.text-{name}</code></div>
          </div>
        ))}
      </div>

      <h3>Text-Role Utilities (<code>.text-ink</code>, <code>.usx-text*</code>)</h3>
      <p>
        Generated from the <code>$text-colors</code> map. Class names use the bare token role (no <code>text-</code> prefix):
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }} className="margin-bottom-3">
        <div className="border usx-rounded-md padding-1">
          <div className="text-ink font-sans-md text-bold">Primary body ink</div>
          <code className="font-mono-2xs">.text-ink</code>
        </div>
        <div className="border usx-rounded-md padding-1">
          <div className="text-muted font-sans-md text-bold">Nav &amp; pending ink</div>
          <code className="font-mono-2xs">.text-muted</code>
        </div>
        <div className="border usx-rounded-md padding-1">
          <div className="text-subtle font-sans-md text-bold">Secondary/eyebrow ink</div>
          <code className="font-mono-2xs">.text-subtle</code>
        </div>
        <div className="bg-surface-inverse text-inverse border usx-rounded-md padding-1">
          <div className="font-sans-md text-bold">Inverted surface ink</div>
          <code className="font-mono-2xs">.text-inverse</code>
        </div>
      </div>

      <h3>Surface Utilities (<code>.bg-surface*</code>)</h3>
      <p>Generated from the <code>$surface-colors</code> map:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }} className="margin-bottom-3">
        <div className="border usx-rounded-md padding-1 bg-surface-1">
          <code className="font-mono-md">.bg-surface-1</code>
          <div className="font-sans-2xs margin-top-05">Primary page surface / main background</div>
        </div>
        <div className="border usx-rounded-md padding-1 bg-surface-2">
          <code className="font-mono-md">.bg-surface-2</code>
          <div className="font-sans-2xs margin-top-05">Card, accordion header &amp; callout surface</div>
        </div>
        <div className="border usx-rounded-md padding-1 bg-surface-3">
          <code className="font-mono-md">.bg-surface-3</code>
          <div className="font-sans-2xs margin-top-05">Header bar, footer &amp; carousel media background</div>
        </div>
        <div className="border usx-rounded-md padding-1 bg-surface-inverse text-inverse">
          <code className="font-mono-md">.bg-surface-inverse</code>
          <div className="font-sans-2xs margin-top-05">Inverse surface</div>
        </div>
      </div>

      <h3>Border Radius Utilities</h3>
      <p>Classes set <code>border-radius</code> and clip overflowing content.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }} className="margin-top-2 margin-bottom-4">
        <div  className="bg-surface-2 display-flex flex-column flex-justify-center padding-x-1 padding-y-2 border usx-border-accent-cool usx-rounded-sm">
          <code className="font-mono-md">.usx-rounded-sm</code>
          <div className="font-mono-2xs">$usx-radius-sm (0.25rem)</div>
        </div>
        <div className="bg-surface-2 display-flex flex-column flex-justify-center padding-x-1 padding-y-2 border usx-border-accent-cool usx-rounded-md">
          <code className="font-mono-md">.usx-rounded-md</code>
          <div className="font-mono-2xs">$usx-radius-md (0.5rem)</div>
        </div>
        <div className="bg-surface-2 display-flex flex-column flex-justify-center padding-x-1 padding-y-2 border usx-border-accent-cool usx-rounded-lg">
          <code className="font-mono-md">.usx-rounded-lg</code>
          <div className="font-mono-2xs">$usx-radius-lg (1rem)</div>
        </div>
        <div className="bg-surface-2 display-flex flex-column flex-justify-center padding-x-1 padding-y-2 border usx-border-accent-cool usx-rounded-xl">
          <code className="font-mono-md">.usx-rounded-xl</code>
          <div className="font-mono-2xs">$usx-radius-xl (2rem)</div>
        </div>
        <div className="bg-surface-2 display-flex flex-column flex-justify-center padding-x-3 padding-y-2 border usx-border-accent-cool usx-circle">
          <code className="font-mono-md">.usx-circle</code>
          <div className="font-mono-2xs">$usx-radius-circle (50%)</div>
        </div>
      </div>

      <h3>Simple Animations</h3>
      <p>CSS animations for status indicators and attention-grabbing elements:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }} className="margin-top-2">
        <div className="bg-surface-2 border usx-rounded-md padding-2 display-flex flex-column flex-align-center flex-justify-center">
          <Status color="success" size="lg" animation="ping" />
          <code className="font-mono-2xs margin-top-1">.usx-ping</code>
        </div>
        <div className="bg-surface-2 border usx-rounded-md padding-2 display-flex flex-column flex-align-center flex-justify-center">
          <Tag color="info" className="usx-pulse">
            Pulsing Tag
          </Tag>
          <code className="font-mono-2xs margin-top-1">.usx-pulse</code>
        </div>
        <div className="bg-surface-2 border usx-rounded-md padding-2 display-flex flex-column flex-align-center flex-justify-center">
          <Tag color="error" className="usx-bounce">
            Bouncing Tag
          </Tag>
          <code className="font-mono-2xs margin-top-1">.usx-bounce</code>
        </div>
      </div>

      <h3>Sizing Utilities</h3>
      <table className="usa-table usx-table usa-table--borderless width-full">
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
