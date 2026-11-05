import React from 'react';
import InPageNav from '../../../../usx-react/src/components/in-page-nav/InPageNav.tsx';
import config from '../../../../usx-react/src/components/in-page-nav/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

const customHeadingsContent = `
  <h2>Introduction</h2>
  <p>Only top-level (h2) headings are listed in this variant.</p>
  <p>Scroll through the sections below and notice that the h3 heading further down never
  appears in the link list, even though its section is observed the same as any other.</p>
  <h2>Getting started</h2>
  <p>Before you begin, make sure the prerequisites below are met.</p>
  <p>Getting started with any new project usually means working through a short checklist
  before the real work begins.</p>
  <h3>Prerequisites</h3>
  <p>This h3 is skipped because headingElements is set to "h2" only.</p>
  <p>A recent browser and a working internet connection are still all you need — this
  section just isn't linked from the nav.</p>
  <h2>Advanced usage</h2>
  <p>Once installed, explore the configuration options to fit your workflow.</p>
  <p>Advanced users can customize almost every aspect of the setup, from heading
  detection to scroll offsets and intersection thresholds.</p>
  <h2>Conclusion</h2>
  <p>You should now be ready to explore the rest of the documentation.</p>
  <p>Scroll back up and watch the navigation list highlight each h2 section as it passes
  by, skipping right over the h3 in between.</p>
`;

const customTitleContent = `
  <h2>Introduction</h2>
  <p>This variant uses a custom title heading level and title text.</p>
  <p>Everything else about the component behaves the same — only the heading above the
  link list and its heading level have changed.</p>
  <h2>Getting started</h2>
  <p>Before you begin, make sure the prerequisites below are met.</p>
  <p>Getting started with any new project usually means working through a short checklist
  before the real work begins.</p>
  <h3>Prerequisites</h3>
  <p>A recent browser and a working internet connection.</p>
  <p>You'll also want a modern code editor and enough disk space for the dependencies.</p>
  <h2>Conclusion</h2>
  <p>You should now be ready to explore the rest of the documentation.</p>
  <p>Scroll back up and confirm the custom title text stays put above the link list while
  the active link still updates as you pass each section.</p>
`;


const belowMinimumContent = `
  <h2>Introduction</h2>
  <p>This content only has two headings, but minimumHeadingCount is set to 3, so the nav does not render.</p>
  <h2>Conclusion</h2>
  <p>No &lt;nav&gt; is injected into the aside above.</p>
`;

export const storyDefs = {
  Default: config.default,
  Unenhanced: { ...config.default, id: 'in-page-nav-unenhanced', extraAttributes: { 'data-enhanced': 'true' } },
  CustomHeadingElements: {
    id: 'in-page-nav-custom-headings',
    headingElements: 'h2',
    content: customHeadingsContent,
  },
  CustomTitle: {
    id: 'in-page-nav-custom-title',
    titleAs: 'h3',
    titleText: 'Jump to a section',
    content: customTitleContent,
  },
  BelowMinimumHeadingCount: {
    id: 'in-page-nav-below-minimum',
    minimumHeadingCount: 3,
    content: belowMinimumContent,
  },
  CustomContentSelector: {
    id: 'in-page-nav-custom-selector',
    mainContentSelector: '#in-page-nav-custom-selector-region',
    children: (
      <>
        <h3>Heading outside the observed region</h3>
        <p>This heading is not counted because it lives outside the element matched by mainContentSelector.</p>
        <div id="in-page-nav-custom-selector-region">
          <h2>Introduction</h2>
          <p>Only headings inside this inner region are observed.</p>
          <p>The nav on the left is watching <code>#in-page-nav-custom-selector-region</code> specifically,
          rather than this component's own default content container — so any heading outside that div,
          including the one above, is invisible to it.</p>
          <h2>Getting started</h2>
          <p>Before you begin, make sure the prerequisites below are met.</p>
          <p>Getting started with any new project usually means working through a short checklist
          before the real work begins.</p>
          <h3>Prerequisites</h3>
          <p>A recent browser and a working internet connection.</p>
          <p>You'll also want a modern code editor and enough disk space for the dependencies.
          Scroll through this section and the two above it to watch the active link update.</p>
        </div>
      </>
    ),
  },
};

export default {
  title: 'React/USWDS/InPageNav',
  component: InPageNav,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs', 'Unenhanced'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`')
      },
    }
  },
  decorators: [...componentInit('inPageNavigation')],
};

export const Default = { args: storyDefs.Default };
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'The article headings and content remain available, but USWDS JavaScript does not generate the in-page link list.' } } } };
export const CustomHeadingElements = { args: storyDefs.CustomHeadingElements };
export const CustomTitle = { args: storyDefs.CustomTitle };
export const BelowMinimumHeadingCount = { args: storyDefs.BelowMinimumHeadingCount };

export const CustomContentSelector = { args: storyDefs.CustomContentSelector };
