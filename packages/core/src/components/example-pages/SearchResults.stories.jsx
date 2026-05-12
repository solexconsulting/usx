import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ButtonGroup from '../button-group/ButtonGroup';
import CardGroup from '../card-group/CardGroup';
import Identifier from '../identifier/Identifier';
import Layout from '../layout/Layout';
import Search from '../search/Search';
import Select from '../select/Select';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const SearchResults = {
  render: () => (
    <>
      <Skipnav target="search-results-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="search-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        content={
          <>
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

            <div className="margin-bottom-3">
              <h2 className="margin-top-0">Search Results</h2>
              <p className="text-base">Showing 24 results for "getting started"</p>
            </div>

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
          </>
        }
        expandLeftSidebar={true}
        leftSidebar={
          <div className="border border-base-lighter border-1px padding-4">
            <h4 className="margin-top-0">Filter Results</h4>

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
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-search' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
