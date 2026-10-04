import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipProps } from '../tooltip/Tooltip';

function copyTextToClipboard(text: string) {
  if (window.navigator.clipboard) {
    return window.navigator.clipboard.writeText(text);
  }
}

export interface CopyToClipboardProps {
  copyText?: string;
  label?: string | null;
  tooltipProps?: TooltipProps & { copiedTooltip?: string };
  staticBaseUrl?: string;
  className?: string;
}

export default function CopyToClipboard({
  copyText = '',
  label = null,
  tooltipProps,
  staticBaseUrl,
  className = '',
}: CopyToClipboardProps) {
  const button = (
    <Button
      ghost={true}
      className={ClassNames('usx-copy', className)}
      onClick={() => copyTextToClipboard(copyText)}
      type="button"
    >
      <Icon name="content_copy" size={0} className="usx-copy__copy" staticBaseUrl={staticBaseUrl} />
      <Icon name="check" size={0} className="usx-copy__check" staticBaseUrl={staticBaseUrl} />
      {label && <span className="margin-left-1">{label}</span>}
    </Button>
  );

  if (!tooltipProps) return button;

  const { label: tooltipLabel, copiedTooltip = 'Copied', ...tooltipOptions } = tooltipProps;

  return (
    <Tooltip
      {...tooltipOptions}
      label={(
        <>
          <span className="usx-copy__tooltip--copy">{tooltipLabel}</span>
          <span className="usx-copy__tooltip--copied">{copiedTooltip}</span>
        </>
      )}
    >
      {button}
    </Tooltip>
  );
}
