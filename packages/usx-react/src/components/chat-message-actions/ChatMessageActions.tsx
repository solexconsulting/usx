import React from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import Popover from '../popover/Popover';
import type { PopoverMenuItem } from '../popover/PopoverMenu';
import type { ChatMessageAction, ChatReaction, ChatReactionOption } from '../chat/Chat';
export interface ChatMessageActionsProps {
  id: string;
  messageId: string;
  senderName: string;
  reactions?: ChatReaction[];
  reactionOptions?: ChatReactionOption[];
  actions?: ChatMessageAction[];
  canCopy?: boolean;
  canReply?: boolean;
  canForward?: boolean;
}
export default function ChatMessageActions({
  id,
  messageId,
  senderName,
  reactions,
  reactionOptions = [],
  actions = [],
  canCopy = false,
  canReply = false,
  canForward = false,
}: ChatMessageActionsProps) {
  const hasOverflow = canCopy || actions.length > 0;
  const hasMessageTools = reactionOptions.length > 0 || canReply || canForward || hasOverflow;
  return (
    <>
      {' '}
      {hasMessageTools && (
        <div
          className="usx-chat__message-tools"
          role="group"
          aria-label={`Actions for message from ${senderName}`}
        >
          {reactionOptions.length > 0 && (
            <Popover
              id={`${id}-reactions-${messageId}`}
              side="top"
              align="end"
              panelShape="square"
              className="usx-chat__message-actions usx-chat__reaction-actions"
              menuItems={reactionOptions.map((option): PopoverMenuItem => {
                const current = reactions?.find((reaction) => reaction.label === option.label);
                return {
                  id: option.label,
                  type: 'button',
                  text: option.emoji,
                  extraAttributes: {
                    'aria-label': option.label,
                    title: 'name' in option && option.name ? `:${option.name}:` : option.label,
                    'aria-pressed': Boolean(current?.selected),
                    'data-usx-chat-reaction': option.label,
                  },
                };
              })}
              summaryProps={{
                ariaLabel: `React to message from ${senderName}`,
                title: 'Add reaction',
                className: 'usa-button usx-button usa-button--unstyled',
                children: <Icon name="sentiment_satisfied" />,
              }}
            />
          )}
          {canReply && (
            <Button
              variant="unstyled"
              className="usx-chat__tool-button"
              title="Reply in thread"
              aria-label={`Reply in thread to message from ${senderName}`}
              data-usx-chat-thread={messageId}
            >
              <Icon name="comment" />
            </Button>
          )}
          {canForward && (
            <Button
              variant="unstyled"
              className="usx-chat__tool-button"
              title="Forward message"
              aria-label={`Forward message from ${senderName}`}
              data-usx-chat-forward={messageId}
            >
              <Icon name="arrow_forward" />
            </Button>
          )}
          {hasOverflow && (
            <Popover
              id={`${id}-actions-${messageId}`}
              side="top"
              align="end"
              panelShape="square"
              className="usx-chat__message-actions usx-chat__overflow-actions"
              menuItems={[
                ...(canCopy
                  ? [
                      {
                        text: 'Copy message',
                        type: 'button' as const,
                        icon: { name: 'content_copy' },
                        extraAttributes: { 'data-usx-chat-copy-message': '' },
                      },
                    ]
                  : []),
                ...(actions ?? []).map(
                  (action): PopoverMenuItem => ({
                    id: action.id,
                    type: 'button',
                    text: action.label,
                    disabled: action.disabled,
                    extraAttributes: {
                      'data-usx-chat-message-action': action.id,
                    },
                  })
                ),
              ]}
              summaryProps={{
                ariaLabel: `More actions for message from ${senderName}`,
                title: 'More actions',
                className: 'usa-button usx-button usa-button--unstyled',
                children: <Icon name="more_horiz" />,
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
