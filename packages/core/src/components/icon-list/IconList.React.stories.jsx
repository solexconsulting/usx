import React from 'react';
import IconList from './IconList';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export const storyDefs = {
  Default: config.default || {},
  SimpleContent: {
    items: [
      { iconName: 'thumb_up_alt', content: 'No processing lines' },
      { iconName: 'thumb_up_alt', content: 'Access to expedited entry benefits in other countries' },
      { iconName: 'thumb_up_alt', content: 'Available at major U.S. airports' },
      { iconName: 'thumb_up_alt', content: 'Reduced wait times' },
    ],
    primary: true,
  },
  RichContent: {
    items: [
      {
        iconName: 'check_circle',
        iconColor: 'ink',
        title: 'Donate cash when possible.',
        content: '<p>Financial contributions to recognized disaster relief organizations are the fastest, most flexible and most effective method of donating. Organizations on the ground know what items and quantities are needed, often buy in bulk with discounts and, if possible, purchase through businesses local to the disaster, which supports economic recovery.</p>',
      },
      {
        iconName: 'check_circle',
        iconColor: 'ink',
        title: 'Confirm what donations are needed.',
        content: '<p>Unneeded and unsolicited goods burden local organizations’ ability to meet survivors’ confirmed needs, drawing away valuable volunteer labor, transportation and warehouse space.</p>',
      },
      {
        iconName: 'check_circle',
        iconColor: 'ink',
        title: 'Talk to trusted organizations about volunteering.',
        content: '<p>Financial contributions to recognized disaster relief organizations are the fastest, most flexible and most effective method of donating. Organizations on the ground know what items and quantities are needed, often buy in bulk with discounts and, if possible, purchase through businesses local to the disaster, which supports economic recovery.</p>',
      },
    ],
  },
  CustomSizeWithRichContent: {
    size: 'lg',
    items: [
      {
        iconName: 'attach_money',
        iconColor: 'green',
        title: 'Let the sun shine.',
        content: '<p>On sunny days, open your curtains to allow the sun to naturally warm the rooms of your home without using electricity. Natural sunlight can also lift your mood to help brighten your day. On warm days, close your curtains to help keep your house cool.</p>',
      },
      {
        iconName: 'attach_money',
        iconColor: 'green',
        title: 'Adjust your schedule.',
        content: '<p>Instead of running high-energy-use appliances such as dishwashers and clothes dryers during mid-afternoon or early evening hours, operate them early in the morning or late at night. Some utilities charge less at off-peak times, which will help reduce your costs.</p>',
      },
      {
        iconName: 'attach_money',
        iconColor: 'green',
        title: 'Fill it up.',
        content: '<p>Wash full loads, whether it’s clothes or dishes. Washing multiple small loads means you’re using and heating more water, which can increase your expenses. Using cold water for clothes washing can also help lower your costs.</p>',
      },
    ],
  },
  CustomSize: {
    size: 'lg',
    items: [
      { iconName: 'help', iconColor: 'blue', content: '<span class="text-bold">Timing.</span> Is now the right time to start a business?' },
      { iconName: 'help', iconColor: 'blue', content: '<span class="text-bold">Funding.</span> Do I have enough money to launch a business?' },
      { iconName: 'help', iconColor: 'blue', content: '<span class="text-bold">Need.</span> Will this business fill a real need for my customers?' },
    ],
  },
};

export default {
  title: 'React/IconList',
  component: IconList,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const Template = (args) => <IconList {...args} />;

export const Default = Template.bind({});
Default.args = storyDefs.Default;

export const SimpleContent = Template.bind({});
SimpleContent.args = storyDefs.SimpleContent;

export const RichContent = Template.bind({});
RichContent.args = storyDefs.RichContent;

export const CustomSizeWithRichContent = Template.bind({});
CustomSizeWithRichContent.args = storyDefs.CustomSizeWithRichContent;

export const CustomSize = Template.bind({});
CustomSize.args = storyDefs.CustomSize;
