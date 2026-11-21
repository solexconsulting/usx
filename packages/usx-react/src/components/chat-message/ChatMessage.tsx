import React from 'react';
import ClassNames from 'classnames';
import Avatar from '../avatar/Avatar';
import chatAvatarProps from '../chat/avatarProps';
import Alert from '../alert/Alert';
import Button from '../button/Button';
import ChatBubble from '../chat-bubble/ChatBubble';
import ChatMessageActions from '../chat-message-actions/ChatMessageActions';
import type { ChatParticipant, ChatMessageData, ChatReactionOption } from '../chat/Chat';
export interface ChatMessageProps {
  id: string;
  message: ChatMessageData;
  participant?: ChatParticipant;
  own?: boolean;
  isThread?: boolean;
  allowForward?: boolean;
  allowThreads?: boolean;
  showCopyMessageAction?: boolean;
  reactionOptions?: ChatReactionOption[];
  disabled?: boolean;
}

export default function ChatMessage({
  id,
  message,
  participant,
  own = false,
  isThread = false,
  allowForward = false,
  allowThreads = false,
  showCopyMessageAction = true,
  reactionOptions = [],
  disabled = false,
}: ChatMessageProps) {
  const name = participant?.name || message.senderId;
  const unconfirmed = Boolean(message.deliveryState);
  const position = unconfirmed ? 'single' : (message.groupPosition ?? 'single');
  const showIdentity = position === 'single' || position === 'first';
  const showTime = position === 'single' || position === 'last';
  const isPanel = message.layout === 'panel';
  const deliveryStatus =
    message.deliveryStatus ?? (message.deliveryState === 'sending' ? 'Sending…' : undefined);
  const availableReactions =
    isPanel || unconfirmed ? [] : (message.reactionOptions ?? reactionOptions ?? []).slice(0, 100);
  const canCopyMessage =
    !isPanel &&
    !unconfirmed &&
    showCopyMessageAction &&
    Boolean(
      (message.exportText ??
        message.text ??
        (typeof message.content === 'string' ? message.content : '')) ||
      message.attachments?.length
    );
  const visibleReplyCount = message.replyCount ?? message.replies?.length ?? 0;
  const canOpenThread = !isPanel && !unconfirmed && !isThread && allowThreads;
  const canForward = !isPanel && !unconfirmed && allowForward;
  return (
    <li
      className={ClassNames('usx-chat__message', `usx-chat__message--${position}`, {
        'usx-chat__message--own': own,
        'usx-chat__message--panel': message.layout === 'panel',
        'usx-chat__message--failed': message.deliveryState === 'failed',
      })}
      data-message-id={message.id}
      data-usx-chat-client-message-id={message.clientMessageId}
      data-usx-chat-delivery-state={message.deliveryState}
      data-sender-name={name}
      data-export-text={message.exportText ?? message.text ?? undefined}
    >
      {showIdentity ? (
        <Avatar {...chatAvatarProps(participant, name)} />
      ) : (
        <span className="usx-chat__avatar-space" aria-hidden="true" />
      )}
      <div className="usx-chat__message-body">
        {showIdentity && <span className="usx-chat__sender">{name}</span>}
        <ChatBubble
          text={message.text}
          content={message.content}
          attachments={message.attachments}
          reactions={!isPanel && !unconfirmed ? message.reactions : undefined}
        />
        {message.deliveryState === 'failed' && (
          <Alert variant="error" noIcon slim className="usx-chat__delivery-error">
            <span>Message not sent.</span>
            {
              <Button
                variant="unstyled"
                className="usx-chat__retry"
                aria-label="Retry sending message"
                data-usx-chat-retry={message.id}
                disabled={disabled}
              >
                Retry
              </Button>
            }
          </Alert>
        )}
        {!isPanel && message.timeLabel && !showTime && (
          <time className="usx-chat__time usa-sr-only" dateTime={message.sentAt}>
            {message.timeLabel}
          </time>
        )}
        {!isPanel &&
          (Boolean(message.timeLabel && showTime) ||
            message.edited ||
            deliveryStatus ||
            (canOpenThread && visibleReplyCount > 0)) && (
            <div className="usx-chat__message-footer">
              {message.timeLabel && showTime && (
                <time className="usx-chat__time" dateTime={message.sentAt}>
                  {message.timeLabel}
                </time>
              )}
              {(message.edited || deliveryStatus) && (
                <span className="usx-chat__message-meta">
                  {message.edited && 'Edited'}
                  {message.edited && deliveryStatus && ' · '}
                  {deliveryStatus}
                </span>
              )}
              {canOpenThread && visibleReplyCount > 0 && (
                <Button
                  variant="unstyled"
                  className="usx-chat__thread-link"
                  data-usx-chat-thread={message.id}
                >
                  {visibleReplyCount} {visibleReplyCount === 1 ? 'reply' : 'replies'}
                </Button>
              )}
            </div>
          )}
        <ChatMessageActions
          id={id}
          messageId={message.id}
          senderName={name}
          reactions={message.reactions}
          reactionOptions={availableReactions}
          actions={!isPanel && !unconfirmed ? message.actions : undefined}
          canCopy={canCopyMessage}
          canReply={canOpenThread}
          canForward={canForward}
        />
      </div>
    </li>
  );
}
