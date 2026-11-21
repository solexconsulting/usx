import React from 'react';
import Button from '../button/Button';
export interface ChatHistoryProps {
  hasMore?: boolean;
  loading?: boolean;
  error?: string;
}
export default function ChatHistory({ hasMore = false, loading = false, error }: ChatHistoryProps) {
  return (
    <li className="usx-chat__older-history">
      {hasMore ? (
        <Button
          variant="unstyled"
          className="usx-chat__load-older"
          disabled={loading}
          extraAttributes={{ 'data-usx-chat-load-older': '' }}
        >
          {loading ? 'Loading earlier messages…' : error ? 'Try again' : 'Load earlier messages'}
        </Button>
      ) : (
        <span className="usx-chat__history-start">Beginning of conversation</span>
      )}
      {error && !loading && (
        <span className="usx-chat__history-error" role="alert">
          {error}
        </span>
      )}
    </li>
  );
}
