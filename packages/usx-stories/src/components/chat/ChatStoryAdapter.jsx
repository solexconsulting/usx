import React from 'react';
import Chat from '../../../../usx-react/src/components/chat/Chat';
import chatConfig from '../../../../usx-react/src/components/chat/config.json';
import { restoreChatScroll } from '@solexllc/usx/js/chat';

// Application behavior for the interactive examples, outside the markup library.
export default function ChatStoryAdapter({
  renderer: Renderer = Chat,
  onConversationSelect,
  onStartConversation,
  onForwardMessage,
  onSend,
  onRetryMessage,
  onReactionToggle,
  onMessageAction,
  onSaveEdit,
  onCancelEdit,
  onConfirmDelete,
  onCancelDelete,
  onDirectoryAction,
  onSuggestedQuestion,
  onChoice,
  onLoadOlder,
  initialDraft,
  ...props
}) {
  const [view, setView] = React.useState(
    props.view ?? props.defaultView ?? (props.conversations?.length ? 'inbox' : 'conversation')
  );
  const [threadId, setThreadId] = React.useState(props.activeThreadId);
  const [recipientId, setRecipientId] = React.useState(props.recipientId);
  const [failed, setFailed] = React.useState([]);
  const drafts = React.useRef(
    new Map([
      [
        `${props.activeConversationId ?? recipientId ?? 'default'}:${view}:${threadId ?? ''}`,
        initialDraft || '',
      ],
    ])
  );
  const forward = React.useRef('');
  const pendingHistory = React.useRef(null);
  const pendingFocus = React.useRef(null);
  const attachmentUrls = React.useRef([]);
  React.useEffect(() => () => attachmentUrls.current.forEach(URL.revokeObjectURL), []);
  React.useEffect(() => {
    // A React commit or a Django response may arrive after the request promise settles.
    const restore = () => {
      const pending = pendingHistory.current;
      const root = document.getElementById(props.id)?.closest('.usx-chat');
      const focus = pendingFocus.current;
      if (focus && root && (Renderer === Chat || root !== focus.root)) {
        if (!root.contains(document.activeElement)) {
          const summary =
            focus.menuId &&
            document.getElementById(focus.menuId)?.parentElement.querySelector(':scope > summary');
          (summary || root.querySelector('.usx-chat__directory-item, textarea'))?.focus();
        }
        pendingFocus.current = null;
      }
      const log = root?.querySelector('.usx-chat__messages');
      if (!pending || !log) return;
      if (
        (log.dataset.usxChatConversationId || '') !== pending.conversationId ||
        (log.dataset.usxChatThreadId || '') !== pending.threadId
      ) {
        pendingHistory.current = null;
        return;
      }
      const complete =
        log.getAttribute('aria-busy') !== 'true' &&
        (log.dataset.usxChatOlderCursor !== pending.cursor ||
          log.querySelector('.usx-chat__history-error'));
      restoreChatScroll(root, pending.anchor);
      if (complete) pendingHistory.current = null;
    };
    const observer = new MutationObserver(() => requestAnimationFrame(restore));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-busy'],
    });
    return () => observer.disconnect();
  }, [props.id, Renderer]);
  const observedRoot = React.useRef(null);
  const [, refreshRenderedRoot] = React.useState(0);
  React.useEffect(() => {
    if (Renderer === Chat) return;
    const observer = new MutationObserver(() => {
      const root = document.getElementById(props.id)?.closest('.usx-chat') ?? null;
      if (root === observedRoot.current) return;
      observedRoot.current = root;
      refreshRenderedRoot((value) => value + 1);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [Renderer, props.id]);
  React.useEffect(() => {
    let root = document.getElementById(props.id)?.closest('.usx-chat');
    const key = `${props.activeConversationId ?? recipientId ?? 'default'}:${view}:${threadId ?? ''}`;
    let textarea = root?.querySelector('.usx-chat__composer textarea');
    if (textarea && root.querySelector('[data-chat-view]')?.dataset.chatView === view) {
      textarea.value = forward.current || drafts.current.get(key) || '';
      forward.current = '';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const items = [
      ...(props.messages ?? []),
      ...(props.conversations ?? []).flatMap((item) => item.messages ?? []),
      ...failed,
    ];
    const find = (id, list = items) => {
      for (const item of list) {
        if (item.id === id) return item;
        const child = find(id, item.replies ?? []);
        if (child) return child;
      }
    };
    const handlers = {
      submit: (event) => {
        if (Renderer === Chat) return;
        const form = event.target.closest('[data-chat-edit-message-id]');
        if (!form) return;
        event.preventDefault();
        onSaveEdit?.(form.dataset.chatEditMessageId, form.querySelector('textarea').value);
      },
      click: (event) => {
        if (Renderer === Chat) return;
        const button = event.target.closest('button');
        if (!button) return;
        const label = button.textContent.trim();
        if (button.closest('[data-chat-edit-message-id]') && label === 'Cancel') onCancelEdit?.();
        const deletePanel = button.closest('[data-chat-delete-message-id]');
        if (!deletePanel) return;
        if (label === 'Delete message') onConfirmDelete?.(deletePanel.dataset.chatDeleteMessageId);
        if (label === 'Cancel') onCancelDelete?.();
      },
      'usx:chat-directory-action': ({ detail }) => {
        const nextView = onDirectoryAction?.(detail);
        if (nextView) setView(nextView);
      },
      input: (event) => {
        if (event.target === textarea) drafts.current.set(key, textarea.value);
      },
      'usx:chat-navigate': ({ detail }) => {
        pendingHistory.current = null;
        if (detail.view === 'inbox') {
          onStartConversation?.();
          setRecipientId(undefined);
        }
        if (detail.conversationId) {
          onConversationSelect?.(
            props.conversations.find((item) => item.id === detail.conversationId)
          );
          setRecipientId(undefined);
        }
        if (detail.participantId) {
          const contact = props.contacts.find(
            (item) => item.participantId === detail.participantId
          );
          const existing = props.conversations?.find((item) => item.id === contact.conversationId);
          if (existing) {
            onConversationSelect?.(existing);
            setRecipientId(undefined);
          } else {
            onStartConversation?.(contact);
            setRecipientId(detail.participantId);
          }
        }
        setThreadId(detail.threadRootId);
        setView(detail.view);
      },
      'usx:chat-send': (event) => {
        event.preventDefault();
        const payload = event.detail;
        drafts.current.delete(key);
        textarea?.form.reset();
        Promise.resolve(onSend?.(payload))
          .then((result) => {
            if (result?.conversationId) {
              setRecipientId(undefined);
              setView('conversation');
            }
          })
          .catch(() =>
            setFailed((current) => [
              ...current,
              {
                id: payload.clientMessageId,
                senderId: props.currentUserId,
                text: payload.text,
                payload,
                attachments: payload.files.map((file) => {
                  const url = URL.createObjectURL(file);
                  attachmentUrls.current.push(url);
                  return {
                    name: file.name,
                    url,
                    imageUrl: file.type.startsWith('image/') ? url : undefined,
                    alt: file.name,
                  };
                }),
                deliveryState: 'failed',
              },
            ])
          );
      },
      'usx:chat-retry': ({ detail }) => {
        const message = find(detail.messageId);
        if (!message) return;
        if (message.payload) {
          const state = (deliveryState) =>
            setFailed((current) =>
              current.map((item) => (item.id === message.id ? { ...item, deliveryState } : item))
            );
          state('sending');
          Promise.resolve(onSend?.(message.payload))
            .then(() => setFailed((current) => current.filter((item) => item.id !== message.id)))
            .catch(() => state('failed'));
        } else void onRetryMessage?.(message);
      },
      'usx:chat-reaction': ({ detail }) => {
        const message = find(detail.messageId);
        const reaction = [
          ...(message?.reactions ?? []),
          ...(message?.reactionOptions ??
            props.reactionOptions ??
            props.emojiPack ??
            chatConfig.props.emojiPack.default),
        ].find((item) => item.label === detail.reaction);
        if (message && reaction) onReactionToggle?.(message, reaction);
      },
      'usx:chat-message-action': ({ detail }) => {
        const message = find(detail.messageId);
        if (message)
          onMessageAction?.(
            message,
            message.actions?.find((item) => item.id === detail.actionId) ?? { id: detail.actionId }
          );
      },
      'usx:chat-option': (event) => {
        event.preventDefault();
        const handler = event.detail.type === 'choice' ? onChoice : onSuggestedQuestion;
        handler?.({ label: event.detail.label, value: event.detail.value });
      },
      'usx:chat-load-older': ({ detail }) => {
        const log = root.querySelector('.usx-chat__messages');
        pendingHistory.current = {
          anchor: detail.anchor,
          cursor: log.dataset.usxChatOlderCursor,
          conversationId: detail.conversationId || '',
          threadId: detail.threadRootId || '',
        };
        Promise.resolve(onLoadOlder?.(detail)).catch(() => {});
      },
      'usx:chat-forward': ({ detail }) => {
        const message = find(detail.messageId);
        if (!message) return;
        forward.current = `Forwarded from ${props.participants.find((person) => person.id === message.senderId)?.name ?? message.senderId}:\n> ${message.text ?? message.exportText ?? ''}`;
        onForwardMessage?.(message);
        setView('contacts');
      },
    };
    // Delegate through the document so a Django replacement has no unhandled event gap.
    const listeners = Object.entries(handlers).map(([type, handler]) => {
      const listener = (event) => {
        const eventRoot = event.target.closest?.('.usx-chat');
        if (!eventRoot || eventRoot !== document.getElementById(props.id)?.closest('.usx-chat'))
          return;
        root = eventRoot;
        textarea = root.querySelector('.usx-chat__composer textarea');
        if (
          ['usx:chat-directory-action', 'usx:chat-message-action', 'usx:chat-navigate'].includes(
            type
          )
        ) {
          const summary = root.querySelector('summary:focus');
          pendingFocus.current = {
            root,
            menuId: summary?.parentElement.querySelector(':scope > .usx-popover__panel')?.id,
          };
        }
        handler(event);
      };
      document.addEventListener(type, listener);
      return [type, listener];
    });
    return () => {
      for (const [type, listener] of listeners) document.removeEventListener(type, listener);
    };
  });
  const withFailed = (messages, conversationId) => [
    ...(messages ?? []).map((message) => ({
      ...message,
      replies: [
        ...(message.replies ?? []),
        ...failed.filter(
          (item) =>
            item.payload.conversationId === conversationId &&
            item.payload.threadRootId === message.id
        ),
      ],
    })),
    ...failed.filter(
      (item) => item.payload.conversationId === conversationId && !item.payload.threadRootId
    ),
  ];
  return (
    <Renderer
      {...props}
      view={view}
      activeThreadId={threadId}
      recipientId={recipientId}
      messages={withFailed(props.messages)}
      conversations={props.conversations?.map((conversation) => ({
        ...conversation,
        messages: withFailed(conversation.messages, conversation.id),
      }))}
    />
  );
}
