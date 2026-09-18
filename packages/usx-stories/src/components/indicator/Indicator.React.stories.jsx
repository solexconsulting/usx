import React from 'react';
import Indicator from '../../../../usx-react/src/components/indicator/Indicator.tsx';
import config from '../../../../usx-react/src/components/indicator/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/Indicator',
  component: Indicator,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  StatusIndicator: {
    items: [{ className: 'usx-status text-primary' }],
    children: <div className="bg-base width-10 height-10" />,
  },
  TagIndicator: {
    items: [{ className: 'usa-tag usx-tag bg-primary usx-height-min', label: 'New' }],
    children: <div className="bg-base width-10 height-10" />,
  },
  ForButton: {
    items: [{ className: 'usa-tag usx-tag bg-secondary usx-height-min', label: '13' }],
    children: <button className="usa-button usx-button usa-button--outline margin-right-0">Inbox</button>,
  },
  Ping: {
    items: [{ className: 'usx-status usx-ping text-success' }],
    children: (
      <div className="usx-avatar">
        <img
          className="usx-avatar__img usx-rounded-sm"
          src="./george_washington.png"
          alt="George Washington"
          role="img"
        />
      </div>
    ),
  },
  AllPositions: {
    items: [
      { className: 'usx-indicator-top usx-indicator-start', label: '↖︎' },
      { className: 'usx-indicator-top usx-indicator-center', label: '↑' },
      { className: 'usx-indicator-top usx-indicator-end', label: '↗︎' },
      { className: 'usx-indicator-middle usx-indicator-start', label: '←' },
      { className: 'usx-indicator-middle usx-indicator-center', label: '●' },
      { className: 'usx-indicator-middle usx-indicator-end', label: '→' },
      { className: 'usx-indicator-bottom usx-indicator-start', label: '↙︎' },
      { className: 'usx-indicator-bottom usx-indicator-center', label: '↓' },
      { className: 'usx-indicator-bottom usx-indicator-end', label: '↘︎' },
    ],
    children: <div className="bg-base" style={{ height: '100px', width: '100px' }} />,
  },
};

export const StatusIndicator = { args: storyDefs.StatusIndicator };
export const TagIndicator = { args: storyDefs.TagIndicator };
export const ForButton = { args: storyDefs.ForButton };
export const Ping = { args: storyDefs.Ping };
export const AllPositions = { args: storyDefs.AllPositions };

