import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/alert/alert.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/alert/alert.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Alert.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Alert',
  tags: ['USWDS', 'autodocs'],
};

const variants = ['info', 'warning', 'success', 'error', 'emergency'];
const defaultRoles = {
  info: 'region',
  warning: 'region',
  success: 'status',
  error: 'alert',
  emergency: 'alert',
};

const checkAlert = (def) => async (alert) => {
  await expect(alert).toHaveClass('usa-alert', 'usx-alert');
  for (const variant of variants) {
    const expectation = expect(alert);
    await (variant === def.variant ? expectation : expectation.not).toHaveClass(
      `usa-alert--${variant}`
    );
  }
  await (def.slim ? expect(alert) : expect(alert).not).toHaveClass('usa-alert--slim');
  await (def.noIcon ? expect(alert) : expect(alert).not).toHaveClass('usa-alert--no-icon');

  // Only region alerts need an accessible name; status/alert roles are announced from their content.
  const role = def.role ?? defaultRoles[def.variant] ?? 'region';
  await expect(alert).toHaveAttribute('role', role);
  if (role === 'region') {
    await expect(alert.getAttribute('aria-label')).toBeTruthy();
    if (def.ariaLabel) await expect(alert).toHaveAttribute('aria-label', def.ariaLabel);
  } else {
    await expect(alert).not.toHaveAttribute('aria-label');
  }

  const heading = alert.querySelector('.usa-alert__heading');
  // Slim alerts show only the text; the heading still names the region through aria-label.
  if (def.heading && !def.slim) await expect(heading).toHaveTextContent(def.heading);
  else await expect(heading).toBeNull();
  if (def.text) await expect(alert.querySelector('.usa-alert__text')).toHaveTextContent(def.text);

  const dismiss = alert.querySelector('.usx-alert__dismiss');
  if (def.onDismiss) {
    await expect(dismiss.tagName).toBe('BUTTON');
    await expect(dismiss).toHaveAccessibleName('Dismiss alert');
  } else {
    await expect(dismiss).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkAlert(def)])
);

// Composed content replaces the text paragraph with a block that holds the supplied list.
checks['Emergency List'] = async (alert) => {
  await expect(alert.querySelector('div.usa-alert__text')).toBeTruthy();
  await expect(alert.querySelectorAll('.usa-alert__text li')).toHaveLength(3);
  await expect(alert.querySelector('p.usa-alert__text')).toBeNull();
};

const play = createAllVariantsPlay(checks);

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
