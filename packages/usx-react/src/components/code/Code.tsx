import React from 'react';
import ClassNames from 'classnames';
import CopyToClipboard from '../copy-to-clipboard/CopyToClipboard';

export interface CodeLine {
  code: string;
  prefix?: string;
  className?: string;
}

export interface CodeProps {
  lines?: CodeLine[];
  allowHtml?: boolean;
  copyText?: string | null;
  staticBaseUrl?: string;
  className?: string;
}

export default function Code({ lines = [], allowHtml = false, copyText = null, staticBaseUrl, className = '' }: CodeProps) {
  return (
    <div className={ClassNames('usx-mockup-code', className)}>
      <div className="usx-mockup-code__content">
      {lines.map((line, i) => (
        <pre
          key={i}
          {...(line.prefix != null ? { 'data-prefix': line.prefix } : {})}
          className={line.className || undefined}
        >
          {allowHtml ? <code dangerouslySetInnerHTML={{ __html: line.code }} /> : <code>{line.code}</code>}
        </pre>
      ))}
      </div>
      {copyText && (
        <CopyToClipboard copyText={copyText} staticBaseUrl={staticBaseUrl} tooltipProps={{ label: 'Copy', copiedTooltip: 'Copied', position: 'left' }}/>
      )}
    </div>
  );
}
