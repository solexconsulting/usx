import { enhancementDisabled, markEnhanced } from './enhancement.mjs';

const instances = new WeakMap();
const copyToClipboard = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) {
      const click = async (event) => {
        const button = event.target.closest?.('[data-usx-copy]');
        if (!button || event.defaultPrevented || enhancementDisabled(button)) return;
        delete button.dataset.usxCopyState;
        try {
          const document = button.ownerDocument;
          const clipboard = document.defaultView.navigator.clipboard;
          if (clipboard?.writeText) {
            await clipboard.writeText(button.dataset.usxCopy);
          } else {
            // HTTP previews lack the Clipboard API; use the browser's copy command.
            const focused = document.activeElement;
            const input = document.createElement('textarea');
            input.value = button.dataset.usxCopy;
            input.style.cssText = 'position:fixed;opacity:0';
            document.body.append(input);
            try {
              input.select();
              if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
            } finally {
              input.remove();
              focused?.focus({ preventScroll: true });
            }
          }
          if (button.ownerDocument.activeElement === button) {
            button.dataset.usxCopyState = 'copied';
            button.addEventListener('blur', () => delete button.dataset.usxCopyState, {
              once: true,
            });
          }
        } catch (error) {
          button.dispatchEvent(
            new CustomEvent('usx:copy-error', { bubbles: true, detail: { error } })
          );
        }
      };
      eventRoot.addEventListener('click', click);
      instances.set(eventRoot, click);
    }
    markEnhanced(root, '[data-usx-copy]');
  },
  on(root = document.body) {
    this.init(root);
  },
  off(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    eventRoot.removeEventListener('click', instances.get(eventRoot));
    instances.delete(eventRoot);
  },
};

export default copyToClipboard;
