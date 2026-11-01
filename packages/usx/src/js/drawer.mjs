// Add backdrop dismissal to modal drawers. Older browsers also need support
// for dialog commands and closedby="none".
const instances = new WeakMap();

function connect(root) {
  const doc = root.ownerDocument || root;
  const { HTMLButtonElement, HTMLDialogElement } = doc.defaultView;
  const needsCommands = !(
    'command' in HTMLButtonElement.prototype &&
    'commandForElement' in HTMLButtonElement.prototype
  );
  const needsClosedBy = !('closedBy' in HTMLDialogElement.prototype);

  const click = (event) => {
    if (event.defaultPrevented) return;
    const target = event.target;
    if (target.matches?.('dialog.usx-drawer__panel[open]:not([closedby="none"])')) {
      const { left, right, top, bottom } = target.getBoundingClientRect();
      if (
        event.clientX < left || event.clientX > right ||
        event.clientY < top || event.clientY > bottom
      ) target.close();
      return;
    }
    if (!needsCommands) return;
    const button = target.closest?.('button[commandfor][command]');
    if (!button || !root.contains(button) || button.disabled) return;
    const dialog = doc.getElementById(button.getAttribute('commandfor'));
    if (!dialog?.matches('dialog.usx-drawer__panel')) return;

    const command = button.getAttribute('command');
    if (command === 'show-modal' && !dialog.open) {
      event.preventDefault();
      dialog.showModal();
    } else if (command === 'close' && dialog.open) {
      event.preventDefault();
      dialog.close(button.getAttribute('value') || '');
    }
  };

  const cancel = (event) => {
    if (event.target.matches?.('dialog.usx-drawer__panel[closedby="none"]')) {
      event.preventDefault();
    }
  };

  root.addEventListener('click', click);
  if (needsClosedBy) root.addEventListener('cancel', cancel, true);
  return () => {
    root.removeEventListener('click', click);
    if (needsClosedBy) root.removeEventListener('cancel', cancel, true);
  };
}

const drawer = {
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default drawer;
