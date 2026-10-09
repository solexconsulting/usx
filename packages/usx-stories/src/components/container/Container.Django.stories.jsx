import React from 'react';
import Container from '../../../../usx-react/src/components/container/Container.tsx';
import config from '../../../../usx-react/src/components/container/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, storyDescriptions } from './Container.React.stories.jsx';

export default {
  title: 'Django/USX/Container',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [(Story) => <Container className="padding-2 tablet:padding-3"><Story /></Container>],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A generic grouping container with opt-in flex and USWDS grid layout. Responsive settings inherit from the base values and override individual properties at mobileLg, tablet, and desktop. Place grid columns directly inside a grid row and use gutters for their spacing. The shared examples render the outer container through Django.',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'container' });

const compositionStory = (name) => {
  const story = createStory(storyDefs[name]);
  return {
    ...story,
    parameters: {
      ...story.parameters,
      docs: {
        ...story.parameters.docs,
        description: { story: storyDescriptions[name] },
      },
    },
  };
};

export const Default = createStory(storyDefs.Default);
export const ResponsiveStack = createStory(storyDefs.ResponsiveStack);
export const ResponsiveGrid = createStory(storyDefs.ResponsiveGrid);
export const AsymmetricGrid = createStory(storyDefs.AsymmetricGrid);
export const FlexibleItems = createStory(storyDefs.FlexibleItems);
export const SemanticList = createStory(storyDefs.SemanticList);
export const ResponsiveVisibility = createStory(storyDefs.ResponsiveVisibility);
export const FloatContainment = createStory(storyDefs.FloatContainment);
export const DeeplyNestedApplicationWorkspace = compositionStory('DeeplyNestedApplicationWorkspace');
export const ResponsiveActionBar = compositionStory('ResponsiveActionBar');
export const ServiceComparison = compositionStory('ServiceComparison');
export const CommunityEvent = compositionStory('CommunityEvent');
export const ServiceDirectory = compositionStory('ServiceDirectory');
export const EditorialFeature = compositionStory('EditorialFeature');
export const ContactDirectory = compositionStory('ContactDirectory');
export const ResourceCenter = compositionStory('ResourceCenter');
export const SearchResultsWorkspace = compositionStory('SearchResultsWorkspace');
export const ProgramDashboard = compositionStory('ProgramDashboard');
export const ApplicationReview = compositionStory('ApplicationReview');
export const AppointmentSummary = compositionStory('AppointmentSummary');
