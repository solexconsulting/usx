export function createInput(options = {}) {
  const {
    label = 'Label',
    id,
    type = 'input',
    placeholder = 'Type here',
    error,
    success,
    disabled,
    characterCount,
    hint,
    className = '',
  } = options;

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const infoId = characterCount ? `${inputId}-info` : undefined;
  const ariaDescribedBy = [hintId, infoId].filter(Boolean).join(' ') || undefined;

  const hasError = !!error;
  const hasSuccess = !!success;
  const isTextarea = type === 'textarea';

  const formGroupClasses = [
    'usa-form-group',
    'usx-form-group',
    hasError && 'usa-form-group--error',
    hasError && 'usx-form-group--error',
  ].filter(Boolean).join(' ');

  const labelClasses = 'usa-label usx-label';

  const inputClasses = [
    isTextarea ? 'usa-textarea' : 'usa-input',
    isTextarea ? 'usx-textarea' : 'usx-input',
    hasError && (isTextarea ? 'usa-textarea--error' : 'usa-input--error'),
    hasError && (isTextarea ? 'usx-textarea--error' : 'usx-input--error'),
    hasSuccess && (isTextarea ? 'usa-textarea--success' : 'usx-textarea--success'),
    hasSuccess && (isTextarea ? 'usx-input--success' : 'usx-input--success'),
    className,
  ].filter(Boolean).join(' ');

  const wrapper = hasError || characterCount ? document.createElement('div') : document.createElement('div'); // or fragment, but for simplicity

  if (hasError || characterCount) {
    wrapper.className = formGroupClasses;
  }

  const labelEl = document.createElement('label');
  labelEl.className = labelClasses;
  labelEl.htmlFor = inputId;
  labelEl.textContent = label;

  wrapper.appendChild(labelEl);

  if (hint) {
    const hintEl = document.createElement('span');
    hintEl.id = hintId;
    hintEl.className = 'usa-hint';
    hintEl.textContent = hint;
    wrapper.appendChild(hintEl);
  }

  const inputEl = document.createElement(isTextarea ? 'textarea' : 'input');
  inputEl.className = inputClasses;
  inputEl.id = inputId;
  inputEl.placeholder = placeholder;
  if (disabled) inputEl.disabled = true;
  if (ariaDescribedBy) inputEl.setAttribute('aria-describedby', ariaDescribedBy);
  if (!isTextarea) inputEl.type = 'text';
  if (characterCount) inputEl.maxLength = characterCount.max;

  wrapper.appendChild(inputEl);

  if (characterCount) {
    const infoEl = document.createElement('span');
    infoEl.id = infoId;
    infoEl.className = 'usa-character-count__message';
    infoEl.textContent = characterCount.message;
    wrapper.appendChild(infoEl);
  }

  if (hasError) {
    const errorEl = document.createElement('span');
    errorEl.className = 'usa-error-message usx-error-message';
    errorEl.textContent = typeof error === 'string' ? error : 'Error message goes here.';
    wrapper.appendChild(errorEl);
  }

  if (hasSuccess) {
    const successEl = document.createElement('span');
    successEl.className = 'usa-success-message usx-success-message';
    successEl.textContent = typeof success === 'string' ? success : 'Success message goes here.';
    wrapper.appendChild(successEl);
  }

  return wrapper;
}
