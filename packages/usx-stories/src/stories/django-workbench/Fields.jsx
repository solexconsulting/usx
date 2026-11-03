import React, { useEffect, useState } from 'react';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import Details from '../../../../usx-react/src/components/details/Details.tsx';
import Input from '../../../../usx-react/src/components/input/Input.tsx';
import Select from '../../../../usx-react/src/components/select/Select.tsx';
import Switch from '../../../../usx-react/src/components/switch/Switch.tsx';
import TextArea from '../../../../usx-react/src/components/text-area/TextArea.tsx';
import { editable } from './template.js';

const MAX_FIELD_DEPTH = 5;
const structured = (type) => ['array', 'object', 'details', 'link'].includes(type);
const clearItems = (state, path) =>
  Object.fromEntries(Object.entries(state).filter(([key]) => !key.startsWith(`${path}.`)));

function labelFor(name) {
  return name
    .replace(/Props$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^./, (first) => first.toUpperCase());
}

function inferDefinition(values) {
  // Some nested props have no schema. Use their current values to build editable fields.
  const present = values.filter((value) => value !== null && value !== undefined);
  const value = present[0];
  if (Array.isArray(value)) return { type: 'array', items: inferDefinition(present.flat()) };
  if (value && typeof value === 'object') {
    const keys = [...new Set(present.flatMap((entry) => Object.keys(entry)))];
    return {
      type: 'object',
      properties: Object.fromEntries(
        keys.map((key) => [key, inferDefinition(present.map((entry) => entry[key]))])
      ),
    };
  }
  return {
    type: typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'number' : 'string',
  };
}

function objectFields(definition, value, components) {
  const component = components.find(
    ({ name }) => name === definition.component?.replace(/_/g, '-')
  );
  const schema = { ...component?.props, ...definition.properties };
  const fields = Object.keys(schema).length ? schema : inferDefinition([value]).properties || {};
  const entries = Object.entries(fields).filter(
    ([name, field]) => !definition.omit?.includes(name) && editable([name, field])
  );
  const primaryNames = new Set([
    ...Object.keys(value || {}),
    ...Object.keys(component?.default || {}),
  ]);
  // Show populated and default fields first; keep the rest in "More fields".
  if (!primaryNames.size) entries.slice(0, 2).forEach(([name]) => primaryNames.add(name));
  return [
    entries.filter(([name]) => primaryNames.has(name)),
    entries.filter(([name]) => !primaryNames.has(name)),
  ];
}

function JsonField({ id, label, value, onChange, path, editing }) {
  return (
    <TextArea
      id={id}
      label={label}
      className="font-mono-xs width-full maxw-none"
      rows={3}
      error={editing.errors[path] ? 'Enter valid JSON.' : undefined}
      value={editing.drafts[path] ?? JSON.stringify(value ?? {}, null, 2)}
      onChange={(event) => {
        const draft = event.target.value;
        editing.setDrafts((current) => ({ ...current, [path]: draft }));
        try {
          onChange(JSON.parse(draft));
          editing.setErrors((current) => {
            const next = { ...current };
            delete next[path];
            return next;
          });
        } catch {
          editing.setErrors((current) => ({ ...current, [path]: true }));
        }
      }}
    />
  );
}

