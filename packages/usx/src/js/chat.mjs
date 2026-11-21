import { createFileList, createFileListRow } from './file-list.mjs';
import { components, enhancementDisabled, markEnhanced } from './enhancement.mjs';

// All Chat events bubble; cancellable events let the host replace the default action.
const emit = (target, name, detail, cancelable = false) =>
  target.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable, detail }));

function composerFor(target, root) {
  const form = target.closest?.('form.usx-chat-composer');
  if (!form || !root.contains(form) || enhancementDisabled(form)) return null;
  return form;
}

function recipientsOf(form) {
  const ids = new FormData(form).getAll('recipientIds');
  if (form.elements.recipientId?.value) ids.push(form.elements.recipientId.value);
  return [...new Set(ids.filter((id) => typeof id === 'string' && id))];
}

function updateSubmit(host) {
  const form = host.matches('.usx-chat-composer') ? host : host.querySelector('.usx-chat-composer');
  const textarea = form?.querySelector('textarea');
  const files = form?.querySelector('input[type="file"]');
  const button = form?.querySelector('button[type="submit"]');
  if (!textarea || !button || enhancementDisabled(form)) return;
  button.disabled =
    textarea.disabled ||
    (!textarea.value.trim() && !files?.files.length) ||
    (form.dataset.usxChatRequireRecipients === 'true' && !recipientsOf(form).length);
  button.setAttribute('aria-disabled', String(button.disabled));
}

function renderStagedFiles(form, files) {
  form.querySelector(':scope > .usx-chat__staged-files')?.remove();
  if (!files.length) return;
  const list = createFileList(form.ownerDocument, {
    hint: 'Files ready to send',
    slim: true,
    className: 'usx-chat__staged-files',
    screenReaderOnlyHint: true,
  });
  list.querySelector('.usx-file-input__file-list').replaceChildren(
    ...files.map((file, index) => {
      return createFileListRow(form.ownerDocument, file, {
        removeButtonAttributes: {
          'data-usx-chat-file-remove': String(index),
          'aria-label': `Remove ${file.name}`,
        },
      });
    })
  );
  list.querySelector('[aria-live="polite"]').textContent =
    `You have selected the file: ${files.at(-1).name}.`;
  form.prepend(list);
}

function formatSelection(input, format) {
  const { selectionStart: start, selectionEnd: end, value } = input;
  const pair = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    underline: ['<u>', '</u>'],
    strike: ['~~', '~~'],
    code: ['```\n', '\n```'],
  };
  if (pair[format]) {
    const [before, after] = pair[format];
    const selected = value.slice(start, end);
    input.setRangeText(
      format === 'code' && !selected ? '```\n\n```' : `${before}${selected}${after}`,
      start,
      end,
      'end'
    );
    input.setSelectionRange(start + before.length, start + before.length + selected.length);
  } else {
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const nextBreak = value.indexOf('\n', end);
    const through = nextBreak === -1 ? value.length : nextBreak;
    const replacement = value
      .slice(lineStart, through)
      .split('\n')
      .map(
        (line, index) =>
          `${format === 'quote' ? '> ' : format === 'unordered' ? '- ' : `${index + 1}. `}${line}`
      )
      .join('\n');
    input.setRangeText(replacement, lineStart, through, 'end');
    input.setSelectionRange(lineStart + replacement.length, lineStart + replacement.length);
  }
  input.focus();
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function shortcutFormat(event) {
  if (!(event.metaKey || event.ctrlKey) || event.isComposing) return null;
  const key = event.key.toLowerCase();
  if (event.altKey && event.shiftKey && key === 'c') return 'code';
  if (event.altKey) return null;
  if (event.shiftKey)
    return (
      {
        x: 'strike',
        7: 'ordered',
        '&': 'ordered',
        8: 'unordered',
        '*': 'unordered',
        9: 'quote',
        '(': 'quote',
      }[key] || null
    );
  return { b: 'bold', i: 'italic', u: 'underline' }[key] || null;
}

const stagedFiles = new WeakMap();

