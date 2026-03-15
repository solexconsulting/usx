export function createButton(options = {}) {
  const label = options.label || 'Button';
  const variant = options.variant || '';
  const big = options.big || false;
  const inverse = options.inverse || false;
  const unstyled = options.unstyled || false;

  const variantClasses = {
    secondary: 'usa-button--secondary usx-button--secondary',
    'accent-cool': 'usa-button--accent-cool usx-button--accent-cool',
    'accent-warm': 'usa-button--accent-warm usx-button--accent-warm',
    base: 'usa-button--base usx-button--base',
    outline: 'usa-button--outline usx-button--outline',
  };

  const variantClass = variantClasses[variant] || '';
  const modifierClasses = [
    big && 'usa-button--big usx-button--big',
    inverse && 'usa-button--inverse usx-button--inverse',
    unstyled && 'usa-button--unstyled usx-button--unstyled',
  ].filter(Boolean).join(' ');

  const button = document.createElement('button');
  button.type = options.type || 'button';
  button.className = ['usa-button', 'usx-button', variantClass, modifierClasses].filter(Boolean).join(' ');
  button.textContent = label;

  return button;
}
