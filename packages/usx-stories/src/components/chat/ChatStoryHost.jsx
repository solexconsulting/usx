import React from 'react';
import Chat from './ChatStoryAdapter';
import Button from '../../../../usx-react/src/components/button/Button';
import ButtonGroup from '../../../../usx-react/src/components/button-group/ButtonGroup';
import TextArea from '../../../../usx-react/src/components/text-area/TextArea';
import { resolveChatMessageActions } from '../../../../usx-react/src/components/chat/Chat';

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const timestamp = () => ({ sentAt: new Date().toISOString(), timeLabel: 'Just now' });

function changeMessage(items, id, change) {
  return items.map((item) => {
    if (item.id === id) return change(item);
    if (item.replies?.length) return { ...item, replies: changeMessage(item.replies, id, change) };
    return item;
  });
}

function removeMessage(items, id) {
  return items.flatMap((item) =>
    item.id === id
      ? []
      : [{ ...item, ...(item.replies ? { replies: removeMessage(item.replies, id) } : {}) }]
  );
}

const hasMessage = (items, id) =>
  items.some((item) => item.id === id || hasMessage(item.replies ?? [], id));

function withUnreadCount(conversation, currentUserId) {
  const messages = conversation.messages ?? [];
  const boundary = messages.findIndex(
    (message) => message.id === conversation.firstUnreadMessageId
  );
  return {
    ...conversation,
    firstUnreadMessageId: boundary < 0 ? undefined : conversation.firstUnreadMessageId,
    unreadCount:
      boundary < 0
        ? 0
        : messages.slice(boundary).filter((message) => message.senderId !== currentUserId).length,
  };
}