function connectComposer(root) {
  const sendCounts = new WeakMap();
  const internalFileChanges = new WeakSet();
  const click = (event) => {
    const button = event.target.closest?.(
      '[data-usx-chat-toggle-formatting], [data-usx-chat-attach], [data-usx-chat-format], [data-usx-chat-emoji], [data-usx-chat-file-remove]'
    );
    const form = button && composerFor(button, root);
    if (!form) return;
    if (button.hasAttribute('data-usx-chat-toggle-formatting')) {
      const panel = form.querySelector('.usx-chat__formatting');
      if (!panel) return;
      panel.hidden = !panel.hidden;
      button.setAttribute('aria-expanded', String(!panel.hidden));
      button.setAttribute('aria-label', panel.hidden ? 'Show formatting' : 'Hide formatting');
      button.title = panel.hidden ? 'Show formatting' : 'Hide formatting';
    } else if (button.hasAttribute('data-usx-chat-attach')) {
      form.querySelector('input[type="file"]')?.click();
    } else if (button.hasAttribute('data-usx-chat-format')) {
      const textarea = form.querySelector('textarea');
      if (textarea && !textarea.disabled) formatSelection(textarea, button.dataset.usxChatFormat);
    } else if (button.hasAttribute('data-usx-chat-emoji')) {
      const textarea = form.querySelector('textarea');
      if (!textarea || textarea.disabled) return;
      textarea.setRangeText(
        button.dataset.usxChatEmoji,
        textarea.selectionStart,
        textarea.selectionEnd,
        'end'
      );
      button.closest('details')?.removeAttribute('open');
      textarea.focus();
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      const input = form.querySelector('input[type="file"]');
      const removed = Number(button.dataset.usxChatFileRemove);
      if (!input || !Number.isInteger(removed)) return;
      const current = stagedFiles.get(input) || [...input.files];
      if (removed < 0 || removed >= current.length) return;
      const remaining = current.filter((_, index) => index !== removed);
      const transfer = new DataTransfer();
      remaining.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
      stagedFiles.set(input, remaining);
      const restoreFocus = form.ownerDocument.activeElement === button;
      internalFileChanges.add(input);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      if (restoreFocus) {
        const buttons = form.querySelectorAll('[data-usx-chat-file-remove]');
        (
          buttons[removed] ||
          buttons[buttons.length - 1] ||
          form.querySelector('[data-usx-chat-attach]') ||
          form.querySelector('textarea')
        )?.focus();
      }
    }
  };
  const input = (event) => {
    if (!event.target.matches?.('form.usx-chat-composer textarea')) return;
    const form = composerFor(event.target, root);
    if (!form) return;
    if (!event.isComposing) {
      const textarea = event.target;
      const picker = form.querySelector('.usx-chat__emoji-picker');
      const choices = new Map(
        [...(picker?.querySelectorAll('[data-usx-chat-emoji]') || [])].flatMap((button) =>
          [
            button.dataset.usxChatEmojiName,
            ...(button.dataset.usxChatEmojiAliases || '').split(','),
          ]
            .filter(Boolean)
            .map((name) => [name.toLowerCase(), button.dataset.usxChatEmoji])
        )
      );
      const caret = textarea.selectionStart;
      let nextCaret = caret;
      const nextValue = textarea.value.replace(/:([a-z0-9_+-]+):/gi, (match, name, offset) => {
        if (offset + match.length > caret) return match;
        const emoji = choices.get(name.toLowerCase());
        if (!emoji) return match;
        if (offset < caret) nextCaret += emoji.length - match.length;
        return emoji;
      });
      if (nextValue !== textarea.value) {
        textarea.value = nextValue;
        textarea.setSelectionRange(nextCaret, nextCaret);
      }
    }
    updateSubmit(form);
  };
  const keydown = (event) => {
    if (!event.target.matches?.('form.usx-chat-composer textarea')) return;
    const form = composerFor(event.target, root);
    if (!form) return;
    const format = form.querySelector('.usx-chat__formatting') ? shortcutFormat(event) : null;
    if (format) {
      event.preventDefault();
      formatSelection(event.target, format);
    } else if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  };
  const change = (event) => {
    if (enhancementDisabled(event.target)) return;
    if (event.target.matches?.('[data-usx-chat-recipient]')) {
      const picker = event.target.closest('.usx-chat__directory');
      if (!picker || !root.contains(picker) || event.target.disabled) return;
      const form = event.target.form;
      if (form) updateSubmit(form);
      const recipientIds = form
        ? recipientsOf(form)
        : [...picker.querySelectorAll('[data-usx-chat-recipient]:checked')].map(
            (input) => input.value
          );
      emit(picker.closest('.usx-chat') || picker, 'usx:chat-recipients-change', { recipientIds });
      return;
    }
    if (!event.target.matches?.('form.usx-chat-composer input[type="file"]')) return;
    const form = composerFor(event.target, root);
    if (!form) return;
    const input = event.target;
    const selected = [...input.files];
    const internalChange = internalFileChanges.delete(input);
    const files = internalChange ? selected : [...(stagedFiles.get(input) || []), ...selected];
    if (!internalChange) {
      const transfer = new DataTransfer();
      files.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
    }
    stagedFiles.set(input, files);
    renderStagedFiles(form, files);
    updateSubmit(form);
  };
  const submit = (event) => {
    const form = composerFor(event.target, root);
    if (!form || event.target !== form) return;
    const text = form.elements.message.value.trim();
    const files = [...(form.elements.attachments?.files || [])];
    const recipientIds = recipientsOf(form);
    if (
      form.elements.message.disabled ||
      (!text && !files.length) ||
      (form.dataset.usxChatRequireRecipients === 'true' && !recipientIds.length)
    ) {
      event.preventDefault();
      return;
    }
    const host = form.closest('.usx-chat') || form;
    const count = (sendCounts.get(form) || 0) + 1;
    sendCounts.set(form, count);
    const clientMessageId = `${host.querySelector('.usx-chat__panel')?.id || 'chat'}-pending-${Date.now()}-${count}`;
    const handled = emit(
      host,
      'usx:chat-send',
      {
        text,
        files,
        clientMessageId,
        ...(recipientIds.length ? { recipientIds } : {}),
        ...(form.elements.conversationId?.value && {
          conversationId: form.elements.conversationId.value,
        }),
        ...(form.elements.threadRootId?.value && {
          threadRootId: form.elements.threadRootId.value,
        }),
        ...(form.elements.recipientId?.value && { recipientId: form.elements.recipientId.value }),
      },
      true
    );
    if (!form.hasAttribute('action') || !handled) event.preventDefault();
  };
  const keepSelection = (event) => {
    if (composerFor(event.target, root) && event.target.closest('[data-usx-chat-format]'))
      event.preventDefault();
  };
  const reset = (event) => {
    const form = composerFor(event.target, root);
    if (!form) return;
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      const input = form.querySelector('input[type="file"]');
      if (input) stagedFiles.delete(input);
      renderStagedFiles(form, []);
      updateSubmit(form);
    });
  };
  root.addEventListener('click', click);
  root.addEventListener('input', input);
  root.addEventListener('keydown', keydown);
  root.addEventListener('change', change);
  root.addEventListener('submit', submit);
  root.addEventListener('reset', reset);
  root.addEventListener('mousedown', keepSelection);
  return () => {
    root.removeEventListener('click', click);
    root.removeEventListener('input', input);
    root.removeEventListener('keydown', keydown);
    root.removeEventListener('change', change);
    root.removeEventListener('submit', submit);
    root.removeEventListener('reset', reset);
    root.removeEventListener('mousedown', keepSelection);
  };
}

