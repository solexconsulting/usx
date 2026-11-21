import React from 'react';
import ClassNames from 'classnames/dedupe';
import Avatar from '../avatar/Avatar';
import AvatarGroup, { type AvatarGroupAvatar } from '../avatar-group/AvatarGroup';
import Clickable from '../clickable/Clickable';
import Icon from '../icon/Icon';
import Popover from '../popover/Popover';
import Tag from '../tag/Tag';
import type { ChatAction } from '../chat/Chat';

export interface ChatDirectoryItemProps {
  id: string;
  title: string;
  subtitle?: string;
  preview?: string;
  avatarProps?: AvatarGroupAvatar[];
  timeLabel?: string;
  unreadCount?: number;
  href?: string;
  conversationId?: string;
  participantId?: string;
  actions?: ChatAction[];
  selectable?: boolean;
  selected?: boolean;
  formId?: string;
  disabled?: boolean;
}

export default function ChatDirectoryItem({
  id,
  title,
  subtitle,
  preview,
  avatarProps = [],
  timeLabel,
  unreadCount = 0,
  href,
  conversationId,
  participantId,
  actions = [],
  selectable = false,
  selected = false,
  formId,
  disabled = false,
}: ChatDirectoryItemProps) {
  const avatars = avatarProps.map((avatar) => ({
    ...avatar,
    className: ClassNames('usx-chat__avatar', avatar.className),
  }));
  const content = (
    <>
      {avatars.length > 1 ? (
        <AvatarGroup overlap className="usx-chat__directory-avatars" avatarProps={avatars} />
      ) : avatars.length === 1 ? (
        <Avatar {...avatars[0]} />
      ) : null}
      <span className="usx-chat__directory-copy">
        <span className="usx-chat__directory-title">{title}</span>
        {subtitle && (
          <span
            className="usx-chat__directory-subtitle"
            id={selectable ? `${id}-description` : undefined}
          >
            {subtitle}
          </span>
        )}
        {preview && <span className="usx-chat__directory-preview">{preview}</span>}
      </span>
      {(timeLabel || Boolean(unreadCount)) && (
        <span className="usx-chat__directory-meta">
          {timeLabel && <small>{timeLabel}</small>}
          {Boolean(unreadCount) && (
            <>
              <span aria-hidden="true">
                <Tag color="info" className="usx-rounded-md" value={String(unreadCount)} />
              </span>
              <span className="usa-sr-only">{unreadCount} unread messages</span>
            </>
          )}
        </span>
      )}
    </>
  );

  return (
    <li className={actions.length ? 'usx-chat__directory-row' : undefined}>
      {selectable ? (
        <div className="usa-checkbox usx-checkbox usx-chat__directory-item usx-chat__recipient">
          <input
            id={id}
            className="usa-checkbox__input"
            type="checkbox"
            name="recipientIds"
            value={participantId ?? ''}
            form={formId}
            defaultChecked={selected}
            disabled={disabled}
            aria-label={title}
            aria-describedby={subtitle ? `${id}-description` : undefined}
            data-usx-chat-recipient=""
          />
          <label className="usa-checkbox__label usx-chat__recipient-label" htmlFor={id}>
            {content}
          </label>
        </div>
      ) : (
        <Clickable
          href={href || undefined}
          className="usx-chat__directory-item"
          extraAttributes={
            href
              ? undefined
              : participantId !== undefined
                ? { 'data-usx-chat-contact': participantId }
                : conversationId !== undefined
                  ? { 'data-usx-chat-conversation': conversationId }
                  : undefined
          }
        >
          {content}
        </Clickable>
      )}
      {actions.length > 0 && (
        <Popover
          id={`${id}-actions`}
          side="bottom"
          align="end"
          panelShape="square"
          className="usx-chat__directory-actions"
          summaryProps={{
            ariaLabel: `Actions for ${title}`,
            className: 'usa-button usx-button usa-button--unstyled',
            children: <Icon name="more_vert" />,
          }}
          menuItems={actions.map((action) => ({
            id: action.id,
            type: 'button',
            text: action.label,
            disabled: action.disabled,
            extraAttributes: {
              'data-usx-chat-directory-action': action.id,
              ...(conversationId ? { 'data-usx-chat-conversation-id': conversationId } : {}),
              ...(participantId ? { 'data-usx-chat-participant-id': participantId } : {}),
            },
          }))}
        />
      )}
    </li>
  );
}
