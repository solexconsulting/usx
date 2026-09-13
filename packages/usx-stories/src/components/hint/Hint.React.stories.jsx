import Hint from '../../../../core/src/components/hint/Hint.tsx';
import config from '../../../../core/src/components/hint/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Hint',
  component: Hint,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'hint-1',
    children: 'Enter your full legal name.',
  },
  WithCustomClass: {
    id: 'hint-2',
    children: 'Enter your full legal name.',
    className: 'text-bold text-italic',
  },
};

export const Default = { args: storyDefs.Default };
export const WithCustomClass = { args: storyDefs.WithCustomClass };
