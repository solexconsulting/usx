import React from 'react';
import Button from '../button/Button';
import Image from '../image/Image';
import Icon from '../icon/Icon';
export interface ChatAttachmentProps {
  name: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
}
export default function ChatAttachment({ name, url, imageUrl, alt }: ChatAttachmentProps) {
  const content = (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt ?? name}
          className="usx-chat__attachment-image maxw-card"
          objectFit="cover"
          rounded
        />
      ) : (
        <Icon name="attach_file" />
      )}
      <span>{name}</span>
    </>
  );
  return (
    <li>
      {url ? (
        <Button href={url} download={name} variant="unstyled">
          {content}
        </Button>
      ) : (
        <div>{content}</div>
      )}
    </li>
  );
}
