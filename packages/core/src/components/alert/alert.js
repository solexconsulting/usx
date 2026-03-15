export function createAlert(options = {}) {
  const heading = options.heading || 'Informative status';
  const message = options.message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';
  const allowedVariants = new Set(['info', 'warning', 'success', 'error', 'emergency']);
  const normalizedVariant = allowedVariants.has(options.variant) ? options.variant : 'info';

  const alert = document.createElement('div');
  const body = document.createElement('div');
  const headingElement = document.createElement('h4');
  const textElement = document.createElement('p');

  alert.className = [
    'usa-alert',
    `usa-alert--${normalizedVariant}`,
    options.slim ? 'usa-alert--slim' : '',
    options.noIcon ? 'usa-alert--no-icon' : '',
    'usx-alert',
    `usx-alert--${normalizedVariant}`,
    options.slim ? 'usx-alert--slim' : '',
    options.noIcon ? 'usx-alert--no-icon' : ''
  ]
    .filter(Boolean)
    .join(' ');

  if (normalizedVariant === 'error' || normalizedVariant === 'emergency') {
    alert.setAttribute('role', 'alert');
  }

  body.className = 'usa-alert__body usx-alert__body';
  headingElement.className = 'usa-alert__heading usx-alert__heading';
  headingElement.textContent = heading;
  textElement.className = 'usa-alert__text usx-alert__text';
  textElement.textContent = message;

  if (!options.slim) {
    body.appendChild(headingElement);
  }

  body.appendChild(textElement);
  alert.appendChild(body);

  return alert;
}
