import Required from '../../../../usx-react/src/components/required/Required.tsx';
import config from '../../../../usx-react/src/components/required/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USX/Required',
  component: Required,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    children: 'This field is required',
  },
  WithCustomTitle: {
    children: 'Hover over the asterisk',
    title: 'Custom Title Example'
  },
};

export const Default = { args: storyDefs.Default };
export const WithCustomTitle = { args: storyDefs.WithCustomTitle };