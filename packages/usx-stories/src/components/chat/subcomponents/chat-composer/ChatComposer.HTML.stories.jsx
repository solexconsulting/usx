import React from 'react';
import { expect, waitFor, userEvent } from 'storybook/test';
import authored from '../../../../../../usx-react/src/components/chat-composer/chat-composer.html?raw';
import reactSnapshot from '../../../../../../usx-react/src/components/chat-composer/chat-composer.react-snapshot.html?raw';
import djangoSnapshot from '../../../../../../usx-react/src/components/chat-composer/chat-composer.django-snapshot.html?raw';
import chatComposer from '@solexllc/usx/js/chat';
import popover from '@solexllc/usx/js/popover';
import { createAllVariantsPlay, sectionFor } from '../../../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Chat/Composer',
  tags: ['USX', 'autodocs'],
};

const checkComposer = (
  form,
  { attachments = false, formatting = false, thread = false, emoji = true } = {}
) => {
  expect(form).toHaveClass('usx-chat-composer', 'usx-chat__composer');
  expect(form.querySelector('textarea')).toHaveAccessibleName(
    thread ? 'Reply in thread' : 'Message'
  );
  expect(form.querySelectorAll('[data-usx-chat-format]')).toHaveLength(formatting ? 8 : 0);
  const panel = form.querySelector('.usx-chat__formatting');
  const toggle = form.querySelector('[data-usx-chat-toggle-formatting]');
  if (formatting) {
    expect(panel.querySelector('.usx-chat__format-buttons')).toHaveClass(
      'usa-button-group--segmented'
    );
    expect(panel).toHaveAttribute('hidden');
    expect(toggle).toHaveAttribute('aria-controls', panel.id);
  } else {
    expect(panel).toBeNull();
    expect(toggle).toBeNull();
  }
  expect(Boolean(form.querySelector('[data-usx-chat-attach]'))).toBe(attachments);
  expect(form.querySelector('[data-usx-chat-file-list-template]')).toBeNull();
  expect(form.querySelector(':scope > .usx-chat__staged-files')).toBeNull();
  expect(Boolean(form.querySelector('.usx-chat__emoji-picker'))).toBe(emoji);
  expect(form.querySelector('button[type="submit"]')).toHaveTextContent(
    thread ? 'Send reply' : 'Send'
  );
};

const exerciseComposer = async (form) => {
  const textarea = form.querySelector('textarea');
  const toggle = form.querySelector('[data-usx-chat-toggle-formatting]');
  const panel = form.querySelector('.usx-chat__formatting');
  toggle.click();
  await expect(panel).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  textarea.value = 'Hello';
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  await expect(form.querySelector('button[type="submit"]')).toBeEnabled();
  textarea.setSelectionRange(0, 5);
  panel.querySelector('[data-usx-chat-format="bold"]').click();
  await expect(textarea).toHaveValue('**Hello**');
  const sent = [];
  (form.closest('.usx-chat') || form).addEventListener('usx:chat-send', (event) =>
    sent.push(event.detail)
  );
  form.requestSubmit();
  await expect(sent).toHaveLength(1);
  await expect(sent[0]).toMatchObject({ text: '**Hello**', files: [] });
  toggle.click();
  await expect(panel).not.toBeVisible();
};

export const Authored = {
  parameters: { docs: { source: { code: authored } } },
  render: () => (
    <div style={{ maxWidth: '26rem' }} dangerouslySetInnerHTML={{ __html: authored }} />
  ),
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('.usx-chat-composer');
    checkComposer(form, { attachments: true, formatting: true });
    chatComposer.init(canvasElement);
    popover.init(canvasElement);
    await exerciseComposer(form);
    const picker = form.querySelector('.usx-chat__emoji-picker');
    picker.querySelector('summary').click();
    const textarea = form.querySelector('textarea');
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    picker.querySelector('[data-usx-chat-emoji]').click();
    await expect(form.querySelector('textarea')).toHaveValue('**Hello**🙂');
  },
};

const checks = createAllVariantsPlay({
  'Group Message': (section) =>
    checkComposer(section.matches('form') ? section : section.querySelector('form'), {
      emoji: false,
    }),
  Default: (section) =>
    checkComposer(section.matches('form') ? section : section.querySelector('form')),
  'With Formatting': (section) =>
    checkComposer(section.matches('form') ? section : section.querySelector('form'), {
      formatting: true,
    }),
  'With Attachments And Emoji': (section) =>
    checkComposer(section.matches('form') ? section : section.querySelector('form'), {
      attachments: true,
    }),
  'Thread Reply': (section) =>
    checkComposer(section.matches('form') ? section : section.querySelector('form'), {
      thread: true,
      emoji: false,
    }),
});

