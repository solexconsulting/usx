import { createButton } from '../components/button/button.js';
import { createInput } from '../components/input/input.js';
import { createAlert } from '../components/alert/alert.js';

export function agencyUiFactory() {
  return {
    createButton,
    createInput,
    createAlert
  };
}

if (typeof window !== 'undefined') {
  window.agencyUi = agencyUiFactory();
}
