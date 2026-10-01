import React from 'react';
import ClassNames from 'classnames';

function usxCopy(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch { /* ignore */ }
    document.body.removeChild(ta);
  }
}

export interface CodeLine {
  code: string;
  prefix?: string;
  className?: string;
}

export interface CodeProps {
  lines?: CodeLine[];
  allowHtml?: boolean;
  copyText?: string | null;
  className?: string;
}

export default function Code({ lines = [], allowHtml = false, copyText = null, className = '' }: CodeProps) {
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
        <button
          className="usa-button usx-button usx-button--ghost usx-copy"
          onClick={() => usxCopy(copyText)}
        >
          <svg className="usa-icon usx-copy__copy" aria-hidden="true" focusable="false" role="img">
            <use href="./img/sprite.svg#content_copy" />
          </svg>
          <svg className="usa-icon usx-copy__check" aria-hidden="true" focusable="false" role="img">
            <use href="./img/sprite.svg#check" />
          </svg>
        </button>
      )}
    </div>
  );
}
