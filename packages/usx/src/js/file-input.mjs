// Adds managed-file behavior to server-rendered FileInput markup. React owns
// its own file array and marks its input so the delegated handler leaves it alone.
const instances = new WeakMap();
const managedFiles = new WeakMap();

const addOnlyFor = (input) => input.closest('.usx-file-input__add-only');
const listFor = (addOnly) => [...addOnly.parentElement.children].find((child) => child.classList.contains('usx-file-input__list'));

function sizeLabel(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

function makeList(addOnly) {
  const doc = addOnly.ownerDocument;
  const list = doc.createElement('div');
  list.className = 'usx-file-input__list margin-top-1';
  const announcement = doc.createElement('span');
  announcement.className = 'usa-sr-only';
  announcement.setAttribute('aria-live', 'polite');
  list.append(announcement);
  const hint = addOnly.dataset.usxFileListHint;
  if (hint) {
    const heading = doc.createElement('span');
    heading.className = 'usa-hint usx-hint usx-file-input__list-heading';
    heading.textContent = hint;
    list.append(heading);
  }
  const items = doc.createElement('ul');
  items.className = 'usx-file-input__file-list';
  list.append(items);
  addOnly.after(list);
  return list;
}

function makeRow(file, doc) {
  const row = doc.createElement('li');
  row.className = 'usx-file-input__file-item';
  const info = doc.createElement('div');
  info.className = 'usx-file-input__file-info';
  const name = doc.createElement('span');
  name.className = 'usx-file-input__file-name';
  name.textContent = file.name;
  info.append(name);
  const size = doc.createElement('span');
  size.className = 'usx-file-input__file-size';
  const extension = /\.([^.]+)$/.exec(file.name)?.[1].toUpperCase();
  size.textContent = [extension, sizeLabel(file.size)].filter(Boolean).join(', ');
  info.append(size);
  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'usa-button usx-button usa-button--secondary usx-button--ghost usx-file-input__delete-button';
  button.setAttribute('tooltip', 'Delete this file');
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'usa-icon usa-icon--size-3 usx-file-input__delete-icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('role', 'img');
  const use = doc.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '/img/sprite.svg#delete');
  svg.append(use);
  const label = doc.createElement('span');
  label.className = 'usx-file-input__delete-label';
  label.textContent = 'Delete';
  button.append(svg, label);
  row.append(info, button);
  return row;
}

function notify(input) {
  input.dispatchEvent(new input.ownerDocument.defaultView.CustomEvent('usx:files-change', {
    bubbles: true,
    detail: { files: [...(managedFiles.get(input) || [])].map(({ file }) => file) },
  }));
}

function resetInput(input) {
  input.value = '';
  const drag = input.ownerDocument.defaultView.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  input.setAttribute('aria-label', drag ? 'Drag files here or choose from folder' : 'Choose from folder');
}

function connect(root) {
  const change = (event) => {
    const input = event.target;
    if (!input.matches?.('input[type="file"]') || input.usxReactManaged) return;
    const addOnly = addOnlyFor(input);
    if (!addOnly || !root.contains(addOnly)) return;
    const files = [...(input.files || [])];
    if (!files.length) return;
    const list = listFor(addOnly) || makeList(addOnly);
    const items = list.querySelector('.usx-file-input__file-list');
    const entries = managedFiles.get(input) || [];
    for (const file of files) {
      const row = makeRow(file, input.ownerDocument);
      items.append(row);
      entries.push({ file, row });
    }
    managedFiles.set(input, entries);
    list.querySelector('[aria-live="polite"]').textContent = `You have selected the file: ${files.at(-1).name}.`;
    resetInput(input);
    notify(input);
  };
  const click = (event) => {
    const button = event.target.closest?.('.usx-file-input__delete-button');
    if (!button || !root.contains(button)) return;
    const list = button.closest('.usx-file-input__list');
    const addOnly = list && [...list.parentElement.children].find((child) => child.classList.contains('usx-file-input__add-only'));
    const input = addOnly?.querySelector('input[type="file"]');
    if (!input || input.usxReactManaged || input.disabled) return;
    const row = button.closest('.usx-file-input__file-item');
    managedFiles.set(input, (managedFiles.get(input) || []).filter((entry) => entry.row !== row));
    row.remove();
    const remaining = list.querySelectorAll('.usx-file-input__file-item');
    if (!remaining.length) list.remove();
    else list.querySelector('[aria-live="polite"]').textContent = `You have selected the file: ${remaining[remaining.length - 1].querySelector('.usx-file-input__file-name').textContent}.`;
    notify(input);
  };
  root.addEventListener('change', change);
  root.addEventListener('click', click);
  return () => {
    root.removeEventListener('change', change);
    root.removeEventListener('click', click);
  };
}

const fileInput = {
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default fileInput;
