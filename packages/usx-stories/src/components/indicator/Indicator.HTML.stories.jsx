import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/indicator/indicator.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/indicator/indicator.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Indicator.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Indicator',
  tags: ['USX', 'autodocs'],
};

const centre = (rect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

const checkIndicator = (def) => async (indicator) => {
  await expect(indicator).toHaveClass('usx-indicator');
  const marks = [...indicator.querySelectorAll(':scope > .usx-indicator-item')];
  await expect(marks).toHaveLength(def.items.length);
  const target = [...indicator.children].find(
    (child) => !child.classList.contains('usx-indicator-item')
  );
  const box = target.getBoundingClientRect();

  for (const [index, item] of def.items.entries()) {
    for (const name of item.className.split(' ')) await expect(marks[index]).toHaveClass(name);
    if (item.label) await expect(marks[index]).toHaveTextContent(item.label);
    else await expect(marks[index]).toBeEmptyDOMElement();

    // A mark with a position class sits at that edge or corner of what it marks; the default is the top end.
    const position = item.className.match(/usx-indicator-(top|middle|bottom)/)?.[1] ?? 'top';
    const align = item.className.match(/usx-indicator-(start|center|end)/)?.[1] ?? 'end';
    const { x, y } = centre(marks[index].getBoundingClientRect());
    const rows = { top: box.top, middle: box.top + box.height / 2, bottom: box.bottom };
    const columns = { start: box.left, center: box.left + box.width / 2, end: box.right };
    await expect(Math.abs(y - rows[position])).toBeLessThanOrEqual(box.height / 4);
    await expect(Math.abs(x - columns[align])).toBeLessThanOrEqual(box.width / 4);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkIndicator(def)])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
