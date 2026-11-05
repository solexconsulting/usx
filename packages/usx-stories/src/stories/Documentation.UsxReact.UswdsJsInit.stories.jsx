import React from 'react';
import Code from '../../../usx-react/src/components/code/Code';

export default {
  title: 'Documentation/USX React/JavaScript Enhancement',
  tags: ['autodocs']
};

export const UswdsJsInit = {
  render: () => (
    <div className="usa-prose usx-prose" style={{ maxWidth: '840px' }}>
      <h1>Enhancing USWDS and USX components</h1>
      <p>
        React, Django, and static HTML can render the same component markup.
        Interactive behavior comes from either a USWDS module or a USX module,
        depending on the component. For example, Combobox, Date Picker, the
        standard File Input, and Table use <code>@uswds/uswds/js/usa-*</code>;
        DataTable and Carousel use <code>@solexllc/usx/js/*</code>. DataTable
        sorting, selection, grouping, and pagination all run in the same USX
        JavaScript module for React, Django, and HTML.
      </p>
      <p>
        DataTable renders its rows and headers before JavaScript runs, so the
        table content remains available if enhancement does not run.
      </p>
      <p>
        The host application loads those scripts and enhances markup after it
        appears in the DOM. <code>uswds.min.js</code> initializes markup present
        when the bundle runs, typically the initial server-rendered page. It
        does not watch for components inserted or replaced later. In a
        client-rendered application, call the relevant USWDS component&apos;s{' '}
        <code>init(root)</code> after that markup mounts. A page that creates
        markup before the bundle runs is enhanced too; the timing, not the
        rendering framework, determines what the bundle finds.
      </p>

      <p>
        Component assets use root paths by default; no base setting is needed
        when those paths match your deployment. The optional{' '}
        <code>window.usxBaseUrl</code> changes image and sprite URLs, not the
        script URLs used to load USWDS or its behavior initialization. See{' '}
        <strong>Documentation/USX React/Overview</strong>, under{' '}
        <strong>Asset URLs and subpath hosting</strong>, for examples.
      </p>

      <h2>USWDS: <code>.init()</code> vs <code>.on()</code>/<code>.off()</code></h2>
      <p>
        USWDS behavior modules expose <code>on(root)</code> and{' '}
        <code>off(root)</code>; modules that prepare component markup also
        expose <code>init(root)</code>. These calls have different jobs:
      </p>
      <ul>
        <li>
          <code>init(root)</code> walks <code>root</code> (defaults to{' '}
          <code>document.body</code>) and prepares matching markup, such as
          building derived DOM or setting attributes. Use it after a component
          is inserted or replaced.
        </li>
        <li>
          <code>on(root)</code> calls <code>init(root)</code>{' '}
          <em>and then</em> attaches one set of delegated event listeners
          (click, keydown, input, etc.) to <code>root</code>. Because those
          listeners are delegated, they'll fire for any matching element
          under <code>root</code> from then on — including elements that
          don't exist yet. Delegation does not prepare new markup; call that
          module&apos;s <code>init()</code> on each new component or its ancestor.
        </li>
        <li>
          <code>off(root)</code> tears down the listeners <code>on()</code>{' '}
          attached.
        </li>
      </ul>

      <h2>USWDS setup options</h2>
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
          then runs through both (see "Avoid duplicate listeners" below).
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

      <h2>Avoid duplicate listeners</h2>
      <p>
        If a behavior's <code>on()</code> has already been called for a page
        (globally, or by some other piece of code) and something calls{' '}
        <code>on()</code> for it <em>again</em>, that attaches a second,
        independent set of delegated listeners to the same target. Every
        click then runs through both. For toggle-style interactions this
        silently cancels out — a dropdown opens and immediately closes again
        on the same click — which looks exactly like the component is
        broken, but no error is ever thrown. Storybook&apos;s USWDS
        decorators call <code>init()</code> after rendering because the
        global bundle already called <code>on()</code>.
      </p>

      <h2>In this Storybook</h2>
      <p>
        Storybook loads <code>uswds.min.js</code> once in its preview (see{' '}
        <code>previewHead</code> in <code>.storybook/main.js</code>). The
        separate <code>uswds-init.min.js</code> prevents a flash while the
        bundle loads; it does not enhance components. The bundle calls{' '}
        <code>on(document.body)</code> for USWDS behaviors once. Storybook
        also imports <code>@solexllc/usx/js/start</code> once for USX behavior.
      </p>
      <p>
        React, Django, and HTML Storybook stories all mount after those
        startup calls. The <code>componentInit()</code> decorator calls each
        relevant module&apos;s <code>init()</code> after the story renders,
        including after asynchronous Django markup arrives. Your host app
        must make the corresponding call when it mounts USWDS components
        after the bundle has run.
      </p>

      <h2>USWDS example: full bundle loaded once</h2>
      <p>
        Load the full USWDS JS bundle once for the page, then call{' '}
        <code>.init()</code>{' '}
        for any component whose markup renders or changes after that initial
        load — a React mount, a route change, markup fetched from the server,
        content injected into a modal, etc.
      </p>
      <Code
        lines={[
          { code: "import { useEffect, useRef } from 'react';" },
          { code: "import comboBox from '@uswds/uswds/js/usa-combo-box';" },
          { code: '' },
          { code: 'function MyComboBoxField() {' },
          { code: '  const rootRef = useRef(null);' },
          { code: '  useEffect(() => {' },
          { code: '    // The bundle already registered listeners. Enhance this new markup.' },
          { code: '    comboBox.init(rootRef.current);' },
          { code: '  }, []);' },
          { code: '' },
          { code: '  return <div ref={rootRef} className="usa-combo-box">...</div>;' },
          { code: '}' }
        ]}
      />
      <p>
        The same rule applies when Django HTML is fetched and inserted later:
        call <code>init()</code> after insertion. Run it again if your app
        replaces that markup.
      </p>

      <h2>USWDS example: import one module</h2>
      <p>
        If you do not load <code>uswds.min.js</code>, call each imported
        behavior&apos;s <code>on(document.body)</code> once to register its
        listeners. Then call <code>init(root)</code> after later mounts.
      </p>
      <Code
        lines={[
          { code: "import comboBox from '@uswds/uswds/js/usa-combo-box';" },
          { code: '' },
          { code: '// Once, at app startup:' },
          { code: 'comboBox.on(document.body);' },
          { code: '' },
          { code: '// After inserting a combo box later:' },
          { code: 'comboBox.init(newContentRoot);' },
        ]}
      />

      <h2>USX behavior</h2>
      <p>
        <code>uswds.min.js</code> does not include USX behavior. The host app
        can import <code>@solexllc/usx/js/start</code> once; it calls{' '}
        <code>on(document.body)</code> for USX modules when the document is
        ready. You can also import only the modules you use.
      </p>
      <Code lines={[{ code: "import '@solexllc/usx/js/start';" }]} />
      <p>
        USX modules do not all have the same lifecycle. DataTable and Carousel
        expose <code>init(root)</code>. Call it after a client-side mount when
        managing enhancement explicitly. <code>dataTable.init(root)</code>{' '}
        attaches the table&apos;s own behavior and is safe to repeat.
        When <code>start</code> is loaded, DataTable also observes newly
        inserted tables and initializes them automatically. Carousel needs{' '}
        <code>carousel.init(root)</code> for slides inserted after startup;
        its <code>on()</code> registers the event listeners once.
      </p>
      <p>
        Drawer, Popover, USX File Input, Layout, and Theme Picker use delegated
        listeners through <code>on(root)</code> and have no per-component{' '}
        <code>init()</code>. Call <code>on(document.body)</code> once for any
        of these modules you import directly, or load <code>start</code>.
        Their listeners then handle matching markup added later.
      </p>
      <Code
        lines={[
          { code: "import { useEffect, useRef } from 'react';" },
          { code: "import { DataTable } from '@solexllc/usx-react';" },
          { code: "import dataTable from '@solexllc/usx/js/data-table';" },
          { code: '' },
          { code: 'function CasesTable({ columns, rows }) {' },
          { code: '  const rootRef = useRef(null);' },
          { code: '  useEffect(() => {' },
          { code: '    dataTable.init(rootRef.current);' },
          { code: '  }, []);' },
          { code: '  return <div ref={rootRef}><DataTable columns={columns} data={rows} /></div>;' },
          { code: '}' },
        ]}
      />
      <p>
        This example uses the explicit DataTable initializer. It needs no
        React sorting or pagination state. If the table is inserted after an
        asynchronous fetch, initialize it after that insertion; if the app
        replaces the whole table shell, initialize the replacement. If it
        changes rows inside an existing shell, call{' '}
        <code>dataTable.off(root)</code> and then{' '}
        <code>dataTable.init(root)</code> after that update so the enhancer
        reads the new rows.
      </p>
    </div>
  )
};
