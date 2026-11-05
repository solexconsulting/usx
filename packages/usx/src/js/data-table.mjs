// Progressive enhancement shared by React, Django, and static USX data tables.
import { enhancementDisabled } from './enhancement.mjs';
const instances = new WeakMap();
const observers = new WeakMap();
const selector = '[data-usx-data-table]';

function roots(root) {
  return [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];
}

function enhance(shell) {
  if (instances.has(shell) || enhancementDisabled(shell)) return;
  const table = shell.querySelector('table.usx-data-table');
  if (!table) return;
  const rows = [...table.querySelectorAll('tbody .usx-data-table__row')];
  const selectAll = table.querySelector('thead input[type="checkbox"]');
  const caption = table.querySelector('caption')?.textContent.trim() || 'Data table';
  const head = [...table.querySelectorAll('thead th')];
  const live = shell.ownerDocument.createElement('div');
  live.className = 'usa-sr-only';
  live.setAttribute('aria-live', 'polite');
  shell.append(live);

  let query = '';
  let page = 1;
  let pageSize = Math.max(1, Number(shell.dataset.pageSize) || 10);
  const requestedDirection = shell.dataset.initialSortDirection;
  const initialSortKey = ['asc', 'desc'].includes(requestedDirection) ? shell.dataset.initialSortKey : null;
  let sortIndex = initialSortKey
    ? head.findIndex((header) => header.dataset.columnKey === initialSortKey && header.hasAttribute('data-usx-sortable'))
    : head.findIndex((header) => header.hasAttribute('aria-sort'));
  let sortDirection = sortIndex < 0 ? 0 : initialSortKey
    ? requestedDirection === 'desc' ? -1 : 1
    : head[sortIndex].getAttribute('aria-sort') === 'descending' ? -1 : 1;
  const originalOrder = new Map(rows.map((row, index) => [row, index]));
  const serverTotal = Number(shell.dataset.totalCount);
  const serverSide = shell.hasAttribute('data-total-count') && Number.isFinite(serverTotal);
  const toolbar = shell.querySelector('.usx-data-table__toolbar');
  const pager = shell.hasAttribute('data-paginate') ? shell.querySelector('.usx-pagination') : null;
  const summary = pager?.querySelector('.usx-pagination__summary');
  const previous = pager?.querySelector('.usa-pagination__previous-page');
  const next = pager?.querySelector('.usa-pagination__next-page');
  let empty;
  const listeners = [];
  const listen = (element, type, handler) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  const emit = (name, detail) => shell.dispatchEvent(new CustomEvent(`usx:data-table:${name}`, {
    bubbles: true, detail,
  }));

  const valueAt = (row, index, key) => {
    const cell = key
      ? [...row.cells].find((item) => item.dataset.columnKey === key)
      : row.cells[index];
    return cell?.getAttribute('data-sort-value') ?? cell?.textContent?.trim() ?? '';
  };
  const collectBlocks = () => {
    const blocks = [];
    for (const body of table.tBodies) {
      const bodyRows = [...body.querySelectorAll(':scope > tr.usx-data-table__row')];
      let block = [];
      let end = -1;
      bodyRows.forEach((row, index) => {
        block.push(row);
        for (const cell of row.cells) end = Math.max(end, index + cell.rowSpan - 1);
        if (index >= end) { blocks.push(block); block = []; }
      });
      if (block.length) blocks.push(block);
    }
    return blocks;
  };
  let pageCount = 1;
  const updateSelectAll = () => {
    if (!selectAll) return;
    const enabled = rows.map((row) => row.querySelector('input[type="checkbox"]'))
      .filter((input) => input && !input.disabled && !input.closest('tr').hidden);
    const selected = enabled.filter((input) => input.checked).length;
    selectAll.checked = enabled.length > 0 && selected === enabled.length;
    selectAll.indeterminate = selected > 0 && selected < enabled.length;
  };
  const selectedKeys = () => rows.filter((row) =>
    row.querySelector('.usx-data-table__cell--selection input:checked'))
    .map((row) => row.dataset.rowKey || row.querySelector('.usx-data-table__cell--selection input').value);
  const refresh = () => {
    const matchingBlocks = collectBlocks().filter((block) => block.some((row) =>
      (row.hasAttribute('data-search-value') ? row.dataset.searchValue : row.textContent)
        .toLocaleLowerCase().includes(query)));
    const matching = matchingBlocks.flat();
    const count = matching.length;
    const pageBlocks = [[]];
    let pageRows = 0;
    for (const block of matchingBlocks) {
      if (pageRows && pageRows + block.length > pageSize) { pageBlocks.push([]); pageRows = 0; }
      pageBlocks[pageBlocks.length - 1].push(block);
      pageRows += block.length;
    }
    const pages = serverSide ? Math.max(1, Math.ceil(serverTotal / pageSize)) : pageBlocks.length;
    pageCount = pages;
    page = Math.min(page, pages);
    const visible = new Set((pager && !serverSide ? pageBlocks[page - 1] : matchingBlocks).flat());
    const first = serverSide ? (page - 1) * pageSize + 1 : pageBlocks.slice(0, page - 1).flat(2).length + 1;
    const last = serverSide ? Math.min(page * pageSize, serverTotal) : first + pageBlocks[page - 1].flat().length - 1;
    rows.forEach((row) => {
      row.hidden = !visible.has(row);
      const detail = row.nextElementSibling;
      if (detail?.classList.contains('usx-data-table__detail-row')) {
        const button = row.querySelector('.usx-data-table__detail-toggle');
        detail.hidden = !visible.has(row) || button?.getAttribute('aria-expanded') !== 'true';
      }
    });
    updateSelectAll();
    for (const header of table.querySelectorAll('.usx-data-table__group--header')) {
      const group = header.nextElementSibling;
      header.hidden = !group?.querySelector('.usx-data-table__row:not([hidden])');
    }
    if (empty) {
      empty.hidden = count !== 0;
      empty.textContent = query ? 'No matching rows.' : 'No rows to display.';
    }
    const total = serverSide ? serverTotal : count;
    const totalPages = serverSide ? Math.max(1, Math.ceil(total / pageSize)) : pages;
    if (summary) summary.textContent = count
      ? `Showing ${serverSide ? (page - 1) * pageSize + 1 : first}–${serverSide ? Math.min(page * pageSize, total) : last} of ${total} items`
      : 'No rows';
    const nav = pager?.querySelector('.usx-pagination__nav');
    if (nav) {
      nav.dataset.usxPaginationCurrentPage = String(page);
      nav.dataset.usxPaginationPageSize = String(pageSize);
      nav.dataset.usxPaginationTotalItems = String(total);
      const list = nav.querySelector('.usa-pagination__list');
      const firstPage = list?.querySelector('.usa-pagination__page-no');
      for (let number = 1; number <= totalPages && firstPage; number++) {
        let item = [...list.querySelectorAll('.usa-pagination__page-no')][number - 1];
        if (!item) { item = firstPage.cloneNode(true); list.insertBefore(item, next?.closest('li') || null); }
        const link = item.querySelector('a');
        link.dataset.usxPaginationPage = String(number);
        link.textContent = String(number);
        link.setAttribute('aria-label', `Page ${number}`);
        link.classList.toggle('usa-current', number === page);
        if (number === page) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
      [...list.querySelectorAll('.usa-pagination__page-no')].forEach((item, index) => { item.hidden = index >= totalPages; });
      for (const [link, target, disabled] of [[previous, page - 1, page === 1], [next, page + 1, page === totalPages]]) {
        if (!link) continue;
        link.dataset.usxPaginationPage = String(target);
        link.classList.toggle('display-none', disabled);
        link.setAttribute('aria-disabled', String(disabled));
        link.tabIndex = disabled ? -1 : 0;
      }
    }
    live.textContent = `${total} ${total === 1 ? 'row' : 'rows'} found. Page ${page} of ${totalPages}.`;
  };

  if (shell.hasAttribute('data-searchable') && toolbar) {
    const input = toolbar.querySelector('input.usa-input.usx-input');
    if (input) {
      listen(input, 'input', () => {
        query = input.value.trim().toLocaleLowerCase(); page = 1; refresh();
        emit('search', { query: input.value });
      });
    }
  }

  if (pager) {
    const sizeSelect = pager.querySelector('.usx-pagination__step-options select');
    if (sizeSelect) {
      sizeSelect.value = String(pageSize);
      listen(sizeSelect, 'change', () => {
        pageSize = Number(sizeSelect.value); page = 1; refresh();
        emit('page-change', { page, pageSize });
      });
    }
    listen(pager, 'click', (event) => {
      const link = event.target.closest('[data-usx-pagination-page]');
      if (!link || !pager.contains(link)) return;
      event.preventDefault();
      if (link.getAttribute('aria-disabled') === 'true') return;
      const target = Number(link.dataset.usxPaginationPage);
      if (target >= 1 && target <= pageCount) {
        page = target; refresh(); emit('page-change', { page, pageSize });
      }
    });
  }

  if (!table.querySelector('.usx-data-table__placeholder-row')) {
    empty = shell.ownerDocument.createElement('p');
    empty.className = 'usx-data-table__empty';
    empty.setAttribute('role', 'status');
    empty.hidden = true;
    shell.append(empty);
  }

  const applySort = () => {
    const header = head[sortIndex];
    const key = header?.dataset.columnKey;
    const blocks = collectBlocks();
    for (const body of table.tBodies) {
      const sorted = blocks.filter((block) => block[0].parentElement === body)
        .sort((a, b) => sortDirection && key
          ? sortDirection * valueAt(a[0], sortIndex, key).localeCompare(
            valueAt(b[0], sortIndex, key), undefined, { numeric: true })
          : originalOrder.get(a[0]) - originalOrder.get(b[0]));
      for (const block of sorted) for (const row of block) {
        const detail = row.nextElementSibling?.classList.contains('usx-data-table__detail-row')
          ? row.nextElementSibling : null;
        body.append(row);
        if (detail) body.append(detail);
      }
    }
    rows.splice(0, rows.length, ...collectBlocks().flat());
    head.forEach((cell) => cell.removeAttribute('aria-sort'));
    if (header && sortDirection) header.setAttribute('aria-sort', sortDirection === 1 ? 'ascending' : 'descending');
    for (const cell of table.querySelectorAll('tbody [data-column-key]')) {
      cell.toggleAttribute('data-sort-active', !!key && !!sortDirection && cell.dataset.columnKey === key);
    }
    for (const cell of head) {
      const button = cell.querySelector('.usx-data-table__sort-button');
      if (!button) continue;
      const label = cell.dataset.sortLabel || cell.dataset.columnKey;
      const next = cell === header && sortDirection === 1 ? 'descending' : 'ascending';
      button.setAttribute('aria-label', `Sort by ${label} ${next}`);
      button.title = `Sort by ${label} ${next}`;
    }
  };

  head.forEach((header, index) => {
    if (!header.hasAttribute('data-usx-sortable')) return;
    const key = header.dataset.columnKey;
    const label = header.textContent.trim();
    header.dataset.sortLabel = label;
    const button = shell.ownerDocument.createElement('button');
    button.type = 'button';
    button.className = 'usx-data-table__sort-button';
    button.setAttribute('aria-label', `Sort by ${label} ascending`);
    button.title = `Sort by ${label} ascending`;
    button.innerHTML = '<svg class="usx-data-table__sort-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g class="descending"><path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"/></g><g class="ascending"><path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"/></g><g class="unsorted"><polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"/></g></svg>';
    header.append(button);
    listen(button, 'click', () => {
      sortDirection = sortIndex !== index ? 1 : sortDirection === 1 ? -1 : sortDirection === -1 ? 0 : 1;
      sortIndex = sortDirection ? index : -1;
      applySort();
      live.textContent = sortDirection ? `${caption} sorted by ${label} ${sortDirection === 1 ? 'ascending' : 'descending'}.`
        : `${caption} returned to its original order.`;
      page = 1;
      refresh();
      emit('sort', { key: sortDirection ? key : null, direction: sortDirection === 1 ? 'asc' : sortDirection === -1 ? 'desc' : null });
    });
  });
  if (sortIndex >= 0) applySort();

  if (selectAll) listen(selectAll, 'change', () => {
    for (const row of rows) {
      if (row.hidden) continue;
      const input = row.querySelector('input[type="checkbox"]');
      if (input && !input.disabled) {
        input.checked = selectAll.checked;
        row.classList.toggle('usx-data-table__row--selected', input.checked);
      }
    }
    updateSelectAll();
    emit('select', { selectedKeys: selectedKeys() });
  });
  for (const input of table.querySelectorAll('tbody input[type="checkbox"], tbody input[type="radio"]')) {
    listen(input, 'change', () => {
      if (input.type === 'radio') {
        for (const radio of table.querySelectorAll('tbody input[type="radio"]')) {
          radio.closest('tr')?.classList.toggle('usx-data-table__row--selected', radio.checked);
        }
      } else {
        input.closest('tr')?.classList.toggle('usx-data-table__row--selected', input.checked);
        updateSelectAll();
      }
      emit('select', { selectedKeys: selectedKeys() });
    });
  }
  const activateRow = (event) => {
    const row = event.target.closest('.usx-data-table__row--clickable');
    if (!row || !table.contains(row) || row.classList.contains('usx-data-table__row--disabled')) return;
    if (event.type === 'click' && event.target.closest(
      'a, button, input, select, textarea, label, .usx-data-table__cell--selection, .usx-data-table__cell--detail-toggle'
    )) return;
    if (event.type === 'keydown') {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (event.target !== row) return;
      event.preventDefault();
    }
    emit('row-activate', { rowKey: row.dataset.rowKey, row });
  };
  listen(table, 'click', activateRow);
  listen(table, 'keydown', activateRow);
  for (const button of table.querySelectorAll('.usx-data-table__group-toggle[aria-controls]')) {
    listen(button, 'click', () => {
      const target = shell.ownerDocument.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;
      target.hidden = !target.hidden;
      button.setAttribute('aria-expanded', String(!target.hidden));
      emit('group-toggle', { group: target.id, expanded: !target.hidden });
    });
  }
  for (const button of table.querySelectorAll('.usx-data-table__detail-toggle[aria-controls]')) {
    listen(button, 'click', () => {
      const target = shell.ownerDocument.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      if (!button.hasAttribute('data-detail-label')) {
        button.setAttribute('aria-label', `${expanded ? 'Expand' : 'Collapse'} row details`);
      }
      target.hidden = expanded;
      emit('detail-toggle', { rowKey: button.closest('tr')?.dataset.rowKey, expanded: !expanded });
    });
  }
  let sentinelObserver;
  const sentinel = shell.hasAttribute('data-infinite') ? table.querySelector('.usx-data-table__sentinel') : null;
  if (sentinel && typeof IntersectionObserver !== 'undefined') {
    sentinelObserver = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) emit('more', {});
    }, { threshold: 0.1 });
    sentinelObserver.observe(sentinel);
  }
  refresh();
  shell.dataset.enhanced = 'true';
  instances.set(shell, () => {
    listeners.forEach((remove) => remove()); sentinelObserver?.disconnect(); empty?.remove(); live.remove();
    table.querySelectorAll('.usx-data-table__sort-button').forEach((button) => button.remove());
  });
}

const dataTable = {
  init(root = document.body) { roots(root).forEach(enhance); },
  on(root = document.body) {
    if (observers.has(root)) return;
    dataTable.init(root);
    const observer = new MutationObserver((records) => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType === 1) dataTable.init(node);
      }
    });
    observer.observe(root, { childList: true, subtree: true });
    observers.set(root, observer);
  },
  off(root = document.body) {
    observers.get(root)?.disconnect();
    observers.delete(root);
    roots(root).forEach((shell) => { instances.get(shell)?.(); instances.delete(shell); });
  },
};

export default dataTable;
