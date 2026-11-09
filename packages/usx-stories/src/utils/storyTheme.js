import { resolveTheme, themeToCss } from '@solexllc/usx-theme/derive';
import { PRESETS } from '@solexllc/usx-theme/presets';

const STYLE_ID = 'usx-story-live-theme';

// Theme pickers change the preview's CSS variables directly. Updating a
// Storybook global would rerender the story and reset its DOM state.
export function applyStoryTheme(name) {
  if (!Object.hasOwn(PRESETS, name)) return;
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = themeToCss(resolveTheme(PRESETS[name]), {
    changedOnly: false,
    selector: ':root:root',
  });
}

export function resetStoryTheme() {
  document.getElementById(STYLE_ID)?.remove();
}
