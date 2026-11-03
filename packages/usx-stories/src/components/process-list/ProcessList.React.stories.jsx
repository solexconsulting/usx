import { storyDefaultArgs } from '../../utils/storyHelpers.jsx';
import React from 'react';
import ProcessList from '../../../../usx-react/src/components/process-list/ProcessList.tsx';
import config from '../../../../usx-react/src/components/process-list/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USWDS/ProcessList',
  component: ProcessList,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: storyDefaultArgs(config.default),
  HeadingOnly: {
    items: [
      { heading: 'Start a process.', headingAs: 'p', headingClassName: 'font-sans-xl line-height-sans-1', className: 'padding-bottom-4' },
      { heading: 'Proceed to the second step.', headingAs: 'p', headingClassName: 'font-sans-xl line-height-sans-1', className: 'padding-bottom-4' },
      { heading: 'Complete the step-by-step process.', headingAs: 'p', headingClassName: 'font-sans-xl line-height-sans-1' },
    ],
  },
  CustomSizing: {
    items: [
      {
        heading: 'Start a process.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: <p className="font-sans-lg margin-top-1 text-light">Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.</p>,
        className: 'padding-bottom-4',
      },
      {
        heading: 'Proceed to the second step.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: <p className="font-sans-lg margin-top-1 text-light">Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat.</p>,
        className: 'padding-bottom-4',
      },
      {
        heading: 'Complete the step-by-step process.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: <p className="font-sans-lg margin-top-1 text-light">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque.</p>,
      },
    ],
  },
};

export const Default = { args: storyDefs.Default };
export const HeadingOnly = { args: storyDefs.HeadingOnly };
export const CustomSizing = { args: storyDefs.CustomSizing };


