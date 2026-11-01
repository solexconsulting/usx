import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/callout/callout.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/callout/callout.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Callout.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Callout',
  tags: ['USX', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const classesWithPrefix = (element, prefix) =>
  [...element.classList].filter((name) => name.startsWith(prefix));

const checkCallout = (def) => async (callout) => {
  await expect(callout.tagName).toBe((def.as ?? 'div').toUpperCase());
  await expect(callout).toHaveClass('usx-callout');
  // The thick stroke is the default for horizontal callouts only.
  await hasClass(callout, 'usx-callout--big', def.big ?? def.orientation !== 'vertical');
  await hasClass(callout, 'usx-callout--vertical', def.orientation === 'vertical');
  await hasClass(callout, 'usx-callout--dedent', Boolean(def.dedent));
  await expect(classesWithPrefix(callout, 'usx-callout--indent-')).toEqual(
    def.indent ? [`usx-callout--indent-${def.indent}`] : []
  );
  for (const [prop, prefix] of [
    ['strokeColor', 'border-'],
    ['backgroundColor', 'bg-'],
    ['textColor', 'text-'],
  ]) {
    await expect(classesWithPrefix(callout, prefix)).toEqual(
      def[prop] ? [`${prefix}${def[prop]}`] : []
    );
  }
  if (def.className) await expect(callout).toHaveClass(...def.className.split(' '));

  // Children replace the content text entirely, even when they are empty.
  if (def.children === undefined) await expect(callout.textContent.trim()).toBe(def.content);
  else await expect(callout).not.toHaveTextContent(def.content ?? '\u0000');
  if (def.children === '') await expect(callout.childNodes).toHaveLength(0);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkCallout(def)])
);
checks.Section = async (callout) => {
  await checkCallout(storyDefs.Section)(callout);
  await expect(callout.querySelector('h3')).toHaveTextContent('Program details');
  await expect(callout.querySelector('p')).toHaveTextContent(
    'Related information in a semantic section.'
  );
};
checks['Children Override'] = async (callout) => {
  await checkCallout(storyDefs.ChildrenOverride)(callout);
  await expect(callout.querySelector('strong')).toHaveTextContent('Children win.');
  await expect(callout.querySelector('a')).toHaveAttribute('href', '#details');
};

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Geometry', async () => {
    const el = (key) => sectionFor(context.canvasElement, sectionTitle(key));
    const px = (key, property) => parseFloat(getComputedStyle(el(key))[property]);
    const left = (key) => el(key).getBoundingClientRect().left;

    // The stroke runs down the left edge of horizontal callouts and along the top of vertical ones.
    await expect(px('Default', 'borderLeftWidth')).toBeGreaterThan(0);
    await expect(px('Default', 'borderTopWidth')).toBe(0);
    await expect(px('Vertical', 'borderTopWidth')).toBeGreaterThan(0);
    await expect(px('Vertical', 'borderLeftWidth')).toBe(0);
    await expect(px('Default', 'borderLeftWidth')).toBeGreaterThan(
      px('ThinHorizontal', 'borderLeftWidth')
    );
    await expect(px('BigVertical', 'borderTopWidth')).toBeGreaterThan(
      px('Vertical', 'borderTopWidth')
    );

    const indents = ['IndentSM', 'IndentMD', 'IndentLG', 'IndentXL'].map(left);
    await expect(indents[0]).toBeGreaterThan(left('Default'));
    for (let i = 1; i < indents.length; i++)
      await expect(indents[i]).toBeGreaterThan(indents[i - 1]);
    await expect(left('Dedent')).toBeLessThan(left('Default'));
    await expect(getComputedStyle(el('Colors')).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: { code: reactSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: { code: djangoSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
