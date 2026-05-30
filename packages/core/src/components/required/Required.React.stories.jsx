import Required from './Required';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Required',
  component: Required,
  tags: ['autodocs'],
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