const instances = new WeakMap();

function scrollToLatest(chat) {
  const log = chat.querySelector('.usx-chat__messages');
  if (!log) return;
  log.scrollTop = log.scrollHeight;
}

export function captureChatScroll(chat) {
  const log = chat.querySelector('.usx-chat__messages');
  if (!log) return null;
  const top = log.getBoundingClientRect().top;
  const firstVisible = [...log.querySelectorAll('[data-message-id]')].find(
    // The thread root stays before every page; only replies move when history is prepended.
    (message) =>
      message.dataset.messageId !== log.dataset.usxChatThreadId &&
      message.getBoundingClientRect().bottom > top
  );
  return firstVisible
    ? {
        messageId: firstVisible.dataset.messageId,
        offset: firstVisible.getBoundingClientRect().top - top,
      }
    : null;
}

export function restoreChatScroll(chat, anchor) {
  if (!anchor?.messageId) return false;
  const log = chat.querySelector('.usx-chat__messages');
  const message = [...(log?.querySelectorAll('[data-message-id]') || [])].find(
    (item) => item.dataset.messageId === anchor.messageId
  );
  if (!message) return false;
  log.scrollTop +=
    message.getBoundingClientRect().top - log.getBoundingClientRect().top - anchor.offset;
  return true;
}

