import React from 'react';
import ProcessList from '../../../../core/src/components/process-list/ProcessList.tsx';
import config from '../../../../core/src/components/process-list/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USWDS/ProcessList',
  component: ProcessList,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    items: [
      {
        heading: 'Start a process',
        body: (
          <>
            <p className="margin-top-05">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
              ipsum sed pharetra gravida, orci magna rhoncus neque.
            </p>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.</li>
              <li>Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.</li>
              <li>Aliquam erat volutpat. Sed quis velit.</li>
            </ul>
          </>
        ),
      },
      {
        heading: 'Proceed to the second step',
        body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.',
      },
      {
        heading: 'Complete the step-by-step process',
        body: 'Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.',
      },
    ],
  },
  HeadingOnly: {
    items: [
      { heading: 'Start a process.', headingTag: 'p', headingClassName: 'font-sans-xl line-height-sans-1', className: 'padding-bottom-4' },
      { heading: 'Proceed to the second step.', headingTag: 'p', headingClassName: 'font-sans-xl line-height-sans-1', className: 'padding-bottom-4' },
      { heading: 'Complete the step-by-step process.', headingTag: 'p', headingClassName: 'font-sans-xl line-height-sans-1' },
    ],
  },
  CustomSizing: {
    items: [
      {
        heading: 'Start a process.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: 'Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.',
        bodyClassName: 'font-sans-lg margin-top-1 text-light',
        className: 'padding-bottom-4',
      },
      {
        heading: 'Proceed to the second step.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: 'Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat.',
        bodyClassName: 'font-sans-lg margin-top-1 text-light',
        className: 'padding-bottom-4',
      },
      {
        heading: 'Complete the step-by-step process.',
        headingClassName: 'font-sans-xl line-height-sans-1',
        body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque.',
        bodyClassName: 'font-sans-lg margin-top-1 text-light',
      },
    ],
  },
};

export const Default = { args: storyDefs.Default };
export const HeadingOnly = { args: storyDefs.HeadingOnly };
export const CustomSizing = { args: storyDefs.CustomSizing };


