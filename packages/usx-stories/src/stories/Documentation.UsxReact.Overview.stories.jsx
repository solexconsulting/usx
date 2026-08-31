import React from 'react';

export default {
  title: 'Documentation/USX React/Overview',
  tags: ['autodocs']
};

export const Overview = {
  render: () => (
    <div className="usa-prose" style={{ maxWidth: '840px' }}>
      <h1>@solexllc/usx-react</h1>
      <p>
        <code>@solexllc/usx-react</code> is a set of React function components
        that render the exact same markup and <code>usa-*</code>/<code>usx-*</code>{' '}
        classes documented in <strong>Documentation/USX</strong>. It is a
        convenience layer, not a separate implementation — a component like{' '}
        <code>{'<Accordion />'}</code> exists purely so you can pass typed props
        instead of hand-writing the class names and ARIA wiring yourself.
      </p>

      <h2>This package is optional</h2>
      <p>
        The CSS from <code>@solexllc/usx</code> works on its own with plain
        HTML — no React, no build step beyond compiling Sass. This repository's
        Django integration proves the point: every component has a parallel{' '}
        <code>*.django.html</code> template that renders the identical class
        structure server-side, with zero dependency on{' '}
        <code>@solexllc/usx-react</code> or even Node/React at runtime. Every
        component's Storybook page has a <strong>React</strong>,{' '}
        <strong>Django</strong>, and <strong>HTML</strong> story (see the
        technology toggle in the toolbar) rendering side-by-side proof that all
        three produce the same output.
      </p>
      <p>Use <code>@solexllc/usx-react</code> when:</p>
      <ul>
        <li>You're building a React application and want props/TypeScript types instead of raw class strings.</li>
        <li>You want built-in behavior for components that need client-side state (e.g. Accordion's expand/collapse, Combobox's filtering).</li>
      </ul>
      <p>Skip it when:</p>
      <ul>
        <li>You're rendering server-side templates (Django, or any other templating language) — copy the class structure from the component's <code>.html</code>/<code>.django.html</code> reference file instead.</li>
        <li>You only need the CSS and are hand-writing markup, or generating it from another framework entirely.</li>
      </ul>

      <h2>Dependency graph</h2>
      <p>
        <code>@solexllc/usx-react</code> depends on <code>@solexllc/usx</code>,{' '}
        <code>@solexllc/usx-theme</code>, and <code>@solexllc/usx-uswds-fixes</code>{' '}
        — it compiles the themed Sass entry point for you and ships the
        result, so you don't add or configure Sass directly when using it.
        USWDS itself is still <strong>not</strong> bundled by any USX package;
        your application loads USWDS's own CSS/JS exactly as it would without
        USX.
      </p>

      <h2>Enhanced (JS-driven) USWDS components</h2>
      <p>
        A few USWDS components (Accordion, Combobox, Date Picker, and others)
        rely on USWDS's own vanilla-JS behavior to become interactive — expand/
        collapse, filtering, calendar popovers, etc. <code>@solexllc/usx-react</code>{' '}
        components either reimplement that behavior directly in React (e.g.
        Combobox), or render static markup that USWDS's own JS enhances once
        initialized (<code>@uswds/uswds/js/usa-*</code>) — check an individual
        component's story source to see which applies. Either way, the
        rendered HTML/class structure never diverges from the Django/HTML
        reference version.
      </p>

      <h2>Where to go next</h2>
      <ul>
        <li><strong>Components/*</strong> — every implemented component, with its React, Django, and HTML variants.</li>
        <li><strong>Documentation/USX → Overview</strong> — the class/token architecture these components render.</li>
        <li><strong>Documentation/Theme → Getting Started</strong> — wiring up runtime theming.</li>
      </ul>
    </div>
  )
};
