import components from './index.mjs';

const start = () => {
  Object.values(components).forEach((component) => component.on(document.body));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
