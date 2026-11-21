import type { SummaryProps } from '../summary/Summary';
import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import Popover, { type PopoverSide, type PopoverAlign } from '../popover/Popover';
import type { ChatAction, ChatView } from '../chat/Chat';
export interface ChatWindowProps {
  id: string;
  title?: string;
  view?: ChatView;
  status?: string;
  showBack?: boolean;
  showNewMessage?: boolean;
  showCopyAction?: boolean;
  conversationId?: string;
  conversationActions?: ChatAction[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  summaryProps?: Omit<SummaryProps, 'unstyled'>;
  side?: PopoverSide;
  align?: PopoverAlign;
  defaultOpen?: boolean;
  className?: string;
}
export default function ChatWindow({
  id,
  title = 'Chat',
  view = 'conversation',
  status,
  showBack = false,
  showNewMessage = false,
  showCopyAction = false,
  conversationId,
  conversationActions = [],
  actions,
  children,
  summaryProps,
  side = 'bottom',
  align = 'start',
  defaultOpen = false,
  className,
}: ChatWindowProps) {
  return (
    <Popover
      id={id}
      side={side}
      align={align}
      panelShape="square"
      defaultOpen={defaultOpen}
      dismissOnOutside={false}
      className={ClassNames('usx-chat', className)}
      panelClassName="usx-chat__panel"
      contentClassName="usx-chat__popover-content"
      headerClassName="usx-chat__header"
      panelHeading={title}
      headingAs="h2"
      panelHeadingId={`${id}-title`}
      headerLeftActions={
        showBack && (
          <Button
            variant="unstyled"
            className="usx-popover__header-action"
            aria-label={view === 'thread' ? 'Back to conversation' : 'Back'}
            iconProps={[{ name: 'arrow_back' }]}
            extraAttributes={{ 'data-usx-chat-back': '' }}
          />
        )
      }
      headerRightActions={
        <>
          {showNewMessage && (
            <Button
              variant="unstyled"
              className="usx-popover__header-action"
              aria-label="New message"
              iconProps={[{ name: 'add' }]}
              extraAttributes={{ 'data-usx-chat-new': '' }}
            />
          )}
          {(showCopyAction || conversationActions.length > 0 || Boolean(actions)) && (
            <Popover
              id={`${id}-conversation-actions`}
              className="usx-chat__actions"
              side="bottom"
              align="end"
              panelShape="square"
              panelClassName="usx-chat__actions-menu"
              menuItems={[
                ...(showCopyAction
                  ? [
                      {
                        text: 'Copy conversation',
                        type: 'button' as const,
                        icon: { name: 'content_copy' },
                        extraAttributes: { 'data-usx-chat-copy': '' },
                      },
                    ]
                  : []),
                ...conversationActions.map((action) => ({
                  id: action.id,
                  type: 'button' as const,
                  text: action.label,
                  disabled: action.disabled,
                  extraAttributes: {
                    'data-usx-chat-directory-action': action.id,
                    ...(conversationId ? { 'data-usx-chat-conversation-id': conversationId } : {}),
                  },
                })),
              ]}
              summaryProps={{
                ariaLabel: 'Conversation actions',
                className: 'usa-button usx-button usa-button--unstyled usx-popover__header-action',
                children: <Icon name="more_vert" />,
              }}
            >
              {actions}
            </Popover>
          )}
        </>
      }
      showCloseIcon
      closeIconLabel="Close chat"
      summaryProps={{ label: 'Open chat', ...summaryProps }}
    >
      <section className="usx-chat__window" aria-labelledby={`${id}-title`} data-chat-view={view}>
        <span className="usx-chat__copy-status usa-sr-only" role="status" aria-live="polite"></span>
        {status && <p className="usx-chat__status">{status}</p>}
        {children}
      </section>
    </Popover>
  );
}
