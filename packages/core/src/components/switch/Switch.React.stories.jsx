import React from 'react';
import Switch from './Switch';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';


export const storyDefs = {
  Default: { id: 'switch-1' },
  XS: { id: 'switch-xs', size: 'xs' },
  SM: { id: 'switch-sm', size: 'sm' },
  MD: { id: 'switch-md', size: 'md' },
  LG: { id: 'switch-lg', size: 'lg' },
  XL: { id: 'switch-xl', size: 'xl' },
  Primary: { id: 'switch-primary', variant: 'primary', defaultChecked: true },
  Success: { id: 'switch-success', variant: 'success', defaultChecked: true },
  Warning: { id: 'switch-warning', variant: 'warning', defaultChecked: true },
  Error: { id: 'switch-error', variant: 'error', defaultChecked: true },
  PreChecked: { id: 'switch-prechecked', defaultChecked: true },
  Disabled: { id: 'switch-disabled', disabled: true },
  DisabledChecked: { id: 'switch-disabled-checked', disabled: true, defaultChecked: true },
};

export default {
  title: 'React/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const XS = { name: 'Extra small', args: storyDefs.XS };
export const SM = { name: 'Small', args: storyDefs.SM };
export const MD = { name: 'Medium', args: storyDefs.MD };
export const LG = { name: 'Large', args: storyDefs.LG };
export const XL = { name: 'Extra large', args: storyDefs.XL };
export const Primary = { name: 'Primary', args: storyDefs.Primary };
export const Success = { name: 'Success', args: storyDefs.Success };
export const Warning = { name: 'Warning', args: storyDefs.Warning };
export const Error = { name: 'Error', args: storyDefs.Error };
export const PreChecked = { name: 'Pre-checked', args: storyDefs.PreChecked };
export const Disabled = { name: 'Disabled', args: storyDefs.Disabled };
export const DisabledChecked = { name: 'Disabled Checked', args: storyDefs.DisabledChecked };

export const Indeterminate = {
  name: 'Indeterminate',
  render: () => {
    const Indet = () => {
      const ref = React.useRef(null);
      React.useEffect(() => {
        if (ref.current) ref.current.indeterminate = true;
      }, []);
      return <input ref={ref} className="usx-switch" type="checkbox" aria-checked="mixed" />;
    };
    return <Indet />;
  },
};

export const WithLabel = {
  name: 'With label',
  args: { ...storyDefs.Default, label: 'Switch Label' },
};
