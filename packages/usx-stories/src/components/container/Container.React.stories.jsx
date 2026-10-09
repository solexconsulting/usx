import React from 'react';
import Container from '../../../../usx-react/src/components/container/Container.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import Prose from '../../../../usx-react/src/components/prose/Prose.tsx';
import Section from '../../../../usx-react/src/components/section/Section.tsx';
import SummaryBox from '../../../../usx-react/src/components/summary-box/SummaryBox.tsx';
import Tag from '../../../../usx-react/src/components/tag/Tag.tsx';
import config from '../../../../usx-react/src/components/container/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { applicationStoryDefs, applicationStoryDescriptions } from './applicationExamples.jsx';
import { contentStoryDefs, contentStoryDescriptions } from './contentExamples.jsx';
import { workflowStoryDefs, workflowStoryDescriptions } from './workflowExamples.jsx';

export default {
  title: 'React/USX/Container',
  component: Container,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs', 'storyDescriptions'],
  decorators: [(Story) => <Container className="padding-2 tablet:padding-3"><Story /></Container>],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An unstyled, semantic wrapper for grouping real USX components such as Card, Button, Section, and SummaryBox. Opt into flex layout, USWDS grid roles, or individual layout properties. Base values apply at every width; responsive values override only the named properties from each breakpoint upward (mobileLg, tablet, desktop). Resize the canvas to explore the examples. Use gap for flex layouts and gutters on grid rows: percentage-width grid columns already occupy the row, so adding CSS gap can push columns onto another line. Children are rendered directly, without generated item wrappers. Use className for project-specific decoration and spacing.',
      },
    },
  },
};

export const storyDefs = {
  Default: {
    className: 'maxw-tablet margin-x-auto',
    children: (
      <>
        <Section title="Application information" style={{ margin: 0 }}>
          <Prose>Review the program requirements and gather your supporting documents before you begin.</Prose>
        </Section>
        <Tag className="margin-top-2">Applications open</Tag>
      </>
    ),
  },
  ResponsiveStack: {
    className: 'maxw-tablet margin-x-auto',
    display: 'flex',
    direction: 'column',
    gap: '2',
    responsive: { tablet: { direction: 'row', wrap: 'wrap', align: 'center', gap: '3' } },
    children: (
      <>
        <Button href="#apply" variant="primary" className="margin-0">Start an application</Button>
        <Button href="#save" variant="outline" className="margin-0">Save for later</Button>
        <Link href="#requirements">Review requirements</Link>
      </>
    ),
  },
  ResponsiveGrid: {
    gridContainer: 'default',
    className: 'padding-x-0',
    children: (
      <Container gridRow gutters="2" responsive={{ desktop: { gutters: '3' } }}>
        {[
          ['Prepare', 'Gather the information needed for your application.'],
          ['Apply', 'Complete and submit your application online.'],
          ['Track', 'Check the status of your application.'],
        ].map(([title, description]) => (
          <Container key={title} column="12" responsive={{ tablet: { column: '6' }, desktop: { column: '4' } }} className="margin-bottom-3">
            <Card title={title} description={description} className="height-full margin-0" />
          </Container>
        ))}
      </Container>
    ),
  },
  AsymmetricGrid: {
    gridContainer: 'default',
    className: 'padding-x-0',
    children: (
      <Container gridRow gutters="3">
        <Container column="12" responsive={{ tablet: { column: '8', offset: '2' }, desktop: { column: '8', offset: 'none' } }} className="margin-bottom-3">
          <Card title="Program overview" description="Explore support for community-led projects and learn how to prepare an application." className="margin-0" />
        </Container>
        <Container element="aside" column="12" responsive={{ tablet: { column: '8', offset: '2' }, desktop: { column: '4', offset: 'none' } }} className="margin-bottom-3">
          <SummaryBox id="container-related-resources" heading="Related resources">
            <Link href="#requirements" className="maxw-full">Eligibility and supporting documents</Link>
          </SummaryBox>
        </Container>
      </Container>
    ),
  },
  FlexibleItems: {
    className: 'maxw-desktop margin-x-auto',
    display: 'flex',
    direction: 'column',
    gap: '3',
    responsive: { tablet: { direction: 'row', align: 'start' } },
    children: (
      <>
        <Container flex="fill" className="minw-0">
          <Card title="Application status" description="Your supporting documents have been received. A reviewer will contact you if more information is needed." className="margin-bottom-0" />
        </Container>
        <Container flex="none" alignSelf="start" responsive={{ tablet: { alignSelf: 'center' } }}>
          <Button variant="primary" href="#status" className="margin-0">View status</Button>
        </Container>
      </>
    ),
  },
  SemanticList: {
    element: 'ul',
    display: 'flex',
    direction: 'column',
    gap: '2',
    responsive: { tablet: { direction: 'row', wrap: 'wrap' } },
    className: 'add-list-reset maxw-tablet margin-x-auto',
    children: (
      <>
        <Container element="li"><Link href="#eligibility">Eligibility</Link></Container>
        <Container element="li"><Link href="#documents">Required documents</Link></Container>
        <Container element="li"><Link href="#deadlines">Deadlines</Link></Container>
      </>
    ),
  },
  ResponsiveVisibility: {
    className: 'maxw-tablet margin-x-auto',
    children: (
      <>
        <Section title="Track your application" style={{ margin: 0 }}>
          <Prose>Check which documents have been received and what happens next.</Prose>
        </Section>
        <Container display="none" responsive={{ tablet: { display: 'block' } }}>
          <SummaryBox id="container-additional-context" heading="About the review process">
            <Prose>Applications are reviewed in the order received. Keep a copy of your confirmation number for future reference.</Prose>
          </SummaryBox>
        </Container>
      </>
    ),
  },
  FloatContainment: {
    display: 'flow-root',
    className: 'maxw-tablet margin-x-auto',
    children: (
      <Section title="Before you apply" style={{ margin: 0 }}>
        <Container float="none" responsive={{ tablet: { float: 'right' } }} className="width-full tablet:width-card-lg tablet:margin-left-3 margin-bottom-2">
          <SummaryBox id="container-application-tip" heading="Application tip">
            <Prose>Have your supporting documents ready before you begin.</Prose>
          </SummaryBox>
        </Container>
        <Prose className="margin-bottom-2">Review the eligibility requirements and collect the required information. You can ask a community navigator for help with any part of the application.</Prose>
        <Prose>Keep your application reference and copies of supporting documents together so they are easy to find when the program team contacts you.</Prose>
      </Section>
    ),
  },
  ...applicationStoryDefs,
  ...contentStoryDefs,
  ...workflowStoryDefs,
};

export const storyDescriptions = {
  ...applicationStoryDescriptions,
  ...contentStoryDescriptions,
  ...workflowStoryDescriptions,
};

const compositionStory = (name) => ({
  args: storyDefs[name],
  parameters: { docs: { description: { story: storyDescriptions[name] } } },
});

export const Default = { args: storyDefs.Default };
export const ResponsiveStack = { args: storyDefs.ResponsiveStack };
export const ResponsiveGrid = { args: storyDefs.ResponsiveGrid };
export const AsymmetricGrid = { args: storyDefs.AsymmetricGrid };
export const FlexibleItems = { args: storyDefs.FlexibleItems };
export const SemanticList = { args: storyDefs.SemanticList };
export const ResponsiveVisibility = { args: storyDefs.ResponsiveVisibility };
export const FloatContainment = { args: storyDefs.FloatContainment };
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
