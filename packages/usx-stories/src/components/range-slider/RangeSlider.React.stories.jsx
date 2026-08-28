import React from 'react';
import RangeSlider from '../../../../core/src/components/range-slider/RangeSlider.jsx';
import config from '../../../../core/src/components/range-slider/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/RangeSlider',
  component: RangeSlider,
};

const Template = (args) => <RangeSlider {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
