import CheckboxGroup from '../../../../core/src/components/checkbox-group/CheckboxGroup.tsx';
import config from '../../../../core/src/components/checkbox-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS-Inspired/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['USWDS-Inspired', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: generatedArgTypes,
};

const options = [
  { value: 'sojourner-truth', label: 'Sojourner Truth' },
  { value: 'frederick-douglass', label: 'Frederick Douglass' },
  { value: 'booker-t-washington', label: 'Booker T. Washington' },
  { value: 'george-washington-carver', label: 'George Washington Carver', disabled: true },
];

const optionsWithDescriptions = [
  {
    value: 'sojourner-truth',
    label: 'Sojourner Truth',
    description: 'A prominent abolitionist and women\'s rights activist.',
  },
  {
    value: 'frederick-douglass',
    label: 'Frederick Douglass',
    description: 'A former enslaved person who became a national leader of the abolitionist movement.',
  },
];

export const storyDefs = {
  Default: {
    id: 'historical-figures',
    name: 'historical-figures',
    legend: 'Select any that apply',
    options,
  },
  WithDescriptions: {
    id: 'historical-figures-with-descriptions',
    name: 'historical-figures-with-descriptions',
    legend: 'Select any that apply',
    options: optionsWithDescriptions,
  },
  WithHint: {
    id: 'historical-figures-hint',
    name: 'historical-figures-hint',
    legend: 'Select any that apply',
    hint: 'Choose all that apply.',
    options,
  },
  WithError: {
    id: 'historical-figures-error',
    name: 'historical-figures-error',
    legend: 'Select any that apply',
    error: 'Select at least one option.',
    options,
  },
  Tile: {
    id: 'tile-options',
    name: 'tile-options',
    legend: 'Select any that apply',
    tile: true,
    options,
  },
  Small: {
    id: 'small-options',
    name: 'small-options',
    legend: 'Select any that apply',
    small: true,
    options,
  },
};

export const Default = {
  args: storyDefs.Default,
};

export const WithDescriptions = {
  args: storyDefs.WithDescriptions,
};

export const WithHint = {
  args: storyDefs.WithHint,
};

export const WithError = {
  args: storyDefs.WithError,
};

export const Tile = {
  args: storyDefs.Tile,
};

export const Small = {
  args: storyDefs.Small,
};
