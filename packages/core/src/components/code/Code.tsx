import React from 'react';
import ClassNames from 'classnames';
import './code.scss';

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
    try { document.execCommand('copy'); } catch (e) {}
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
  copyText?: string | null;
  className?: string;
}

export default function Code({ lines = [], copyText = null, className = '' }: CodeProps) {
  return (
    <div className={ClassNames('usx-mockup-code', className)}>
      {lines.map((line, i) => (
        <pre
          key={i}
          {...(line.prefix != null ? { 'data-prefix': line.prefix } : {})}
          className={line.className || undefined}
        >
          <code>{line.code}</code>
        </pre>
      ))}
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
