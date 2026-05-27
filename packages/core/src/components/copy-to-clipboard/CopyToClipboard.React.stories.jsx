import React from 'react';
import CopyToClipboard from './CopyToClipboard';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export default {
  title: 'React/CopyToClipboard',
  component: CopyToClipboard,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: { copyText: 'Example text to copy', tooltip: 'Copy to clipboard', copiedTooltip: 'Copied' },
  WithText: { copyText: 'Example text to copy', label: 'Copy' },
  DarkBackground: { copyText: 'Example text to copy', tooltip: 'Copy to clipboard', copiedTooltip: 'Copied', className: 'usa-button--inverse' },
  DarkBackgroundWithText: { copyText: 'Example text to copy', label: 'Copy', className: 'usa-button--inverse' },
};

export const Default = { args: storyDefs.Default };
export const WithText = { args: storyDefs.WithText };
export const DarkBackground = {
  args: storyDefs.DarkBackground,
  render: (args) => (
    <div className="bg-base-darkest padding-2">
      <CopyToClipboard {...args} />
    </div>
  )
};
export const DarkBackgroundWithText = {
  args: storyDefs.DarkBackgroundWithText,
  render: (args) => (
    <div className="bg-base-darkest padding-2">
      <CopyToClipboard {...args} />
    </div>
  )
};
