import React from 'react';
import { expect } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/code/code.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/code/code.django-snapshot.html?raw';
import { storyDefs } from './Code.React.stories.jsx';

export default {
  title: 'HTML/USX/Code',
  tags: ['USX', 'autodocs'],
};

// Each snapshot section is an h3 heading followed by the rendered code block.
const sectionFor = (canvasElement, title) =>
  [...canvasElement.querySelectorAll('h3.site-preview-heading')].find(
    (heading) => heading.textContent === title
  ).nextElementSibling;

const checkLiteralMarkup = async ({ canvasElement }, title, { lines }) => {
  const elements = sectionFor(canvasElement, title).querySelectorAll('.usx-mockup-code code');
  await expect(elements.length).toBe(lines.length);
  for (const [index, element] of [...elements].entries()) {
    await expect(element.textContent).toBe(lines[index].code);
    await expect(element.childElementCount).toBe(0);
  }
};

const testReactMarkupWithHTMLFragment = async ({ canvasElement }) => {
  const block = sectionFor(canvasElement, 'React Markup With HTML Fragment');
  const lines = [...block.querySelectorAll('.usx-mockup-code code')];
  await expect(lines.map((line) => line.textContent).join('\n')).toBe(
    storyDefs.ReactMarkupWithHTMLFragment.copyText
  );
  const fragments = block.querySelectorAll('.usx-mockup-code code *');
  await expect(fragments.length).toBe(1);
  await expect(fragments[0].tagName).toBe('STRONG');
  await expect(fragments[0].textContent).toBe('Account');
};

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
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('With HTML Markup', () =>
      checkLiteralMarkup(context, 'With HTML Markup', storyDefs.WithHTMLMarkup)
    );
    await step('With React Markup', () =>
      checkLiteralMarkup(context, 'With React Markup', storyDefs.WithReactMarkup)
    );
    await step('React Markup With HTML Fragment', () => testReactMarkupWithHTMLFragment(context));
  },
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
  play: AllVariantsReact.play,
};
