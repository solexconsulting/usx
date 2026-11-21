import React from 'react';
import Callout from '../callout/Callout';
import Image from '../image/Image';
import Link from '../link/Link';
export interface ChatContextProps {
  label: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
}
export default function ChatContext({
  label,
  title,
  description,
  imageUrl,
  imageAlt,
  href,
}: ChatContextProps) {
  return (
    <Callout
      as="aside"
      big={false}
      strokeColor="primary"
      backgroundColor="surface-2"
      textColor="ink"
      className="usx-chat__context"
      aria-label={label}
    >
      {imageUrl && (
        <Image
          className="usx-chat__context-image"
          objectFit="cover"
          src={imageUrl}
          alt={imageAlt ?? ''}
        />
      )}
      <div className="usx-chat__context-copy">
        <span className="usx-chat__context-label">{label}</span>
        {href ? <Link href={href}>{title}</Link> : <strong>{title}</strong>}
        {description && <span>{description}</span>}
      </div>
    </Callout>
  );
}
