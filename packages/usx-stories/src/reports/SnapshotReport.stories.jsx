import React from 'react';
import SnapshotReport from './SnapshotReport.jsx';

export default {
  title: 'Reports/Snapshot Tests',
  parameters: {
    options: { showPanel: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    layout: 'fullscreen'
  },
};

export const SnapshotTests = {
    render: () => <SnapshotReport />
};