function ChatExample({
  renderer,
  historySource,
  threadHistorySource,
  failFirstSend = false,
  failFirstLoad = false,
  simulateIncoming = false,
  botMode = false,
  detailSections = [],
  stagedAttachments,
  loadOnMount = false,
  ...args
}) {
  const [messages, setMessages] = React.useState(args.messages ?? []);
  const [conversations, setConversations] = React.useState(args.conversations ?? []);
  const [activeId, setActiveId] = React.useState(
    args.activeConversationId ?? args.defaultConversationId
  );
  const [olderHistory, setOlderHistory] = React.useState(args.olderHistory);
  const [firstUnreadMessageId, setFirstUnreadMessageId] = React.useState(args.firstUnreadMessageId);
  const [editingId, setEditingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);
  const [editDraft, setEditDraft] = React.useState('');
  const [actionNotice, setActionNotice] = React.useState('');
  const [botOptions, setBotOptions] = React.useState({
    suggestedQuestions: args.suggestedQuestions,
    choices: args.choices,
  });
  const failedSend = React.useRef(false);
  const failedLoad = React.useRef(false);
  const nextId = React.useRef(1);
  const objectUrls = React.useRef([]);

  React.useEffect(() => () => objectUrls.current.forEach(URL.revokeObjectURL), []);
  React.useEffect(() => {
    if (!stagedAttachments?.length) return;
    let cancelled = false;
    let files;
    let staged = false;
    const stage = () => {
      const input = document.getElementById(args.id)?.querySelector('input[type="file"]');
      if (cancelled || staged || !files || !input) return;
      const transfer = new DataTransfer();
      files.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
      staged = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const observer = new MutationObserver(stage);
    observer.observe(document.body, { childList: true, subtree: true });
    Promise.all(
      stagedAttachments.map(async ({ url, name }) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not load example attachment: ${name}`);
        const blob = await response.blob();
        return new File([blob], name, { type: blob.type });
      })
    )
      .then((result) => {
        files = result;
        stage();
      })
      .catch((error) => setActionNotice(error.message));
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [args.id, stagedAttachments]);

  const updateMessage = (id, change) => {
    setMessages((current) => changeMessage(current, id, change));
    setConversations((current) =>
      current.map((item) => ({ ...item, messages: changeMessage(item.messages ?? [], id, change) }))
    );
  };

  const saveEdit = (id, text) => {
    if (!text.trim()) return;
    updateMessage(id, (item) => ({ ...item, text: text.trim(), edited: true }));
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setMessages((current) => removeMessage(current, id));
    setConversations((current) =>
      current.map((item) =>
        hasMessage(item.messages ?? [], id)
          ? withUnreadCount(
              { ...item, messages: removeMessage(item.messages ?? [], id) },
              args.currentUserId
            )
          : item
      )
    );
    setDeletingId(null);
  };

  const appendMessage = (message, conversationId, threadRootId) => {
    if (threadRootId) {
      updateMessage(threadRootId, (root) => ({
        ...root,
        replies: [...(root.replies ?? []), message],
        replyCount: root.replyCount === undefined ? undefined : root.replyCount + 1,
      }));
    } else if (conversationId) {
      setConversations((current) =>
        current.map((item) =>
          item.id === conversationId
            ? {
                ...item,
                messages: [...(item.messages ?? []), message],
                preview: message.text,
                previewSenderId: message.senderId,
              }
            : item
        )
      );
    } else setMessages((current) => [...current, message]);
  };

  const onSend = async ({
    text,
    files,
    clientMessageId,
    conversationId,
    threadRootId,
    recipientId,
    recipientIds,
  }) => {
    if (failFirstSend && !failedSend.current) {
      failedSend.current = true;
      await pause(250);
      throw new Error('Example connection interruption');
    }
    await pause(250);
    const attachments = files.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);
      return {
        name: file.name,
        url,
        imageUrl: file.type.startsWith('image/') ? url : undefined,
        alt: file.name,
      };
    });
    const message = {
      id: `${args.id}-sent-${nextId.current++}`,
      clientMessageId,
      senderId: args.currentUserId,
      text,
      attachments,
      deliveryStatus: 'Sent',
      ...timestamp(),
    };
    const recipients = recipientIds ?? (recipientId ? [recipientId] : []);
    if (recipients.length && !conversationId) {
      const existing = conversations.find((item) => {
        const members = (item.participantIds ?? []).filter((id) => id !== args.currentUserId);
        return (
          members.length === recipients.length && recipients.every((id) => members.includes(id))
        );
      });
      if (existing) {
        appendMessage(message, existing.id);
        setActiveId(existing.id);
        return { conversationId: existing.id };
      }
      const id = `${args.id}-conversation-${nextId.current++}`;
      const title = recipients
        .map((id) => args.participants.find((person) => person.id === id)?.name ?? id)
        .join(', ');
      setConversations((current) => [
        ...current,
        {
          id,
          title,
          participantIds: recipients,
          isGroup: recipients.length > 1,
          preview: text,
          messages: [message],
        },
      ]);
      setActiveId(id);
      return { conversationId: id };
    }
    appendMessage(message, conversationId, threadRootId);
    if (botMode && !threadRootId) {
      appendMessage(
        {
          id: `${args.id}-bot-${nextId.current++}`,
          senderId: 'bot',
          text: `I can help with “${text}”. Choose a topic or ask another question.`,
          ...timestamp(),
        },
        conversationId
      );
    }
  };

  const onRetryMessage = async (message) => {
    updateMessage(message.id, (item) => ({ ...item, deliveryState: 'sending' }));
    await pause(250);
    updateMessage(message.id, (item) => ({
      ...item,
      deliveryState: undefined,
      deliveryStatus: 'Sent',
    }));
  };

  const onReactionToggle = (message, reaction) => {
    updateMessage(message.id, (item) => {
      const current = item.reactions ?? [];
      const existing = current.find((entry) => entry.label === reaction.label);
      const selected = !existing?.selected;
      const count = Math.max(0, (existing?.count ?? 0) + (selected ? 1 : -1));
      const next = { ...(existing ?? reaction), count, selected };
      return {
        ...item,
        reactions: existing
          ? count
            ? current.map((entry) => (entry.label === reaction.label ? next : entry))
            : current.filter((entry) => entry.label !== reaction.label)
          : [...current, next],
      };
    });
  };

  const addBotExchange = (option, kind) => {
    appendMessage({
      id: `${args.id}-question-${nextId.current++}`,
      senderId: args.currentUserId,
      text: option.label,
      ...timestamp(),
    });
    appendMessage({
      id: `${args.id}-answer-${nextId.current++}`,
      senderId: 'bot',
      text:
        kind === 'choice'
          ? `You selected ${option.label}. What would you like to know about it?`
          : `Here is where to start with ${option.label.toLowerCase()}. You can ask a follow-up below.`,
      ...timestamp(),
    });
    setBotOptions({ suggestedQuestions: [], choices: [] });
  };

  const onLoadOlder =
    historySource || threadHistorySource
      ? async ({ cursor, threadRootId }) => {
          const updateHistory = (change) => {
            if (threadRootId)
              updateMessage(threadRootId, (root) => ({
                ...root,
                olderReplies: { ...root.olderReplies, ...change },
              }));
            else setOlderHistory((current) => ({ ...current, ...change }));
          };
          updateHistory({ loading: true, error: undefined });
          await pause(350);
          if (failFirstLoad && !failedLoad.current) {
            failedLoad.current = true;
            updateHistory({ loading: false, error: 'Could not load earlier messages. Try again.' });
            return;
          }
          const source = threadRootId ? threadHistorySource : historySource;
          const pageSize = threadRootId ? 2 : 8;
          const end = Number(cursor);
          const start = Math.max(0, end - pageSize);
          if (threadRootId) {
            updateMessage(threadRootId, (root) => ({
              ...root,
              replies: [...source.slice(start, end), ...(root.replies ?? [])],
              olderReplies: { hasMore: start > 0, cursor: String(start) },
            }));
          } else {
            setMessages((current) => [...source.slice(start, end), ...current]);
            setOlderHistory({ hasMore: start > 0, cursor: String(start) });
          }
        }
      : undefined;

  // Only the Loading example starts with a request already in flight.
  const initialLoad = React.useRef(
    loadOnMount ? () => onLoadOlder?.({ cursor: args.olderHistory?.cursor }) : null
  );
  React.useEffect(() => {
    void initialLoad.current?.();
    initialLoad.current = null;
  }, []);

  React.useEffect(() => {
    const pending = (args.messages || []).filter((message) => message.deliveryState === 'sending');
    if (!pending.length) return;
    const timer = setTimeout(
      () =>
        pending.forEach((message) =>
          updateMessage(message.id, (item) => ({
            ...item,
            deliveryState: undefined,
            deliveryStatus: 'Sent',
          }))
        ),
      1500
    );
    return () => clearTimeout(timer);
  }, [args.messages]);

  const renderMessage = (message, conversation, unread = false) => {
    const actions = resolveChatMessageActions(
      message,
      args.currentUserId,
      args.participants?.find((person) => person.id === message.senderId),
      conversation,
      args.messageActions
    );
    message = {
      ...message,
      actions: actions
        .map((action) =>
          ['mark-read', 'mark-unread'].includes(action.id)
            ? {
                ...action,
                id: unread ? 'mark-read' : 'mark-unread',
                label: unread ? 'Mark read' : 'Mark unread',
              }
            : action
        )
        .filter((action, index, all) => all.findIndex((item) => item.id === action.id) === index),
    };
    if (message.id === editingId)
      return {
        ...message,
        layout: 'panel',
        text: undefined,
        actions: [],
        reactionOptions: [],
        reactions: [],
        content: (
          <form
            data-chat-edit-message-id={message.id}
            onSubmit={(event) => {
              event.preventDefault();
              saveEdit(message.id, editDraft);
            }}
          >
            <TextArea
              label="Edit message"
              value={editDraft}
              onChange={(event) => setEditDraft(event.target.value)}
              rows={5}
              autoFocus
            />
            <ButtonGroup
              className="flex-row flex-justify-end margin-top-105"
              buttonProps={[
                {
                  type: 'submit',
                  variant: 'primary',
                  label: 'Save edit',
                  disabled: !editDraft.trim(),
                },
                {
                  variant: 'unstyled',
                  label: 'Cancel',
                  onClick: () => setEditingId(null),
                },
              ]}
            />
          </form>
        ),
      };
    if (message.id === deletingId)
      return {
        ...message,
        layout: 'panel',
        text: undefined,
        actions: [],
        reactionOptions: [],
        reactions: [],
        content: (
          <div data-chat-delete-message-id={message.id}>
            <p>Delete this message? This cannot be undone.</p>
            <ButtonGroup
              className="flex-row flex-justify-end margin-top-105"
              buttonProps={[
                {
                  label: 'Delete message',
                  variant: 'primary',
                  onClick: () => confirmDelete(message.id),
                },
                {
                  variant: 'unstyled',
                  label: 'Cancel',
                  onClick: () => setDeletingId(null),
                },
              ]}
            />
          </div>
        ),
      };
    return {
      ...message,
      replies: message.replies?.map((reply) => renderMessage(reply, conversation)),
    };
  };
  const renderMessages = (items, conversation) => {
    const boundary = items.findIndex(
      (message) =>
        message.id === (conversation ? conversation.firstUnreadMessageId : firstUnreadMessageId)
    );
    return items.map((message, index) =>
      renderMessage(message, conversation, boundary >= 0 && index >= boundary)
    );
  };

  const browserOnly = typeof window !== 'undefined';

  return (
    <>
      <Chat
        renderer={renderer}
        {...args}
        messages={renderMessages(messages)}
        firstUnreadMessageId={firstUnreadMessageId}
        conversations={conversations.map((item) => ({
          ...item,
          messages: renderMessages(item.messages ?? [], item),
        }))}
        activeConversationId={activeId}
        olderHistory={olderHistory}
        suggestedQuestions={botOptions.suggestedQuestions}
        choices={botOptions.choices}
        actions={args.actions}
        onConversationSelect={(item) => {
          setActiveId(item.id);
          setConversations((current) =>
            current.map((conversation) =>
              conversation.id === item.id
                ? { ...conversation, firstUnreadMessageId: undefined, unreadCount: 0 }
                : conversation
            )
          );
        }}
        onStartConversation={() => setActiveId(undefined)}
        onForwardMessage={args.contacts?.length ? () => setActiveId(undefined) : undefined}
        onSend={onSend}
        onRetryMessage={onRetryMessage}
        onReactionToggle={onReactionToggle}
        onMessageAction={(message, action) => {
          if (action.id === 'edit') {
            setEditDraft(message.text ?? '');
            setEditingId(message.id);
          } else if (action.id === 'delete') setDeletingId(message.id);
          else if (action.id === 'delete-message') {
            confirmDelete(message.id);
            setActionNotice('Message deleted.');
          } else if (action.id === 'recall') {
            updateMessage(message.id, (item) => ({
              ...item,
              text: 'You recalled this message.',
              content: undefined,
              exportText: undefined,
              attachments: [],
              reactions: [],
              reactionOptions: [],
              actions: (item.actions ?? []).filter((entry) => entry.id !== 'recall'),
            }));
            setActionNotice('Message recalled.');
          } else if (action.id === 'mark-unread' || action.id === 'mark-read') {
            const boundary = action.id === 'mark-unread' ? message.id : undefined;
            setFirstUnreadMessageId(boundary);
            setConversations((current) =>
              current.map((conversation) =>
                (conversation.messages ?? []).some((item) => item.id === message.id)
                  ? withUnreadCount(
                      { ...conversation, firstUnreadMessageId: boundary },
                      args.currentUserId
                    )
                  : conversation
              )
            );
            setActionNotice(
              action.id === 'mark-unread' ? 'Message marked unread.' : 'Message marked read.'
            );
          } else if (action.id === 'report') {
            updateMessage(message.id, (item) => ({
              ...item,
              actions: [
                ...(item.actions || []).filter((entry) => entry.id !== 'report'),
                { id: 'report', label: 'Reported', disabled: true },
              ],
            }));
            setActionNotice('Message reported for review.');
          } else setActionNotice(`Host received ${action.id} for message ${message.id}.`);
        }}
        onSaveEdit={saveEdit}
        onCancelEdit={() => setEditingId(null)}
        onConfirmDelete={confirmDelete}
        onCancelDelete={() => setDeletingId(null)}
        onDirectoryAction={({ actionId, conversationId }) => {
          const conversation = conversations.find((item) => item.id === conversationId);
          if (!conversation?.actions?.some((action) => action.id === actionId && !action.disabled))
            return;
          if (actionId === 'leave-group') {
            setConversations((current) => current.filter((item) => item.id !== conversationId));
            setActionNotice(`You left ${conversation.title}.`);
            if (activeId === conversationId) {
              setActiveId(undefined);
              return 'inbox';
            }
            return;
          }
          setConversations((current) =>
            current.map((conversation) => {
              if (conversation.id !== conversationId) return conversation;
              if (actionId === 'delete-history')
                return {
                  ...conversation,
                  messages: [],
                  olderHistory: undefined,
                  preview: 'No messages yet.',
                  previewSenderId: undefined,
                  timeLabel: undefined,
                  firstUnreadMessageId: undefined,
                  unreadCount: 0,
                };
              const pairs = {
                mute: ['unmute', 'Unmute notifications'],
                unmute: ['mute', 'Mute notifications'],
                pin: ['unpin', 'Unpin conversation'],
                unpin: ['pin', 'Pin conversation'],
                'mark-unread': ['mark-read', 'Mark read'],
                'mark-read': ['mark-unread', 'Mark unread'],
              };
              const next = pairs[actionId];
              if (!next) return conversation;
              return withUnreadCount(
                {
                  ...conversation,
                  ...(actionId === 'mark-unread'
                    ? {
                        firstUnreadMessageId: conversation.messages.find(
                          (message) => message.senderId !== args.currentUserId
                        )?.id,
                      }
                    : {}),
                  ...(actionId === 'mark-read' ? { firstUnreadMessageId: undefined } : {}),
                  actions: conversation.actions.map((action) =>
                    action.id === actionId ? { ...action, id: next[0], label: next[1] } : action
                  ),
                },
                args.currentUserId
              );
            })
          );
          setActionNotice(
            {
              mute: 'Notifications muted.',
              unmute: 'Notifications unmuted.',
              pin: 'Conversation pinned.',
              unpin: 'Conversation unpinned.',
              'delete-history': 'Chat history deleted.',
              'mark-read': 'Conversation marked read.',
              'mark-unread': 'Conversation marked unread.',
            }[actionId] ?? `Host received ${actionId}.`
          );
        }}
        onSuggestedQuestion={(option) => addBotExchange(option, 'question')}
        onChoice={(option) => addBotExchange(option, 'choice')}
        onLoadOlder={onLoadOlder}
      />
      {actionNotice && <p role="status">{actionNotice}</p>}
      {browserOnly && simulateIncoming && (
        <Button
          label="Simulate incoming message"
          onClick={() =>
            appendMessage({
              id: `${args.id}-incoming-${nextId.current++}`,
              senderId: 'agent',
              text: 'A new update arrived while this conversation was open.',
              ...timestamp(),
            })
          }
        />
      )}
      {browserOnly &&
        detailSections.map((section) => (
          <section key={section.id} id={section.id} className="margin-top-4">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </section>
        ))}
    </>
  );
}

export default function ChatStoryHost({ resettable = true, ...args }) {
  const [version, reset] = React.useReducer((value) => value + 1, 0);
  return (
    <>
      <ChatExample key={version} {...args} />
      {resettable && typeof window !== 'undefined' && (
        <Button variant="outline" className="margin-top-2" label="Reset example" onClick={reset} />
      )}
    </>
  );
}
