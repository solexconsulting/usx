// Mark the component that actually gained behavior, including when init()
// receives the component itself instead of a containing element.
export function components(root, selector) {
  return [
    ...(root.matches?.(selector) ? [root] : []),
    ...(root.querySelectorAll?.(selector) || []),
  ];
}

export function enhancementDisabled(element) {
  return !!element.closest?.('[usx-data-enhanced="true"]');
}

export function markEnhanced(root, selector) {
  components(root, selector)
    .filter((element) => !enhancementDisabled(element))
    .forEach((element) => { element.dataset.enhanced = 'true'; });
}
