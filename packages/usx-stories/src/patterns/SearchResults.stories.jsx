import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import CardGroup from '../../../core/src/components/card-group/CardGroup.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Search from '../../../core/src/components/search/Search.tsx';
import Section from '../../../core/src/components/section/Section.tsx';
import Select from '../../../core/src/components/select/Select.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from '../../../core/src/components/example-pages/commonArgs.js';

export default {
  title: 'Patterns/Data Display',
};

export const SearchResults = {
  render: () => (
    <>
      <Skipnav target="search-results-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner {...miscBannerArgs} />
      <Header
        id="search-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        content={
          <Page id="search-results-example" title="Search Documentation">
              <Section>
                <div className="margin-y-4">
                  <Search
                    ariaLabel="Search documentation"
                    searchKey="q"
                    label="Search"
                    icon="search"
                    buttonVariant="primary"
                    big={true}
                    action="#"
                    placeholder="Search documentation, guides, and articles..."
                  />
                </div>
              </Section>

              <Section title="Search Results">
                <p className="text-base">Showing 24 results for &quot;getting started&quot;</p>
              </Section>

              <Section>
                <CardGroup
                  cards={[
                {
                  title: 'Quick Start Guide',
                  description: 'Get up and running in under 5 minutes with our comprehensive quick start guide.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=10',
                    alt: 'Quick start guide illustration',
                  }],
                  tags: [
                    { value: 'Guide', color: 'primary' },
                    { value: 'Beginner', color: 'success' },
                  ],
                  actions: [
                    { children: 'Read Guide', variant: 'primary' },
                    { children: 'Watch Video', variant: 'secondary' },
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4',
                },
                {
                  title: 'API Authentication',
                  description: 'Learn how to authenticate your API requests and manage access tokens securely.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=11',
                    alt: 'API authentication illustration',
                  }],
                  tags: [
                    { value: 'Tutorial', color: 'info' },
                    { value: 'API', color: 'warning' },
                  ],
                  actions: [
                    { children: 'View Tutorial', variant: 'primary' },
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4',
                },
                {
                  title: 'Dashboard Overview',
                  description: 'Explore the main dashboard and learn about all available features and tools.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=12',
                    alt: 'Dashboard overview illustration',
                  }],
                  tags: [
                    { value: 'Guide', color: 'primary' },
                    { value: 'Overview', color: 'accent-cool' },
                  ],
                  actions: [
                    { children: 'Explore Dashboard', variant: 'primary' },
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4',
                },
                  ]}
                />
              </Section>

              <Section>
                <div className="margin-top-4 text-center">
                  <ButtonGroup
                    buttons={[
                      { children: 'Previous', variant: 'secondary', disabled: true },
                      { children: '1', variant: 'primary' },
                      { children: '2', variant: 'secondary' },
                      { children: '3', variant: 'secondary' },
                      { children: 'Next', variant: 'secondary' },
                    ]}
                  />
                </div>
              </Section>
          </Page>
        }
          expandLeftSidebar={true}
          leftSidebar={
            <Section title="Filter Results" className="border border-base-lighter border-1px padding-4">
              <div className="margin-bottom-3">
                <Select
                  id="category-filter"
                  name="category"
                  label="Category"
                  options={[
                    { value: '', label: 'All Categories' },
                    { value: 'getting-started', label: 'Getting Started' },
                    { value: 'api-reference', label: 'API Reference' },
                    { value: 'tutorials', label: 'Tutorials' },
                    { value: 'troubleshooting', label: 'Troubleshooting' },
                  ]}
                  defaultValue=""
                />
              </div>

              <div className="margin-bottom-3">
                <Select
                  id="content-type-filter"
                  name="contentType"
                  label="Content Type"
                  options={[
                    { value: '', label: 'All Types' },
                    { value: 'guide', label: 'Guide' },
                    { value: 'tutorial', label: 'Tutorial' },
                    { value: 'reference', label: 'Reference' },
                    { value: 'faq', label: 'FAQ' },
                  ]}
                  defaultValue=""
                />
              </div>

              <ButtonGroup
                buttons={[
                  { children: 'Apply Filters', variant: 'primary' },
                  { children: 'Clear All', variant: 'secondary' },
                ]}
                direction="vertical"
              />
            </Section>
          }
        />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-search' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
