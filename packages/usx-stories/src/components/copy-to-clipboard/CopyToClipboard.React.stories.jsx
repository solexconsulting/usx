import React from 'react';
import CopyToClipboard from '../../../../usx-react/src/components/copy-to-clipboard/CopyToClipboard.tsx';
import config from '../../../../usx-react/src/components/copy-to-clipboard/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/CopyToClipboard',
  component: CopyToClipboard,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: { copyText: 'Example text to copy', tooltipProps: { label: 'Copy to clipboard', copiedTooltip: 'Copied' } },
  WithText: { copyText: 'Example text to copy', label: 'Copy' },
  InvertedBackground: { copyText: 'Example text to copy', tooltipProps: { label: 'Copy to clipboard', copiedTooltip: 'Copied' }, className: 'usa-button--inverse' },
  InvertedBackgroundWithText: { copyText: 'Example text to copy', label: 'Copy', className: 'usa-button--inverse' },
};

export const Default = { args: storyDefs.Default };
export const WithText = { args: storyDefs.WithText };
export const InvertedBackground = {
  args: storyDefs.InvertedBackground,
  render: (args) => (
    <div className="bg-surface-inverse padding-2">
      <CopyToClipboard {...args} />
    </div>
  )
};
export const InvertedBackgroundWithText = {
  args: storyDefs.InvertedBackgroundWithText,
  render: (args) => (
    <div className="bg-surface-inverse padding-2">
      <CopyToClipboard {...args} />
    </div>
  )
};
