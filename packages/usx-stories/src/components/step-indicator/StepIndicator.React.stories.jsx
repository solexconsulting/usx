// import React from 'react';
import StepIndicator from '../../../../core/src/components/step-indicator/StepIndicator.tsx';
import config from '../../../../core/src/components/step-indicator/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USWDS/StepIndicator',
  component: StepIndicator,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const defaultSteps = [
  { label: 'Personal information' },
  { label: 'Household status' },
  { label: 'Supporting documents' },
  { label: 'Signature' },
  { label: 'Review and submit' },
];

export const storyDefs = {
  Default: { steps: defaultSteps, currentStep: 3 },
  NoLabels: { steps: defaultSteps, currentStep: 3, variant: 'no-labels' },
  Centered: { steps: defaultSteps, currentStep: 3, variant: 'center' },
  Counters: { steps: defaultSteps, currentStep: 3, variant: 'counters' },
  CountersSmall: { steps: defaultSteps, currentStep: 3, variant: 'counters-sm' },
};

export const Default = { args: storyDefs.Default };
export const NoLabels = { args: storyDefs.NoLabels };
export const Centered = { args: storyDefs.Centered };
export const Counters = { args: storyDefs.Counters };
export const CountersSmall = { args: storyDefs.CountersSmall };
