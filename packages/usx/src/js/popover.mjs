const DISCLOSURE = 'details.usx-popover';
const instances = new WeakMap();

const summaryOf = (details) => details.querySelector(':scope > summary');
const panelOf = (details) => details.querySelector(':scope > .usx-popover__panel');
const disclosures = (root) => [
  ...(root.matches?.(DISCLOSURE) ? [root] : []),
  ...root.querySelectorAll(DISCLOSURE),
];

function close(details, restoreFocus = false) {
  const focusInside =
    details.open && panelOf(details)?.contains(details.ownerDocument.activeElement);
  details.open = false;
  details.querySelectorAll(`${DISCLOSURE}[open]`).forEach((child) => {
    child.open = false;
  });
  if (restoreFocus || focusInside) summaryOf(details)?.focus({ preventScroll: true });
}

function connect(root) {
  const doc = root.ownerDocument || root;
  const dismissOutside = (node) => {
    disclosures(root)
      .filter((details) => details.open && !details.contains(node))
      .forEach((details) => close(details));
  };
  const click = (event) => {
    if (event.defaultPrevented) return;
    const button = event.target.closest?.('[data-usx-popover-close]');
    const panel = button && doc.getElementById(button.dataset.usxPopoverClose);
    const details = panel?.parentElement;
    if (details?.matches(DISCLOSURE) && root.contains(details) && panelOf(details) === panel) {
      event.preventDefault();
      if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') close(details, true);
      return;
    }
    dismissOutside(event.target);
  };
  const keydown = (event) => {
    if (event.defaultPrevented || event.key !== 'Escape') return;
    const details = event.target.closest?.(`${DISCLOSURE}[open]`);
    if (!details || !root.contains(details)) return;
    event.preventDefault();
    event.stopPropagation();
    close(details, true);
  };
  const toggle = (event) => {
    const details = event.target;
    if (!details.matches?.(DISCLOSURE) || !root.contains(details)) return;
    if (!details.open) close(details);
  };
  const focusin = (event) => dismissOutside(event.target);
  doc.addEventListener('click', click);
  doc.addEventListener('focusin', focusin);
  root.addEventListener('keydown', keydown);
  root.addEventListener('toggle', toggle, true);
  return () => {
    doc.removeEventListener('click', click);
    doc.removeEventListener('focusin', focusin);
    root.removeEventListener('keydown', keydown);
    root.removeEventListener('toggle', toggle, true);
  };
}

const popover = {
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default popover;
