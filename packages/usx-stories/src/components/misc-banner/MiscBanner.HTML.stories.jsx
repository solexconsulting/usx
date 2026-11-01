import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/misc-banner/misc-banner.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/misc-banner/misc-banner.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './MiscBanner.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/MiscBanner',
  tags: ['USX', 'autodocs'],
};

const checkBanner = (def) => async (banner) => {
  await expect(banner.id).toMatch(snapshotId(def.id));
  await expect(banner).toHaveClass('usx-misc-banner', `bg-${def.color}`);
  const badge = banner.querySelector('.usx-misc-banner__badge');
  if (def.badgeText) {
    await expect(badge).toHaveTextContent(def.badgeText);
    await expect(badge).toHaveClass(`text-${def.color}`);
  } else {
    await expect(badge).toBeNull();
  }
  const text = banner.querySelector('.usx-misc-banner__text');
  await expect(text).toHaveTextContent(def.message);

  // The casual link follows the message; the important link and its icon sit apart, after it.
  const casual = text.querySelector('a');
  if (def.showLearnMore) {
    await expect(casual).toHaveAttribute('href', def.casualLinkHref);
    await expect(casual).toHaveTextContent(def.casualLinkText);
  } else {
    await expect(casual).toBeNull();
  }
  const important = banner.querySelector('.usx-misc-banner__return-text a');
  const dropdown = banner.querySelector('.usx-misc-banner__dropdown');
  if (def.showReturnLink) {
    await expect(important).toHaveAttribute('href', def.importantLinkHref);
    await expect(important).toHaveTextContent(def.importantLinkText);
    await expect(important.querySelector('use').getAttribute('href')).toMatch(
      new RegExp(`#${def.importantLinkIcon}$`)
    );

    // The same links are offered in a dropdown that a labelled toggle opens.
    const toggle = dropdown.querySelector('input[type="checkbox"]');
    const button = dropdown.querySelector('label');
    const content = dropdown.querySelector('.usx-misc-banner__dropdown-content');
    await expect(button).toHaveAttribute('for', toggle.id);
    await expect(button).toHaveAttribute('aria-controls', content.id);
    await expect(button).toHaveAccessibleName('Toggle banner links');
    const labels = [...content.querySelectorAll('a')].map((link) => link.textContent.trim());
    await expect(labels).toEqual(
      [def.showLearnMore && def.casualLinkText, def.importantLinkText].filter(Boolean)
    );
  } else {
    await expect(important).toBeNull();
    await expect(dropdown).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkBanner(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Dropdown', async () => {
    const banner = context.canvasElement.querySelector('.usx-misc-banner');
    const toggle = banner.querySelector('.usx-misc-banner__dropdown-toggle');
    const button = banner.querySelector('.usx-misc-banner__dropdown-button');
    // The toggle button only shows when the banner is narrow, so it is exercised when it is on screen.
    if (button.getBoundingClientRect().width > 0) {
      await userEvent.click(button);
      await expect(toggle).toBeChecked();
      await userEvent.click(button);
      await expect(toggle).not.toBeChecked();
    }
  });
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
