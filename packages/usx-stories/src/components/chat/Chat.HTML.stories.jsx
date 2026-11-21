import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/chat/chat.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/chat/chat.django-snapshot.html?raw';
import { expect, waitFor, userEvent } from 'storybook/test';
import { captureChatScroll, restoreChatScroll, transcriptFromChat } from '@solexllc/usx/js/chat';
import chatEnhancement from '@solexllc/usx/js/chat';
import popover from '@solexllc/usx/js/popover';
import { storyDefs } from './Chat.React.stories.jsx';
import config from '../../../../usx-react/src/components/chat/config.json';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Chat',
  tags: ['USX', 'autodocs'],
};

const checkChat = (def) => async (root) => {
  const chat = root.matches('.usx-chat') ? root : root.querySelector('.usx-chat');
  await expect(chat.tagName).toBe('DETAILS');
  await expect(chat).toHaveClass('usx-popover', 'usx-chat');
  await expect(chat.dataset.usxPopoverDismissOnOutside).toBe('false');
  await expect(chat.hasAttribute('open')).toBe(Boolean(def.defaultOpen));
  const trigger = chat.querySelector(':scope > summary');
  await expect(trigger).toHaveTextContent(
    def.summaryProps?.ariaLabel || def.summaryProps?.label || 'Open chat'
  );
  await expect(trigger.className).toBe(def.summaryProps?.className || '');
  await expect(chat.querySelectorAll(':scope > summary')).toHaveLength(1);
  const panel = chat.querySelector(':scope > .usx-popover__panel.usx-chat__panel');
  await expect(panel.id).toMatch(new RegExp(`(?:^|-)${def.id}$`));
  const window = panel.querySelector('.usx-chat__window');
  const view =
    def.view ?? def.defaultView ?? (def.conversations?.length ? 'inbox' : 'conversation');
  const selected = def.conversations?.find(
    (item) => item.id === (def.activeConversationId ?? def.defaultConversationId)
  );
  const recipient = def.participants?.find((item) => item.id === def.recipientId);
  const title =
    view === 'thread'
      ? 'Thread'
      : view === 'contacts'
        ? 'New message'
        : (selected?.title ?? recipient?.name ?? def.title ?? 'Chat');
  await expect(window.dataset.chatView).toBe(view);
  const panelTitle = panel.querySelector('.usx-chat__header .usx-popover__panel-heading');
  await expect(panelTitle).toHaveTextContent(title);
  await expect(panelTitle.id).toBe(`${panel.id}-title`);
  await expect(panelTitle.tagName).toBe('H2');
  if (
    view === 'thread' ||
    view === 'contacts' ||
    (view === 'conversation' && def.conversations?.length)
  ) {
    await expect(
      panel.querySelector('.usx-popover__header-left-actions [data-usx-chat-back]')
    ).not.toBeNull();
  }
  if (def.status && view === 'conversation')
    await expect(panel.querySelector('.usx-chat__status')).toHaveTextContent(def.status);
  const close = panel.querySelector('.usx-popover__header-close');
  await expect(close).toHaveClass('usa-button', 'usx-button');
  await expect(close.closest('.usx-popover__header')).not.toBeNull();
  await expect(close).toHaveAccessibleName('Close chat');
  await expect(close.getAttribute('data-usx-popover-close')).toBe(panel.id);
  const subject = selected?.context ?? def.context;
  const subjectStrip =
    [...window.querySelectorAll('.usx-chat__context')].find(
      (context) => context.getAttribute('aria-label') !== 'Thread context'
    ) ?? null;
  if (subject && (view === 'conversation' || view === 'thread')) {
    await expect(subjectStrip).toHaveClass('usx-callout', 'border-primary', 'bg-surface-2');
    await expect(subjectStrip).toHaveAttribute('aria-label', subject.label);
    await expect(subjectStrip.querySelector('.usx-chat__context-copy')).toHaveTextContent(
      subject.title
    );
    if (subject.description) await expect(subjectStrip).toHaveTextContent(subject.description);
    if (subject.href) {
      const contextLink = subjectStrip.querySelector('a');
      await expect(contextLink).toHaveClass('usa-link', 'usx-link');
      await expect(contextLink).toHaveAttribute(
        'href',
        subject.href.startsWith('#')
          ? expect.stringMatching(new RegExp(`${subject.href.slice(1)}$`))
          : subject.href
      );
    }
    if (subject.imageUrl)
      await expect(subjectStrip.querySelector('.usx-chat__context-image img')).toHaveAttribute(
        'alt',
        subject.imageAlt || ''
      );
  } else await expect(subjectStrip).toBeNull();

  if (view === 'inbox' || view === 'contacts') {
    const directory = window.querySelector('.usx-chat__directory');
    await expect(directory).toHaveAttribute(
      'aria-label',
      view === 'inbox' ? 'Conversations' : 'Recipients'
    );
    await expect(directory.querySelectorAll('.usx-chat__directory-item')).toHaveLength(
      view === 'inbox' ? def.conversations.length : def.contacts.length
    );
    const entries = view === 'inbox' ? def.conversations : def.contacts;
    for (const [index, entry] of entries.entries()) {
      const row = directory.querySelectorAll('.usx-chat__directory-item')[index];
      await expect(row.tagName).toBe(view === 'contacts' ? 'DIV' : entry.href ? 'A' : 'BUTTON');
      if (view === 'contacts') {
        await expect(row).toHaveClass('usa-checkbox', 'usx-checkbox');
        const checkbox = row.querySelector('[data-usx-chat-recipient]');
        await expect(checkbox).toHaveClass('usa-checkbox__input');
        await expect(checkbox.value).toBe(entry.participantId);
        await expect(checkbox.checked).toBe((def.recipientIds ?? []).includes(entry.participantId));
        await expect(checkbox.form).toBe(window.querySelector('.usx-chat__composer'));
        const label = row.querySelector('.usa-checkbox__label');
        await expect(label).toHaveAttribute('for', checkbox.id);
        await expect(label.querySelector('.usx-chat__avatar')).not.toBeNull();
        if (entry.description)
          await expect(label.querySelector('.usx-chat__directory-subtitle')).toHaveAttribute(
            'id',
            checkbox.getAttribute('aria-describedby')
          );
      }
      if (entry.href && view === 'inbox') {
        await expect(row).toHaveClass('usx-clickable');
        await expect(row).toHaveAttribute('href', entry.href);
      }
      const personIds =
        view === 'inbox'
          ? [...new Set(entry.participantIds ?? [])].filter((id) => id !== def.currentUserId)
          : [entry.participantId];
      const person = def.participants.find((item) => item.id === personIds[0]);
      const isGroup = view === 'inbox' && (entry.isGroup || personIds.length > 1);
      const avatarGroup = row.querySelector('.usx-chat__directory-avatars');
      if (isGroup && !entry.avatarProps && personIds.length > 1) {
        await expect(avatarGroup).toHaveClass('usx-avatar-group', 'usx-avatar-group--overlap');
        const avatars = avatarGroup.querySelectorAll('.usx-chat__avatar');
        await expect(avatars).toHaveLength(Math.min(personIds.length, 3));
        const visibleIds = personIds.slice(0, personIds.length > 3 ? 2 : 3);
        for (const [avatarIndex, id] of visibleIds.entries()) {
          const member = def.participants.find((item) => item.id === id);
          if (member?.avatarProps?.variant === 'image')
            await expect(avatars[avatarIndex].querySelector('img')).toHaveAttribute(
              'src',
              member.avatarProps.src
            );
        }
        if (personIds.length > 3) {
          await expect(avatars[2]).toHaveTextContent(`+${personIds.length - 2}`);
          await expect(avatars[2]).toHaveAttribute(
            'aria-label',
            `${personIds.length - 2} more participants`
          );
        }
      } else {
        await expect(avatarGroup).toBeNull();
        const avatar = row.querySelector('.usx-chat__avatar');
        await expect(avatar).not.toBeNull();
        if (isGroup && !entry.avatarProps)
          await expect(avatar.querySelector('use')).toHaveAttribute(
            'href',
            expect.stringContaining('#groups')
          );
        const avatarProps = isGroup ? entry.avatarProps : person?.avatarProps;
        if (avatarProps?.variant === 'image') {
          const image = avatar.querySelector('img.usx-avatar__img');
          await expect(image).toHaveAttribute('src', avatarProps.src);
          await expect(image).toHaveAttribute('alt', avatarProps.alt);
        }
        const statusRingColor = isGroup
          ? entry.avatarProps?.statusRingColor
          : person?.presence === 'online'
            ? 'success'
            : person?.presence === 'away'
              ? 'warning'
              : person?.avatarProps?.statusRingColor;
        const statusLabel = isGroup
          ? entry.avatarProps?.statusLabel
          : person?.presence === 'online'
            ? 'Online'
            : person?.presence === 'away'
              ? 'Away'
              : person?.avatarProps?.statusLabel;
        await expect(avatar.classList.contains('border-05')).toBe(Boolean(statusRingColor));
        if (statusRingColor) await expect(avatar).toHaveClass(`border-${statusRingColor}`);
        if (statusLabel) {
          const avatarName =
            avatarProps?.alt ?? person?.name ?? (view === 'inbox' ? entry.title : personIds[0]);
          await expect(avatar).toHaveAttribute('aria-label', `${avatarName}, ${statusLabel}`);
          await expect(avatar).not.toHaveAttribute('title');
          await expect(row.querySelector('.usx-tooltip [role="tooltip"]')).toHaveTextContent(
            statusLabel
          );
        } else if (person?.avatarProps?.tooltipProps && !isGroup) {
          await expect(row.querySelector('.usx-tooltip [role="tooltip"]')).toHaveTextContent(
            person.avatarProps.tooltipProps.label
          );
        }
      }
      await expect(row.querySelector('.usx-indicator, .usx-chat__presence-label')).toBeNull();
      if (view === 'inbox') {
        if (entry.preview && isGroup && entry.previewSenderId) {
          const sender = def.participants.find((item) => item.id === entry.previewSenderId);
          await expect(row.querySelector('.usx-chat__directory-preview')).toHaveTextContent(
            `${sender?.name ?? entry.previewSenderId}: ${entry.preview}`
          );
        }
        await expect(row).toHaveClass('usx-clickable');
        await expect(row.querySelectorAll('a, button')).toHaveLength(0);
        if (entry.context)
          await expect(row.querySelector('.usx-chat__directory-subtitle')).toHaveTextContent(
            entry.context.title
          );
        const tag = row.querySelector('.usx-tag');
        await expect(Boolean(tag)).toBe(Boolean(entry.unreadCount));
        if (tag) {
          await expect(tag).toHaveTextContent(String(entry.unreadCount));
          await expect(
            row.querySelector('.usx-chat__directory-meta .usa-sr-only')
          ).toHaveTextContent(`${entry.unreadCount} unread messages`);
        }
      }
    }
    await expect(window.querySelector('.usx-chat__messages')).toBeNull();
    if (view === 'inbox') await expect(window.querySelector('.usx-chat__composer')).toBeNull();
    else
      await expect(window.querySelector('.usx-chat__composer')).toHaveAttribute(
        'data-usx-chat-require-recipients',
        'true'
      );
    if (view === 'inbox' && def.contacts?.length)
      await expect(panel.querySelector('[data-usx-chat-new]')).toHaveAttribute(
        'aria-label',
        'New message'
      );
    if (view === 'inbox' && def.contacts?.length)
      await expect(panel.querySelector('[data-usx-chat-new]')).toHaveClass(
        'usa-button',
        'usx-button'
      );
    if (view === 'contacts')
      await expect(panel.querySelector('[data-usx-chat-back]')).toHaveAttribute(
        'aria-label',
        'Back'
      );
    if (view === 'contacts')
      await expect(panel.querySelector('[data-usx-chat-back]')).toHaveClass(
        'usa-button',
        'usx-button'
      );
    return;
  }

  const sourceMessages = selected?.messages ?? (recipient ? [] : (def.messages ?? []));
  const threadRoot = sourceMessages.find((item) => item.id === def.activeThreadId);
  const visibleMessages =
    view === 'thread'
      ? threadRoot
        ? [threadRoot, ...(threadRoot.replies ?? [])]
        : []
      : sourceMessages;

  const threadContext = window.querySelector('.usx-chat__context[aria-label="Thread context"]');
  await expect(Boolean(threadContext)).toBe(view === 'thread' && Boolean(threadRoot));
  if (threadRoot) {
    const sender = def.participants.find((item) => item.id === threadRoot.senderId);
    await expect(threadContext).toHaveClass('usx-callout', 'border-primary', 'bg-surface-2');
    await expect(threadContext).toHaveAttribute('aria-label', 'Thread context');
    await expect(threadContext).toHaveTextContent(`Replying to ${sender.name}`);
    if (threadRoot.text) await expect(threadContext).toHaveTextContent(threadRoot.text);
    await expect(threadContext.querySelector('.usx-chat__context-copy')).not.toBeNull();
    await expect(window.querySelector('.usx-chat__status')).toHaveTextContent(
      `In ${selected?.title ?? def.title ?? 'Chat'}`
    );
    await expect(panel.querySelector('[data-usx-chat-back]')).toHaveAttribute(
      'aria-label',
      'Back to conversation'
    );
  }

  const log = window.querySelector('.usx-chat__messages[role="log"]');
  await expect(log).toHaveAttribute(
    'aria-label',
    view === 'thread' ? 'Thread messages' : 'Conversation'
  );
  await expect(log.getAttribute('aria-live')).toBe('polite');
  const olderState =
    view === 'thread'
      ? threadRoot?.olderReplies
      : selected
        ? selected.olderHistory
        : def.olderHistory;
  const olderControl = log.querySelector('.usx-chat__older-history');
  await expect(Boolean(olderControl)).toBe(Boolean(olderState));
  await expect(log).toHaveAttribute('aria-busy', olderState?.loading ? 'true' : 'false');
  if (olderState) {
    const loadButton = olderControl.querySelector('[data-usx-chat-load-older]');
    await expect(Boolean(loadButton)).toBe(Boolean(olderState.hasMore));
    if (loadButton)
      await expect(loadButton).toHaveTextContent(
        olderState.loading
          ? 'Loading earlier messages'
          : olderState.error
            ? 'Try again'
            : 'Load earlier messages'
      );
    else await expect(olderControl).toHaveTextContent('Beginning of conversation');
    if (olderState.cursor)
      await expect(log).toHaveAttribute('data-usx-chat-older-cursor', olderState.cursor);
    if (view === 'thread')
      await expect(olderControl.previousElementSibling.dataset.messageId).toBe(threadRoot.id);
    else await expect(log.firstElementChild).toBe(olderControl);
  }
  const messages = [...log.querySelectorAll(':scope > .usx-chat__message')];
  await expect(messages).toHaveLength(visibleMessages.length);
  const threadLabel = log.querySelector('.usx-chat__thread-label');
  const threadDivider = log.querySelector('.usx-chat__thread-divider');
  await expect(Boolean(threadLabel)).toBe(view === 'thread' && Boolean(threadRoot));
  await expect(Boolean(threadDivider)).toBe(view === 'thread' && Boolean(threadRoot));
  if (threadRoot) {
    await expect(threadLabel).toHaveTextContent('Original message');
    await expect(threadLabel).toHaveAttribute('role', 'separator');
    await expect(threadLabel.nextElementSibling.dataset.messageId).toBe(threadRoot.id);
    await expect(threadDivider).toHaveAttribute('role', 'separator');
    const count =
      threadRoot.replyCount ??
      (threadRoot.olderReplies?.hasMore ? null : (threadRoot.replies?.length ?? 0));
    await expect(threadDivider).toHaveTextContent(
      count === null ? 'Replies' : count === 1 ? '1 reply' : `${count} replies`
    );
    if (threadRoot.replies?.length)
      await expect(threadDivider.nextElementSibling.dataset.messageId).toBe(
        threadRoot.replies[0].id
      );
    if (def.id === 'chat-same-sender-thread') {
      await expect(messages[0]).toHaveClass('usx-chat__message--single');
      await expect(messages[1]).toHaveClass('usx-chat__message--single');
    }
  }
  const boundaryId = selected ? selected.firstUnreadMessageId : def.firstUnreadMessageId;
  const divider = log.querySelector('.usx-chat__unread-divider');
  const hasBoundary =
    view === 'conversation' && visibleMessages.some((item) => item.id === boundaryId);
  await expect(Boolean(divider)).toBe(hasBoundary);
  if (divider) {
    await expect(divider).toHaveAttribute('role', 'separator');
    await expect(divider).toHaveTextContent('Unread messages');
    await expect(divider.nextElementSibling.dataset.messageId).toBe(boundaryId);
  }
  if (!messages.length)
    await expect(log.querySelector('.usx-chat__empty')).toHaveTextContent(
      view === 'thread'
        ? 'Thread unavailable.'
        : def.emptyText || 'No messages yet. Start the conversation.'
    );
  for (const [index, sourceMessage] of visibleMessages.entries()) {
    const sender = def.participants?.find((person) => person.id === sourceMessage.senderId);
    const side = sourceMessage.senderId === def.currentUserId ? 'sent' : 'received';
    const message = {
      ...sourceMessage,
      actions:
        sourceMessage.actions ??
        sender?.messageActions ??
        selected?.messageActions?.[side] ??
        def.messageActions?.[side] ??
        [],
    };
    const item = messages[index];
    const participant = def.participants.find((person) => person.id === message.senderId);
    await expect(item.dataset.senderName).toBe(participant.name);
    await expect(item.classList.contains('usx-chat__message--own')).toBe(
      message.senderId === def.currentUserId
    );
    await expect(item.classList.contains('usx-chat__message--panel')).toBe(
      message.layout === 'panel'
    );
    if (message.layout === 'panel') {
      const bubble = item.querySelector('.usx-chat__bubble');
      const editor = bubble.querySelector('textarea');
      await expect(bubble.querySelector('form')).not.toBeNull();
      await expect(editor).toHaveAccessibleName('Edit message');
      await expect(parseFloat(getComputedStyle(bubble).borderTopWidth)).toBeGreaterThanOrEqual(1);
      await expect(getComputedStyle(bubble).color).toBe(getComputedStyle(window).color);
      await expect(bubble.getBoundingClientRect().width).toBeGreaterThan(
        item.getBoundingClientRect().width - 56
      );
      await expect(editor.getBoundingClientRect().width).toBeGreaterThan(
        bubble.getBoundingClientRect().width - 32
      );
    }
    await expect(item.querySelectorAll('.usx-chat__attachments li')).toHaveLength(
      message.attachments?.length || 0
    );
    for (const [fileIndex, file] of (message.attachments || []).entries()) {
      const attachment = item.querySelectorAll('.usx-chat__attachments li')[fileIndex];
      if (file.url) {
        const link = attachment.querySelector('a');
        await expect(link).toHaveClass('usa-button', 'usx-button', 'usa-button--unstyled');
        await expect(link).toHaveAttribute('href', file.url);
        await expect(link).toHaveAttribute('download', file.name);
      }
    }
    if (message.text && !/(\*\*|\*|<u>|~~|^[-*>] |^\d+\. |```)/m.test(message.text))
      await expect(item.querySelector('.usx-chat__bubble')).toHaveTextContent(message.text);
    if (message.exportText) await expect(item.dataset.exportText).toBe(message.exportText);
    const bubble = item.querySelector('.usx-chat__bubble');
    for (const link of bubble.querySelectorAll('a.usx-link')) {
      await expect(getComputedStyle(link).textDecorationLine).toContain('underline');
      await expect(getComputedStyle(link).color).not.toBe(getComputedStyle(bubble).color);
    }
    const previous = visibleMessages[index - 1];
    const next = visibleMessages[index + 1];
    const adjacent = (a, b) =>
      a &&
      b &&
      a.senderId === b.senderId &&
      Date.parse(b.sentAt) - Date.parse(a.sentAt) >= 0 &&
      Date.parse(b.sentAt) - Date.parse(a.sentAt) <= (def.groupWindowMinutes || 5) * 60_000;
    const before = !(view === 'thread' && index === 1) && adjacent(previous, message);
    const after = !(view === 'thread' && index === 0) && adjacent(message, next);
    const position = before ? (after ? 'middle' : 'last') : after ? 'first' : 'single';
    const expectedPosition =
      view === 'thread' && index < 2 ? position : message.groupPosition || position;
    await expect(item).toHaveClass(`usx-chat__message--${expectedPosition}`);
    const visibleTime = !['first', 'middle'].includes(expectedPosition);
    await expect(Boolean(item.querySelector('.usx-chat__message-footer'))).toBe(
      message.layout !== 'panel' &&
        Boolean((message.timeLabel && visibleTime) || message.edited || message.deliveryStatus)
    );
    if (message.timeLabel && message.layout !== 'panel') {
      const time = item.querySelector('time.usx-chat__time');
      await expect(time).toHaveTextContent(message.timeLabel);
      if (['first', 'middle'].includes(expectedPosition))
        await expect(time).toHaveClass('usa-sr-only');
      else await expect(time).not.toHaveClass('usa-sr-only');
    }
    if (['single', 'first'].includes(expectedPosition)) {
      const avatar = item.querySelector('.usx-chat__avatar');
      await expect(avatar.tagName).toBe('SPAN');
      if (participant.avatarProps?.variant === 'image') {
        const image = avatar.querySelector('img.usx-avatar__img');
        await expect(image).toHaveAttribute('src', participant.avatarProps.src);
        await expect(image).toHaveAttribute('alt', participant.avatarProps.alt);
      }
      await expect(item.querySelector('.usx-chat__sender')).toHaveTextContent(participant.name);
    }
    if (message.reactions?.length && message.layout !== 'panel')
      await expect(item.querySelector('.usx-chat__reactions')).toHaveClass('usx-tag-group');
    await expect(item.querySelectorAll('.usx-chat__reactions button')).toHaveLength(
      message.layout === 'panel' ? 0 : message.reactions?.length || 0
    );
    await expect(
      [...item.querySelectorAll('.usx-chat__reactions button')].map(
        (button) => button.dataset.usxChatReaction
      )
    ).toEqual(
      message.layout === 'panel' ? [] : (message.reactions ?? []).map((entry) => entry.label)
    );
    if (message.reactions?.length && message.layout !== 'panel')
      await expect(item.querySelector('.usx-chat__reactions').parentElement).toHaveClass(
        'usx-chat__bubble'
      );
    const availableReactions =
      message.layout === 'panel' || message.deliveryState
        ? []
        : (
            message.reactionOptions ??
            def.reactionOptions ??
            def.emojiPack ??
            config.props.emojiPack.default
          ).slice(0, 100);
    const canCopyMessage =
      message.layout !== 'panel' &&
      !message.deliveryState &&
      def.showCopyMessageAction !== false &&
      Boolean(
        message.exportText ||
        message.text ||
        (typeof message.content === 'string' && message.content) ||
        message.attachments?.length
      );
    const canOpenThread =
      message.layout !== 'panel' &&
      !message.deliveryState &&
      view === 'conversation' &&
      Boolean(selected?.allowThreads ?? def.allowThreads);
    const hasTools =
      availableReactions.length > 0 ||
      canOpenThread ||
      canCopyMessage ||
      (message.layout !== 'panel' && !message.deliveryState && Boolean(def.contacts?.length)) ||
      (message.layout !== 'panel' && !message.deliveryState && Boolean(message.actions?.length));
    const tools = item.querySelector('.usx-chat__message-tools');
    await expect(Boolean(tools)).toBe(hasTools);
    if (message.deliveryState === 'failed') {
      await expect(item).toHaveClass('usx-chat__message--failed');
      await expect(item.querySelector('.usx-chat__delivery-error')).toHaveClass(
        'usx-alert',
        'usa-alert--slim',
        'usa-alert--error'
      );
      await expect(item.querySelector('.usx-chat__retry')).toHaveTextContent('Retry');
    }
    if (tools)
      await expect(tools).toHaveAttribute(
        'aria-label',
        `Actions for message from ${participant.name}`
      );
    const reactionMenu = item.querySelector('.usx-chat__reaction-actions');
    await expect(Boolean(reactionMenu)).toBe(availableReactions.length > 0);
    if (reactionMenu) {
      await expect(reactionMenu).toHaveAttribute('data-align', 'end');
      await expect(reactionMenu.querySelector(':scope > .usx-popover__panel')).toHaveClass(
        'usx-popover__panel--square'
      );
      const trigger = reactionMenu.querySelector(':scope > summary');
      await expect(trigger).toHaveAttribute(
        'aria-label',
        `React to message from ${participant.name}`
      );
      await expect(trigger).toHaveAttribute('title', 'Add reaction');
    }
    const threadTool = tools?.querySelector('.usx-chat__tool-button[data-usx-chat-thread]');
    await expect(Boolean(threadTool)).toBe(canOpenThread);
    const forwardTool = tools?.querySelector('[data-usx-chat-forward]');
    await expect(Boolean(forwardTool)).toBe(
      message.layout !== 'panel' && !message.deliveryState && Boolean(def.contacts?.length)
    );
    const menu = item.querySelector('.usx-chat__overflow-actions');
    await expect(Boolean(menu)).toBe(
      canCopyMessage ||
        Boolean(message.layout !== 'panel' && !message.deliveryState && message.actions?.length)
    );
    if (menu) {
      await expect(menu).toHaveClass('usx-popover');
      await expect(menu).toHaveAttribute('data-align', 'end');
      await expect(menu.querySelector(':scope > .usx-popover__panel')).toHaveClass(
        'usx-popover__panel--square'
      );
      const trigger = menu.querySelector(':scope > summary');
      await expect(trigger).toHaveAttribute(
        'aria-label',
        `More actions for message from ${participant.name}`
      );
      await expect(trigger).toHaveAttribute('title', 'More actions');
      await expect(
        menu.querySelectorAll('.usx-popover__menu .usx-popover__menu-item')
      ).toHaveLength((message.actions?.length || 0) + Number(canCopyMessage));
    }
    const picker = reactionMenu?.querySelector('.usx-popover__menu');
    await expect(Boolean(picker)).toBe(availableReactions.length > 0);
    if (picker)
      await expect(picker.querySelectorAll('[data-usx-chat-reaction]')).toHaveLength(
        availableReactions.length
      );
    if (canCopyMessage) {
      const copyMessage = item.querySelector('[data-usx-chat-copy-message]');
      await expect(copyMessage.tagName).toBe('BUTTON');
      await expect(copyMessage).toHaveClass('usx-popover__menu-item');
      await expect(copyMessage).not.toHaveClass('usa-button');
      await expect(copyMessage).toHaveTextContent('Copy message');
      await expect(copyMessage.querySelector('use')).toHaveAttribute(
        'href',
        expect.stringMatching(/#content_copy$/)
      );
    }
    if (message.edited)
      await expect(item.querySelector('.usx-chat__message-meta')).toHaveTextContent('Edited');
    const threadEntry = item.querySelector('[data-usx-chat-thread]');
    await expect(Boolean(threadEntry)).toBe(canOpenThread);
    const replyLink = item.querySelector('.usx-chat__thread-link');
    const replyCount = message.replyCount ?? message.replies?.length ?? 0;
    await expect(Boolean(replyLink)).toBe(canOpenThread && replyCount > 0);
    if (replyLink)
      await expect(replyLink).toHaveTextContent(
        `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`
      );
  }

  const typing = window.querySelector('.usx-chat__typing');
  if (def.typingIds?.length) {
    await expect(typing.tagName).toBe('LI');
    await expect(typing.parentElement).toBe(log);
    await expect(typing).toHaveAttribute('role', 'status');
    await expect(typing.querySelector('.usx-avatar-group')).toHaveClass(
      'usx-avatar-group--overlap'
    );
    await expect(typing.querySelectorAll('.usx-chat__avatar')).toHaveLength(def.typingIds.length);
    for (const id of def.typingIds)
      await expect(typing).toHaveTextContent(
        def.participants.find((person) => person.id === id).name
      );
  } else await expect(typing).toBeNull();
  const controls = window.querySelector('.usx-chat__controls');
  if (def.suggestedQuestions?.length || def.choices?.length || def.children) {
    await expect(controls.tagName).toBe('LI');
    await expect(controls.parentElement).toBe(log);
    await expect(log.lastElementChild).toBe(controls);
    await expect(getComputedStyle(controls).overflowY).toBe('visible');
  } else await expect(controls).toBeNull();
  const suggestions = window.querySelectorAll('.usx-chat__quick-replies button.usx-tag');
  await expect(suggestions).toHaveLength(def.suggestedQuestions?.length || 0);
  const choices = window.querySelectorAll('.usx-chat__choices button.usx-tag');
  await expect(choices).toHaveLength(def.choices?.length || 0);
  for (const [index, option] of (def.suggestedQuestions || []).entries()) {
    await expect(suggestions[index]).toHaveClass('usx-tag--interactive', 'usx-tag--outline');
    await expect(suggestions[index]).toHaveAttribute('data-usx-chat-suggestion', option.value);
    await expect(suggestions[index]).toHaveTextContent(option.label);
    await expect(suggestions[index].querySelector('.usx-tag')).toBeNull();
  }
  for (const [index, option] of (def.choices || []).entries()) {
    await expect(choices[index]).toHaveClass('usx-tag--interactive', 'usx-tag--outline');
    await expect(choices[index]).toHaveAttribute('data-usx-chat-choice', option.value);
    await expect(choices[index]).toHaveTextContent(option.label);
    await expect(choices[index].querySelector('.usx-tag')).toBeNull();
  }
  const actions = panel.querySelector('.usx-popover__header-right-actions .usx-chat__actions');
  const hostActions = selected?.actions ?? [];
  if (def.showCopyAction || def.actions || hostActions.length) {
    await expect(actions).toHaveClass('usx-popover');
    await expect(actions.querySelector(':scope > .usx-popover__panel')).not.toBeNull();
    await expect(actions.querySelector('summary')).toHaveAttribute(
      'aria-label',
      'Conversation actions'
    );
    await expect(actions.querySelectorAll('[data-usx-chat-directory-action]')).toHaveLength(
      hostActions.length
    );
    for (const action of hostActions) {
      const button = actions.querySelector(`[data-usx-chat-directory-action="${action.id}"]`);
      await expect(button).toHaveTextContent(action.label);
      await expect(button).toHaveAttribute('data-usx-chat-conversation-id', selected.id);
      await expect(button.disabled).toBe(Boolean(action.disabled));
    }
    if (def.showCopyAction) {
      const copy = actions.querySelector('[data-usx-chat-copy]');
      await expect(copy.tagName).toBe('BUTTON');
      await expect(copy).toHaveClass('usx-popover__menu-item');
      await expect(copy).not.toHaveClass('usa-button', 'usx-button');
      await expect(copy).toHaveTextContent('Copy conversation');
      await expect(transcriptFromChat(chat)).toContain(
        `sender: ${def.participants.find((person) => person.id === sourceMessages[0].senderId).name}`
      );
      if (sourceMessages.length > 1)
        await expect(transcriptFromChat(chat)).toContain('\n----------------------------\n');
    }
  } else await expect(actions).toBeNull();

  const composer = window.querySelector('form.usx-chat__composer');
  if (view === 'thread' && !threadRoot) {
    await expect(composer).toBeNull();
    return;
  }
  if (selected)
    await expect(composer.querySelector('input[name="conversationId"]').value).toBe(selected.id);
  if (recipient)
    await expect(composer.querySelector('input[name="recipientId"]').value).toBe(recipient.id);
  if (view === 'thread')
    await expect(composer.querySelector('input[name="threadRootId"]').value).toBe(
      def.activeThreadId
    );
  const contact = def.contacts?.find((item) => item.participantId === def.recipientId);
  const canAttach =
    selected?.allowAttachments ?? contact?.allowAttachments ?? def.allowAttachments ?? false;
  await expect(composer.querySelector('label[for]')).toHaveTextContent(
    view === 'thread' ? 'Reply in thread' : 'Message'
  );
  await expect(composer.querySelector('textarea')).toHaveClass('usa-textarea', 'usx-textarea');
  await expect(composer.querySelector('textarea')).toHaveAttribute('rows', '2');
  await expect(composer.querySelector('textarea')).toHaveAttribute(
    'placeholder',
    view === 'thread' ? 'Reply in thread' : 'Write a message'
  );
  const emojiPack = (def.emojiPack ?? config.props.emojiPack.default).slice(0, 100);
  const emojiPicker = composer.querySelector('.usx-chat__emoji-picker');
  if (def.allowFormatting) {
    await expect(composer.querySelector('.usx-chat__formatting')).toHaveAttribute('hidden');
    await expect(composer.querySelectorAll('.usx-chat__format-button')).toHaveLength(8);
    await expect(composer.querySelector('[data-usx-chat-toggle-formatting]')).not.toBeNull();
  } else {
    await expect(composer.querySelector('.usx-chat__formatting')).toBeNull();
    await expect(composer.querySelector('[data-usx-chat-toggle-formatting]')).toBeNull();
  }
  if (canAttach || def.allowFormatting)
    await expect(composer.querySelector('.usx-chat__composer-tools')).toHaveClass(
      'usa-button-group',
      'usx-button-group'
    );
  else await expect(composer.querySelector('.usx-chat__composer-tools')).toBeNull();
  await expect(Boolean(emojiPicker)).toBe(emojiPack.length > 0 && !def.disabled);
  if (emojiPicker) {
    await expect(emojiPicker.closest('.usx-chat__attach')).not.toBeNull();
    await expect(emojiPicker.closest('.usx-chat__formatting')).toBeNull();
    await expect(emojiPicker.querySelector('summary')).toHaveAttribute(
      'aria-label',
      'Choose emoji'
    );
    await expect(emojiPicker.querySelectorAll('[data-usx-chat-emoji]')).toHaveLength(
      emojiPack.length
    );
  }
  await expect(composer.querySelector('.usx-chat__send')).toHaveTextContent(
    view === 'thread' ? 'Send reply' : 'Send'
  );
  await expect(composer.querySelector('textarea').id).toBe(`${panel.id}-message`);
  const upload = composer.querySelector('input[type="file"]');
  await expect(composer.enctype).toBe(
    canAttach ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
  );
  if (canAttach) {
    await expect(
      composer.querySelector(
        '[data-usx-chat-attach], .usx-chat__composer-tools [aria-label="Attach files"]'
      )
    ).not.toBeNull();
    await expect(upload.multiple).toBe(true);
    await expect(upload.getAttribute('aria-label')).toBe('Attach files');
    await expect(composer.querySelector(':scope > .usx-chat__staged-files')).toBeNull();
  } else {
    await expect(upload).toBeNull();
  }
  await expect(composer.querySelector('[data-usx-chat-file-list-template]')).toBeNull();
  await expect(composer.querySelector('button[type="submit"]')).toHaveTextContent('Send');
  await expect(composer.querySelector('button[type="submit"]')).toHaveClass('usa-button--primary');
};

const structuralPlay = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkChat(def)])
  )
);

const play = async (context) => {
  await structuralPlay(context);
  const section = (title) => {
    const heading = [...context.canvasElement.querySelectorAll('h3.site-preview-heading')].find(
      (item) => item.textContent === title
    );
    const root = heading.nextElementSibling;
    return root.matches('.usx-chat') ? root : root.querySelector('.usx-chat');
  };
  chatEnhancement.init(context.canvasElement);
  popover.init(context.canvasElement);

  await context.step('Action defaults and overrides render consistently', async () => {
    const ids = (chat, id) =>
      [...chat.querySelectorAll(`[data-message-id="${id}"] [data-usx-chat-message-action]`)].map(
        (button) => button.dataset.usxChatMessageAction
      );
    const coworker = section('Message Action Defaults');
    await expect(ids(coworker, 'coworker-1')).toEqual(['mark-unread']);
    await expect(ids(coworker, 'coworker-2')).toEqual(['edit', 'delete']);
    await expect(ids(coworker, 'locked')).toEqual([]);
    const chat = section('Message Actions');
    await expect(ids(chat, 'new-thread')).toEqual(ids(chat, 'received'));
  });

  await context.step('Read messages expose Mark unread and dispatch its context', async () => {
    for (const [title, actionId, otherId] of [['Message Actions', 'mark-unread', 'mark-read']]) {
      const chat = section(title);
      const message = chat.querySelector('[data-message-id="received"]');
      const menu = message.querySelector('.usx-chat__overflow-actions');
      await expect(menu.querySelector(`[data-usx-chat-message-action="${otherId}"]`)).toBeNull();
      await expect(Boolean(chat.querySelector('.usx-chat__unread-divider'))).toBe(
        actionId === 'mark-read'
      );
      let detail;
      chat.addEventListener(
        'usx:chat-message-action',
        (event) => {
          detail = event.detail;
        },
        { once: true }
      );
      menu.querySelector('summary').click();
      menu.querySelector(`[data-usx-chat-message-action="${actionId}"]`).click();
      await expect(detail).toEqual({ actionId, messageId: 'received', conversationId: 'support' });
      await expect(menu.open).toBe(false);
      await expect(menu.querySelector('summary')).toHaveFocus();
    }
    const unread = section('Inbox Journey');
    await expect(unread.querySelector('[data-usx-chat-conversation="morgan"]')).toHaveTextContent(
      '2 unread messages'
    );
  });

  await context.step('Rich content actions dispatch host commands alongside Copy', async () => {
    const chat = section('Actions And Rich Content');
    const menu = chat.querySelector('.usx-chat__actions');
    await expect(menu.querySelector('[data-usx-chat-copy]')).toHaveTextContent('Copy conversation');
    await expect(menu.querySelector('a')).toHaveTextContent('Open example conversation');
    const events = [];
    chat.addEventListener('usx:chat-directory-action', (event) => events.push(event.detail));
    for (const actionId of ['mute', 'pin', 'mark-unread', 'delete-history']) {
      menu.querySelector('summary').click();
      menu.querySelector(`[data-usx-chat-directory-action="${actionId}"]`).click();
      await expect(events.at(-1)).toEqual({ actionId, conversationId: 'resources' });
      await expect(menu.open).toBe(false);
      await expect(menu.querySelector('summary')).toHaveFocus();
    }
    await expect(chat.querySelectorAll('[data-message-id]')).toHaveLength(3);
  });

  await context.step('Image-only failed and sent messages retain their attachment', async () => {
    const chat = section('Failed Send');
    for (const id of ['failed-image', 'sent-image']) {
      const message = chat.querySelector(`[data-message-id="${id}"]`);
      const image = message.querySelector('.usx-chat__attachments img');
      await expect(message.querySelector('.usx-chat__bubble')).toHaveTextContent(
        'Liberty Island photo.png'
      );
      await expect(image).toHaveAttribute('alt', 'Statue of Liberty');
      await waitFor(() => expect(image.naturalWidth).toBeGreaterThan(0));
    }
    await expect(
      chat.querySelector('[data-message-id="sent-image"] [data-usx-chat-retry]')
    ).toBeNull();
    await expect(chat.querySelector('[data-message-id="sent-image"]')).toHaveTextContent('Sent');
    let detail;
    chat.addEventListener(
      'usx:chat-retry',
      (event) => {
        detail = event.detail;
      },
      { once: true }
    );
    chat.querySelector('[data-usx-chat-retry="failed-image"]').click();
    await expect(detail).toEqual({ messageId: 'failed-image', clientMessageId: undefined });
  });

  await context.step(
    'Conversation header actions dispatch the configured action payloads',
    async () => {
      const chat = section('Conversation Actions');
      const events = [];
      chat.addEventListener('usx:chat-directory-action', (event) => events.push(event.detail));
      const menu = chat.querySelector('.usx-chat__actions');
      for (const actionId of ['leave-group', 'delete-history']) {
        menu.querySelector('summary').click();
        menu.querySelector(`[data-usx-chat-directory-action="${actionId}"]`).click();
        await expect(menu.open).toBe(false);
        await expect(menu.querySelector('summary')).toHaveFocus();
      }
      await expect(events).toEqual([
        { actionId: 'leave-group', conversationId: 'review-team' },
        { actionId: 'delete-history', conversationId: 'review-team' },
      ]);
      await expect(chat.querySelectorAll('[data-message-id]')).toHaveLength(2);
    }
  );

  await context.step(
    'Delete, recall and unread are host message actions with conversation context',
    async () => {
      const chat = section('Message Actions');
      const events = [];
      chat.addEventListener('usx:chat-message-action', (event) => events.push(event.detail));
      for (const [messageId, actionId] of [
        ['recent', 'delete-message'],
        ['recent', 'recall'],
        ['received', 'mark-unread'],
      ]) {
        const message = chat.querySelector(`[data-message-id="${messageId}"]`);
        const menu = message.querySelector('.usx-chat__overflow-actions');
        menu.querySelector('summary').click();
        menu.querySelector(`[data-usx-chat-message-action="${actionId}"]`).click();
        await expect(events.at(-1)).toEqual({ messageId, actionId, conversationId: 'support' });
        await expect(menu.querySelector('summary')).toHaveFocus();
      }
      await expect(
        chat.querySelector('[data-message-id="expired"] [data-usx-chat-message-action="recall"]')
      ).toBeNull();
      await expect(chat.querySelectorAll('[data-message-id]')).toHaveLength(5);
    }
  );

  await context.step(
    'New messages collect recipients before the host creates a conversation',
    async () => {
      const chat = section('New Group Message');
      const form = chat.querySelector('form');
      const textarea = form.querySelector('textarea');
      const send = form.querySelector('[type="submit"]');
      const sent = [];
      const changes = [];
      chat.addEventListener('usx:chat-send', (event) => {
        event.preventDefault();
        sent.push(event.detail);
      });
      chat.addEventListener('usx:chat-recipients-change', (event) => changes.push(event.detail));
      textarea.value = 'Let us review this together.';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await expect(send).toBeDisabled();
      form.requestSubmit();
      await expect(sent).toHaveLength(0);
      const people = chat.querySelectorAll('[data-usx-chat-recipient]');
      people[0].click();
      await expect(send).toBeEnabled();
      people[1].click();
      people[0].click();
      await expect(changes.at(-1)).toEqual({ recipientIds: ['specialist'] });
      people[0].click();
      await expect(new FormData(form).getAll('recipientIds')).toEqual(['agent', 'specialist']);
      form.requestSubmit();
      await expect(sent).toHaveLength(1);
      await expect(sent[0]).toMatchObject({
        text: 'Let us review this together.',
        recipientIds: ['agent', 'specialist'],
      });
      await expect(sent[0].conversationId).toBeUndefined();
      await expect(chat.querySelector('.usx-chat__window')).toHaveAttribute(
        'data-chat-view',
        'contacts'
      );
      people[0].click();
      people[1].click();
      await expect(send).toBeDisabled();
    }
  );

  await context.step('Send from the simple conversation', async () => {
    const chat = section('Default');
    const textarea = chat.querySelector('textarea');
    const sent = [];
    chat.addEventListener('usx:chat-send', (event) => sent.push(event.detail));
    textarea.value = 'Can I save a draft?';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    const shiftEnter = new KeyboardEvent('keydown', {
      key: 'Enter',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(shiftEnter);
    await expect(shiftEnter.defaultPrevented).toBe(false);
    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    textarea.dispatchEvent(enter);
    await expect(enter.defaultPrevented).toBe(true);
    await expect(sent).toHaveLength(1);
    await expect(sent[0]).toMatchObject({ text: 'Can I save a draft?', files: [] });
    await expect(sent[0].clientMessageId).toMatch(/chat-default-pending-\d+-1$/);
  });

  await context.step('Failed delivery exposes a retry event from the message', async () => {
    const chat = section('Failed Send');
    const retry = chat.querySelector('[data-usx-chat-retry="previous-failed"]');
    const events = [];
    chat.addEventListener('usx:chat-retry', (event) => events.push(event.detail));
    retry.click();
    await expect(events).toEqual([{ messageId: 'previous-failed', clientMessageId: undefined }]);
    await expect(chat.querySelector('.usx-chat__composer .usx-alert')).toBeNull();
    await expect(transcriptFromChat(chat)).not.toContain('Did you receive my document?');
  });

  await context.step('Team grouping, presence, and typing stay readable', async () => {
    const chat = section('Multiple Participants');
    const first = chat.querySelector('[data-message-id="a1"]');
    const second = chat.querySelector('[data-message-id="a2"]');
    const bubble = first.querySelector('.usx-chat__bubble');
    const tools = first.querySelector('.usx-chat__message-tools');
    await expect(bubble.contains(first.querySelector('.usx-chat__reactions .usx-tag'))).toBe(true);
    await expect(chat.querySelector('.usx-chat__typing')).toHaveTextContent('Morgan');
    await expect(chat.querySelector('.usx-chat__typing')).toHaveTextContent('Taylor');
    await expect(chat.querySelector('.usx-chat__context a')).toHaveAttribute(
      'href',
      '#access-request-details'
    );
    const before = second.getBoundingClientRect().top;
    bubble.dispatchEvent(new PointerEvent('click', { bubbles: true, pointerType: 'touch' }));
    await expect(first).toHaveClass('usx-chat__message--actions-visible');
    const reactionMenu = first.querySelector('.usx-chat__reaction-actions');
    reactionMenu
      .querySelector('summary')
      .dispatchEvent(new PointerEvent('click', { bubbles: true, pointerType: 'touch' }));
    await expect(reactionMenu.open).toBe(true);
    await expect(first).toHaveClass('usx-chat__message--actions-visible');
    await expect(Math.abs(second.getBoundingClientRect().top - before)).toBeLessThan(1);
    await expect(
      Math.abs(tools.getBoundingClientRect().right - bubble.getBoundingClientRect().right)
    ).toBeLessThan(2);
  });

  await context.step('Bot choices emit usable values and scroll with history', async () => {
    const chat = section('Bot Controls With History');
    const log = chat.querySelector('.usx-chat__messages');
    const controls = log.querySelector('.usx-chat__controls');
    const options = [];
    chat.addEventListener('usx:chat-option', (event) => options.push(event.detail));
    await waitFor(() => expect(log.scrollHeight).toBeGreaterThan(log.clientHeight));
    log.scrollTop = log.scrollHeight;
    const atBottom = controls.getBoundingClientRect().top;
    log.scrollTop = 0;
    await expect(controls.getBoundingClientRect().top - atBottom).toBeGreaterThan(100);
    chat.querySelector('[data-usx-chat-suggestion]').click();
    chat.querySelector('[data-usx-chat-choice]').click();
    await expect(options.map((item) => item.type)).toEqual(['suggestion', 'choice']);
  });

  await context.step('New messages follow the bottom only while the reader is there', async () => {
    const chat = section('Long History');
    const log = chat.querySelector('.usx-chat__messages');
    await waitFor(() => expect(log.scrollHeight).toBeGreaterThan(log.clientHeight));
    await expect(Math.abs(log.scrollHeight - log.clientHeight - log.scrollTop)).toBeLessThan(2);

    const latest = document.createElement('li');
    latest.className = 'usx-chat__message';
    latest.dataset.messageId = 'new-latest';
    latest.style.height = '80px';
    log.append(latest);
    await waitFor(() =>
      expect(Math.abs(log.scrollHeight - log.clientHeight - log.scrollTop)).toBeLessThan(2)
    );

    log.scrollTop -= 100;
    log.dispatchEvent(new Event('scroll'));
    const readingPosition = log.scrollTop;
    const later = document.createElement('li');
    later.className = 'usx-chat__message';
    later.dataset.messageId = 'another-latest';
    later.style.height = '80px';
    log.append(later);
    await new Promise(requestAnimationFrame);
    await expect(Math.abs(log.scrollTop - readingPosition)).toBeLessThan(2);
    latest.remove();
    later.remove();
  });

  await context.step('Paged history requests and preserves an anchor', async () => {
    const chat = section('Long History');
    const log = chat.querySelector('.usx-chat__messages');
    const requests = [];
    chat.addEventListener('usx:chat-load-older', (event) => requests.push(event.detail));
    await waitFor(() => expect(log.scrollHeight).toBeGreaterThan(log.clientHeight));
    log.scrollTop = 0;
    log.dispatchEvent(new Event('scroll'));
    await waitFor(() => expect(requests).toHaveLength(1));
    await expect(requests[0]).toMatchObject({ cursor: '16', beforeMessageId: 'history-17' });
    const anchor = captureChatScroll(chat);
    const before = log
      .querySelector(`[data-message-id="${anchor.messageId}"]`)
      .getBoundingClientRect().top;
    const older = document.createElement('li');
    older.className = 'usx-chat__message';
    older.dataset.messageId = 'earlier-example';
    older.style.height = '80px';
    log.querySelector('.usx-chat__message').before(older);
    await expect(restoreChatScroll(chat, anchor)).toBe(true);
    await expect(
      Math.abs(
        log.querySelector(`[data-message-id="${anchor.messageId}"]`).getBoundingClientRect().top -
          before
      )
    ).toBeLessThan(2);
    const secondPage = older.cloneNode(true);
    secondPage.dataset.messageId = 'earlier-second-page';
    secondPage.style.height = '160px';
    older.before(secondPage);
    await expect(restoreChatScroll(chat, anchor)).toBe(true);
    await expect(
      Math.abs(
        log.querySelector(`[data-message-id="${anchor.messageId}"]`).getBoundingClientRect().top -
          before
      )
    ).toBeLessThan(2);
    secondPage.remove();
    older.remove();
    const error = document.createElement('span');
    error.className = 'usx-chat__history-error';
    error.textContent = 'Could not load earlier messages.';
    log.querySelector('.usx-chat__older-history').append(error);
    log.dataset.usxChatOlderCursor = 'retry-page';
    log.scrollTop = 0;
    log.dispatchEvent(new Event('scroll'));
    await new Promise(requestAnimationFrame);
    await expect(requests).toHaveLength(1);
    log.querySelector('[data-usx-chat-load-older]').click();
    await expect(requests).toHaveLength(2);
    await expect(requests[1].cursor).toBe('retry-page');
    error.remove();
    log.dataset.usxChatOlderCursor = '16';
    log.scrollTop = 0;
    log.dispatchEvent(new Event('scroll'));
    await expect(requests).toHaveLength(3);
    log.dispatchEvent(new Event('scroll'));
    await expect(requests).toHaveLength(3);
    // Hosts may reuse message IDs and cursors in different conversations.
    const conversationId = log.dataset.usxChatConversationId;
    try {
      log.dataset.usxChatConversationId = 'another-conversation';
      await new Promise(requestAnimationFrame);
      log.scrollTop = 0;
      log.dispatchEvent(new Event('scroll'));
      await expect(requests).toHaveLength(4);
      await expect(requests[3].conversationId).toBe('another-conversation');
    } finally {
      if (conversationId === undefined) delete log.dataset.usxChatConversationId;
      else log.dataset.usxChatConversationId = conversationId;
    }
  });

  await context.step(
    'Thread paging preserves the reply position across pages and DOM replacement',
    async () => {
      const history = section('Thread History');
      const log = history.querySelector('.usx-chat__messages');
      const originalStyle = log.getAttribute('style');
      // Disable browser anchoring so this verifies the enhancement's host-facing anchor.
      log.style.overflowAnchor = 'none';
      log.style.flex = 'none';
      log.style.height = '16rem';
      let request;
      history.addEventListener(
        'usx:chat-load-older',
        (event) => {
          request = event.detail;
        },
        { once: true }
      );
      log.scrollTop = 0;
      log.dispatchEvent(new Event('scroll'));
      await waitFor(() => expect(request).toBeDefined());
      const firstReply = log.querySelector('[data-message-id="thread-history-9"]');
      const offset = firstReply.getBoundingClientRect().top - log.getBoundingClientRect().top;
      await expect(
        log.querySelector('[data-message-id="thread-history-root"]').getBoundingClientRect().bottom
      ).toBeGreaterThan(log.getBoundingClientRect().top);
      await expect(request).toMatchObject({
        threadRootId: 'thread-history-root',
        beforeMessageId: 'thread-history-9',
        cursor: '8',
        anchor: { messageId: 'thread-history-9' },
      });
      const added = [];
      for (const page of [1, 2]) {
        const earlier = document.createElement('li');
        earlier.className = 'usx-chat__message';
        earlier.dataset.messageId = `older-thread-page-${page}`;
        earlier.style.height = '160px';
        (added[0] || firstReply).before(earlier);
        added.unshift(earlier);
        await new Promise(requestAnimationFrame);
        await expect(restoreChatScroll(history, request.anchor)).toBe(true);
        await expect(
          Math.abs(
            firstReply.getBoundingClientRect().top - log.getBoundingClientRect().top - offset
          )
        ).toBeLessThan(2);
        await expect(log.scrollTop).toBeGreaterThan(0);
      }
      // A Django response replaces the log; the same anchor must survive that too.
      const replacement = log.cloneNode(true);
      log.replaceWith(replacement);
      await new Promise(requestAnimationFrame);
      await expect(restoreChatScroll(history, request.anchor)).toBe(true);
      await expect(
        Math.abs(
          replacement.querySelector('[data-message-id="thread-history-9"]').getBoundingClientRect()
            .top -
            replacement.getBoundingClientRect().top -
            offset
        )
      ).toBeLessThan(2);
      replacement.replaceWith(log);
      added.forEach((item) => item.remove());
      if (originalStyle === null) log.removeAttribute('style');
      else log.setAttribute('style', originalStyle);
    }
  );

  await context.step(
    'Every message in a thread-enabled conversation can open a thread',
    async () => {
      const start = section('Message Actions');
      let navigation;
      start.addEventListener('usx:chat-navigate', (event) => {
        navigation = event.detail;
      });
      for (const id of ['expired', 'new-thread', 'action-1', 'received', 'recent']) {
        const entry = start.querySelector(`[data-message-id="${id}"] [data-usx-chat-thread]`);
        await expect(entry).not.toBeNull();
        entry.click();
        await expect(navigation).toEqual({ view: 'thread', threadRootId: id });
      }
      await expect(section('Default').querySelector('[data-usx-chat-thread]')).toBeNull();
    }
  );

  await context.step('Unread conversation reopens at the newest message', async () => {
    for (const title of ['Mixed Unread']) {
      const chat = section(title);
      const log = chat.querySelector('.usx-chat__messages');
      const divider = log.querySelector('.usx-chat__unread-divider');
      await expect(divider).not.toBeNull();
      log.style.flex = 'none';
      log.style.height = '8rem';
      log.scrollTop = 0;
      chat.querySelector('.usx-popover__header-close').click();
      chat.querySelector(':scope > summary').click();
      await waitFor(() =>
        expect(Math.abs(log.scrollHeight - log.clientHeight - log.scrollTop)).toBeLessThan(2)
      );
    }
  });

  await context.step(
    'Inbox and contextual navigation expose the intended destinations',
    async () => {
      const inbox = section('Inbox Journey');
      const row = inbox.querySelector('[data-usx-chat-conversation="morgan"]');
      await expect(row.querySelector('.usx-tag')).toHaveTextContent('2');
      await expect(
        inbox.querySelector('[data-usx-chat-conversation="taylor"] .usx-tag')
      ).toHaveTextContent('1');
      const navigations = [];
      inbox.addEventListener('usx:chat-navigate', (event) => navigations.push(event.detail));
      inbox.querySelector('[data-usx-chat-new]').click();
      row.click();
      await expect(navigations).toEqual([
        { view: 'contacts' },
        { view: 'conversation', conversationId: 'morgan' },
      ]);
      const emptyInbox = section('Empty Inbox');
      await expect(emptyInbox.querySelector('.usx-chat__directory')).toHaveTextContent(
        'No conversations yet.'
      );
      let emptyInboxNavigation;
      emptyInbox.addEventListener(
        'usx:chat-navigate',
        (event) => {
          emptyInboxNavigation = event.detail;
        },
        { once: true }
      );
      emptyInbox.querySelector('[data-usx-chat-new]').click();
      await expect(emptyInboxNavigation).toEqual({ view: 'contacts' });
      const groupInbox = section('Group Inbox');
      const groupRow = groupInbox.querySelector('[data-usx-chat-conversation="review-team"]');
      await expect(groupRow.querySelector('.usx-chat__directory-avatars')).toHaveClass(
        'usx-avatar-group--overlap'
      );
      let groupNavigation;
      groupInbox.addEventListener(
        'usx:chat-navigate',
        (event) => {
          groupNavigation = event.detail;
        },
        { once: true }
      );
      groupRow.click();
      await expect(groupNavigation).toEqual({
        view: 'conversation',
        conversationId: 'review-team',
      });
      const contextual = section('Contextual Inbox');
      const entries = contextual.querySelectorAll('.usx-chat__directory-item');
      await expect(entries[0]).toHaveTextContent('Blue commuter bicycle');
      await expect(entries[1]).toHaveTextContent('Three design books');
      const contextualNavigation = [];
      contextual.addEventListener('usx:chat-navigate', (event) =>
        contextualNavigation.push(event.detail)
      );
      entries[0].querySelector('.usx-chat__directory-subtitle').click();
      await expect(contextualNavigation).toEqual([
        { view: 'conversation', conversationId: 'bicycle' },
      ]);
      const linked = section('Linked Navigation');
      await expect(linked.querySelector('.usx-chat__directory-item[href]')).toHaveAttribute(
        'href',
        expect.stringContaining('/iframe.html?id=react-usx-chat--')
      );
    }
  );

  await context.step('Reactions, overflow actions, forwarding, and copying work', async () => {
    const chat = section('Message Actions');
    const actionableMessage = chat.querySelector('[data-message-id="action-1"]');
    const events = [];
    for (const name of ['usx:chat-reaction', 'usx:chat-message-action', 'usx:chat-forward'])
      chat.addEventListener(name, (event) => events.push({ name, detail: event.detail }));
    const reactionMenu = actionableMessage.querySelector('.usx-chat__reaction-actions');
    reactionMenu.querySelector('summary').click();
    reactionMenu.querySelector('[data-usx-chat-reaction="Celebrate"]').click();
    await expect(reactionMenu.open).toBe(false);
    await expect(chat.open).toBe(true);
    actionableMessage.querySelector('[data-usx-chat-reaction="Thumbs up"]').click();
    await expect(chat.open).toBe(true);
    const actions = actionableMessage.querySelector('.usx-chat__overflow-actions');
    actions.querySelector('summary').click();
    actions.closest('.usx-chat__message').classList.remove('usx-chat__message--actions-visible');
    actions.querySelector('summary').blur();
    const actionTools = actions.closest('.usx-chat__message-tools');
    await expect(getComputedStyle(actionTools).opacity).toBe('1');
    await expect(getComputedStyle(actionTools).pointerEvents).toBe('auto');
    actions.querySelector('[data-usx-chat-message-action="edit"]').click();
    actionableMessage.querySelector('[data-usx-chat-forward]').click();
    await expect(events.map((event) => event.name)).toEqual([
      'usx:chat-reaction',
      'usx:chat-reaction',
      'usx:chat-message-action',
      'usx:chat-forward',
    ]);
    await expect(events[3].detail.messageId).toBe('action-1');
    const rich = section('Actions And Rich Content');
    let copied = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          copied = value;
        },
      },
    });
    rich.querySelector('.usx-chat__actions > summary').click();
    rich.querySelector('[data-usx-chat-copy]').click();
    await expect(copied).toContain('sender: Morgan');
    await expect(copied).toContain('Your reference number is AR-2048.');
    await expect(rich.querySelector('.usx-chat__copy-status')).toHaveTextContent(
      'Conversation copied'
    );
    await expect(rich.querySelector('.usx-chat__actions > summary')).toHaveFocus();
    const copyMenu = rich.querySelector('[data-message-id="r3"] .usx-chat__overflow-actions');
    copyMenu.querySelector('summary').click();
    copyMenu.querySelector('[data-usx-chat-copy-message]').click();
    await expect(copied).toBe('Your reference number is AR-2048.');
    await expect(copyMenu).not.toHaveAttribute('open');
    await expect(copyMenu.querySelector('summary')).toHaveFocus();
    delete navigator.clipboard;
  });

  await context.step(
    'Built-in and custom emoji packs work in both pickers and shortcodes',
    async () => {
      const chat = section('Formatting');
      const reactionMenu = chat.querySelector('.usx-chat__reaction-actions');
      const reactionGrid = reactionMenu.querySelector('.usx-popover__menu');
      reactionMenu.open = true;
      await expect(getComputedStyle(reactionGrid).display).toBe('grid');
      await expect(getComputedStyle(reactionGrid).gridTemplateColumns.split(' ')).toHaveLength(3);
      await expect(reactionGrid.querySelectorAll('[data-usx-chat-reaction]')).toHaveLength(80);
      reactionMenu.open = false;
      const textarea = chat.querySelector('.usx-chat__composer textarea');
      textarea.value = 'Hi :wave: and :+1:';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await expect(textarea.value).toBe('Hi 👋 and 👍');
      textarea.value = 'Hello !';
      textarea.setSelectionRange(6, 6);
      const picker = chat.querySelector('.usx-chat__emoji-picker');
      picker.querySelector('summary').click();
      picker.querySelector('[data-usx-chat-emoji-name="heart"]').click();
      await expect(textarea.value).toBe('Hello ❤️!');
      await expect(textarea.selectionStart).toBe(8);
      await expect(picker.open).toBe(false);

      const custom = section('Custom Emoji Pack');
      const customPicker = custom.querySelector('.usx-chat__emoji-picker');
      await expect(customPicker.querySelectorAll('[data-usx-chat-emoji]')).toHaveLength(3);
      await expect(
        custom.querySelectorAll('.usx-chat__reaction-actions [data-usx-chat-reaction]')
      ).toHaveLength(3);
      const customTextarea = custom.querySelector('.usx-chat__composer textarea');
      customTextarea.value = 'Use :lab: today';
      customTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      await expect(customTextarea.value).toBe('Use 🧪 today');
      const reactions = [];
      custom.addEventListener('usx:chat-reaction', (event) => reactions.push(event.detail));
      const customReactionMenu = custom.querySelector('.usx-chat__reaction-actions');
      customReactionMenu.querySelector('summary').click();
      customReactionMenu.querySelector('[data-usx-chat-reaction="Microscope"]').click();
      await expect(reactions[0]).toMatchObject({
        messageId: 'custom-emoji-message',
        reaction: 'Microscope',
      });
    }
  );

  await context.step('Formatting controls, shortcuts, and quoted forwards work', async () => {
    const chat = section('Formatting');
    const bubble = chat.querySelector('[data-message-id="format-inline"] .usx-chat__bubble');
    await expect(bubble.querySelector('strong')).toHaveTextContent('Bold');
    await expect(bubble.querySelector('em')).toHaveTextContent('italic');
    await expect(bubble.querySelector('u')).toHaveTextContent('underlined');
    await expect(bubble.querySelector('s')).toHaveTextContent('struck out');
    const blocks = chat.querySelector('[data-message-id="format-blocks"] .usx-chat__bubble');
    await expect(blocks.querySelector('ol li')).toHaveTextContent('Read the guide');
    await expect(blocks.querySelector('ul li')).toHaveTextContent('Attach a file if needed');
    await expect(blocks.querySelector('blockquote')).toHaveTextContent('Keep a copy');
    await expect(blocks.querySelector('pre code')).toHaveTextContent('const ready = true;');
    const nested = chat.querySelector('[data-message-id="format-nested"] .usx-chat__bubble');
    await expect(nested.querySelectorAll('blockquote')).toHaveLength(5);
    await expect(nested.querySelector('blockquote > blockquote > p')).toHaveTextContent(
      'hello world'
    );
    await expect(
      nested.querySelector('blockquote > blockquote > blockquote > p')
    ).toHaveTextContent('Deep quote');
    await expect(
      nested.querySelector('blockquote > blockquote > blockquote > blockquote > blockquote > p')
    ).toHaveTextContent('Five levels deep');
    const outerQuote = nested.querySelector(':scope > blockquote');
    await expect(outerQuote.lastElementChild).toHaveTextContent('hello > world');
    await expect(outerQuote.lastElementChild.querySelector('blockquote')).toBeNull();
    await expect(
      chat.querySelector('[data-message-id="format-forward"] blockquote')
    ).toHaveTextContent('Keep a copy');
    const panel = chat.querySelector('.usx-chat__formatting');
    const toggle = chat.querySelector('[data-usx-chat-toggle-formatting]');
    await expect(panel.hidden).toBe(true);
    toggle.click();
    await expect(panel.hidden).toBe(false);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const input = chat.querySelector('.usx-chat__composer textarea');
    for (const [format, result] of [
      ['bold', '**sample**'],
      ['italic', '*sample*'],
      ['underline', '<u>sample</u>'],
      ['strike', '~~sample~~'],
      ['ordered', '1. sample'],
      ['unordered', '- sample'],
      ['quote', '> sample'],
      ['code', '```\nsample\n```'],
    ]) {
      input.value = 'sample';
      input.setSelectionRange(0, 6);
      panel.querySelector(`[data-usx-chat-format="${format}"]`).click();
      await expect(input.value).toBe(result);
    }
    input.value = 'shortcut';
    input.setSelectionRange(0, 8);
    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'b', ctrlKey: true }));
    await expect(input.value).toBe('**shortcut**');
    let sent;
    chat.addEventListener(
      'usx:chat-send',
      (event) => {
        sent = event.detail;
        event.preventDefault();
      },
      { once: true }
    );
    chat.querySelector('.usx-chat__composer').requestSubmit();
    await expect(sent.text).toBe('**shortcut**');
    toggle.click();
    await expect(panel.hidden).toBe(true);
  });

  await context.step(
    'Staged images submit without text and native reset clears files',
    async () => {
      const chat = section('Attachments');
      const form = chat.querySelector('form');
      const input = form.querySelector('input[type="file"]');
      const image = new File(
        ['<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"/>'],
        'photo.svg',
        { type: 'image/svg+xml' }
      );
      const notes = new File(['Notes'], 'notes.txt', { type: 'text/plain' });
      const transfer = new DataTransfer();
      transfer.items.add(image);
      transfer.items.add(notes);
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      const send = form.querySelector('[type="submit"]');
      await expect(form.querySelector('textarea')).toHaveValue('');
      await expect(send).toBeEnabled();
      await expect(form.querySelector('.usx-chat__staged-files')).toHaveTextContent('photo.svg');
      let sent;
      chat.addEventListener(
        'usx:chat-send',
        (event) => {
          event.preventDefault();
          sent = event.detail;
        },
        { once: true }
      );
      send.click();
      await expect(sent.text).toBe('');
      await expect(sent.files).toEqual([image, notes]);
      await expect(sent.files[0]).toBe(image);
      form.reset();
      await waitFor(() => expect(form.querySelector('.usx-chat__staged-files')).toBeNull());
      await expect(input.files).toHaveLength(0);
      await expect(send).toBeDisabled();
      // The host retains the original File objects for a retry after the form resets.
      await expect(sent.files[0]).toBe(image);
      await expect(sent.files[0].type).toBe('image/svg+xml');
    }
  );

  await context.step('Attachment controls and alternate launchers remain usable', async () => {
    const chat = section('Attachments');
    await expect(transcriptFromChat(chat)).toContain('[Attachment: Liberty Island photo.png]');
    const input = chat.querySelector('input[type="file"]');
    const firstSelection = new DataTransfer();
    firstSelection.items.add(new File(['example'], 'example.txt', { type: 'text/plain' }));
    input.files = firstSelection.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await expect(input.files).toHaveLength(1);
    const secondSelection = new DataTransfer();
    secondSelection.items.add(new File(['another'], 'another.pdf', { type: 'application/pdf' }));
    input.files = secondSelection.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await expect(input.files).toHaveLength(2);
    const staged = chat.querySelector('.usx-chat__composer > .usx-chat__staged-files');
    await expect(staged).toHaveClass('usx-file-list--slim');
    await expect(staged.querySelector('.usx-file-input__list-heading')).toHaveClass('usa-sr-only');
    await expect(staged.querySelectorAll('.usx-file-input__file-item')).toHaveLength(2);
    await expect(staged.querySelector('.usx-file-input__file-size')).toHaveTextContent('TXT, 7 B');
    await expect(staged).toHaveTextContent('example.txt');
    await expect(staged).toHaveTextContent('another.pdf');
    staged.querySelector('[data-usx-chat-file-remove="0"]').click();
    await expect(input.files).toHaveLength(1);
    await expect(input.files[0].name).toBe('another.pdf');
    await expect(
      chat.querySelectorAll(
        '.usx-chat__composer > .usx-chat__staged-files .usx-file-input__file-item'
      )
    ).toHaveLength(1);
    chat.querySelector('[data-usx-chat-file-remove="0"]').click();
    await expect(input.files).toHaveLength(0);
    await expect(chat.querySelector('.usx-chat__composer > .usx-chat__staged-files')).toBeNull();
    const floating = section('Floating Launcher');
    await expect(getComputedStyle(floating.parentElement).position).toBe('fixed');
    await expect(floating).toHaveAttribute('data-side', 'top');
    await expect(floating).toHaveAttribute('data-align', 'end');
    floating.querySelector(':scope > summary').click();
    await expect(floating.open).toBe(true);
    document.body.click();
    await expect(floating.open).toBe(true);
    floating.querySelector('.usx-popover__header-close').click();
    await expect(floating.open).toBe(false);
    const customChat = section('Text Launcher');
    const launcher = customChat.querySelector(':scope > summary');
    await expect(launcher).toHaveAttribute('title', 'Contact support');
    await expect(launcher.querySelector('strong')).toHaveTextContent('Chat with us');
    await expect(customChat.querySelector('.usx-chat__window .my-custom-launcher')).toBeNull();
    launcher.focus();
    launcher.click();
    await expect(customChat.open).toBe(true);
    customChat.querySelector('[aria-label="Close chat"]').click();
    await expect(customChat.open).toBe(false);
    await expect(launcher).toHaveFocus();
    launcher.click();
    await expect(customChat.open).toBe(true);
    await userEvent.keyboard('{Escape}');
    await expect(customChat.open).toBe(false);
    await expect(launcher).toHaveFocus();
    const unavailable = section('Unavailable Thread');
    await expect(unavailable.querySelector('.usx-chat__composer')).toBeNull();
    let back;
    unavailable.addEventListener(
      'usx:chat-navigate',
      (event) => {
        back = event.detail;
      },
      { once: true }
    );
    unavailable.querySelector('[data-usx-chat-back]').click();
    await expect(back).toEqual({ view: 'conversation' });
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
