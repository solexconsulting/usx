import React from 'react';
import ClassNames from 'classnames';
import './copy-to-clipboard.scss';

export interface CopyToClipboardProps {
  copyText?: string;
  label?: string | null;
  tooltip?: string | null;
  copiedTooltip?: string;
  className?: string;
}

export default function CopyToClipboard({
  copyText = '',
  label = null,
  tooltip = null,
  copiedTooltip = 'Copied',
  className = '',
}: CopyToClipboardProps) {
  const button = (
    <button
      className={ClassNames(
        'usa-button',
        'usx-button',
        'usx-button--ghost',
        'usx-copy',
        className
      )}
      onClick={() => window.navigator.clipboard.writeText(copyText)}
      type="button"
    >
      <svg className="usa-icon usx-copy__copy" aria-hidden="true" focusable="false" role="img">
        <use href="./img/sprite.svg#content_copy" />
      </svg>
      <svg className="usa-icon usx-copy__check" aria-hidden="true" focusable="false" role="img">
        <use href="./img/sprite.svg#check" />
      </svg>
      {label && <span className="margin-left-1">{label}</span>}
    </button>
  );

  return (
    <span className="usx-tooltip">
      {button}
      {tooltip && <span className="usa-tooltip__body usa-tooltip__body--right usx-copy__tooltip--copy" role="tooltip">{tooltip}</span>}
      <span className="usa-tooltip__body usa-tooltip__body--right usx-copy__tooltip--copied" role="tooltip">{copiedTooltip}</span>
    </span>
  );
}
