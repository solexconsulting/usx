import React from 'react';
import banner from '@uswds/uswds/js/usa-banner';
import { expect, userEvent } from 'storybook/test';
import Banner from '../../../../usx-react/src/components/banner/Banner.tsx';
import config from '../../../../usx-react/src/components/banner/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Banner',
  component: Banner,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`banner.init()`'),
      },
    },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        banner.init();
      }, []);
      return <Story />;
    },
  ],
};

export const storyDefs = {
  Default: { id: 'gov-banner-default' },
  Mil: {
    id: 'gov-banner-mil',
    tld: '.mil',
  },
  Custom: {
    id: 'gov-banner-custom',
    tld: '.NaN',
    bannerText: 'An unofficial website of the Not A Number organization',
    bannerActionText: "Here's how you don't know",
  },
  CustomFlag: {
    id: 'gov-banner-custom-flag',
    tld: '.studio',
    bannerText: 'An official website of SOLEX Consulting',
    bannerActionText: "Just so you know...",
    domainHeading: `This is not a .gov website`,
    domainText: `This website does not belong to a United States government organization.`,
    flagSrc: `${window.usxBaseUrl}white_symbol-only.png`,
  },
};

export const Default = {
  args: storyDefs.Default,
  play: async function ({ canvas, canvasElement }) {
    const button = canvas.getByRole('button', { name: "Here's how you know" });
    const content = canvasElement.querySelector('.usa-banner__content');
    const header = canvasElement.querySelector('.usa-banner__header');

    const guidance = content.querySelectorAll('.usa-banner__guidance');
    await expect(guidance).toHaveLength(2);
    for (const [index, filename] of ['icon-dot-gov.svg', 'icon-https.svg'].entries()) {
      const image = guidance[index].querySelector(':scope > img.usa-banner__icon.usa-media-block__img');
      await expect(image).toHaveAttribute('src', expect.stringContaining(`img/${filename}`));
      await expect(image).toHaveAttribute('alt', '');
      await expect(image).toHaveAttribute('aria-hidden', 'true');
      await expect(guidance[index].querySelector(':scope > .usa-media-block__body > p')).not.toBeNull();
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
  },
};

export const Mil = { name: '.mil TLD', args: storyDefs.Mil };
export const Custom = { name: 'Custom text and TLD', args: storyDefs.Custom };
export const CustomFlag = {
  args: storyDefs.CustomFlag,
  play: async function ({ canvasElement, args }) {
    await expect(canvasElement.querySelector('.usa-banner__header-flag')).toHaveAttribute('src', args.flagSrc);
  },
};
