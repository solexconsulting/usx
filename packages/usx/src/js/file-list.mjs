// Native FileList markup shared by FileInput and Chat's file staging.
// React and Django render the same classes through their FileList component.
export function createFileList(doc, { hint, slim = false, className = '', screenReaderOnlyHint = false } = {}) {
  const list = doc.createElement('div');
  list.className = ['usx-file-input__list', 'margin-top-1', slim && 'usx-file-list--slim', className]
    .filter(Boolean)
    .join(' ');

  const announcement = doc.createElement('span');
  announcement.className = 'usa-sr-only';
  announcement.setAttribute('aria-live', 'polite');
  list.append(announcement);

  if (hint) {
    const heading = doc.createElement('span');
    heading.className = [
      'usa-hint',
      'usx-hint',
      'usx-file-input__list-heading',
      screenReaderOnlyHint && 'usa-sr-only',
    ]
      .filter(Boolean)
      .join(' ');
    heading.textContent = hint;
    list.append(heading);
  }

  const items = doc.createElement('ul');
  items.className = 'usx-file-input__file-list';
  list.append(items);
  return list;
}

function fileSizeLabel(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

export function createFileListRow(doc, file, { removeButtonAttributes = {} } = {}) {
  const row = doc.createElement('li');
  row.className = 'usx-file-input__file-item';

  const info = doc.createElement('div');
  info.className = 'usx-file-input__file-info';
  const name = doc.createElement('span');
  name.className = 'usx-file-input__file-name';
  name.textContent = file.name;
  info.append(name);
  if (file.size != null) {
    const size = doc.createElement('span');
    size.className = 'usx-file-input__file-size';
    const extension = /\.([^.]+)$/.exec(file.name)?.[1].toUpperCase();
    size.textContent = [extension, fileSizeLabel(file.size)].filter(Boolean).join(', ');
    info.append(size);
  }

  const button = doc.createElement('button');
  button.type = 'button';
  button.className =
    'usa-button usx-button usa-button--secondary usx-button--ghost usx-file-input__delete-button';
  button.setAttribute('tooltip', 'Delete this file');
  for (const [name, value] of Object.entries(removeButtonAttributes)) {
    button.setAttribute(name, value);
  }
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'usa-icon usx-icon usa-icon--size-3 usx-file-input__delete-icon');
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
