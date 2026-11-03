import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/modal/modal.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/modal/modal.django-snapshot.html?raw';

import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './Modal.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Modal',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`modal.init()`'),
      },
    },
  },
  decorators: [...componentInit('modal')],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const isVisible = (wrapper) => getComputedStyle(wrapper).visibility === 'visible';

// The script moves each modal out of the story into a wrapper on the page body.
const wrapperFor = (canvasElement, id) =>
  [...canvasElement.ownerDocument.querySelectorAll('.usa-modal-wrapper')].find((wrapper) =>
    snapshotId(id).test(wrapper.id)
  );
const waitForWrapper = async (canvasElement, id) => {
  await waitFor(() => expect(wrapperFor(canvasElement, id)).toBeTruthy());
  return wrapperFor(canvasElement, id);
};

const checkModal =
  (def) =>
  async (trigger, { canvasElement }) => {
    const wrapper = await waitForWrapper(canvasElement, def.id);
    const modal = wrapper.querySelector('.usa-modal');

    await expect(trigger).toHaveClass('usa-button', 'usx-button');
    await expect(trigger).toHaveAttribute('href', `#${wrapper.id}`);
    await expect(trigger).toHaveAttribute('aria-controls', wrapper.id);
    await expect(trigger).toHaveTextContent(def.triggerLabel || 'Open modal');

    await expect(wrapper).toHaveAttribute('role', 'dialog');
    // The dialog is named and described by its heading and text.
    await expect(
      wrapper.querySelector(`[id="${wrapper.getAttribute('aria-labelledby')}"]`)
    ).toHaveTextContent(def.heading);
    await expect(
      wrapper.querySelector(`[id="${wrapper.getAttribute('aria-describedby')}"]`)
    ).toHaveTextContent(def.description);
    await hasClass(modal, 'usa-modal--lg', def.size === 'lg');
    await hasClass(modal, 'usx-modal--lg-collapsed', def.size === 'lg-collapsed');
    await expect(
      wrapper.querySelector('[data-force-action]') !== null ||
        wrapper.hasAttribute('data-force-action')
    ).toBe(Boolean(def.forceAction));

    // Actions are buttons that close the modal; a forced-action modal has no other way out.
    const actions = [...modal.querySelectorAll('.usa-modal__footer button')];
    await expect(actions.map((button) => button.textContent.trim())).toEqual(
      def.actionProps.map((action) => action.children)
    );
    for (const [index, action] of def.actionProps.entries()) {
      await expect(actions[index]).toHaveClass(`usa-button--${action.variant}`);
      await expect(actions[index]).toHaveAttribute('data-close-modal', 'true');
    }
    const close = modal.querySelector('.usa-modal__close');
    if (def.forceAction) {
      await expect(close).toBeNull();
    } else {
      await expect(close).toHaveAttribute('aria-label', 'Close this window');
    }
    await expect(isVisible(wrapper)).toBe(false);
  };

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkModal(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  const { canvasElement } = context;

  for (const [key, def] of Object.entries(storyDefs)) {
    await context.step(`Opening and closing: ${sectionTitle(key)}`, async () => {
      const trigger = sectionFor(canvasElement, sectionTitle(key));
      const wrapper = await waitForWrapper(canvasElement, def.id);
      const open = async () => {
        await userEvent.click(trigger);
        await waitFor(() => expect(wrapper).toHaveClass('is-visible'));
        // It becomes modal, focus moves into it, and the page behind is locked.
        await expect(wrapper).toHaveAttribute('aria-modal', 'true');
        // Hidden dialogs have no accessible name, so it is checked while open.
        await expect(wrapper).toHaveAccessibleName(def.heading);
        await expect(wrapper).toHaveAccessibleDescription(def.description);
        await expect(wrapper).toContainElement(wrapper.ownerDocument.activeElement);
        await expect(wrapper.ownerDocument.body).toHaveClass('usa-js-modal--active');
      };
      const expectClosed = async () => {
        await waitFor(() => expect(wrapper).toHaveClass('is-hidden'));
        await expect(trigger).toHaveFocus();
      };

      await open();
      if (def.forceAction) {
        // Escape does nothing when an action is required (clicking the overlay is a review item).
        await userEvent.keyboard('{Escape}');
        await expect(wrapper).toHaveClass('is-visible');
      } else {
        await userEvent.keyboard('{Escape}');
        await expectClosed();
        await open();
        await userEvent.click(wrapper.querySelector('.usa-modal__close'));
        await expectClosed();
        await open();
      }
      await userEvent.click(wrapper.querySelector('.usa-modal__footer button'));
      await expectClosed();
    });
  }
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
