import React from 'react';
import ChatAttachment, { type ChatAttachmentProps } from '../chat-attachment/ChatAttachment';

export interface ChatAttachmentsProps {
  items?: ChatAttachmentProps[];
}

export default function ChatAttachments({ items = [] }: ChatAttachmentsProps) {
  if (!items.length) return null;
  return (
    <ul className="usx-chat__attachments">
      {items.map((item, index) => (
        <ChatAttachment key={index} {...item} />
      ))}
    </ul>
  );
}
