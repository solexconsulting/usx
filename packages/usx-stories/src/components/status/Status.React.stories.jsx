import React from 'react';
import Status from '../../../../usx-react/src/components/status/Status.tsx';
import config from '../../../../usx-react/src/components/status/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/Status',
  component: Status,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs', 'renderAllVariants', 'colorProps', 'sizeProps', 'animationProps'],
};

export const storyDefs = {
  Default: {},
  Primary: { color: 'primary' },
  AccentCool: { color: 'accent-cool' },
  AccentWarm: { color: 'accent-warm' },
  Secondary: { color: 'secondary' },
  Success: { color: 'success' },
  Warning: { color: 'warning' },
  Error: { color: 'error' },
  SizeXs: { size: 'xs' },
  SizeSm: { size: 'sm' },
  SizeMd: { size: 'md' },
  SizeLg: { size: 'lg' },
  SizeXl: { size: 'xl' },
  Ping: { color: 'primary', animation: 'ping' },
  Pulse: { color: 'primary', animation: 'pulse' },
  Bounce: { color: 'primary', animation: 'bounce' },
};

export const Default = { args: storyDefs.Default };
export const Primary = { args: storyDefs.Primary };
export const AccentCool = { args: storyDefs.AccentCool };
export const AccentWarm = { args: storyDefs.AccentWarm };
export const Secondary = { args: storyDefs.Secondary };
export const Success = { args: storyDefs.Success };
export const Warning = { args: storyDefs.Warning };
export const Error = { args: storyDefs.Error };
export const SizeXs = { name: 'Size: xs', args: storyDefs.SizeXs };
export const SizeSm = { name: 'Size: sm', args: storyDefs.SizeSm };
export const SizeMd = { name: 'Size: md', args: storyDefs.SizeMd };
export const SizeLg = { name: 'Size: lg', args: storyDefs.SizeLg };
export const SizeXl = { name: 'Size: xl', args: storyDefs.SizeXl };
export const Ping = { args: storyDefs.Ping };
export const Pulse = { args: storyDefs.Pulse };
export const Bounce = { args: storyDefs.Bounce };

export const colorProps = [undefined, 'primary', 'accent-cool', 'accent-warm', 'secondary', 'success', 'warning', 'error'].map(
  (color) => (color ? { color } : {})
);
export const sizeProps = ['xs', 'sm', 'md', 'lg', 'xl'].map((size) => ({ color: 'primary', size }));
export const animationProps = ['ping', 'pulse', 'bounce'].map((animation) => ({ color: 'primary', animation }));

// Shared with the Django stories, which pass in a renderer for the Django-rendered status.
export const renderAllVariants = (renderStatus, props, gap) => (
  <div style={{ display: 'flex', gap, alignItems: 'center' }}>
    {props.map((statusProps, index) => (
      <React.Fragment key={index}>{renderStatus(statusProps)}</React.Fragment>
    ))}
  </div>
);

export const AllColors = {
  render: () => renderAllVariants((props) => <Status {...props} />, colorProps, '0.75rem'),
};

export const AllSizes = {
  render: () => renderAllVariants((props) => <Status {...props} />, sizeProps, '0.75rem'),
};

export const AllAnimations = {
  render: () => renderAllVariants((props) => <Status {...props} />, animationProps, '1.5rem'),
};
