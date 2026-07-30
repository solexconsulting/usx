import React from 'react';
import Tooltip from '../../../../core/src/components/tooltip/Tooltip.tsx';
import Button from '../../../../core/src/components/button/Button.tsx';
import config from '../../../../core/src/components/tooltip/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS-Inspired/Tooltip',
  component: Tooltip,
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  OnButton: {
    label: 'Helpful info',
    position: 'top',
  },
  Top: {
    label: 'Top tooltip',
    position: 'top',
  },
  Bottom: {
    label: 'Bottom tooltip',
    position: 'bottom',
  },
  Left: {
    label: 'Left tooltip',
    position: 'left',
  },
  Right: {
    label: 'Right tooltip',
    position: 'right',
  },
  OnLink: {
    label: 'Helpful info',
    position: 'right',
  },
  OnIcon: {
    label: 'More information',
    position: 'right',
  },
  OnAbbreviation: {
    label: 'Social Security Number',
    position: 'right',
  },
};

export const OnButton = {
  render: () => (
    <Tooltip {...storyDefs.OnButton}>
      <Button>Hover me</Button>
    </Tooltip>
  )
};

export const Top = {
  render: () => (
    <Tooltip {...storyDefs.Top}>
      <Button>Top</Button>
    </Tooltip>
  )
};

export const Bottom = {
  render: () => (
    <Tooltip {...storyDefs.Bottom}>
      <Button>Bottom</Button>
    </Tooltip>
  )
};

export const Left = {
  render: () => (
    <Tooltip {...storyDefs.Left}>
      <Button>Left</Button>
    </Tooltip>
  )
};

export const Right = {
  render: () => (
    <Tooltip {...storyDefs.Right}>
      <Button>Right</Button>
    </Tooltip>
  )
};

export const OnLink = {
  render: () => (
    <Tooltip {...storyDefs.OnLink}>
      <a href="#" className="usa-link usx-link">Hover over this link</a>
    </Tooltip>
  )
};

export const OnIcon = {
  render: () => (
    <Tooltip {...storyDefs.OnIcon}>
      <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img" tabIndex={0}>
        <use href="./img/sprite.svg#info" />
      </svg>
    </Tooltip>
  )
};

export const OnAbbreviation = {
  render: () => (
    <Tooltip {...storyDefs.OnAbbreviation}>
      <abbr title="" tabIndex={0}>SSN</abbr>
    </Tooltip>
  )
};
