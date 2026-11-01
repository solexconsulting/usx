import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/summary/summary.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/summary/summary.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Summary.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Summary',
  tags: ['USX', 'autodocs'],
};

/** Static snapshot of every React variant. Summary is documented as a child of a details element. */
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkSummary = (def) => async (root) => {
  const summary = root.matches('summary') ? root : root.querySelector('summary');
  await expect(summary.tagName).toBe('SUMMARY');
  await expect(summary).toHaveClass('usx-summary');
  await hasClass(summary, 'usx-summary--no-marker', Boolean(def.noMarker));
  if (def.noMarker) await expect(getComputedStyle(summary).listStyleType).toBe('none');
  await hasClass(summary, 'usx-summary--no-underline', Boolean(def.noUnderline));
  if (def.className) await expect(summary).toHaveClass(...def.className.split(' '));
  if (def.markerColor) await expect(summary).toHaveClass(`marker-${def.markerColor}`);

  const text = summary.querySelector(':scope > .usx-summary-text');
  await expect(text).toHaveTextContent(def.label);
  if (def.underlineColor) {
    await expect(text).toHaveClass(`underline-${def.underlineColor}`);
    const underlineColor = getComputedStyle(text).textDecorationColor;
    text.style.textDecorationColor = 'transparent';
    try {
      await expect(getComputedStyle(text).textDecorationColor).toBe(underlineColor);
    } finally {
      text.style.removeProperty('text-decoration-color');
    }
  }
  if (def.textClassName) await expect(text).toHaveClass(...def.textClassName.split(' '));
  if (def === storyDefs.Wrapping) {
    const fragments = [...text.getClientRects()];
    await expect(fragments.length).toBeGreaterThan(1);
    await expect(Math.abs(fragments[0].top - summary.getBoundingClientRect().top)).toBeLessThan(
      (parseFloat(getComputedStyle(summary).lineHeight) || 24) / 2
    );
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkSummary(def)])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

/** Static snapshot of every Django variant. Summary is documented as a child of a details element. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
