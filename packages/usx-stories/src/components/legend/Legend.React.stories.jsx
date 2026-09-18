import Legend from '../../../../usx-react/src/components/legend/Legend.tsx';
import config from '../../../../usx-react/src/components/legend/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Legend',
  component: Legend,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    text: 'Legend Text',
  },
  WithAdditionalClasses: {
    text: 'Legend with Additional Classes',
    className: 'text-primary',
  },
  WithRequired: {
    text: 'Legend Text',
    required: true,
  },
  Large: {
    text: 'Large Legend Text',
    large: true
  },
};

export const Default = { args: storyDefs.Default };
export const WithAdditionalClasses = { args: storyDefs.WithAdditionalClasses };
export const WithRequired = { args: storyDefs.WithRequired };
export const Large = { args: storyDefs.Large };