import React, { useState, useEffect } from 'react';
import config from '../../../../core/src/components/spinner/config.json';
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
export const Small = createStory(storyDefs.Small);
export const Large = createStory(storyDefs.Large);
export const WithColor = createStory(storyDefs.WithColor);

export const DifferentSizes = createBulkDjangoStory('spinner', [
  { storyName: 'size 1', props: { size: 1 } },
  { storyName: 'size 2', props: { size: 2 } },
  { storyName: 'size 3', props: { size: 3 } },
  { storyName: 'size 4', props: { size: 4 } },
  { storyName: 'size 5', props: { size: 5 } },
  { storyName: 'size 6', props: { size: 6 } },
  { storyName: 'size 7', props: { size: 7 } },
  { storyName: 'size 8', props: { size: 8 } },
  { storyName: 'size 9', props: { size: 9 } }
]);

export const DifferentColors = createBulkDjangoStory('spinner', [
  { props: { size: 4, color: 'primary' } },
  { props: { size: 4, color: 'secondary' } },
  { props: { size: 4, color: 'accent-cool' } },
  { props: { size: 4, color: 'error' } },
  { props: { size: 4, color: 'success' } }
]);

export const DifferentSizesOnDarkBackground = createBulkDjangoStory('spinner', [
  { storyName: 'size 1', props: { size: 1, color: 'white' } },
  { storyName: 'size 2', props: { size: 2, color: 'white' } },
  { storyName: 'size 3', props: { size: 3, color: 'white' } },
  { storyName: 'size 4', props: { size: 4, color: 'white' } },
  { storyName: 'size 5', props: { size: 5, color: 'white' } },
  { storyName: 'size 6', props: { size: 6, color: 'white' } },
  { storyName: 'size 7', props: { size: 7, color: 'white' } },
  { storyName: 'size 8', props: { size: 8, color: 'white' } },
  { storyName: 'size 9', props: { size: 9, color: 'white' } }
], null, ({children}) => (
  <div
    className="bg-ink padding-3 display-flex flex-row flex-wrap grid-gap-lg flex-align-center text-white"
    style={{ gap: '1rem' }}
  >
    {children}
  </div>
));

export const DifferentColorsOnDarkBackground = createBulkDjangoStory('spinner', [
  { props: { size: 4, color: 'base-lightest' } },
  { props: { size: 4, color: 'primary-light' } },
  { props: { size: 4, color: 'secondary-light' } },
  { props: { size: 4, color: 'accent-cool-light' } }
], null, ({children}) => (
  <div
    className="bg-ink padding-3 display-flex flex-row flex-wrap grid-gap-lg flex-align-center text-white"
    style={{ gap: '1rem' }}
  >
    {children}
  </div>
));

const omittedLabelProps = {
  size: 4,
  omitLabel: true,
  label: 'Loading...'
};

export const OmittedLabel = createStory(omittedLabelProps);

const SpinnerWithTooltip = (args) => {
  const [spinnerHtml, setSpinnerHtml] = useState('');
  const [tooltipHtml, setTooltipHtml] = useState('');
  // Keyed on the serialized args so a new-but-equal args object doesn't refetch.
  const argsKey = JSON.stringify(args);

  useEffect(() => {
    getComponentHtml('spinner', omittedLabelProps).then(setSpinnerHtml);
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
        code: componentTag({ name: 'tooltip', props: { label: 'Loading...', position: 'top' }, children: componentTag({ name: 'spinner', props: omittedLabelProps }) } )
      }
    }
  },
  render: (args) => <SpinnerWithTooltip {...args} />,
};
