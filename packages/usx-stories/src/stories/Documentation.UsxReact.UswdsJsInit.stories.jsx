import React from 'react';
import Code from '../../../core/src/components/code/Code';

export default {
  title: 'Documentation/USX React/USWDS JS Initialization',
  tags: ['autodocs']
};

export const UswdsJsInit = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
      <h1>Initializing USWDS JS behaviors</h1>
      <p>
        Several USWDS components (Combobox, Date Picker, Date Range Picker,
        File Input, Time Picker, Modal, Character Count, Range Slider,
        In-Page Navigation, Language Selector, and more) render <em>static</em>{' '}
        markup — all the interactive behavior (filtering, keyboard navigation,
        opening/closing popovers, building the value display, etc.) comes from
        USWDS's own vanilla-JS bundle (<code>@uswds/uswds/js/usa-*</code>),
        not from <code>@solexllc/usx-react</code>. USX doesn't bundle or
        auto-run that JS for you — your application is responsible for
        initializing it, the same as it would be for the Django or plain HTML
        version of the component.
      </p>

      <h2><code>.init()</code> vs <code>.on()</code>/<code>.off()</code></h2>
      <p>
        Every USWDS behavior module exports the same shape:{' '}
        <code>{'{ init(root), on(root), off(root), ... }'}</code>. These are{' '}
        <strong>not interchangeable</strong>:
      </p>
      <ul>
        <li>
          <code>init(root)</code> walks <code>root</code> (defaults to{' '}
          <code>document</code>) and enhances any matching markup underneath
          it — building derived DOM, setting attributes, etc. It attaches{' '}
          <strong>no event listeners</strong> and is safe to call as often as
          you like; already-enhanced elements are skipped.
        </li>
        <li>
          <code>on(root)</code> calls <code>init(root)</code>{' '}
          <em>and then</em> attaches one set of delegated event listeners
          (click, keydown, input, etc.) to <code>root</code>. Because those
          listeners are delegated, they'll fire for any matching element
          under <code>root</code> from then on — including elements that
          don't exist yet. What they won't do is enhance those future
          elements; each new one still needs <code>init()</code> run on it
          (or an ancestor of it) before the behavior has anything to work
          with.
        </li>
        <li>
          <code>off(root)</code> tears down the listeners <code>on()</code>{' '}
          attached.
        </li>
      </ul>

      <h2>Two ways to wire this up</h2>
      <p>
        Which function you call depends on whether something else in your
        page has already called <code>on()</code> for that behavior:
      </p>
      <ul>
        <li>
          <strong>Something already called <code>on()</code> globally</strong>{' '}
          (the common case — see "In this Storybook" below). Delegated
          listeners already exist on <code>document.body</code>, so all you
          need to do, anywhere new matching markup shows up, is call{' '}
          <code>.init()</code> on it. Do <em>not</em> also call{' '}
          <code>.on()</code> yourself here — that attaches a second,
          independent set of listeners to the same root, and every click
          then runs through both (see "The footgun" below).
        </li>
        <li>
          <strong>Nothing has called <code>on()</code> yet</strong> — e.g.
          you deliberately import only the specific behaviors you use instead
          of the whole USWDS bundle. In that case <em>your</em> app owns
          calling <code>on()</code> once, up front, for each behavior it
          needs; after that, it's back to the first case — later/additional
          markup only ever needs <code>.init()</code>.
        </li>
      </ul>

      <h2>The footgun: duplicate listeners</h2>
      <p>
        If a behavior's <code>on()</code> has already been called for a page
        (globally, or by some other piece of code) and something calls{' '}
        <code>on()</code> for it <em>again</em>, that attaches a second,
        independent set of delegated listeners to the same target. Every
        click then runs through both. For toggle-style interactions this
        silently cancels out — a dropdown opens and immediately closes again
        on the same click — which looks exactly like the component is
        broken, but no error is ever thrown. This is why USX components and
        stories only ever call <code>.init()</code>.
      </p>

      <h2>In this Storybook</h2>
      <p>
        This Storybook's preview loads USWDS's standard{' '}
        <code>uswds-init.min.js</code> + <code>uswds.min.js</code> bundle once,
        globally, on page load (see <code>previewHead</code> in{' '}
        <code>.storybook/main.js</code>). That bundle calls <code>on()</code>{' '}
        for every USWDS behavior against <code>document.body</code> — so the
        listeners already exist before any story renders.
      </p>
      <p>
        This isn't specific to React. Every story — React, Django, or plain
        HTML — mounts its markup <em>after</em> that global JS has already
        run, so every story is in the "something already called{' '}
        <code>on()</code>" case above: it only needs to call <code>.init()</code>{' '}
        once its markup exists in the DOM. That's true even for the Django and
        HTML stories, whose markup never changes at runtime — from USWDS's
        perspective it's still new markup that showed up after the global{' '}
        <code>on()</code> call, so it still needs an explicit{' '}
        <code>.init()</code> to get enhanced. The Django stories in particular
        fetch their markup asynchronously, so their <code>.init()</code> call
        has to wait until that fetch has actually landed in the DOM (see the
        example below).
      </p>

      <h2>Example: relying on the global bundle (this Storybook, most apps)</h2>
      <p>
        The recommended default: load the full USWDS JS bundle once for the
        whole app (as this Storybook does), then call <code>.init()</code>{' '}
        for any component whose markup renders or changes after that initial
        load — a React mount, a route change, markup fetched from the server,
        content injected into a modal, etc.
      </p>
      <Code
        lines={[
          { code: "import combobox from '@uswds/uswds/js/usa-combo-box';" },
          { code: '' },
          { code: 'function MyComboBoxField(props) {' },
          { code: '  useEffect(() => {' },
          { code: '    // uswds.min.js already called combobox.on() once, globally, on load —' },
          { code: '    // this markup just needs to be enhanced, not re-wired with listeners.' },
          { code: '    combobox.init();' },
          { code: '  }, [/* re-run whenever the enhanceable markup changes */]);' },
          { code: '' },
          { code: '  return &lt;select className="usa-combo-box" ...&gt;...&lt;/select&gt;;' },
          { code: '}' }
        ]}
      />
      <p>
        For server-rendered markup that arrives asynchronously (e.g. fetched
        from a Django render endpoint), make sure the effect re-runs{' '}
        <em>after</em> that markup is actually in the DOM — keying the effect
        on the fetched HTML (or a short delay as a fallback) rather than
        running it once unconditionally on mount.
      </p>

      <h2>Example: importing just one component's JS, without the full bundle</h2>
      <p>
        If your app doesn't load the full USWDS bundle and instead imports
        only the specific behaviors it uses, nobody has called{' '}
        <code>on()</code> for those behaviors yet — that becomes your app's
        responsibility, once, at startup:
      </p>
      <Code
        lines={[
          { code: "import combobox from '@uswds/uswds/js/usa-combo-box';" },
          { code: '' },
          { code: '// Once, at app startup (e.g. your root layout/entry point) — this is the' },
          { code: '// one call to on() for this behavior anywhere in the app.' },
          { code: 'combobox.on();' },
          { code: '' },
          { code: "// Later, anywhere a combo box's markup mounts or changes after that —" },
          { code: '// a page navigation, a modal opening, an async fetch resolving — call' },
          { code: '// only init(), the same as when relying on the global bundle:' },
          { code: 'function MyComboBoxField(props) {' },
          { code: '  useEffect(() => {' },
          { code: '    combobox.init();' },
          { code: '  }, []);' },
          { code: '' },
          { code: '  return &lt;select className="usa-combo-box" ...&gt;...&lt;/select&gt;;' },
          { code: '}' }
        ]}
      />
    </div>
  )
};
