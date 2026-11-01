// Helpers for the play tests on the "All Variants" HTML stories, whose markup is a snapshot of
// `<h3 class="site-preview-heading">Title</h3>` followed by the rendered section.

const headings = (canvasElement) => [...canvasElement.querySelectorAll('h3.site-preview-heading')];

// Story export key to snapshot section title, as Storybook names it: `StoryStep1Context` -> `Story Step 1 Context`.
export const sectionTitle = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2');

const findHeading = (canvasElement, title) => {
  const heading = headings(canvasElement).find((h) => h.textContent === title);
  if (!heading) throw new Error(`No snapshot section titled "${title}"`);
  return heading;
};

// The first element rendered under the section's heading.
export const sectionFor = (canvasElement, title) =>
  findHeading(canvasElement, title).nextElementSibling;

// Every element rendered under the section's heading, up to the next heading.
export const sectionElements = (canvasElement, title) => {
  const elements = [];
  for (
    let el = findHeading(canvasElement, title).nextElementSibling;
    el;
    el = el.nextElementSibling
  ) {
    if (el.matches('h3.site-preview-heading')) break;
    elements.push(el);
  }
  return elements;
};

// Builds a play function that runs `checks[title](section, context)` as one step per section. A failing
// section does not stop the rest; every failure is reported together at the end.
export const createAllVariantsPlay = (checks) => async (context) => {
  const failures = [];
  for (const [title, check] of Object.entries(checks)) {
    try {
      await context.step(title, () => check(sectionFor(context.canvasElement, title), context));
    } catch (error) {
      failures.push(`[${title}] ${String(error.message).split('\n')[0]}`);
    }
  }
  if (failures.length) throw new Error(failures.join(' | '));
};

// Snapshots prefix every id with `react-` or `django-` so both can sit on one page.
export const snapshotId = (id) => new RegExp(`^(react-|django-)?${id}$`);

// Matches text that ends with `text`, e.g. an accessible name that may start with a required marker.
export const endsWith = (text) => new RegExp(`${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);

// Section title for a story export: its own `name` when it sets one, else the key split into words.
export const titleFor = (stories, key) => stories[key]?.name ?? sectionTitle(key);

const channels = (color) =>
  color
    .match(/[\d.]+/g)
    .slice(0, 3)
    .map(Number);
const luminance = (color) => {
  const [r, g, b] = channels(color).map((value) => {
    const unit = value / 255;
    return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// WCAG contrast ratio between two computed `rgb()` colours.
export const contrastRatio = (foreground, background) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};
