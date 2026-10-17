// Helpers for the play tests on the "All Variants" HTML stories, whose markup is a snapshot of
// `<h3 class="site-preview-heading">Title</h3>` followed by the rendered section.

const headings = (canvasElement) => [...canvasElement.querySelectorAll('h3.site-preview-heading')];

// Story export key to snapshot section title, e.g. `EmergencyList` -> `Emergency List`.
export const sectionTitle = (key) => key.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

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

// Builds a play function that runs `checks[title](section, context)` as one step per section.
export const createAllVariantsPlay = (checks) => async (context) => {
  for (const [title, check] of Object.entries(checks)) {
    await context.step(title, async () => {
      try {
        await check(sectionFor(context.canvasElement, title), context);
      } catch (error) {
        error.message = `[${title}] ${error.message}`;
        throw error;
      }
    });
  }
};