function positionMessageMenu(menu) {
  if (!menu.open) return;
  const log = menu.closest('.usx-chat__messages');
  const summary = menu.querySelector(':scope > summary');
  const panel = menu.querySelector(':scope > .usx-popover__panel');
  if (!log || !summary || !panel) return;
  const logBounds = log.getBoundingClientRect();
  const triggerBounds = summary.getBoundingClientRect();
  panel.style.removeProperty('--usx-chat-menu-max-height');
  panel.style.maxInlineSize = `min(16rem, calc(100vw - 3rem), ${Math.max(0, triggerBounds.right - logBounds.left - 4)}px)`;
  const above = triggerBounds.top - logBounds.top;
  const below = logBounds.bottom - triggerBounds.bottom;
  const panelHeight = panel.getBoundingClientRect().height;
  const openAbove = above >= panelHeight + 8 || above >= below;
  menu.dataset.side = openAbove ? 'top' : 'bottom';
  const available = (openAbove ? above : below) - 8;
  panel.style.setProperty('--usx-chat-menu-max-height', `${Math.max(0, available)}px`);
}

function positionEmojiMenu(menu) {
  const panel = menu.querySelector(':scope > .usx-popover__panel');
  const summary = menu.querySelector(':scope > summary');
  if (!panel || !summary) return;
  const view = menu.ownerDocument.defaultView;
  if (!menu.open || !menu.closest('.usx-chat') || !view.matchMedia('(width <= 35rem)').matches) {
    for (const property of ['position', 'top', 'right', 'bottom', 'left', 'max-block-size'])
      panel.style.removeProperty(property);
    menu.dataset.side = 'top';
    return;
  }

  const trigger = summary.getBoundingClientRect();
  const above = trigger.top - 8;
  const below = view.innerHeight - trigger.bottom - 8;
  const openAbove = above >= Math.min(panel.scrollHeight, 256) + 4 || above >= below;
  const available = openAbove ? above : below;
  menu.dataset.side = openAbove ? 'top' : 'bottom';
  panel.style.position = 'fixed';
  panel.style.maxBlockSize = `${Math.max(0, Math.min(256, available - 4))}px`;
  panel.style.bottom = 'auto';
  panel.style.right = 'auto';
  const bounds = panel.getBoundingClientRect();
  panel.style.top = `${openAbove ? trigger.top - bounds.height - 4 : trigger.bottom + 4}px`;
  panel.style.left = `${Math.max(8, Math.min(trigger.left, view.innerWidth - bounds.width - 8))}px`;
}

function messageContentFromElement(message) {
  const bubble = message.querySelector('.usx-chat__bubble');
  const body =
    message.dataset.exportText ??
    [...(bubble?.childNodes || [])]
      .filter(
        (child) =>
          child.nodeType === 3 ||
          (child.nodeType === 1 && !child.matches('.usx-chat__attachments, .usx-chat__reactions'))
      )
      .map((child) => child.innerText?.trim() || child.textContent.trim())
      .filter(Boolean)
      .join('\n');
  const attachments = [...message.querySelectorAll('.usx-chat__attachments li')]
    .map((item) => `[Attachment: ${item.textContent.trim()}]`)
    .join('\n');
  return [body, attachments].filter(Boolean).join('\n');
}

export function transcriptFromChat(chat) {
  return [...chat.querySelectorAll('.usx-chat__message:not([data-usx-chat-delivery-state])')]
    .map(
      (message) =>
        `sender: ${message.dataset.senderName || 'Unknown'}\n${messageContentFromElement(message)}`
    )
    .join('\n----------------------------\n');
}

