import React from 'react';
import Swap from './Swap';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';
import Icon from '../icon/Icon';

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
  'View More / View Less': {
    ...commonArgs,
    className: 'maxw-mobile',
    onContent: (
      <>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button type="button" className="usa-button usa-button--secondary">View Less</button>
      </>
    ),
    offContent: (
      <>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>
        <button type="button" className="usa-button usa-button--secondary">View More</button>
      </>
    ),
    onClassName: 'display-flex flex-column gap-2',
    offClassName: 'display-flex flex-column gap-2',
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
};

export default {
  title: 'React/Swap',
  component: Swap,
  tags: ['autodocs'],
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

export const ViewMoreViewLess = {
  args: storyDefs['View More / View Less'],
};

export const AdvancedCustomChildren = {
  args: storyDefs['Advanced - Custom Children'],
};
