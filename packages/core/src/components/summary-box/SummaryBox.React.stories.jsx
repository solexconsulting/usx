import React from 'react';
import SummaryBox from './SummaryBox';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';
import List from '../list/List';
import IconList from '../icon-list/IconList';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/SummaryBox',
  component: SummaryBox,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  ExecutiveSummary: {
    heading: 'Program summary: Winter Relief 2026',
    content: 'This page tracks a 12-week emergency housing initiative serving 4 counties. Use the summaries below to review what happened, what changed, and what decisions remain.',
  },
  StoryStep1Context: {
    heading: 'Step 1: Starting conditions',
    content: 'At launch, 1,840 households were on waitlists, average placement time was 19 days, and only 2 shelters had overnight capacity during severe weather events.',
  },
  StoryStep2Actions: {
    heading: 'Step 2: Actions completed',
    content: 'Teams expanded outreach coverage, opened two temporary warming sites, added weekend processing, and launched an SMS intake path for applicants without reliable internet.',
  },
  StoryStep3Outcomes: {
    heading: 'Step 3: Measured outcomes',
    content: 'Waitlist volume decreased 37%, median placement time improved from 19 to 11 days, and no-weather-exposure incidents were reported at participating overnight sites.',
  },
  StoryStep4Decision: {
    heading: 'Step 4: Decision points for leadership',
    content: 'Leadership must decide whether to fund weekend processing permanently and whether to scale SMS intake statewide before the next forecasted severe-weather cycle.',
  },
  ChildrenPriority: {
    heading: 'Children priority demo',
    content: 'This narrative should not render because children is provided.',
    children: 'Children content takes priority and can be used for tailored, page-specific summaries.',
  },
};

export const ExecutiveSummary = { args: storyDefs.ExecutiveSummary };
export const StoryStep1Context = { args: storyDefs.StoryStep1Context };
export const StoryStep2Actions = { args: storyDefs.StoryStep2Actions };
export const StoryStep3Outcomes = { args: storyDefs.StoryStep3Outcomes };
export const StoryStep4Decision = { args: storyDefs.StoryStep4Decision };
export const ChildrenPriority = { args: storyDefs.ChildrenPriority };

export const WithListComponent = {
  name: 'Action plan summary',
  args: {
    heading: '90-day action plan summary',
    children: (
      <List
        items={[
          'Stabilize intake operations in counties with longest wait times.',
          'Train partner shelters on standardized eligibility checks.',
          'Publish weekly placement dashboard for transparency.',
          'Prepare budget scenarios for permanent weekend staffing.',
        ]}
      />
    ),
  },
};

export const WithIconHighlights = {
  name: 'KPI highlights summary',
  args: {
    heading: 'Weekly KPI highlights',
    children: (
      <IconList
        items={[
          {
            iconName: 'check_circle',
            iconColor: 'success',
            content: 'Placement target exceeded by 8% this week.',
          },
          {
            iconName: 'warning',
            iconColor: 'warning',
            content: 'Two sites are at risk of capacity saturation in 10 days.',
          },
          {
            iconName: 'trending_up',
            iconColor: 'primary',
            content: 'Referral completion rate improved 14% month over month.',
          },
        ]}
      />
    ),
  },
};
