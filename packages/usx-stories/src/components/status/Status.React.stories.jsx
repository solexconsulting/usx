import React from 'react';
import Status from '../../../../usx-react/src/components/status/Status.tsx';
import config from '../../../../usx-react/src/components/status/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/Status',
  component: Status,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
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

export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Status />
      <Status color="primary" />
      <Status color="accent-cool" />
      <Status color="accent-warm" />
      <Status color="secondary" />
      <Status color="success" />
      <Status color="warning" />
      <Status color="error" />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Status color="primary" size="xs" />
      <Status color="primary" size="sm" />
      <Status color="primary" size="md" />
      <Status color="primary" size="lg" />
      <Status color="primary" size="xl" />
    </div>
  ),
};

export const AllAnimations = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Status color="primary" animation="ping" />
      <Status color="primary" animation="pulse" />
      <Status color="primary" animation="bounce" />
    </div>
  ),
};

