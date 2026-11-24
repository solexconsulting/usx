import { enhancementDisabled, markEnhanced } from './enhancement.mjs';

const BUTTON = 'button.usx-swap--button';
const instances = new WeakMap();

function connect(root) {
  const click = (event) => {
    if (event.defaultPrevented) return;
    const button = event.target.closest?.(BUTTON);
    if (!button || !root.contains(button) || button.disabled || enhancementDisabled(button)) return;
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    button.dispatchEvent(new Event('change', { bubbles: true }));
  };
  root.addEventListener('click', click);
  return () => root.removeEventListener('click', click);
}

const swap = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    markEnhanced(root, BUTTON);
  },
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
    markEnhanced(root, BUTTON);
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default swap;
