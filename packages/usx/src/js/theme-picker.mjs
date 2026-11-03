const instances = new WeakMap();
const PICKER = '.usx-theme-picker';
const OPEN = 'usx-theme-picker--open';

function connect(root) {
  const click = (event) => {
    const button = event.target.closest?.('button.usx-theme-picker__trigger, button.usx-theme-picker__toggle');
    const picker = button?.closest(PICKER);
    if (!picker || !root.contains(picker)) return;
    const open = button.matches('.usx-theme-picker__trigger');
    picker.classList.toggle(OPEN, open);
    picker.querySelector('.usx-theme-picker__trigger')?.setAttribute('aria-expanded', String(open));
    if (open) picker.querySelector('select')?.focus();
    else picker.querySelector('.usx-theme-picker__trigger')?.focus();
  };
  root.addEventListener('click', click);
  return () => root.removeEventListener('click', click);
}

const themePicker = {
  init() {},
  on(root = document.body) {
    if (!instances.has(root)) instances.set(root, connect(root));
  },
  off(root = document.body) {
    instances.get(root)?.();
    instances.delete(root);
  },
};

export default themePicker;