function Field({ path, label, definition, value, onChange, editing, depth = 0, seen = [] }) {
  const type = Array.isArray(value) ? 'array' : definition.type || 'string';
  const id = `workbench-${path.replace(/[^a-z0-9_-]/gi, '-')}`;

  if (type === 'array' && depth < MAX_FIELD_DEPTH) {
    const items = Array.isArray(value) ? value : [];
    const itemDefinition = definition.items || (items.length ? inferDefinition(items) : null);
    if (itemDefinition)
      return (
        <ArrayField
          path={path}
          label={label}
          items={items}
          itemDefinition={itemDefinition}
          onChange={onChange}
          editing={editing}
          depth={depth}
          seen={seen}
        />
      );
  }
  if (
    ['object', 'details', 'link'].includes(type) &&
    depth < MAX_FIELD_DEPTH &&
    (!definition.component || !seen.includes(definition.component))
  ) {
    const [primary, additional] = objectFields(definition, value, editing.components);
    if (primary.length || additional.length)
      return (
        <ObjectField
          path={path}
          label={label}
          value={value}
          onChange={onChange}
          editing={editing}
          depth={depth}
          seen={definition.component ? [...seen, definition.component] : seen}
          primary={primary}
          additional={additional}
        />
      );
  }
  if (type === 'boolean') {
    return (
      <Switch
        id={id}
        label={label}
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    );
  }
  if (type === 'select') {
    return (
      <Select
        id={id}
        label={label}
        className="width-full maxw-none"
        placeholder="—"
        value={value ?? ''}
        options={(definition.options || [])
          .filter(Boolean)
          .map((option) => ({ value: String(option), label: String(option) }))}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  if (structured(type) || type === 'json') {
    return (
      <JsonField
        id={id}
        label={label}
        path={path}
        value={value ?? (type === 'array' ? [] : {})}
        onChange={onChange}
        editing={editing}
      />
    );
  }
  return (
    <Input
      id={id}
      label={label}
      className="width-full maxw-none"
      placeholder=""
      type={type === 'number' ? 'number' : 'text'}
      value={value ?? ''}
      onChange={(event) =>
        onChange(
          type === 'number' && event.target.value !== ''
            ? Number(event.target.value)
            : event.target.value
        )
      }
    />
  );
}

function ArrayField({ path, label, items, itemDefinition, onChange, editing, depth, seen }) {
  const itemName = labelFor(itemDefinition.component || label.replace(/s$/, '') || 'item');
  return (
    <div
      role="group"
      aria-label={label}
      className="margin-y-2 padding-2 border-1px border-base-lighter usx-rounded-sm"
    >
      <header className="display-flex flex-wrap flex-align-center">
        <strong>{labelFor(label)}</strong>
        <span className="margin-left-1 padding-x-1 bg-surface-2 usx-rounded-lg font-body-2xs">
          {items.length}
        </span>
        <Button
          variant="outline"
          label={`Add ${itemName.toLowerCase()}`}
          className="margin-left-auto"
          onClick={() => {
            const empty =
              itemDefinition.type === 'object' ? {} : itemDefinition.type === 'array' ? [] : '';
            onChange([...items, empty]);
            editing.setExpanded((current) => ({ ...current, [`${path}.${items.length}`]: true }));
          }}
        />
      </header>
      {items.length === 0 && <p className="text-base">No items yet.</p>}
      {items.map((item, index) => {
        const itemPath = `${path}.${index}`;
        const summary =
          item && typeof item === 'object'
            ? item.label || item.title || item.name || item.text || item.href
            : item;
        const name = `${itemName} ${index + 1}${summary ? `: ${String(summary).slice(0, 45)}` : ''}`;
        const expanded = Boolean(editing.expanded[itemPath]);
        const invalid = Object.keys(editing.errors).some(
          (key) => key === itemPath || key.startsWith(`${itemPath}.`)
        );
        return (
          <div
            key={index}
            role="group"
            aria-label={name}
            className={`margin-top-1 padding-1 border-1px usx-rounded-sm ${expanded ? 'border-base' : 'border-base-lighter'}`}
          >
            <header className="display-flex flex-wrap flex-align-center bg-surface-2 padding-1">
              <strong className="width-full tablet:width-auto">{name}</strong>
              <Button
                variant={expanded ? 'primary' : 'outline'}
                label={expanded ? 'Done' : 'Edit'}
                aria-label={`${expanded ? 'Done editing' : 'Edit'} ${name}`}
                className="width-auto margin-left-auto"
                disabled={expanded && invalid}
                onClick={() =>
                  editing.setExpanded((current) => ({ ...current, [itemPath]: !expanded }))
                }
              />
              <Button
                variant="unstyled"
                label="Remove"
                aria-label={`Remove ${name}`}
                className="width-auto margin-left-1"
                onClick={() => {
                  onChange(items.filter((_, position) => position !== index));
                  editing.setExpanded((current) => clearItems(current, path));
                  editing.setDrafts((current) => clearItems(current, path));
                  editing.setErrors((current) => clearItems(current, path));
                }}
              />
            </header>
            {expanded && (
              <Field
                path={itemPath}
                label={itemName}
                definition={itemDefinition}
                value={item}
                onChange={(next) =>
                  onChange(items.map((current, position) => (position === index ? next : current)))
                }
                editing={editing}
                depth={depth + 1}
                seen={seen}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ObjectField({ path, label, value, onChange, editing, depth, seen, primary, additional }) {
  const object = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const renderFields = (fields) =>
    fields.map(([name, definition]) => (
      <Field
        key={name}
        path={`${path}.${name}`}
        label={labelFor(name)}
        definition={definition}
        value={object[name]}
        onChange={(next) => onChange({ ...object, [name]: next })}
        editing={editing}
        depth={depth + 1}
        seen={seen}
      />
    ));
  const content = (
    <>
      {renderFields(primary)}
      {additional.length > 0 && (
        <Details
          summaryProps={{
            label: `More ${labelFor(label).toLowerCase()} fields (${additional.length})`,
          }}
          className="margin-y-2"
          contentClassName="workbench-details-content"
        >
          {renderFields(additional)}
        </Details>
      )}
    </>
  );
  return /\.\d+$/.test(path) ? (
    content
  ) : (
    <Details
      summaryProps={{ label: labelFor(label) }}
      className="margin-y-2"
      contentClassName="workbench-details-content"
    >
      {content}
    </Details>
  );
}

export default function PropsEditor({
  component,
  components,
  props,
  bindings,
  onChange,
  onInvalidChange,
}) {
  const [drafts, setDrafts] = useState({});
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState({});
  useEffect(() => onInvalidChange(Object.keys(errors).length > 0), [errors, onInvalidChange]);

  const editing = { components, drafts, setDrafts, errors, setErrors, expanded, setExpanded };
  const available = Object.entries(component?.props || {}).filter(editable);
  const availableNames = new Set(available.map(([name]) => name));
  const defaultNames = new Set(Object.keys(component?.default || {}));
  const main = available.filter(([name]) => !defaultNames.size || defaultNames.has(name));
  const additional = available.filter(([name]) => defaultNames.size && !defaultNames.has(name));

  const renderProps = (entries) =>
    entries.map(([name, definition]) => (
      <Field
        key={name}
        path={name}
        label={labelFor(name)}
        definition={definition}
        value={props[name]}
        onChange={(value) => onChange(name, value)}
        editing={editing}
      />
    ));

  const otherBindings = bindings.filter(({ name }) => !availableNames.has(name));
  if (!available.length && !otherBindings.length) {
    return <p className="text-base">Select a component or add a component tag to see its props.</p>;
  }
  return (
    <>
      {renderProps(main)}
      {additional.length > 0 && (
        <Details
          summaryProps={{ label: `More ${component.name} props (${additional.length})` }}
          className="margin-y-2"
          contentClassName="workbench-details-content"
        >
          {renderProps(additional)}
        </Details>
      )}
      {otherBindings.map((binding) =>
        binding.fields ? (
          <Details
            key={binding.name}
            summaryProps={{ label: `${binding.name} (${binding.component} props)` }}
            className="margin-y-2"
            contentClassName="workbench-details-content"
          >
            {Object.entries(binding.fields).map(([name, definition]) => (
              <Field
                key={name}
                path={`${binding.name}.${name}`}
                label={labelFor(name)}
                definition={definition}
                value={props[binding.name]?.[name] ?? definition.default}
                onChange={(value) => onChange(binding.name, value, name)}
                editing={editing}
              />
            ))}
          </Details>
        ) : (
          <Field
            key={binding.name}
            path={binding.name}
            label={
              binding.component && binding.prop && binding.prop !== binding.name
                ? `${labelFor(binding.name)} (${binding.component}.${binding.prop})`
                : labelFor(binding.name)
            }
            definition={binding}
            value={props[binding.name] ?? binding.default}
            onChange={(value) => onChange(binding.name, value)}
            editing={editing}
          />
        )
      )}
    </>
  );
}