function connect(root) {
  const disconnectComposer = connectComposer(root);
  const autoRequested = new WeakMap();
  const logStates = new WeakMap();
  const logIdentity = (log) =>
    JSON.stringify([log.dataset.usxChatConversationId || '', log.dataset.usxChatThreadId || '']);
  const lastMessageId = (log) =>
    [...log.querySelectorAll(':scope > [data-message-id]')].at(-1)?.dataset.messageId;
  const atBottom = (log) => log.scrollHeight - log.clientHeight - log.scrollTop <= 2;
  const initializeLog = (log) => {
    scrollToLatest(log.closest('.usx-chat'));
    logStates.set(log, {
      identity: logIdentity(log),
      lastMessageId: lastMessageId(log),
      atBottom: atBottom(log),
    });
  };
  const mutations = new MutationObserver((records) => {
    const changedLogs = new Set();
    for (const record of records) {
      const log = record.target.closest?.('.usx-chat__messages');
      if (log) changedLogs.add(log);
      for (const node of record.addedNodes || []) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.('.usx-chat__messages')) changedLogs.add(node);
        node.querySelectorAll?.('.usx-chat__messages').forEach((item) => changedLogs.add(item));
      }
    }
    for (const log of changedLogs) {
      if (!root.contains(log) || !log.closest('.usx-chat[open]') || enhancementDisabled(log))
        continue;
      const identity = logIdentity(log);
      const previous = logStates.get(log);
      if (!previous || previous.identity !== identity) {
        initializeLog(log);
        continue;
      }
      const lastId = lastMessageId(log);
      if (previous.atBottom && lastId !== previous.lastMessageId) log.scrollTop = log.scrollHeight;
      logStates.set(log, { identity, lastMessageId: lastId, atBottom: atBottom(log) });
    }
  });
  mutations.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-usx-chat-conversation-id', 'data-usx-chat-thread-id'],
  });
  const loadOlder = (chat, manual = false) => {
    const log = chat.querySelector('.usx-chat__messages');
    const button = log?.querySelector('[data-usx-chat-load-older]');
    if (!button || button.disabled) return;
    if (!manual && log.querySelector('.usx-chat__history-error')) return;
    const firstMessageId =
      log.querySelectorAll('[data-message-id]')[log.dataset.usxChatThreadId ? 1 : 0]?.dataset
        .messageId;
    const cursor = log.dataset.usxChatOlderCursor || undefined;
    const key = JSON.stringify([logIdentity(log), cursor, firstMessageId]);
    if (!manual && autoRequested.get(chat) === key) return;
    autoRequested.set(chat, key);
    const threadRootId = log.dataset.usxChatThreadId || undefined;
    const conversationId = log.dataset.usxChatConversationId || undefined;
    emit(chat, 'usx:chat-load-older', {
      ...(conversationId && { conversationId }),
      ...(threadRootId && { threadRootId }),
      ...(firstMessageId && { beforeMessageId: firstMessageId }),
      ...(cursor && { cursor }),
      anchor: captureChatScroll(chat),
    });
  };

  const click = async (event) => {
    if (enhancementDisabled(event.target)) return;
    const touchedChat = event.target.closest?.('.usx-chat');
    if (
      touchedChat &&
      root.contains(touchedChat) &&
      (event.pointerType === 'touch' || matchMedia('(hover: none)').matches)
    ) {
      const bubble = event.target.closest('.usx-chat__bubble');
      const message = bubble?.closest('.usx-chat__message');
      if (
        message &&
        !event.target.closest('a, button, input, select, textarea, summary') &&
        !touchedChat.ownerDocument.getSelection()?.toString()
      ) {
        const visible = message.classList.contains('usx-chat__message--actions-visible');
        touchedChat
          .querySelectorAll('.usx-chat__message--actions-visible')
          .forEach((item) => item.classList.remove('usx-chat__message--actions-visible'));
        if (!visible) message.classList.add('usx-chat__message--actions-visible');
      } else if (!bubble && !event.target.closest('.usx-chat__message-tools')) {
        touchedChat
          .querySelectorAll('.usx-chat__message--actions-visible')
          .forEach((item) => item.classList.remove('usx-chat__message--actions-visible'));
      }
    }
    const olderButton = event.target.closest?.('[data-usx-chat-load-older]');
    const olderChat = olderButton?.closest('.usx-chat');
    if (olderChat && root.contains(olderChat)) {
      loadOlder(olderChat, true);
      return;
    }
    const button = event.target.closest?.(
      '[data-usx-chat-copy], [data-usx-chat-copy-message], [data-usx-chat-suggestion], [data-usx-chat-choice], [data-usx-chat-back], [data-usx-chat-new], [data-usx-chat-conversation], [data-usx-chat-contact], [data-usx-chat-thread], [data-usx-chat-forward], [data-usx-chat-message-action], [data-usx-chat-reaction], [data-usx-chat-retry], [data-usx-chat-directory-action]'
    );
    const chat = button?.closest('.usx-chat') || button?.closest('.usx-chat__directory');
    if (!chat || !root.contains(chat)) return;

    if (button.hasAttribute('data-usx-chat-directory-action')) {
      if (button.disabled || button.getAttribute('aria-disabled') === 'true') return;
      const menu = button.closest('details.usx-chat__directory-actions, details.usx-chat__actions');
      menu?.removeAttribute('open');
      menu?.querySelector(':scope > summary')?.focus();
      emit(chat, 'usx:chat-directory-action', {
        actionId: button.dataset.usxChatDirectoryAction,
        ...(button.dataset.usxChatConversationId
          ? { conversationId: button.dataset.usxChatConversationId }
          : {}),
        ...(button.dataset.usxChatParticipantId
          ? { participantId: button.dataset.usxChatParticipantId }
          : {}),
      });
      return;
    }

    if (button.hasAttribute('data-usx-chat-retry')) {
      const message = button.closest('[data-message-id]');
      emit(chat, 'usx:chat-retry', {
        messageId: message?.dataset.messageId,
        clientMessageId: message?.dataset.usxChatClientMessageId,
      });
      return;
    }

    if (button.hasAttribute('data-usx-chat-forward')) {
      emit(chat, 'usx:chat-forward', { messageId: button.dataset.usxChatForward });
      return;
    }

    if (
      button.hasAttribute('data-usx-chat-back') ||
      button.hasAttribute('data-usx-chat-new') ||
      button.hasAttribute('data-usx-chat-conversation') ||
      button.hasAttribute('data-usx-chat-contact') ||
      button.hasAttribute('data-usx-chat-thread')
    ) {
      const current = chat.querySelector('.usx-chat__window')?.dataset.chatView;
      const detail = button.hasAttribute('data-usx-chat-back')
        ? { view: current === 'thread' ? 'conversation' : 'inbox' }
        : button.hasAttribute('data-usx-chat-new')
          ? { view: 'contacts' }
          : button.hasAttribute('data-usx-chat-thread')
            ? { view: 'thread', threadRootId: button.dataset.usxChatThread }
            : button.hasAttribute('data-usx-chat-conversation')
              ? { view: 'conversation', conversationId: button.dataset.usxChatConversation }
              : { view: 'conversation', participantId: button.dataset.usxChatContact };
      emit(chat, 'usx:chat-navigate', detail);
      return;
    }

    if (
      button.hasAttribute('data-usx-chat-message-action') ||
      button.hasAttribute('data-usx-chat-reaction')
    ) {
      const messageId = button.closest('[data-message-id]')?.dataset.messageId;
      const log = button.closest('.usx-chat__messages');
      const reaction = button.hasAttribute('data-usx-chat-reaction');
      const detail = reaction
        ? {
            messageId,
            reaction: button.dataset.usxChatReaction,
            selected: button.getAttribute('aria-pressed') === 'true',
          }
        : {
            messageId,
            actionId: button.dataset.usxChatMessageAction,
            ...(log?.dataset.usxChatConversationId
              ? { conversationId: log.dataset.usxChatConversationId }
              : {}),
            ...(log?.dataset.usxChatThreadId ? { threadRootId: log.dataset.usxChatThreadId } : {}),
          };
      if (button.disabled || button.getAttribute('aria-disabled') === 'true') return;
      const menu = button.closest('details.usx-chat__message-actions');
      menu?.removeAttribute('open');
      menu?.querySelector(':scope > summary')?.focus();
      emit(chat, reaction ? 'usx:chat-reaction' : 'usx:chat-message-action', detail);
      return;
    }

    if (
      button.hasAttribute('data-usx-chat-copy') ||
      button.hasAttribute('data-usx-chat-copy-message')
    ) {
      const status = chat.querySelector('.usx-chat__copy-status');
      const messageCopy = button.hasAttribute('data-usx-chat-copy-message');
      const message = button.closest('[data-message-id]');
      const menu = button.closest('details');
      menu?.removeAttribute('open');
      menu?.querySelector(':scope > summary')?.focus();
      try {
        await navigator.clipboard.writeText(
          messageCopy ? messageContentFromElement(message) : transcriptFromChat(chat)
        );
        if (status) status.textContent = messageCopy ? 'Message copied' : 'Conversation copied';
      } catch {
        if (status)
          status.textContent = messageCopy
            ? 'Could not copy message'
            : 'Could not copy conversation';
      }
      return;
    }

    const type = button.hasAttribute('data-usx-chat-suggestion') ? 'suggestion' : 'choice';
    const value =
      type === 'suggestion' ? button.dataset.usxChatSuggestion : button.dataset.usxChatChoice;
    const detail = { type, value, label: button.textContent.trim() };
    const selected = emit(chat, 'usx:chat-option', detail, true);
    if (selected) {
      const input = chat.querySelector('.usx-chat__composer textarea');
      if (input) {
        input.value = detail.label;
        input.focus();
        updateSubmit(chat);
      }
    }
  };

  const toggle = (event) => {
    if (enhancementDisabled(event.target)) return;
    const chat = event.target;
    if (chat.matches?.('.usx-chat__message-actions')) positionMessageMenu(chat);
    if (chat.matches?.('.usx-chat__emoji-picker')) positionEmojiMenu(chat);
    if (chat.matches?.('.usx-chat') && chat.open && root.contains(chat)) {
      const log = chat.querySelector('.usx-chat__messages');
      if (log) initializeLog(log);
    }
  };

  const scroll = (event) => {
    if (enhancementDisabled(event.target)) return;
    const log = event.target;
    if (log.matches?.('.usx-chat-composer')) {
      log.querySelectorAll('.usx-chat__emoji-picker[open]').forEach(positionEmojiMenu);
      return;
    }
    if (log.matches?.('.usx-chat__messages') && logStates.has(log))
      logStates.get(log).atBottom = atBottom(log);
    if (!log.matches?.('.usx-chat__messages') || log.scrollTop > 48) return;
    const chat = log.closest('.usx-chat');
    if (chat && root.contains(chat)) loadOlder(chat);
  };

  root.addEventListener('click', click);
  root.addEventListener('toggle', toggle, true);
  root.addEventListener('scroll', scroll, true);
  const view = root.ownerDocument?.defaultView || window;
  const resize = () =>
    root.querySelectorAll('.usx-chat__emoji-picker[open]').forEach((menu) => {
      if (!enhancementDisabled(menu)) positionEmojiMenu(menu);
    });
  view.addEventListener('resize', resize);
  root.querySelectorAll('.usx-chat').forEach((chat) => {
    if (enhancementDisabled(chat)) return;
    if (chat.open) {
      const log = chat.querySelector('.usx-chat__messages');
      if (log) initializeLog(log);
    }
  });
  return () => {
    mutations.disconnect();
    root.removeEventListener('click', click);
    disconnectComposer();
    root.removeEventListener('toggle', toggle, true);
    root.removeEventListener('scroll', scroll, true);
    view.removeEventListener('resize', resize);
  };
}

const chat = {
  init(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    if (!instances.has(eventRoot)) instances.set(eventRoot, connect(eventRoot));
    components(root, 'form.usx-chat-composer').forEach((form) => {
      if (enhancementDisabled(form)) return;
      const input = form.querySelector('input[type="file"]');
      if (input) {
        const files = [...input.files];
        const previous = stagedFiles.get(input);
        if (
          !previous ||
          previous.length !== files.length ||
          files.some((file, i) => file !== previous[i])
        ) {
          stagedFiles.set(input, files);
          renderStagedFiles(form, files);
        }
      }
      updateSubmit(form);
    });
    markEnhanced(root, '.usx-chat, .usx-chat-composer, .usx-chat__directory');
  },
  on(root = document.body) {
    this.init(root);
  },
  off(root = document.body) {
    const eventRoot = root.ownerDocument?.body || root;
    instances.get(eventRoot)?.();
    instances.delete(eventRoot);
  },
};

export default chat;
