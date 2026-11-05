import { enhancementDisabled, markEnhanced } from './enhancement.mjs';

const TOGGLE = '[data-usx-layout-toggle]';
const instances = new WeakMap();

function toggle(button) {
  const layout = button.closest('.usx-layout');
  if (!layout) return;
  const expanded = layout.classList.toggle('usx-expanded');
  button.setAttribute('aria-expanded', String(expanded));
  button.setAttribute('aria-label', expanded ? 'Contract' : 'Expand');
}

function connect(root) {
  const click = (event) => {
    if (event.defaultPrevented) return;
    const button = event.target.closest?.(TOGGLE);
    if (button && root.contains(button) && !enhancementDisabled(button)) toggle(button);
  };
  root.addEventListener('click', click);
  return () => root.removeEventListener('click', click);
}

// Handles static markup (Django, HTML); React's own onClick calls preventDefault first.
const layout = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    markEnhanced(root, '.usx-layout');
  },
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
    markEnhanced(root, '.usx-layout');
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default layout;
