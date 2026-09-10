import MemorableDate from '../../../../core/src/components/memorable-date/MemorableDate.jsx';
import config from '../../../../core/src/components/memorable-date/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/MemorableDate',
  component: MemorableDate,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'memorable-date',
  },
  Disabled: {
    id: 'memorable-date-disabled',
    disabled: true,
  },
  AriaDisabled: {
    id: 'memorable-date-aria-disabled',
    ariaDisabled: true,
  },
  Required: {
    id: 'memorable-date-required',
    required: true,
  },
  WithDefaultValues: {
    id: 'memorable-date-default-value',
    defaultMonth: '5',
    defaultDay: '22',
    defaultYear: '1990',
  },
  WithError: {
    id: 'memorable-date-error',
    defaultDay: '32',
    defaultYear: '1990',
    error: 'Enter a valid date of birth.',
  },
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const AriaDisabled = { args: storyDefs.AriaDisabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValues = { args: storyDefs.WithDefaultValues };
export const WithError = { args: storyDefs.WithError };
