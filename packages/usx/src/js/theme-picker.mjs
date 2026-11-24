import { components, enhancementDisabled } from './enhancement.mjs';
import swap from './swap.mjs';

const instances = new WeakMap();
const PICKER = '.usx-theme-picker';
const OPEN = 'usx-theme-picker--open';

function selectTheme(picker, value) {
  const field = picker.querySelector('select, input[type="hidden"]');
  if (!field || !value) return;
  field.value = value;
  picker.ownerDocument.documentElement.dataset.usxTheme = value;
  picker.querySelectorAll('[data-usx-theme-value]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.usxThemeValue === value));
  });
  const swap = picker.querySelector('.usx-theme-picker__swap');
  if (swap) swap.setAttribute('aria-pressed', String(swap.dataset.usxThemeOn === value));
}

function connect(root) {
  const click = (event) => {
    if (event.defaultPrevented) return;
    const option = event.target.closest?.('.usx-theme-picker__popover [data-usx-theme-value]');
    const picker = option?.closest(PICKER);
    if (picker && root.contains(picker) && !enhancementDisabled(picker)) {
      const field = picker.querySelector('input[type="hidden"]');
      if (!field) return;
      field.value = option.dataset.usxThemeValue;
      field.dispatchEvent(new Event('change', { bubbles: true }));
      const popover = option.closest('details.usx-popover');
      if (popover) popover.open = false;
      popover?.querySelector('summary')?.focus();
      return;
    }
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
    if (event.target.matches('button.usx-theme-picker__swap')) {
      const pressed = event.target.getAttribute('aria-pressed') === 'true';
      selectTheme(picker, event.target.dataset[pressed ? 'usxThemeOn' : 'usxThemeOff']);
    } else if (event.target.matches('select, input[type="hidden"]')) {
      selectTheme(picker, event.target.value);
    }
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  return () => {
    root.removeEventListener('click', click);
    root.removeEventListener('change', change);
  };
}

function initialize(root) {
  const pickers = components(root, PICKER).filter(
    (element) =>
      !enhancementDisabled(element) && element.querySelector('select, input[type="hidden"]')?.value
  );
  const picker = pickers[0];
  if (picker && !picker.ownerDocument.documentElement.hasAttribute('data-usx-theme')) {
    selectTheme(picker, picker.querySelector('select, input[type="hidden"]')?.value);
  }
  pickers.forEach((element) => {
    element.dataset.enhanced = 'true';
    element.hidden = false;
  });
}

const themePicker = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    swap.init(root);
    initialize(root);
  },
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
    swap.on(root);
    initialize(root);
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default themePicker;
