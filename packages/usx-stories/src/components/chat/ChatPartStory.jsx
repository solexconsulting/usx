import React from 'react';
import Chat from '../../../../usx-react/src/components/chat/Chat';
import ChatBubble from '../../../../usx-react/src/components/chat-bubble/ChatBubble';
import ChatComposer from '../../../../usx-react/src/components/chat-composer/ChatComposer';
import Button from '../../../../usx-react/src/components/button/Button';
import ChatStoryHost from './ChatStoryHost';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';
import { djangoComponent } from '../../utils/djangoComponent.js';

// Each part keeps its own contract. This example host supplies the surrounding application
// context and reuses the full Chat demo for navigation, sending, history, and message actions.
function PartExample({ Component, FullChat, name, args, exampleId, messagesFor }) {
  const [enabled, setEnabled] = React.useState(!args.disabled);
  const [resource, setResource] = React.useState(null);
  const kind = name.replace('chat-', '');
  const hostId = `example-${exampleId}`;
  const senderId = args.message?.senderId || args.participant?.id || 'avery';
  const currentUserId = args.own ? senderId : 'you';
  const seedMessage = args.message
    ? { ...args.message }
    : {
        id: args.messageId || 'example-message',
        senderId,
        text: args.text || 'Your appointment is confirmed.',
        content: args.content,
        attachments: args.attachments,
        reactions: args.reactions,
        actions: kind === 'message-actions' ? args.actions : undefined,
      };
  if (seedMessage.replyCount && !seedMessage.replies) {
    seedMessage.replies = Array.from({ length: seedMessage.replyCount }, (_, index) => ({
      id: `reply-${index}`,
      senderId,
      text: `Appointment update ${index + 1}.`,
    }));
  }
  const history = Array.from({ length: 9 }, (_, index) => ({
    id: `history-${index}`,
    senderId,
    text: `Earlier update ${index + 1}.`,
    timeLabel: 'Earlier',
  }));
  const initialView =
    kind === 'directory'
      ? args.view || 'inbox'
      : kind === 'window'
        ? args.view || 'conversation'
        : kind === 'composer' && args.isThread
          ? 'thread'
          : 'conversation';
  let conversations = args.conversations;
  let contacts = args.contacts;
  if (kind === 'directory-item') {
    const id = args.conversationId || args.participantId || 'example';
    conversations = [
      {
        id,
        title: args.title,
        participantIds: [senderId],
        actions: args.actions,
        messages: [seedMessage],
      },
    ];
    contacts = [{ participantId: args.participantId || senderId, conversationId: id }];
  }
  if (kind === 'directory' && args.view === 'contacts') {
    conversations = (contacts || []).map((contact) => ({
      id: contact.conversationId || contact.participantId,
      title: contact.participantId,
      participantIds: [contact.participantId],
      actions: contact.actions,
      messages: [seedMessage],
    }));
  }
  conversations = conversations?.map((item) => ({
    ...item,
    messages: item.messages || [{ ...seedMessage, text: item.preview || seedMessage.text }],
  }));
  const seedMessages =
    kind === 'composer'
      ? []
      : kind === 'history'
        ? history.slice(-3)
        : messagesFor
          ? messagesFor(args)
          : [seedMessage];
  const model = {
    id: hostId,
    title: args.title || 'Example conversation',
    defaultOpen: true,
    view: initialView,
    currentUserId,
    participants: args.participants || [
      args.participant || { id: senderId, name: args.senderName || 'Avery' },
      { id: 'you', name: 'You' },
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'bot', name: 'Guide bot' },
    ],
    contacts: contacts || [{ participantId: senderId, description: 'Start a conversation' }],
    conversations,
    messages: seedMessages,
    reactionOptions:
      args.reactionOptions || args.reactions?.map(({ emoji, label }) => ({ emoji, label })),
    allowThreads: args.allowThreads ?? args.canReply ?? false,
    showCopyMessageAction: args.showCopyMessageAction ?? args.canCopy ?? false,
    suggestedQuestions: args.suggestedQuestions,
    choices: args.choices,
    choicePrompt: args.choicePrompt,
    disabled: !enabled,
    emojiPack: args.emojiPack || [],
    allowAttachments: args.allowAttachments,
    allowFormatting: args.allowFormatting,
    recipientIds: args.recipientIds,
    ...(kind === 'history' ? { olderHistory: { ...args, cursor: '6' } } : {}),
  };
  if (kind === 'composer' && args.isThread) {
    model.messages = [{ ...seedMessage, id: args.threadRootId, replies: [] }];
    model.activeThreadId = args.threadRootId;
  }
  if (kind === 'composer' && args.conversationId) {
    model.conversations = [{ id: args.conversationId, title: 'Support', messages: model.messages }];
    model.messages = [];
    model.activeConversationId = args.conversationId;
  }
  if (kind === 'window') {
    model.showCopyAction = args.showCopyAction;
    model.conversations = [
      {
        id: args.conversationId || 'example',
        title: model.title,
        participantIds: [senderId],
        messages: [seedMessage],
        actions: args.conversationActions,
      },
    ];
    model.activeConversationId = model.conversations[0].id;
  }

  const PartRenderer = React.useMemo(
    () =>
      function PartRenderer(state) {
        if (
          state.view !== initialView ||
          (kind === 'directory-item' && state.activeConversationId) ||
          (kind === 'composer' && args.requireRecipients && state.activeConversationId)
        )
          return <FullChat {...state} />;
        const selected = state.conversations?.find(
          (item) => item.id === state.activeConversationId
        );
        const messages = selected?.messages || state.messages || [];
        const body = kind === 'composer' && args.isThread ? messages[0]?.replies || [] : messages;
        let part;
        if (kind === 'directory') {
          part = (
            <>
              <Component
                {...args}
                formId={args.selectable ? `${hostId}-composer` : args.formId}
                conversations={state.conversations}
                contacts={state.contacts}
              />
              {args.selectable ? (
                <ChatComposer id={hostId} requireRecipients emojiPack={[]} />
              ) : (
                <Button label="New message" extraAttributes={{ 'data-usx-chat-new': '' }} />
              )}
            </>
          );
        } else if (kind === 'directory-item') {
          const conversation = state.conversations?.[0];
          part = (
            <div className="usx-chat__directory">
              <ul className="usx-chat__directory-list">
                {conversation && (
                  <Component
                    {...args}
                    formId={args.selectable ? `${hostId}-composer` : args.formId}
                    actions={conversation.actions}
                    preview={conversation.preview ?? args.preview}
                  />
                )}
              </ul>
              {args.selectable && <ChatComposer id={hostId} requireRecipients emojiPack={[]} />}
            </div>
          );
        } else if (kind === 'composer') {
          part = (
            <>
              <ol className="usx-chat__messages">
                {body.map((message) => (
                  <li key={message.id}>
                    <ChatBubble {...message} />
                  </li>
                ))}
              </ol>
              <Component
                {...args}
                conversationId={state.activeConversationId || args.conversationId}
              />
            </>
          );
        } else if (kind === 'controls') {
          part = (
            <ol className="usx-chat__messages">
              {body.slice(1).map((message) => (
                <li key={message.id}>
                  <ChatBubble {...message} />
                </li>
              ))}
              <Component
                {...args}
                disabled={state.disabled}
                suggestedQuestions={state.suggestedQuestions}
                choices={state.choices}
              />
            </ol>
          );
        } else if (kind === 'history') {
          part = (
            <ol
              className="usx-chat__messages"
              aria-busy={Boolean(state.olderHistory?.loading)}
              data-usx-chat-older-cursor={state.olderHistory?.cursor}
            >
              <Component
                hasMore={state.olderHistory?.hasMore}
                loading={state.olderHistory?.loading}
                error={state.olderHistory?.error}
              />
              {body.map((message) => (
                <li key={message.id}>
                  <ChatBubble {...message} />
                </li>
              ))}
            </ol>
          );
        } else if (kind === 'window') {
          return (
            <Component
              {...args}
              id={hostId}
              conversationId={selected?.id}
              conversationActions={selected?.actions}
            >
              <ol className="usx-chat__messages">
                {messages.map((message) => (
                  <li key={message.id} data-message-id={message.id} data-sender-name="Avery">
                    <ChatBubble {...message} />
                  </li>
                ))}
              </ol>
            </Component>
          );
        } else {
          part = (
            <ol className="usx-chat__messages">
              {messages.map((message) =>
                kind === 'message' ? (
                  <Component
                    key={message.id}
                    {...args}
                    message={message}
                    own={message.senderId === currentUserId}
                  />
                ) : (
                  <li
                    key={message.id}
                    data-message-id={message.id}
                    data-sender-name={args.senderName || 'Avery'}
                  >
                    {kind === 'message-actions' && <ChatBubble {...message} />}
                    <Component
                      {...args}
                      {...(kind === 'bubble'
                        ? {
                            text: message.text,
                            content: message.content,
                            attachments: message.attachments,
                            reactions: message.reactions,
                          }
                        : {
                            messageId: message.id,
                            actions: message.actions,
                            reactions: message.reactions,
                          })}
                    />
                  </li>
                )
              )}
            </ol>
          );
        }
        return (
          <section
            id={hostId}
            className="usx-chat"
            style={{ maxWidth: kind === 'directory-item' ? '20rem' : '28rem' }}
          >
            <div
              data-chat-view={state.view}
              className="usx-chat__window"
              style={{ height: 'auto' }}
            >
              <span className="usx-chat__copy-status usa-sr-only" role="status" />
              {part}
            </div>
          </section>
        );
      },
    [Component, FullChat, args, initialView, kind, hostId, currentUserId]
  );

  const click = (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('download')) return;
    event.preventDefault();
    if (link.matches('.usx-chat__directory-item')) {
      const conversation =
        conversations?.find((item) => item.href === link.getAttribute('href')) ||
        conversations?.[0];
      link.dispatchEvent(
        new CustomEvent('usx:chat-navigate', {
          bubbles: true,
          detail: { view: 'conversation', conversationId: conversation?.id },
        })
      );
    } else setResource(link.textContent.trim());
  };
  return (
    <div onClick={click}>
      <ChatStoryHost
        {...model}
        renderer={PartRenderer}
        resettable
        initialDraft={kind === 'composer' ? args.value : undefined}
        botMode={kind === 'controls'}
        historySource={kind === 'history' ? history : undefined}
        loadOnMount={kind === 'history' && args.loading}
      />
      {args.disabled && (
        <Button
          className="margin-top-2"
          label={enabled ? 'Disable choices' : 'Enable choices'}
          onClick={() => setEnabled(!enabled)}
        />
      )}
      {resource && (
        <aside role="status">
          <h3>{resource}</h3>
          <p>The example resource is ready for review.</p>
          <Button label="Back to example" onClick={() => setResource(null)} />
        </aside>
      )}
    </div>
  );
}

export function partStory(Component, name, args, options = {}) {
  return {
    args,
    render: ({ renderer = Component, chatRenderer = Chat, ...props }) => (
      <PartExample
        Component={renderer}
        FullChat={chatRenderer}
        name={name}
        args={props}
        {...options}
      />
    ),
  };
}

export function djangoPartStory(name, story) {
  const Renderer = djangoComponent({ componentName: name });
  const FullChat = djangoComponent({ componentName: 'chat' });
  return {
    ...createDjangoStory({ componentName: name })(story.args),
    render: (args) => story.render({ ...args, renderer: Renderer, chatRenderer: FullChat }),
  };
}
