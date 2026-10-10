import React from 'react';
import Code from '../../../usx-react/src/components/code/Code';
import Status from '../../../usx-react/src/components/status/Status';
import Tag from '../../../usx-react/src/components/tag/Tag';
import Link from '../../../usx-react/src/components/link/Link';

export default {
  title: 'Documentation/USX/Utilities',
  tags: ['autodocs']
};

const COLOR_NAMES = [
  'primary', 'primary-dark', 'primary-darker', 'secondary', 'accent-cool',
  'accent-warm', 'base', 'info', 'warning', 'success', 'error', 'emergency',
  'disabled', 'beta', 'dev', 'test'
];

const TEXT_COLORS = [
  { name: 'ink', description: 'Primary body ink' },
  { name: 'muted', description: 'Nav & pending ink' },
  { name: 'subtle', description: 'Secondary/eyebrow ink' },
  { name: 'inverse', description: 'Inverted surface ink', className: 'bg-surface-inverse' }
]

const SURFACE_COLORS = [
  { name: 'surface-1', description: 'Primary page surface / main background' },
  { name: 'surface-2', description: 'Card, accordion header & callout surface' },
  { name: 'surface-3', description: 'Header bar, footer, & carousel media background' },
  { name: 'surface-inverse', description: 'Inverse surface', className: 'text-inverse' }
]

const BORDER_COLORS = [
  { name: 'default', token: 'color-border', description: 'Input fields and other strong outlines' },
  { name: 'muted', token: 'color-border-muted', description: 'File inputs, pagination, in-page navigation, and checkable tiles' },
  { name: 'subtle', token: 'color-border-subtle', description: 'Cards, header/navigation/footer dividers, sidenav, and task lists' },
  { name: 'inverse', token: 'color-border-inverse', description: 'Available for borders on inverse surfaces', className: 'bg-surface-inverse text-inverse' }
];

const BORDER_RADIUSES = [
  { name: 'box', size: 'var(--usx-box-radius)' },
  { name: 'field', size: 'var(--usx-field-radius)' },
  { name: 'selector', size: 'var(--usx-selector-radius)' },
  { name: 'none', size: '0' },
  { name: 'sm', size: '0.25rem' },
  { name: 'md', size: '0.5rem' },
  { name: 'lg', size: '1rem' },
  { name: 'xl', size: '2rem' },
  { name: 'full', size: '50%' },
]

const BORDER_WIDTHS = [
  // name: sm | md | lg | xl, description: What is it used by?
  { name: 'sm', usedBy: [
    'Task List (inner border)',
    'Sidenav',
    'Radio/Checkbox Tile',
    'File Input',
    'Summary Box',
    '.usx-border-width-inputs'
  ], description: 'Task List (inner border), Sidenav, Radio/Checkbox Tile, File Input, Summary Box, .usx-border-width-inputs' },
  { name: 'md', usedBy: [
    'Task List (outer border)',
    'Slider',
    'Card',
    'Button'
  ], description: 'Task List (outer border), Slider, Card, Button' },
  { name: 'lg', usedBy: [
    'Callout',
    'Accordion',
    'Form Group (error state)',
    'Input',
    'Select',
    'Text Area (success or error state)'
  ], description: 'Callout, Accordion, Form Group (error state), Input, Select, and Text Area (success or error state)' },
  { name: 'xl', usedBy: [
    'Step Indicator',
    'Alert'
  ], description: 'Step Indicator, Alert' },
  { name: 'inputs', usedBy: [
    'Input fields'
  ], description: 'Input fields' }
]

const BORDER_WIDTH_KEYS = BORDER_WIDTHS.map(bw => bw.name);

