export const demoRows = (page, pageSize, totalItems = 42) =>
  Array.from(
    { length: Math.min(2, Math.max(0, totalItems - (page - 1) * pageSize)) },
    (_, index) => `Record ${(page - 1) * pageSize + index + 1}`,
  );

// Story consumer code stands in for an application's API call.
export const fetchDemoRows = async (page, pageSize, totalItems = 42) => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return demoRows(page, pageSize, totalItems);
};

// Consumer-owned event parsing; Pagination only renders the attributes.
export const pageFromClick = (event, container) => {
  const link = event.target.closest?.('[data-usx-pagination-page]');
  if (!link || !container.contains(link) || link.getAttribute('aria-disabled') === 'true') return null;
  const nav = link.closest('nav.usx-pagination__nav');
  const page = Number(link.dataset.usxPaginationPage);
  if (!nav || !Number.isInteger(page) || page < 1) return null;
  return { page, pageSize: Number(nav.dataset.usxPaginationPageSize || 10) };
};

export const sizeFromChange = (event, container) => {
  const select = event.target;
  if (!select.matches?.('.usx-pagination__step-options select') || !container.contains(select)) return null;
  const pageSize = Number(select.value);
  const nav = container.querySelector('nav.usx-pagination__nav');
  if (!nav || !Number.isInteger(pageSize) || pageSize < 1) return null;
  const currentPage = Number(nav.dataset.usxPaginationCurrentPage || 1);
  const totalItems = Number(nav.dataset.usxPaginationTotalItems);
  const page = totalItems ? Math.min(currentPage, Math.ceil(totalItems / pageSize)) : 1;
  return { page, pageSize };
};
