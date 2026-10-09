import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import Toggle from '../../../../usx-react/src/components/toggle/Toggle.tsx';
import config from '../../../../usx-react/src/components/toggle/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';


export const storyDefs = {
  Default: {
    id: 'alignment',
    ariaLabel: 'Text alignment',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' }
    ],
    defaultValue: 'center',
    variant: 'text',
    name: 'toggle-example'
  },
  IconVariant: {
    id: 'transport-mode',
    ariaLabel: 'Transport mode',
    variant: 'icon',
    options: [
      { value: 'bike', label: 'Bike', icon: 'directions_bike' },
      { value: 'bus', label: 'Bus', icon: 'directions_bus' },
      { value: 'flight', label: 'Flight', icon: 'flight' }
    ],
    defaultValue: 'bus',
    name: 'transport-mode'
  },
  Controlled: {
    id: 'controlled-toggle',
    ariaLabel: 'Controlled selection',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    value: 'option2',
    name: 'controlled-toggle'
  },
  Required: { id: 'required-toggle', ariaLabel: 'Delivery method', name: 'delivery', required: true, options: [{ value: 'Email', label: 'Email' }, { value: 'Post', label: 'Post' }] },
  Numeric: { id: 'numeric-toggle', ariaLabel: 'Items per page', name: 'page-size', options: [{ value: 0, label: '0' }, { value: 10, label: '10' }, { value: 25, label: '25' }], defaultValue: 0 },
  TotallyDisabled: {
    id: 'disabled-toggle',
    ariaLabel: 'Unavailable choices',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    disabled: true,
    name: 'disabled-toggle'
  },
  PartiallyDisabled: {
    id: 'partially-disabled-toggle',
    ariaLabel: 'Available choices',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ],
    defaultValue: 'option1',
    name: 'partially-disabled-toggle'
  }
};

export default {
  title: 'React/USWDS-Inspired/Toggle',
  component: Toggle,
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Icon = { args: storyDefs.IconVariant };
export const Controlled = {
  args: storyDefs.Controlled,
  render: function ControlledToggle(args) {
    const [value, setValue] = useState(args.value);
    return <><Toggle {...args} value={value} onChange={setValue} /><p>Selected: {value}</p></>;
  },
};
export const TotallyDisabled = { args: storyDefs.TotallyDisabled };
export const PartiallyDisabled = {
  args: storyDefs.PartiallyDisabled,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('radio', { name: 'Option 1' });
    await userEvent.click(canvas.getByText('Option 1', { selector: 'span' }));
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: 'Option 3' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Option 2' })).toBeDisabled();
    await userEvent.keyboard('{ArrowRight}');
    await expect(first).toBeChecked();
  },
};

export const Required = {
  args: storyDefs.Required,
  render: (args) => <form onSubmit={(event) => event.preventDefault()}>
    <Toggle {...args} />
    <div className="margin-top-2"><button className="usa-button usx-button usa-button--primary" type="submit">Submit</button> <button className="usa-button usx-button usa-button--outline" type="reset">Reset</button></div>
  </form>,
};
export const Numeric = { args: storyDefs.Numeric };
