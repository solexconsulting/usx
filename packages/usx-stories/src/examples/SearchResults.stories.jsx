import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Card from '../../../core/src/components/card/Card.tsx';
import CardGroup from '../../../core/src/components/card-group/CardGroup.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Pagination from '../../../core/src/components/pagination/Pagination.tsx';
import Search from '../../../core/src/components/search/Search.tsx';
import Section from '../../../core/src/components/section/Section.tsx';
import Select from '../../../core/src/components/select/Select.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
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
        expandLeftSidebar={true}
        content={
          <Page id="search-results-example" title="Search Documentation">
            <Section>
              <div className="margin-y-2">
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
              <p className="text-base usx-text-muted margin-bottom-3">Showing 24 results for &quot;getting started&quot;</p>

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

              <div className="margin-top-4 display-flex justify-center">
                <Pagination
                  totalPages={5}
                  currentPage={1}
                  pathname="#"
                />
              </div>
            </Section>
          </Page>
        }
        leftSidebar={
          <div className="display-flex flex-column margin-top-3 gap-2">
            <h3 className="text-ink margin-top-0 margin-bottom-15">Filter Results</h3>
            <div>
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

            <div>
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
              items={[
                { children: 'Apply Filters', variant: 'primary' },
                { children: 'Clear All', variant: 'secondary' },
              ]}
              direction="vertical"
            />
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-search' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
