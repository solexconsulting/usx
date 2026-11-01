import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/step-indicator/step-indicator.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/step-indicator/step-indicator.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './StepIndicator.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/StepIndicator',
  tags: ['USWDS', 'autodocs'],
};

const checkIndicator = (def) => async (indicator) => {
  await expect(indicator).toHaveClass('usa-step-indicator', 'usx-step-indicator');
  for (const variant of ['no-labels', 'center', 'counters', 'counters-sm']) {
    await (variant === def.variant ? expect(indicator) : expect(indicator).not).toHaveClass(
      `usa-step-indicator--${variant}`
    );
  }

  const segments = [...indicator.querySelectorAll('.usa-step-indicator__segments > li')];
  await expect(segments).toHaveLength(def.steps.length);
  for (const [index, step] of def.steps.entries()) {
    const number = index + 1;
    const state =
      number < def.currentStep ? 'complete' : number === def.currentStep ? 'current' : 'incomplete';
    const segment = segments[index];
    await expect(segment).toHaveClass('usa-step-indicator__segment');
    await (state === 'complete' ? expect(segment) : expect(segment).not).toHaveClass(
      'usa-step-indicator__segment--complete'
    );
    await (state === 'current' ? expect(segment) : expect(segment).not).toHaveClass(
      'usa-step-indicator__segment--current'
    );
    if (state === 'current') await expect(segment).toHaveAttribute('aria-current', 'true');
    else await expect(segment).not.toHaveAttribute('aria-current');

    // The progress is spoken for every segment except the current one, which is announced by aria-current.
    const label = segment.querySelector('.usa-step-indicator__segment-label');
    const spoken = label.querySelector('.usa-sr-only');
    await expect(label.firstChild.textContent.trim()).toBe(step.label);
    if (state === 'current') await expect(spoken).toBeNull();
    else
      await expect(spoken.textContent.trim()).toBe(
        state === 'complete' ? 'completed' : 'not completed'
      );
  }

  // The header repeats where the user is: "Step 3 of 5" and the current step's name.
  const heading = indicator.querySelector(
    '.usa-step-indicator__header .usa-step-indicator__heading'
  );
  await expect(heading.querySelector('.usa-step-indicator__current-step')).toHaveTextContent(
    String(def.currentStep)
  );
  await expect(heading.querySelector('.usa-step-indicator__total-steps')).toHaveTextContent(
    `of ${def.steps.length}`
  );
  await expect(heading.querySelector('.usa-step-indicator__heading-text')).toHaveTextContent(
    def.steps[def.currentStep - 1].label
  );
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkIndicator(def)])
);
// Without labels the segments are bars only, so the names are off-screen.
checks['No Labels'] = async (indicator) => {
  await checkIndicator(storyDefs.NoLabels)(indicator);
  for (const label of indicator.querySelectorAll('.usa-step-indicator__segment-label')) {
    await expect(label.getBoundingClientRect().right).toBeLessThanOrEqual(0);
  }
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
