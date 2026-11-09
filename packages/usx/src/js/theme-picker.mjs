import { enhancementDisabled, markEnhanced } from './enhancement.mjs';

const instances = new WeakMap();
const PICKER = '.usx-theme-picker';
const OPEN = 'usx-theme-picker--open';

function sync(picker) {
  const select = picker.querySelector('select');
  if (!select) return;
  const label = select.selectedOptions[0]?.textContent || '';
  const title = select.labels?.[0]?.textContent?.trim() || 'Theme';
  const input = picker.querySelector('.usx-theme-picker__swap input');
  if (input) {
    input.checked = select.selectedIndex === 1;
    const other = select.options[input.checked ? 0 : 1]?.textContent || '';
    input.setAttribute('aria-label', `${title}: ${label}. Switch to ${other}`);
  }
}

function connect(root) {
  const click = (event) => {
    if (event.defaultPrevented) return;
    const button = event.target.closest?.(
      'button.usx-theme-picker__trigger, button.usx-theme-picker__toggle'
    );
    const original = button?.closest(PICKER);
    if (!original || !root.contains(original) || enhancementDisabled(original)) return;
    const open = button.matches('.usx-theme-picker__trigger');
    original.classList.toggle(OPEN, open);
    original
      .querySelector('.usx-theme-picker__trigger')
      ?.setAttribute('aria-expanded', String(open));
    if (open) original.querySelector('select')?.focus();
    else original.querySelector('.usx-theme-picker__trigger')?.focus();
  };
  const change = (event) => {
    const picker = event.target.closest?.(PICKER);
    if (!picker || !root.contains(picker) || enhancementDisabled(picker)) return;
    if (event.target.matches('.usx-theme-picker__swap input')) {
      const select = picker.querySelector('select');
      if (!select) return;
      select.selectedIndex = event.target.checked ? 1 : 0;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (event.target.matches('select')) {
      sync(picker);
    }
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  return () => {
    root.removeEventListener('click', click);
    root.removeEventListener('change', change);
  };
}

const themePicker = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    markEnhanced(root, PICKER);
  },
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
    markEnhanced(root, PICKER);
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default themePicker;
