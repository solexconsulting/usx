import Label from '../../../../core/src/components/label/Label.tsx';
import config from '../../../../core/src/components/label/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Label',
  component: Label,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    children: 'Label Text',
  },
  WithRequired: {
    children: 'Label Text',
    required: true,
  },
  ScreenReaderOnly: {
    children: 'Label Text',
    screenReaderOnly: true,
  },
  WithCustomClass: {
    children: 'Label Text',
    className: 'text-primary',
  },
  WithClassOverride1: {
    children: 'Label Text',
    className: 'usa-radio__label',
    classOverride: true,
  },
  WithClassOverride2: {
    children: 'Label Text',
    className: 'usa-checkbox__label',
    classOverride: true,
  },
  Error: {
    children: 'Label Text',
    error: true,
  },
};

export const Default = { args: storyDefs.Default };
export const WithRequired = { args: storyDefs.WithRequired };
export const ScreenReaderOnly = { args: storyDefs.ScreenReaderOnly };
export const WithCustomClass = { args: storyDefs.WithCustomClass };
export const WithClassOverride1 = { name: 'With Class Override (radio button)', args: storyDefs.WithClassOverride1 };
export const WithClassOverride2 = { name: 'With Class Override (checkbox)', args: storyDefs.WithClassOverride2 };
export const Error = { args: storyDefs.Error };