const playSnapshot = async (context) => {
  await checks(context);
  chatComposer.init(context.canvasElement);
  popover.init(context.canvasElement);
  await context.step('The composer submits all supplied group recipients', async () => {
    const section = sectionFor(context.canvasElement, 'Group Message');
    const form = section.matches('form') ? section : section.querySelector('form');
    let sent;
    (form.closest('.usx-chat') || form).addEventListener('usx:chat-send', (event) => {
      event.preventDefault();
      sent = event.detail;
    });
    await expect(new FormData(form).getAll('recipientIds')).toEqual(['agent', 'specialist']);
    form.requestSubmit();
    await expect(sent).toMatchObject({
      recipientIds: ['agent', 'specialist'],
      text: 'Can we review the application together?',
    });
  });
  await context.step('Plain text shortcut stays inactive', async () => {
    const section = sectionFor(context.canvasElement, 'Default');
    const form = section.matches('form') ? section : section.querySelector('form');
    const textarea = form.querySelector('textarea');
    textarea.value = 'Hello';
    textarea.setSelectionRange(0, 5);
    const shortcut = new KeyboardEvent('keydown', {
      key: 'b',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(shortcut);
    await expect(shortcut.defaultPrevented).toBe(false);
    await expect(textarea).toHaveValue('Hello');
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await expect(form.querySelector('[type="submit"]')).toBeEnabled();
    let sent;
    (form.closest('.usx-chat') || form).addEventListener(
      'usx:chat-send',
      (event) => {
        event.preventDefault();
        sent = event.detail;
      },
      { once: true }
    );
    form.requestSubmit();
    await expect(sent).toMatchObject({ text: 'Hello', files: [] });
  });
  await context.step('Standalone controls', () => {
    const section = sectionFor(context.canvasElement, 'With Formatting');
    return exerciseComposer(section.matches('form') ? section : section.querySelector('form'));
  });
  await context.step('Staged files use slim FileList rows', async () => {
    const section = sectionFor(context.canvasElement, 'With Attachments And Emoji');
    const form = section.matches('form') ? section : section.querySelector('form');
    const input = form.querySelector('input[type="file"]');
    const firstSelection = new DataTransfer();
    firstSelection.items.add(new File(['example'], 'example.pdf', { type: 'application/pdf' }));
    input.files = firstSelection.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const secondSelection = new DataTransfer();
    secondSelection.items.add(new File(['another'], 'notes.txt', { type: 'text/plain' }));
    input.files = secondSelection.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const staged = form.querySelector(':scope > .usx-chat__staged-files');
    await expect(staged).toHaveClass('usx-file-list--slim');
    await expect(staged.querySelector('.usx-file-input__list-heading')).toHaveClass('usa-sr-only');
    await expect(staged.querySelectorAll('.usx-file-input__file-item')).toHaveLength(2);
    await expect([...input.files].map((file) => file.name)).toEqual(['example.pdf', 'notes.txt']);
    await expect(staged.querySelector('.usx-file-input__file-size')).toHaveTextContent('PDF, 7 B');
    await expect(staged.querySelector('[data-usx-chat-file-remove]')).toHaveAccessibleName(
      'Remove example.pdf'
    );
    let sent;
    (form.closest('.usx-chat') || form).addEventListener(
      'usx:chat-send',
      (event) => {
        sent = event.detail;
        event.preventDefault();
      },
      { once: true }
    );
    form.requestSubmit();
    await expect(sent.files.map((file) => file.name)).toEqual(['example.pdf', 'notes.txt']);
    staged.querySelector('[data-usx-chat-file-remove="0"]').focus();
    await userEvent.keyboard('{Enter}');
    await expect([...input.files].map((file) => file.name)).toEqual(['notes.txt']);
    await expect(form.querySelector('[data-usx-chat-file-remove="0"]')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(form.querySelector('[data-usx-chat-attach]')).toHaveFocus();
    await expect(form.querySelector(':scope > .usx-chat__staged-files')).toBeNull();
    await expect(input.files).toHaveLength(0);
    await expect(form.querySelector('[type="submit"]')).toBeDisabled();
    const picker = form.querySelector('.usx-chat__emoji-picker');
    picker.querySelector('summary').click();
    picker.querySelector('[data-usx-chat-emoji="😊"]').click();
    await expect(form.querySelector('textarea')).toHaveValue('😊');
    await expect(picker.open).toBe(false);
    form.reset();
    await waitFor(() => expect(form.querySelector('[type="submit"]')).toBeDisabled());
  });
  await context.step(
    'Inserted composers initialize staged files without resetting existing controls',
    async () => {
      const section = sectionFor(context.canvasElement, 'With Attachments And Emoji');
      const original = section.matches('form') ? section : section.querySelector('form');
      const form = original.cloneNode(true);
      const prefix = original.id.replace(/-composer$/, '');
      form.id = `${prefix}-inserted-composer`;
      form.innerHTML = form.innerHTML.replaceAll(prefix, `${prefix}-inserted`);
      form.removeAttribute('data-enhanced');
      context.canvasElement.append(form);
      try {
        const input = form.querySelector('input[type="file"]');
        const files = new DataTransfer();
        files.items.add(new File(['first'], 'first.txt'));
        files.items.add(new File(['last'], 'last.txt'));
        input.files = files.files;
        chatComposer.init(form);
        await expect(form).toHaveAttribute('data-enhanced', 'true');
        await expect(form.querySelectorAll('[data-usx-chat-file-remove]')).toHaveLength(2);
        await expect(form.querySelector('[type="submit"]')).toBeEnabled();
        const last = form.querySelector('[data-usx-chat-file-remove="1"]');
        last.focus();
        chatComposer.init(context.canvasElement);
        await expect(last).toHaveFocus();
        await expect(form.querySelector('[data-usx-chat-file-remove="1"]')).toBe(last);
        await userEvent.keyboard('{Enter}');
        await expect([...input.files].map((file) => file.name)).toEqual(['first.txt']);
        await expect(form.querySelector('[data-usx-chat-file-remove="0"]')).toHaveFocus();
        let sends = 0;
        form.addEventListener('usx:chat-send', (event) => {
          event.preventDefault();
          sends++;
        });
        form.requestSubmit();
        await expect(sends).toBe(1);
      } finally {
        form.remove();
      }
    }
  );
  await context.step('Emoji shortcuts follow the current host markup', async () => {
    const section = sectionFor(context.canvasElement, 'With Attachments And Emoji');
    const form = section.matches('form') ? section : section.querySelector('form');
    const textarea = form.querySelector('textarea');
    const option = form.querySelector('[data-usx-chat-emoji]');
    const original = { ...option.dataset };
    try {
      option.dataset.usxChatEmojiName = 'updated';
      option.dataset.usxChatEmojiAliases = 'alias';
      option.dataset.usxChatEmoji = '🧪';
      textarea.value = ':updated: :alias:';
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await expect(textarea).toHaveValue('🧪 🧪');
    } finally {
      Object.assign(option.dataset, original);
      form.reset();
    }
  });
  await context.step('Initialization respects the host enhancement opt-out', async () => {
    const section = sectionFor(context.canvasElement, 'With Formatting');
    const form = section.matches('form') ? section : section.querySelector('form');
    const toggle = form.querySelector('[data-usx-chat-toggle-formatting]');
    const panel = form.querySelector('.usx-chat__formatting');
    form.setAttribute('usx-data-enhanced', 'true');
    form.removeAttribute('data-enhanced');
    try {
      chatComposer.init(form);
      toggle.click();
      await expect(panel).not.toBeVisible();
      await expect(form).not.toHaveAttribute('data-enhanced');
    } finally {
      form.removeAttribute('usx-data-enhanced');
      chatComposer.init(form);
    }
    await expect(form).toHaveAttribute('data-enhanced', 'true');
    toggle.click();
    await expect(panel).toBeVisible();
    toggle.click();
  });
  await context.step('Thread replies retain their conversation context', async () => {
    const section = sectionFor(context.canvasElement, 'Thread Reply');
    const form = section.matches('form') ? section : section.querySelector('form');
    await expect(form.querySelector('[type="submit"]')).toBeDisabled();
    await expect(form.querySelector('[name="threadRootId"]')).toHaveValue('message-7');
    await expect(form.querySelector('.usx-chat__emoji-picker')).toBeNull();
    const textarea = form.querySelector('textarea');
    textarea.value = 'My reply';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    let sent;
    (form.closest('.usx-chat') || form).addEventListener(
      'usx:chat-send',
      (event) => {
        event.preventDefault();
        sent = event.detail;
      },
      { once: true }
    );
    form.requestSubmit();
    await expect(sent).toMatchObject({
      text: 'My reply',
      conversationId: 'conversation-42',
      threadRootId: 'message-7',
    });
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: playSnapshot,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: playSnapshot,
};
