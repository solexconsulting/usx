import React, { useEffect, useState } from 'react';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import ErrorMessage from '../../../../usx-react/src/components/error-message/ErrorMessage.tsx';
import Fieldset from '../../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Select from '../../../../usx-react/src/components/select/Select.tsx';
import TextArea from '../../../../usx-react/src/components/text-area/TextArea.tsx';
import PropsEditor from './Fields.jsx';
import {
  activeComponentFor,
  editable,
  exampleProps,
  exampleTemplate,
  hasComponentTag,
  templateFor,
} from './template.js';
import { djangoBaseUrl, previewDocument } from './preview.js';

const asObject = (text) => {
  const value = JSON.parse(text);
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    throw new Error('Props must be a JSON object.');
  }
  return value;
};

export default function Workbench() {
  const [nonce] = useState(() =>
    Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')
  );
  const [components, setComponents] = useState([]);
  const [componentError, setComponentError] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('alert');
  const [template, setTemplate] = useState(exampleTemplate);
  const [props, setProps] = useState(exampleProps);
  const [rawProps, setRawProps] = useState(JSON.stringify(exampleProps, null, 2));
  const [mode, setMode] = useState('fields');
  const [formVersion, setFormVersion] = useState(0);
  const [invalidFields, setInvalidFields] = useState(false);
  const [bindings, setBindings] = useState([]);
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const activeComponent = activeComponentFor(components, selectedComponent, template);

  useEffect(() => {
    let mounted = true;
    fetch(`${djangoBaseUrl()}/components/`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load components.');
        return response.json();
      })
      .then((items) => {
        if (mounted) setComponents(items.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch(() => {
        if (mounted) setComponentError('Could not load components from Django.');
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        if (mode === 'fields' && invalidFields) {
          throw new Error('Fix the JSON in the highlighted field to update the preview.');
        }
        const values = mode === 'json' ? asObject(rawProps) : props;
        setBusy(true);
        setError('');
        const response = await fetch(`${djangoBaseUrl()}/workbench/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template, props: values }),
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not render the template.');
        if (controller.signal.aborted) return;
        setBindings(result.bindings);
        setHtml(result.html);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause.message);
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [template, props, rawProps, mode, invalidFields]);

  const chooseComponent = (name) => {
    const component = components.find((item) => item.name === name);
    setSelectedComponent(name);
    if (!component) return;
    const values = component.default || {};
    setTemplate(templateFor(component, values));
    setProps(values);
    setRawProps(JSON.stringify(values, null, 2));
    setBindings([]);
    setFormVersion((current) => current + 1);
    setInvalidFields(false);
    setHtml('');
    setError('');
    setComponentError('');
  };

  const editTemplate = (source) => {
    if (selectedComponent && !hasComponentTag(source, selectedComponent)) setSelectedComponent('');
    setTemplate(source);
    setBindings([]);
    setFormVersion((current) => current + 1);
    setInvalidFields(false);
  };

  const editProp = (name, value, field) => {
    const next = field
      ? { ...props, [name]: { ...(props[name] || {}), [field]: value } }
      : { ...props, [name]: value };
    const tag = activeComponent?.name.replace(/-/g, '_');
    const binding = bindings.find((entry) => entry.name === name && entry.component === tag);
    const available = Object.entries(activeComponent?.props || {})
      .filter(editable)
      .some(([key]) => key === name);
    if (!field && binding?.prop && binding.prop !== 'props' && !available) {
      next[binding.prop] = value;
      delete next[name];
    }
    setProps(next);
    const source = templateFor(activeComponent, next, bindings);
    if (source !== null) {
      setTemplate(source);
      setSelectedComponent(activeComponent.name);
    }
  };

  const editRawProps = (text) => {
    setRawProps(text);
    try {
      const source = templateFor(activeComponent, asObject(text), bindings);
      if (source !== null) setTemplate(source);
    } catch {
      /* Incomplete JSON remains editable; the preview shows its error. */
    }
  };

  const switchMode = (next) => {
    if (next === mode) return;
    if (next === 'json') {
      setRawProps(JSON.stringify(props, null, 2));
    } else {
      try {
        setProps(asObject(rawProps));
      } catch (cause) {
        setError(cause.message);
        return;
      }
    }
    setMode(next);
    setInvalidFields(false);
    setError('');
  };

  return (
    <main className="maxw-widescreen margin-x-auto padding-3">
      <h1 className="font-heading-xl margin-top-0">Django template workbench</h1>
      <p>Choose a component or write a template. The preview updates automatically.</p>
      <div className="grid-row grid-gap-4 flex-align-start">
        <section className="grid-col-12 desktop:grid-col-6 minw-0">
          <Fieldset aria-label="Workbench editor" className="border-0 padding-0 minw-0">
            <Select
              id="workbench-component"
              label="Start from a component"
              className="width-full maxw-none"
              placeholder="Choose a component…"
              value={selectedComponent}
              options={components.map(({ name }) => ({ value: name, label: name }))}
              onChange={(event) => chooseComponent(event.target.value)}
            />
            {componentError && <ErrorMessage>{componentError}</ErrorMessage>}
            <TextArea
              id="workbench-template"
              label="Template"
              className="font-mono-xs width-full maxw-none"
              rows={7}
              value={template}
              onChange={(event) => editTemplate(event.target.value)}
              spellCheck={false}
            />
            <p className="text-base">
              Form edits regenerate the template. Comments show complex values; the props form
              supplies them during preview.
            </p>
            <header className="display-flex flex-wrap flex-align-center margin-y-2">
              <h2 className="font-heading-md margin-0">Props</h2>
              <div
                role="group"
                aria-label="Prop editor mode"
                className="display-flex margin-left-auto"
              >
                <Button
                  variant={mode === 'fields' ? 'primary' : 'outline'}
                  aria-pressed={mode === 'fields'}
                  onClick={() => switchMode('fields')}
                >
                  Fields
                </Button>
                <Button
                  variant={mode === 'json' ? 'primary' : 'outline'}
                  aria-pressed={mode === 'json'}
                  onClick={() => switchMode('json')}
                >
                  JSON
                </Button>
              </div>
            </header>
            {mode === 'json' ? (
              <TextArea
                id="workbench-json-props"
                label="JSON props"
                screenReaderOnlyLabel
                className="font-mono-xs width-full maxw-none"
                rows={12}
                value={rawProps}
                onChange={(event) => editRawProps(event.target.value)}
                spellCheck={false}
              />
            ) : (
              <PropsEditor
                key={formVersion}
                component={activeComponent}
                components={components}
                props={props}
                bindings={bindings}
                onChange={editProp}
                onInvalidChange={setInvalidFields}
              />
            )}
          </Fieldset>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </section>
        <section className="workbench-preview grid-col-12 desktop:grid-col-6 minw-0">
          <h2 className="font-heading-lg margin-top-0">Preview</h2>
          {busy && (
            <p className="text-base" role="status">
              Updating preview…
            </p>
          )}
          <iframe
            title="Isolated Django template preview"
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            srcDoc={previewDocument(html, nonce)}
            className="display-block width-full border-1px border-base-light bg-white"
            style={{ height: '34rem' }}
          />
        </section>
      </div>
    </main>
  );
}
