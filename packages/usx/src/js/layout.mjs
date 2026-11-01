const TOGGLE = '[data-usx-layout-toggle]';
const instances = new WeakMap();

function toggle(button) {
  const layout = button.closest('.usx-layout');
  if (!layout) return;
  const expanded = layout.classList.toggle('usx-expanded');
  button.setAttribute('aria-expanded', String(expanded));
  button.setAttribute('aria-label', expanded ? 'Contract' : 'Expand');
}

// Handles static markup (Django, HTML); React's own onClick calls preventDefault first.
const layout = {
  on(root = document.body) {
    if (instances.has(root)) return;
    const click = (event) => {
      if (event.defaultPrevented) return;
      const button = event.target.closest?.(TOGGLE);
      if (button && root.contains(button)) toggle(button);
    };
    root.addEventListener('click', click);
    instances.set(root, () => root.removeEventListener('click', click));
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default layout;
