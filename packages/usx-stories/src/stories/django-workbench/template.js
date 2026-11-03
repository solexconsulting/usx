export const exampleProps = {
  variant: 'info',
  heading: 'Application received',
  text: 'Your application is ready for review.',
};

export const exampleTemplate = `{% alert
  variant="info"
  heading="Application received"
  text="Your application is ready for review."
%}{% endalert %}`;

export const editable = ([, definition]) =>
  definition.type !== 'function' && definition.renderers?.django?.supported !== false;

const tagName = (name) => name.replace(/-/g, '_');

const componentTags = (source) =>
  new Set([...source.matchAll(/\{%\s*([a-z][\w]*)\b/g)].map((match) => match[1]));

export function hasComponentTag(source, name) {
  return componentTags(source).has(tagName(name));
}

export function activeComponentFor(components, selectedName, source) {
  const tags = componentTags(source);
  return (
    components.find(({ name }) => name === selectedName && tags.has(tagName(name))) ||
    components.find(({ name }) => tags.has(tagName(name)))
  );
}

function djangoLiteral(value) {
  if (value === null) return 'None';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string' || /[\\\r\n]|\{%|\{\{|\{#/.test(value)) return null;
  if (!value.includes('"')) return `"${value}"`;
  if (!value.includes("'")) return `'${value}'`;
  return null;
}

function valueComment(name, value) {
  // Django comments document complex values; the props form supplies them as context.
  const json = JSON.stringify(value, null, 2).replaceAll('{%', '\\u007b%');
  return `{% comment %}\n${name} = ${json}\n{% endcomment %}`;
}

function htmlAttribute(value) {
  const escapes = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  return String(value).replace(/[&"<>]/g, (character) => escapes[character]);
}

function modalTrigger(component, values) {
  if (component.name !== 'modal') return '';
  // A USWDS modal needs a separate trigger; it is not a Modal prop.
  const id = htmlAttribute(values.id || component.props?.id?.default || 'usx-modal');
  return `<a class="usa-button usx-button usa-button--outline" href="#${id}" aria-controls="${id}" data-open-modal>Open modal</a>\n`;
}

export function templateFor(component, values, bindings = []) {
  if (!component) return null;
  const tag = tagName(component.name);
  const declarations = [];
  const arguments_ = [];
  const usedProps = new Set();

  // When two bindings target one prop, the most recently edited value wins.
  for (const [name, value] of Object.entries(values).reverse()) {
    if (value === undefined) continue;
    const definition = component.props?.[name];
    const binding = bindings.find((entry) => entry.name === name && entry.component === tag);
    const prop = definition || name in (component.default || {}) ? name : binding?.prop;
    if (!prop || usedProps.has(prop) || (definition && !editable([name, definition]))) continue;
    usedProps.add(prop);

    const literal = djangoLiteral(value);
    if (literal === null) {
      declarations.push(valueComment(name, value));
      arguments_.push(`  ${prop}=${name}`);
    } else {
      arguments_.push(`  ${prop}=${literal}`);
    }
  }

  const lines = arguments_.reverse();
  const opening = lines.length ? `{% ${tag}\n${lines.join('\n')}\n%}` : `{% ${tag} %}`;
  return [
    ...declarations.reverse(),
    `${modalTrigger(component, values)}${opening}{% end${tag} %}`,
  ].join('\n');
}