export const Utilities = {
  render: () => (
    <div className="usa-prose maxw-desktop">
      <h1>Utilities &amp; SCSS Helpers</h1>
      <p>
        <code>@solexllc/usx</code> provides both compile-time SCSS helpers (functions, mixins, and layout variables in <code>_variables.scss</code>)
        and runtime-themeable CSS utility classes (in <code>_utilities.scss</code>, importable standalone via <code>@solexllc/usx/utilities</code>).
      </p>

      <hr className="margin-y-7" />

      <h2>1. SCSS Helpers &amp; Functions (<code>_variables.scss</code>)</h2>
      <p>
        Import variables and functions in your SCSS modules via <code>@use 'pkg:@solexllc/usx-theme/variables' as *;</code> or <code>@use '@solexllc/usx/variables' as *;</code>.
      </p>

      <h3>1.1 Spacing Function: <code>units($value)</code></h3>
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

      <h3>1.2 Responsive Media Query Mixin: <code>at-media($breakpoint, $direction: 'min')</code></h3>
      <p>
        Generates queries from the shared Sass settings. Desktop uses <code>$usx-layout-breakpoint</code>;
        tablet uses <code>$breakpoint-tablet</code>. Pass <code>'max'</code> for an exclusive upper bound,
        such as <code>at-media('desktop', 'max')</code>. The legacy <code>'mobile'</code> call means below tablet.
        These helpers do not reconfigure USWDS or change its responsive utility classes.
      </p>
      <table className="usa-table usx-table usa-table--borderless width-full">
        <thead>
          <tr><th>Breakpoint Name</th><th>Media Query Condition</th><th>Target Display Device</th></tr>
        </thead>
        <tbody>
          <tr><td><code>'mobile'</code></td><td><code>(width &lt; 640px)</code></td><td>Mobile phones / small screens</td></tr>
          <tr><td><code>'tablet'</code></td><td><code>(min-width: 640px)</code></td><td>Tablets and wider viewports</td></tr>
          <tr><td><code>'desktop'</code></td><td><code>(min-width: 1024px)</code></td><td>Desktop displays and monitors</td></tr>
          <tr><td><code>'uswds-header'</code></td><td><code>(min-width: 64em)</code></td><td>Appearance overrides matching the unchanged USWDS Header transition</td></tr>
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

      <h3>1.3 Theming &amp; Utility Functions</h3>
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
            <td><code>usx-when($condition, $value, $fallback: null)</code></td>
            <td>Guards composite property values: returns <code>$value</code> only when <code>$condition</code> is non-null (prevents invalid output like <code>1px solid null</code>).</td>
          </tr>
          <tr>
            <td><code>color()</code></td>
            <td><code>color($name)</code></td>
            <td>Literal color lookup function. Resolves <code>'white'</code> to <code>#ffffff</code> and <code>'black'</code> to <code>#000000</code>.</td>
          </tr>
        </tbody>
      </table>

      <h3>1.4 Layout &amp; Breakpoint SCSS Variables</h3>
      <table className="usa-table usx-table usa-table--borderless width-full">
        <thead>
          <tr><th>Variable</th><th>Default Value</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><code>$usx-layout-max-width</code></td><td><code>64rem</code></td><td>Shared page container width, including outer gutters</td></tr>
          <tr><td><code>$usx-layout-expanded-max-width</code></td><td><code>100rem</code></td><td>Expanded Layout maximum</td></tr>
          <tr><td><code>$usx-layout-sidebar-width</code></td><td><code>16rem</code></td><td>Sidebar width, including its inner gap</td></tr>
          <tr><td><code>$usx-layout-content-min-width</code></td><td><code>32rem</code></td><td>Minimum content capacity before sidebars appear</td></tr>
          <tr><td><code>$usx-layout-gutter-mobile-default</code></td><td><code>12px</code></td><td>Static mobile gutter and sizing-query input</td></tr>
          <tr><td><code>$usx-layout-gutter-default</code></td><td><code>32px</code></td><td>Static desktop gutter and sizing-query input</td></tr>
          <tr><td><code>$breakpoint-mobile</code></td><td><code>640px</code></td><td>Mobile breakpoint threshold</td></tr>
          <tr><td><code>$breakpoint-tablet</code></td><td><code>640px</code></td><td>Tablet breakpoint threshold</td></tr>
          <tr><td><code>$usx-layout-breakpoint</code></td><td><code>1024px</code></td><td>Shared desktop transition; defaults to the legacy <code>$breakpoint-desktop</code></td></tr>
        </tbody>
      </table>

      <p>
        Use <code>@include layout-container;</code> for a border-box page container with the shared maximum,
        centered margins, and responsive gutters. Use <code>@include layout-gutters;</code> when only padding
        is needed. Both honor the runtime gutter tokens in themed builds. Layout itself owns its outer padding;
        do not wrap it in another padded container. Sidebar visibility stays container-based, not viewport-based.
      </p>

      <hr className="margin-y-7" />

      <h2>2. CSS Utility Classes (<code>_utilities.scss</code>)</h2>
      <p>
        Import standalone CSS utilities via <code>import '@solexllc/usx/utilities'</code> or via the main <code>@solexllc/usx</code> bundle.
        All utility classes automatically update when switching themes.
      </p>

      <h3>2.1 Color Utilities</h3>
      <p>
        Generated for every non-null entry in the <code>$usx-colors</code> map (theme, state, and environment roles):
      </p>
      <ul>
        <li><code>.bg-{'{name}'}</code> — background color (<code>!important</code>)</li>
        <li><code>.text-{'{name}'}</code> — text color (<code>!important</code>)</li>
        <li><code>.border-{'{name}'}</code> — border color (<code>!important</code>)</li>
        <li><code>.before-bg-{'{name}'}::before</code> / <code>.after-bg-{'{name}'}::after</code> — pseudo-element background fill</li>
      </ul>

      <h4>2.1.1 Background Utilities (<code>.bg-*</code>)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-5">
        {COLOR_NAMES.map((name) => (
          <div key={name} className="border usx-rounded-md">
            <div className={`bg-${name} height-5`} />
            <div className="padding-y-05 padding-x-1">
              <code className="font-mono-2xs">.bg-{name}</code>
            </div>
          </div>
        ))}
      </div>

      <h4>2.1.2 Text Color Utilities (<code>.text-*</code>)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-5">
        {COLOR_NAMES.map((name) => (
          <div key={name} className={`${name === "inverse" ? "bg-surface-inverse" : ""} border padding-1 usx-rounded-md`}>
            <span className={`text-${name} font-sans-md text-bold`}>
              Sample Text
            </span>
            <div><code className="font-mono-xs">.text-{name}</code></div>
          </div>
        ))}
      </div>

      <h4>2.1.3 Surface Utilities (<code>.bg-surface*</code>)</h4>
      <p>Generated from the <code>$usx-surface-colors</code> map:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }} className="margin-bottom-5">
        {SURFACE_COLORS.map((surface) => (
          <div key={surface.name} className={`border usx-rounded-md padding-1 bg-${surface.name} ${surface.className}`}>
            <code className="font-mono-md text-bold">.bg-{surface.name}</code>
            <div className="font-sans-2xs margin-top-05">
              {surface.description}
            </div>
          </div>
        ))}
      </div>

      <h4>2.1.4 Text-Role Utilities (<code>.text-ink</code>, <code>.usx-text*</code>)</h4>
      <p>
        Generated from the <code>$usx-text-colors</code> map. Class names use the bare token role (no <code>text-</code> prefix):
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }} className="margin-bottom-9">
        {TEXT_COLORS.map((text) => (
          <div key={text.name} className={`border usx-rounded-md padding-1 text-${text.name} ${text.className}`}>
            <code className="font-mono-md text-bold">.text-{text.name}</code>
            <div className="font-sans-2xs margin-top-05">
              {text.description}
            </div>
          </div>

        ))}
      </div>

      <h3>2.2 Border Utilities</h3>
      <p>
        In addition to the <Link external={true} href="https://designsystem.digital.gov/utilities/border/">border utilities provided by USWDS</Link>,
        USX provides additional border utilities for consistent styling across components.
      </p>

      <h4>2.2.1 Border Radius Utilities</h4>
      <p>Classes set <code>border-radius</code> and clip overflowing content.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }} className="margin-top-2">
        {BORDER_RADIUSES.map((radius) => (
          radius.name !== 'full' && (
            <div key={radius.name} className={`bg-surface-2 display-flex flex-column flex-justify-center padding-x-1 padding-y-2 border border-accent-cool usx-rounded-${radius.name}`}>
              <code className="font-mono-md text-bold">.usx-rounded-{radius.name}</code>
              <div className="font-mono-2xs">${`usx-radius-${radius.name}`} ({radius.size})</div>
            </div>
          )
        ))}
      </div>

      <div className="margin-top-3 margin-bottom-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: '1rem', placeItems: 'center' }}>
        <div style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
          <code className="font-mono-md text-bold">.usx-rounded-full or<br />.usx-circle</code>
          <div className="font-mono-2xs">$usx-radius-full (50%)</div>
        </div>
        {[[9, 5], [5, 5], [9, 9], [5, 9]].map(([width, height]) => (
          <div
            key={`${width}-${height}`}
            className={`width-${width} height-${height} usx-rounded-full bg-surface-2 border border-accent-cool`}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            {width} x {height}
          </div>
        ))}
      </div>

      <h4>2.2.2 Border Color Utilities (.border-*)</h4>
      <p>
        Neutral border roles come from <code>$usx-border-colors</code>. The default border is strongest,
        muted is intermediate, and subtle is least prominent. Inverse is available for custom inverted surfaces;
        components do not use it by default. These utilities set only the color; add a border width and style separately.
      </p>
      <p>
        Table and collection borders, plus checkbox/radio indicator outlines, follow their text color by default
        (<code>currentColor</code>). Set <code>$usx-table-border</code>, <code>$usx-collection-border</code>, or{' '}
        <code>$usx-checkable-border</code> (or their matching CSS variables) to opt into a different color.
        Checkable tile borders use the muted role separately from their indicators.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }} className="margin-bottom-3">
        {BORDER_COLORS.map((border) => {

          const borderedElement = (
            <div key={border.name} className={`border-1 usx-rounded-md padding-1 border-${border.name} ${border.className || ''}`}>
              <code className="font-mono-md text-bold">.border-{border.name}</code>
              <div className="font-mono-2xs">$usx-{border.token}</div>
              <div className="font-sans-2xs margin-top-05">{border.description}</div>
            </div>
          );
          if (border.name === 'inverse') {
            return (
              <div key={border.name} className="bg-surface-inverse margin-neg-1 padding-1">
                {borderedElement}
              </div>
            );
          }
          return borderedElement;
        })}
      </div>
      <p>Theme, state, and environment colors also remain available for semantic borders:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-3 margin-bottom-5">
        {COLOR_NAMES.map((name) => (
          <div key={name} className={`border-1 usx-rounded-md border-${name}`}>
            <div className="padding-y-05 padding-x-1">
              <code className="font-mono-2xs">.border-{name}</code>
            </div>
          </div>
        ))}
      </div>

      <h4>2.2.3 Border Width Utilities (.border-width-({BORDER_WIDTH_KEYS.join('|')}))</h4>
      <p>
        The border width utilities don't create a border, but instead adjust the width of an existing border.
        The underlying tokens ($usx-border-width-({BORDER_WIDTH_KEYS.join('|')})) defines the actual width value applied by the utility.
        The same tokens configure the default border width of borders within USX components.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }} className="margin-bottom-3 margin-bottom-9">
        {BORDER_WIDTHS.map(( width ) => (
          <div key={width.name} className={`usx-rounded-md border usx-border-width-${width.name}`}>
            <div className="padding-y-05 padding-x-1 padding-bottom-105">
              <code className="font-mono-md">.usx-border-width-{width.name}</code>
              <ul className="usa-list usx-list">
                {width.usedBy.map((item) => (
                  <li key={item} className="font-mono-2xs">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))} 
      </div>

      <h3>2.3 Simple Animations</h3>
      <p>CSS animations for status indicators and attention-grabbing elements:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }} className="margin-top-2 margin-bottom-9">
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

      <h3>2.4 Sizing Utilities</h3>
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
