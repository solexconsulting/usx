import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/site-alert/site-alert.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/site-alert/site-alert.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './SiteAlert.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/SiteAlert',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkSiteAlert = (def) => async (site) => {
  await expect(site.tagName).toBe('SECTION');
  // The maintenance variants are USX's own and show as an error or warning alert inside.
  const maintenance = def.variant.startsWith('maintenance');
  const alertVariant =
    { maintenance: 'error', 'maintenance-warning': 'warning' }[def.variant] ?? def.variant;
  await expect(site).toHaveClass(
    'usa-site-alert',
    'usx-site-alert',
    maintenance ? `usx-site-alert--${def.variant}` : `usa-site-alert--${def.variant}`
  );
  await hasClass(site, 'usa-site-alert--no-icon', Boolean(def.noIcon));
  await hasClass(site, 'usa-site-alert--slim', Boolean(def.slim));
  await hasClass(site, 'usa-site-alert--dismissible', Boolean(def.onDismiss));
  await expect(site).toHaveAccessibleName('Site alert');

  const alert = site.querySelector(':scope > .usa-alert');
  await expect(alert).toHaveClass('usa-alert', 'usx-alert', `usa-alert--${alertVariant}`);
  await hasClass(alert, 'usa-alert--slim', Boolean(def.slim));
  await hasClass(alert, 'usa-alert--no-icon', Boolean(def.noIcon));

  const heading = alert.querySelector('.usa-alert__heading');
  // Slim alerts and an empty heading drop it; leaving it out otherwise falls back to a default heading.
  if (def.alertHeading === '' || def.slim) await expect(heading).toBeNull();
  else if (def.alertHeading) await expect(heading).toHaveTextContent(def.alertHeading);
  else await expect(heading.textContent.trim().length).toBeGreaterThan(0);
  const text = alert.querySelector('.usa-alert__text');
  if (def.alertText) await expect(text).toHaveTextContent(def.alertText);
  if (def.alertContent) await expect(text.textContent.trim().length).toBeGreaterThan(0);

  // Alerts that interrupt are announced; the rest are regions that need a name.
  const role = alert.getAttribute('role');
  await expect(['alert', 'region', 'status']).toContain(role);
  if (role === 'region') await expect(alert).toHaveAccessibleName();

  const dismiss = alert.querySelector('.usx-alert__dismiss');
  if (def.onDismiss) {
    await expect(dismiss).toHaveAccessibleName('Dismiss alert');
    await expect(dismiss.tagName).toBe('BUTTON');
  } else {
    await expect(dismiss).toBeNull();
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkSiteAlert(def)])
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
