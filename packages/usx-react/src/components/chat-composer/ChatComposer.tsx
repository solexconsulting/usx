import React from 'react';
import Button from '../button/Button';
import ButtonGroup from '../button-group/ButtonGroup';
import Icon from '../icon/Icon';
import Popover from '../popover/Popover';
import type { PopoverMenuItem } from '../popover/PopoverMenu';
import TextArea from '../text-area/TextArea';
import config from './config.json';

export interface ChatComposerEmoji {
  emoji: string;
  name: string;
  label: string;
  aliases?: string[];
}

export interface ChatComposerProps {
  id: string;
  value?: string;
  formAction?: string;
  disabled?: boolean;
  allowAttachments?: boolean;
  allowFormatting?: boolean;
  accept?: string;
  emojiPack?: ChatComposerEmoji[];
  isThread?: boolean;
  conversationId?: string;
  recipientId?: string;
  recipientIds?: string[];
  /** Require at least one recipient, including associated picker checkboxes, before sending. */
  requireRecipients?: boolean;
  threadRootId?: string;
}

export default function ChatComposer({
  id,
  value = '',
  formAction,
  disabled = false,
  allowAttachments = false,
  allowFormatting = false,
  accept,
  emojiPack = config.props.emojiPack.default,
  isThread = false,
  conversationId,
  recipientId,
  recipientIds = [],
  requireRecipients = false,
  threadRootId,
}: ChatComposerProps) {
  return (
    <form
      id={`${id}-composer`}
      data-usx-chat-require-recipients={requireRecipients ? 'true' : undefined}
      className="usx-chat-composer usx-chat__composer"
      action={formAction}
      method="post"
      encType={allowAttachments ? 'multipart/form-data' : undefined}
    >
      {conversationId && <input type="hidden" name="conversationId" value={conversationId} />}
      {recipientId && !conversationId && (
        <input type="hidden" name="recipientId" value={recipientId} />
      )}
      {!conversationId &&
        recipientIds.map((recipient, index) => (
          <input key={index} type="hidden" name="recipientIds" value={recipient} />
        ))}
      {isThread && threadRootId && <input type="hidden" name="threadRootId" value={threadRootId} />}
      {allowFormatting && (
        <div
          id={`${id}-formatting`}
          className="usx-chat__formatting"
          aria-label="Message formatting"
          hidden
        >
          <ButtonGroup
            segmented
            className="usx-chat__format-buttons"
            buttonProps={(
              [
                ['bold', 'Bold', 'Ctrl/⌘+B', <strong key="bold">B</strong>],
                ['italic', 'Italic', 'Ctrl/⌘+I', <em key="italic">I</em>],
                ['underline', 'Underline', 'Ctrl/⌘+U', <u key="underline">U</u>],
                ['strike', 'Strikethrough', 'Ctrl/⌘+Shift+X', <s key="strike">S</s>],
                ['ordered', 'Numbered list', 'Ctrl/⌘+Shift+7', '1.'],
                ['unordered', 'Bulleted list', 'Ctrl/⌘+Shift+8', <Icon key="list" name="list" />],
                [
                  'quote',
                  'Block quote',
                  'Ctrl/⌘+Shift+9',
                  <Icon key="quote" name="format_quote" />,
                ],
                ['code', 'Code block', 'Ctrl/⌘+Alt+Shift+C', <Icon key="code" name="code" />],
              ] as const
            ).map(([format, label, shortcut, icon]) => ({
              type: 'button' as const,
              variant: 'outline' as const,
              tighten: true,
              className: 'usx-chat__format-button',
              disabled,
              'aria-label': label,
              title: `${label} (${shortcut})`,
              extraAttributes: { 'data-usx-chat-format': format },
              children: icon,
            }))}
          />
        </div>
      )}
      <TextArea
        id={`${id}-message`}
        label={isThread ? 'Reply in thread' : 'Message'}
        screenReaderOnlyLabel
        formGroup={false}
        name="message"
        defaultValue={value}
        disabled={disabled}
        placeholder={isThread ? 'Reply in thread' : 'Write a message'}
        rows={2}
      />
      <div className="usx-chat__composer-actions">
        <div className="usx-chat__attach">
          {(allowAttachments || allowFormatting) && (
            <ButtonGroup
              className="usx-chat__composer-tools"
              buttonProps={[
                ...(allowAttachments
                  ? [
                      {
                        type: 'button' as const,
                        variant: 'outline' as const,
                        tighten: true,
                        'aria-label': 'Attach files',
                        title: 'Attach files',
                        extraAttributes: { 'data-usx-chat-attach': '' },
                        disabled,
                        children: <Icon name="attach_file" />,
                      },
                    ]
                  : []),
                ...(allowFormatting
                  ? [
                      {
                        type: 'button' as const,
                        variant: 'outline' as const,
                        tighten: true,
                        'aria-label': 'Show formatting',
                        title: 'Show formatting',
                        'aria-expanded': false,
                        'aria-controls': `${id}-formatting`,
                        extraAttributes: { 'data-usx-chat-toggle-formatting': '' },
                        disabled,
                        children: <Icon name="text_fields" />,
                      },
                    ]
                  : []),
              ]}
            />
          )}
          {emojiPack.length > 0 && !disabled && (
            <Popover
              id={`${id}-emoji-picker`}
              side="top"
              align="start"
              panelShape="square"
              className="usx-chat__emoji-picker"
              menuItems={emojiPack.slice(0, 100).map(
                (option): PopoverMenuItem => ({
                  type: 'button',
                  id: option.name,
                  text: option.emoji,
                  extraAttributes: {
                    'aria-label': option.label,
                    title: `:${option.name}:`,
                    'data-usx-chat-emoji': option.emoji,
                    'data-usx-chat-emoji-name': option.name,
                    'data-usx-chat-emoji-aliases': (option.aliases ?? []).join(','),
                  },
                })
              )}
              summaryProps={{
                ariaLabel: 'Choose emoji',
                title: 'Choose emoji',
                className: 'usa-button usx-button usa-button--outline',
                children: <Icon name="sentiment_satisfied" />,
              }}
            />
          )}
          {allowAttachments && (
            <input
              type="file"
              hidden
              name="attachments"
              multiple
              accept={accept}
              disabled={disabled}
              aria-label="Attach files"
            />
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="usx-chat__send"
          label={isThread ? 'Send reply' : 'Send'}
          iconProps={[{ name: 'send' }]}
          disabled={
            disabled || !value.trim() || (requireRecipients && !recipientId && !recipientIds.length)
          }
        />
      </div>
    </form>
  );
}
