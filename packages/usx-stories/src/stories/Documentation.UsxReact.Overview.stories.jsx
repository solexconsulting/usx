import React from 'react';
import Code from '../../../usx-react/src/components/code/Code';

export default {
  title: 'Documentation/USX React/Overview',
  tags: ['autodocs']
};

export const Overview = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
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
        <li>You want React props and callbacks around USWDS markup, with USWDS JavaScript initialized by your application.</li>
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

      <h2 id="asset-urls">Asset URLs and subpath hosting</h2>
      <p>
        No configuration is needed when assets are available at the default
        root paths, such as <code>/img/sprite.svg</code>. If your assets live
        elsewhere, <code>window.usxBaseUrl</code> optionally changes that prefix.
        For example, assets under <code>/static-root/</code> could use:
      </p>
      <Code
        lines={[
          { code: '<script>window.usxBaseUrl = "/static-root/";</script>' },
        ]}
      />
      <p>
        In this example, Banner loads{' '}
        <code>/static-root/img/us_flag_small.png</code>, Icon uses{' '}
        <code>/static-root/img/sprite.svg</code>, and Spinner uses{' '}
        <code>/static-root/img/usx-sprite.svg</code>. Alert and copy-button
        icons use the same base. An unset or empty value defaults to{' '}
        <code>/</code>; a trailing slash is optional.
      </p>
      <p>
        This is the <strong>static asset root, not the application routing base</strong>.
        The application and its assets can share a location or use different
        locations. Even an application hosted under a subpath needs no setting
        if its assets still use <code>/img/...</code>. USX does not infer the
        asset location from the current page or change your routing.
      </p>
      <p>
        Asset publishing remains part of your application's deployment.
        The setting only changes component image and sprite URLs; it does not
        copy files or rewrite CSS URLs, stylesheet/script URLs, or literal URLs
        in supplied HTML.
      </p>
      <p>
        Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer accept a
        single <code>staticBaseUrl</code> string for a per-component override.
        Resolution is automatic: a non-empty <code>staticBaseUrl</code>, then{' '}
        <code>window.usxBaseUrl</code>, then <code>/</code>. The base stays
        separate from the asset filename:
      </p>
      <Code
        lines={[
          { code: "import { Banner, Icon } from '@solexllc/usx-react';" },
          { code: '' },
          { code: '<Banner flagSrc="flags/agency.png" staticBaseUrl="/other-assets/" />' },
          { code: '<Icon name="check" staticBaseUrl="/other-assets/" />' },
        ]}
      />
      <p>
        These resolve to <code>/other-assets/flags/agency.png</code> and{' '}
        <code>/other-assets/img/sprite.svg#check</code>. Banner's override also
        applies to its other images and nested lock icon. Trailing base slashes
        and leading path slashes are normalized; no manual concatenation or
        helper call is needed. An empty override falls back to the global;
        <code> staticBaseUrl="/"</code> explicitly selects root. Fully qualified
        asset URLs remain unchanged. The legacy <code>staticUrlPrefix</code>{' '}
        prop on Icon/Spinner still accepts a complete sprite URL prefix.
      </p>
      <p>
        Image resolves its source, responsive fallback, and each source-set candidate.
        Header and Footer resolve logos, inverse artwork, and symbols internally;
        Footer also resolves social-image paths. Supply asset-relative filenames,
        not paths already prefixed with the base. Fully qualified and data URLs,
        as well as link destinations, remain unchanged.
      </p>
      <Code
        lines={[
          { code: '<Image src="img/agency-logo.svg" alt="Agency" />' },
          { code: '<Header branding={{ logo: "agency-logo.svg", title: "Agency" }} />' },
          { code: '<Footer branding={{ logo: "agency-logo.svg" }} staticBaseUrl="/other-assets/" />' },
        ]}
      />
      <p>
        When using a global base, define it before rendering. A component's{' '}
        <code>staticBaseUrl</code> also works without <code>window</code> during
        server rendering. Django templates accept the same override and use{' '}
        <code>STATIC_URL</code> as their global fallback. Browsers generally block
        cross-origin <code>{'<use>'}</code> references, even with CORS enabled.
      </p>

      <h2>Enhanced (JS-driven) USWDS components</h2>
      <p>
        USWDS JavaScript should own standard USWDS interactions. Accordion, Banner,
        Combobox, Date Picker, the standard File Input, and Time Picker render
        markup that your application enhances by initializing the corresponding
        <code> @uswds/uswds/js/usa-*</code> module.
      </p>
      <p>
        Table still manages sorting through React hooks
        rather than delegating that behavior to USWDS. Optional USX features,
        such as File Input's individually managed file list, also use React state, but extend
        rather than replace the underlying USWDS widget. See{' '}
        <strong>Documentation/USX React → USWDS JS Initialization</strong> for
        how and why your app is responsible for initializing that JS.
      </p>

      <h2>Where to go next</h2>
      <ul>
        <li><strong>Components/*</strong> — every implemented component, with its React, Django, and HTML variants.</li>
        <li><strong>Documentation/USX React → USWDS JS Initialization</strong> — calling <code>.init()</code> for JS-enhanced components.</li>
        <li><strong>Documentation/USX → Overview</strong> — the class/token architecture these components render.</li>
        <li><strong>Documentation/Theme → Getting Started</strong> — wiring up runtime theming.</li>
      </ul>
    </div>
  )
};
