import ErrorMessage from '../../../../core/src/components/error-message/ErrorMessage.tsx';
import config from '../../../../core/src/components/error-message/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/ErrorMessage',
  component: ErrorMessage,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'error-1',
    children: 'Enter a valid email address.',
  },
  WithCustomClass: {
    id: 'error-2',
    children: 'Enter a valid email address.',
    className: 'text-normal text-italic',
  },
};

export const Default = { args: storyDefs.Default };
export const WithCustomClass = { args: storyDefs.WithCustomClass };
