// Native dialog commands handle opening and closing; USX adds backdrop dismissal.
import { enhancementDisabled, markEnhanced } from './enhancement.mjs';

const instances = new WeakMap();

function connect(root) {
  const click = (event) => {
    if (event.defaultPrevented) return;
    const target = event.target;
    if (enhancementDisabled(target)) return;
    if (target.matches?.('dialog.usx-drawer__panel[open]:not([closedby="none"])')) {
      const { left, right, top, bottom } = target.getBoundingClientRect();
      if (
        event.clientX < left || event.clientX > right ||
        event.clientY < top || event.clientY > bottom
      ) target.close();
    }
  };
  root.addEventListener('click', click);
  return () => root.removeEventListener('click', click);
}

const drawer = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    markEnhanced(root, '.usx-drawer');
  },
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
    markEnhanced(root, '.usx-drawer');
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default drawer;
