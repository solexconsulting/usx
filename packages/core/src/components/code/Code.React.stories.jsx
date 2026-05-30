
import Code from './Code';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const defaultLines = [
  { code: 'npm install @solexllc/usx', prefix: '$' },
  { code: 'installing...', prefix: '>', className: 'text-warning' },
  { code: 'Done!', prefix: '>', className: 'text-success' },
];

export const storyDefs = {
  Default: { lines: defaultLines },
  WithLineNumbers: {
    lines: [
      { code: 'npm install @solexllc/usx', prefix: '1' },
      { code: 'installing...', prefix: '2', className: 'text-warning' },
      { code: 'Done!', prefix: '3', className: 'text-success' },
    ],
  },
  HighlightedLine: {
    lines: [
      { code: 'npm install @solexllc/usx', prefix: '$' },
      { code: 'installing...', prefix: '>', className: 'text-warning' },
      { code: 'Error!', prefix: '>', className: 'text-ink bg-warning' },
    ],
  },
  LongLine: {
    lines: [
      { code: 'Magnam dolore beatae necessitatibus nemopsum itaque sit. Et porro quae qui et et dolore ratione.', prefix: '~' },
    ],
  },
  WithoutPrefix: {
    lines: [{ code: 'without prefix' }],
  },
  WithColor: {
    lines: defaultLines,
    className: 'bg-primary-darker text-magenta',
  },
  WithCopyButton: {
    lines: defaultLines,
    copyText: 'npm install @solexllc/usx\ninstalling...\nDone!',
  },
};

export default {
  title: 'React/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithLineNumbers = { args: storyDefs.WithLineNumbers };
export const HighlightedLine = { args: storyDefs.HighlightedLine };
export const LongLine = { args: storyDefs.LongLine };
export const WithoutPrefix = { args: storyDefs.WithoutPrefix };
export const WithColor = { args: storyDefs.WithColor };
export const WithCopyButton = { args: storyDefs.WithCopyButton };
