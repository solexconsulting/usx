import React from 'react';
import InPageNav from '../../../../usx-react/src/components/in-page-nav/InPageNav.jsx';
import config from '../../../../usx-react/src/components/in-page-nav/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import inPageNavigation from '@uswds/uswds/js/usa-in-page-navigation';

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultContent = `
  <h2>Introduction</h2>
  <p>This page walks through setting up and using the example project.</p>
  <p>It's also meant to demonstrate how the in-page navigation component tracks scroll
  position and highlights whichever section is currently in view. Scroll down through
  each section below to see the link list on the side update automatically.</p>
  <p>None of the copy on this page is meant to be read closely — it exists purely to give
  the navigation something substantial enough to observe.</p>
  <h2>Getting started</h2>
  <p>Before you begin, make sure the prerequisites below are met.</p>
  <p>Getting started with any new project usually means working through a short checklist
  before the real work begins. The sections below cover what you'll need and how to get
  everything installed.</p>
  <h3>Prerequisites</h3>
  <p>A recent browser and a working internet connection.</p>
  <p>You'll also want a modern code editor and enough disk space for the dependencies.
  Nothing here is unusual — most standard front-end tooling already satisfies these
  requirements.</p>
  <p>If you already have Node.js and a package manager installed, you can skip ahead to
  the installation section below.</p>
  <h3>Installation</h3>
  <p>Download the package and follow the setup instructions.</p>
  <p>Installation typically takes just a few minutes. Run the installer, accept the
  default options, and confirm that the command-line tool reports a successful install
  before moving on.</p>
  <p>If you run into trouble, double-check that your environment matches the
  prerequisites listed above before trying again.</p>
  <h2>Advanced usage</h2>
  <p>Once installed, explore the configuration options to fit your workflow.</p>
  <p>Advanced users can customize almost every aspect of the setup, from heading
  detection to scroll offsets and intersection thresholds — all of which this component
  exposes as simple data attributes.</p>
  <p>Most projects never need to touch these settings, but they're available for the
  cases that do.</p>
  <h2>Conclusion</h2>
  <p>You should now be ready to explore the rest of the documentation.</p>
  <p>Thanks for reading through this example. Scroll back up and watch the navigation
  list highlight each section as it passes by — that's the entire behavior this
  component provides.</p>
`;

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
  Default: {
    id: 'in-page-nav-default',
    content: defaultContent,
  },
  CustomHeadingElements: {
    id: 'in-page-nav-custom-headings',
    headingElements: 'h2',
    content: customHeadingsContent,
  },
  CustomTitle: {
    id: 'in-page-nav-custom-title',
    titleHeadingLevel: 'h3',
    titleText: 'Jump to a section',
    content: customTitleContent,
  },
  BelowMinimumHeadingCount: {
    id: 'in-page-nav-below-minimum',
    minimumHeadingCount: 3,
    content: belowMinimumContent,
  },
};

export default {
  title: 'React/USWDS/InPageNav',
  component: InPageNav,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`')
      },
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        inPageNavigation.init();
      }, []);

      return <Story />;
    },
  ],
};

export const Default = { args: storyDefs.Default };
export const CustomHeadingElements = { args: storyDefs.CustomHeadingElements };
export const CustomTitle = { args: storyDefs.CustomTitle };
export const BelowMinimumHeadingCount = { args: storyDefs.BelowMinimumHeadingCount };

export const CustomContentSelector = {
  render: () => (
    <InPageNav id="in-page-nav-custom-selector" mainContentSelector="#in-page-nav-custom-selector-region">
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
    </InPageNav>
  ),
};
