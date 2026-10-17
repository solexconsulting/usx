import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/banner/banner.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/banner/banner.django-snapshot.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Banner.React.stories.jsx';

export default {
  title: 'HTML/USWDS/Banner',
  tags: ['USWDS', 'autodocs'],
  decorators: [...componentInit('banner')],
};

const testDefault = async ({ canvasElement }) => {
  const root = canvasElement.querySelector(`[id$="${storyDefs.Default.id}"]`);
  const button = within(root).getByRole('button', { name: "Here's how you know" });
  const content = root.querySelector('.usa-banner__content');
  const header = root.querySelector('.usa-banner__header');

  const guidance = content.querySelectorAll('.usa-banner__guidance');
  await expect(guidance).toHaveLength(2);
  for (const [index, filename] of ['icon-dot-gov.svg', 'icon-https.svg'].entries()) {
    const image = guidance[index].querySelector(
      ':scope > img.usa-banner__icon.usa-media-block__img'
    );
    await expect(image).toHaveAttribute('src', expect.stringContaining(`img/${filename}`));
    await expect(image).toHaveAttribute('alt', '');
    await expect(image).toHaveAttribute('aria-hidden', 'true');
    await expect(
      guidance[index].querySelector(':scope > .usa-media-block__body > p')
    ).not.toBeNull();
  }

  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(content).toHaveAttribute('hidden');
  await userEvent.click(button);
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(content).not.toHaveAttribute('hidden');
  await expect(header).toHaveClass('usa-banner__header--expanded');
  await userEvent.click(button);
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(content).toHaveAttribute('hidden');
  await expect(header).not.toHaveClass('usa-banner__header--expanded');
};

const testCustomFlag = async ({ canvasElement }) => {
  const root = canvasElement.querySelector(`[id$="${storyDefs.CustomFlag.id}"]`);
  await expect(root.querySelector('.usa-banner__header-flag')).toHaveAttribute(
    'src',
    expect.stringContaining(storyDefs.CustomFlag.flagSrc)
  );
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
    const step = (name, fn) => context.step(name, () => fn(context));
    await step('Default', testDefault);
    await step('Custom Flag', testCustomFlag);
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
