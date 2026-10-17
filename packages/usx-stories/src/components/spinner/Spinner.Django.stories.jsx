import React, { useState, useEffect } from 'react';
import config from '../../../../usx-react/src/components/spinner/config.json';
import { buildArgTypes, createDjangoStory, createBulkDjangoStory, getComponentHtml, componentTag } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Spinner.React.stories.jsx';

export default {
  title: 'Django/USX/Spinner',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'spinner' });

export const Default = createStory(storyDefs.Default);
export const OmitLabel = createStory(storyDefs.OmitLabel);
export const WithLabel = createStory(storyDefs.WithLabel);
export const WithScreenReaderLabel = createStory(storyDefs.WithScreenReaderLabel);
export const Small = createStory(storyDefs.Small);
export const Large = createStory(storyDefs.Large);
export const WithColor = createStory(storyDefs.WithColor);

const flexRow = ({ children }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>{children}</div>
);
const invertedRow = (extraClasses) =>
  function InvertedRow({ children }) {
    return (
      <div className={`bg-surface-inverse padding-3 display-inline-flex gap-4 flex-align-center${extraClasses}`}>
        {children}
      </div>
    );
  };

export const DifferentSizes = createBulkDjangoStory(
  'spinner',
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((size) => ({ props: { size } })),
  flexRow
);

export const DifferentColors = createBulkDjangoStory(
  'spinner',
  ['primary', 'secondary', 'accent-cool', 'error', 'success'].map((color) => ({ props: { size: 4, color } })),
  flexRow
);

export const DifferentSizesOnInvertedBackground = createBulkDjangoStory(
  'spinner',
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((size) => ({ props: { size, color: 'inverse' } })),
  invertedRow('')
);

export const DifferentColorsOnInvertedBackground = createBulkDjangoStory(
  'spinner',
  ['base', 'primary-light', 'secondary-light', 'accent-cool-light'].map((color) => ({ props: { size: 4, color } })),
  invertedRow(' text-inverse')
);

const SpinnerWithTooltip = (args) => {
  const [spinnerHtml, setSpinnerHtml] = useState('');
  const [tooltipHtml, setTooltipHtml] = useState('');
  // Keyed on the serialized args so a new-but-equal args object doesn't refetch.
  const argsKey = JSON.stringify(args);

  useEffect(() => {
    getComponentHtml('spinner', storyDefs.OmitLabel).then(setSpinnerHtml);
  }, []);

  useEffect(() => {
    if (!spinnerHtml) return;
    setTooltipHtml('');
    getComponentHtml('tooltip', { ...JSON.parse(argsKey), children: spinnerHtml }).then(setTooltipHtml);
  }, [spinnerHtml, argsKey]);

  if (!tooltipHtml) return null;
  return <div dangerouslySetInnerHTML={{ __html: tooltipHtml }} />;
};

export const WithTooltip = {
  args: {
    label: 'Loading...',
    position: 'top',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tooltip', props: { label: 'Loading...', position: 'top' }, children: componentTag({ name: 'spinner', props: storyDefs.OmitLabel }) } )
      }
    }
  },
  render: (args) => <SpinnerWithTooltip {...args} />,
};
