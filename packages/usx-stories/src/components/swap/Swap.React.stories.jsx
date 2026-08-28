import React from 'react';
import Swap from '../../../../core/src/components/swap/Swap.tsx';
import config from '../../../../core/src/components/swap/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import Icon from '../../../../core/src/components/icon/Icon.tsx';

const commonArgs = {
  className: '',
  variant: 'default',
};

export const storyDefs = {
  Default: {
    ...commonArgs,
    onContent: 'ON',
    offContent: 'OFF',
  },
  'Default - Icon': {
    ...commonArgs,
    onContent: <Icon name="visibility" size={4} />,
    offContent: <Icon name="info" size={4} />,
  },
  'Active - Always On': {
    ...commonArgs,
    variant: 'active',
    includeInput: false,
    onContent: 'ACTIVE',
    offContent: 'INACTIVE',
  },
  'Rotate - Text': {
    ...commonArgs,
    variant: 'rotate',
    onContent: 'Hello',
    offContent: 'Goodbye',
  },
  'Rotate - Icon': {
    ...commonArgs,
    variant: 'rotate',
    onContent: <Icon name="security" size={4} />,
    offContent: <Icon name="support_agent" size={4} />,
  },
  'Flip - Text': {
    ...commonArgs,
    variant: 'flip',
    onContent: '👍',
    offContent: '👎',
  },
  'Flip - Emoji': {
    ...commonArgs,
    variant: 'flip',
    onContent: '😊',
    offContent: '😞',
  },
  'Color Change - Icon': {
    ...commonArgs,
    onContent: <Icon name="check_circle" size={4} color="success" />,
    offContent: <Icon name="check_circle" size={4} color="error" />,
  },
  'Advanced - Custom Children': {
    ...commonArgs,
    children: (
      <>
        <input type="checkbox" autoComplete="off" />
        <span className="usx-swap-on">Custom ON</span>
        <span className="usx-swap-off">Custom OFF</span>
      </>
    ),
  },
  'Trigger Alert On Swap': {
    ...commonArgs,
    onContent: 'ON',
    offContent: 'OFF',
    inputProps: {
      onChange: () => alert('Swap triggered!'),
    },
  },
};

export default {
  title: 'React/USX/Swap',
  component: Swap,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = {
  args: storyDefs.Default,
};

export const DefaultIcon = {
  args: storyDefs['Default - Icon'],
};

export const ActiveAlwaysOn = {
  args: storyDefs['Active - Always On'],
};

export const RotateText = {
  args: storyDefs['Rotate - Text'],
};

export const RotateIcon = {
  args: storyDefs['Rotate - Icon'],
};

export const FlipText = {
  args: storyDefs['Flip - Text'],
};

export const FlipEmoji = {
  args: storyDefs['Flip - Emoji'],
};

export const ColorChangeIcon = {
  args: storyDefs['Color Change - Icon'],
};

export const AdvancedCustomChildren = {
  args: storyDefs['Advanced - Custom Children'],
};

export const TriggerAlertOnSwap = {
  args: storyDefs['Trigger Alert On Swap'],
};
