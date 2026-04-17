import React from 'react';
import Tooltip from './Tooltip';
import Button from '../button/Button';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const OnButton = {
  render: () => (
    <Tooltip label="Helpful info">
      <Button>Hover me</Button>
    </Tooltip>
  )
};

export const Top = {
  render: () => (
    <Tooltip label="Top tooltip" position="top">
      <Button>Top</Button>
    </Tooltip>
  )
};

export const Bottom = {
  render: () => (
    <Tooltip label="Bottom tooltip" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
  )
};

export const Left = {
  render: () => (
    <Tooltip label="Left tooltip" position="left">
      <Button>Left</Button>
    </Tooltip>
  )
};

export const Right = {
  render: () => (
    <Tooltip label="Right tooltip" position="right">
      <Button>Right</Button>
    </Tooltip>
  )
};

export const OnLink = {
  render: () => (
    <Tooltip label="Helpful info">
      <a href="#" className="usa-link usx-link">Hover over this link</a>
    </Tooltip>
  )
};

export const OnIcon = {
  render: () => (
    <Tooltip label="More information" position="right">
      <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img" tabIndex={0}>
        <use href="/img/sprite.svg#info" />
      </svg>
    </Tooltip>
  )
};

export const OnAbbreviation = {
  render: () => (
    <Tooltip label="Social Security Number" position="right">
      <abbr title="" tabIndex={0}>SSN</abbr>
    </Tooltip>
  )
};
