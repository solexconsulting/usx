import React from 'react';
import Switch from '../../../../usx-react/src/components/switch/Switch.tsx';
import config from '../../../../usx-react/src/components/switch/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';


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
  WithLabel: { id: 'switch-with-label', label: 'Switch Label' },
};

export default {
  title: 'React/USX/Switch',
  component: Switch,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const XS = { args: storyDefs.XS };
export const SM = { args: storyDefs.SM };
export const MD = { args: storyDefs.MD };
export const LG = { args: storyDefs.LG };
export const XL = { args: storyDefs.XL };
export const Primary = { args: storyDefs.Primary };
export const Success = { args: storyDefs.Success };
export const Warning = { args: storyDefs.Warning };
export const Error = { args: storyDefs.Error };
export const PreChecked = { args: storyDefs.PreChecked };
export const Disabled = { args: storyDefs.Disabled };
export const DisabledChecked = { args: storyDefs.DisabledChecked };
export const WithLabel = { args: storyDefs.WithLabel };

export const Indeterminate = {
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
