import { componentInit } from '../../utils/storyHelpers.jsx';
import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/copy-to-clipboard/copy-to-clipboard.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/copy-to-clipboard/copy-to-clipboard.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './CopyToClipboard.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  decorators: [...componentInit('copyToClipboard')],
  title: 'HTML/USX/CopyToClipboard',
  tags: ['USX', 'autodocs'],
};

const checkCopy = (def) => async (section) => {
  const button = section.matches('button') ? section : section.querySelector('button.usx-copy');
  await expect(button).toHaveClass('usa-button', 'usx-button', 'usx-button--ghost');
  await expect(button).toHaveAttribute('type', 'button');
  if (def.className) await expect(button).toHaveClass(...def.className.split(' '));
  await expect(button.querySelector('.usx-copy__copy use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#content_copy$/)
  );
  await expect(button.querySelector('.usx-copy__check use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#check$/)
  );

  // Resting state shows the copy icon; the check icon appears only once something has been copied.
  await expect(button.querySelector('.usx-copy__copy')).toBeVisible();
  await expect(button.querySelector('.usx-copy__check')).not.toBeVisible();

  if (def.label) {
    await expect(button).toHaveAccessibleName(def.label);
    await expect(section.querySelector('[role="tooltip"]')).toBeNull();
  } else {
    await expect(button).toHaveAccessibleName('Copy to clipboard');
    // The tooltip text swaps once copied.
    const tooltip =
      section.querySelector('[role="tooltip"]') ??
      section.parentElement.querySelector('[role="tooltip"]');
    await expect(tooltip.querySelector('.usx-copy__tooltip--copy')).toHaveTextContent(
      def.tooltipProps.label
    );
    await expect(tooltip.querySelector('.usx-copy__tooltip--copied')).toHaveTextContent(
      def.tooltipProps.copiedTooltip
    );
    await expect(tooltip).not.toBeVisible();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (section) => {
      await checkCopy(def)(section);
      // Inverted variants sit on an inverse surface.
      if (def.className?.includes('inverse'))
        await expect(section).toHaveClass('bg-surface-inverse');
    },
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Copy succeeds only after the clipboard accepts the text', async () => {
    const button = context.canvasElement.querySelector('[data-usx-copy]');
    const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    const commandDescriptor = Object.getOwnPropertyDescriptor(document, 'execCommand');
    let copied;
    let reject = false;
    let errors = 0;
    const writeText = async (text) => {
      if (reject) throw new Error('Clipboard unavailable');
      copied = text;
    };
    const failed = () => {
      errors++;
    };
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    button.addEventListener('usx:copy-error', failed);
    try {
      button.focus();
      await expect(button.querySelector('.usx-copy__copy')).toBeVisible();
      await userEvent.keyboard('{Enter}');
      await expect(copied).toBe(button.dataset.usxCopy);
      await waitFor(() => expect(button).toHaveAttribute('data-usx-copy-state', 'copied'));
      await expect(button.querySelector('.usx-copy__check')).toBeVisible();
      button.blur();
      await expect(button).not.toHaveAttribute('data-usx-copy-state');

      reject = true;
      await userEvent.click(button);
      await waitFor(() => expect(errors).toBe(1));
      await expect(button).not.toHaveAttribute('data-usx-copy-state');
      await expect(button.querySelector('.usx-copy__copy')).toBeVisible();

      // A network HTTP preview has no Clipboard API. Exercise the fallback and cleanup.
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
      let temporaryInput;
      document.execCommand = (command) => {
        expect(command).toBe('copy');
        temporaryInput = document.activeElement;
        copied = temporaryInput.value;
        return !reject;
      };
      reject = false;
      copied = undefined;
      await userEvent.click(button);
      await expect(copied).toBe(button.dataset.usxCopy);
      await expect(button).toHaveAttribute('data-usx-copy-state', 'copied');
      await expect(button.querySelector('.usx-copy__check')).toBeVisible();
      await expect(button).toHaveFocus();
      await expect(temporaryInput.isConnected).toBe(false);

      reject = true;
      await userEvent.click(button);
      await expect(errors).toBe(2);
      await expect(button).not.toHaveAttribute('data-usx-copy-state');
      await expect(button.querySelector('.usx-copy__copy')).toBeVisible();
      await expect(button).toHaveFocus();
      await expect(temporaryInput.isConnected).toBe(false);
    } finally {
      button.blur();
      button.removeEventListener('usx:copy-error', failed);
      if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
      else delete navigator.clipboard;
      if (commandDescriptor) Object.defineProperty(document, 'execCommand', commandDescriptor);
      else delete document.execCommand;
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
