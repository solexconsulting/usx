import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import CardGroup from '../../../usx-react/src/components/card-group/CardGroup.tsx';
import Checkbox from '../../../usx-react/src/components/checkbox/Checkbox.tsx';
import DatePicker from '../../../usx-react/src/components/date-picker/DatePicker.jsx';
import Fieldset from '../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.jsx';
import Pagination from '../../../usx-react/src/components/pagination/Pagination.tsx';
import RangeSlider from '../../../usx-react/src/components/range-slider/RangeSlider.jsx';
import Search from '../../../usx-react/src/components/search/Search.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import TagGroup from '../../../usx-react/src/components/tag-group/TagGroup.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Patterns',
};

export const AdvancedSearchFiltersPattern = {
  render: () => (
    <>
      <Skipnav target="adv-search-example" />
      <Banner id="adv-search-banner" ariaLabel="Official government banner" />
      <Header id="adv-search-header" {...headerArgs} />
      <Layout
        variant="grid"
        content={
          <Page id="adv-search-example" title="Advanced Program Search">
            <Section>
              <div className="margin-y-2">
                <Search
                  ariaLabel="Search grants and programs"
                  searchKey="q"
                  label="Search"
                  icon="search"
                  buttonVariant="primary"
                  big={true}
                  placeholder="Search grants, funding programs, and awards..."
                />
              </div>

              <div className="margin-y-3 display-flex flex-wrap flex-align-center justify-between gap-2">
                <div className="display-flex flex-align-center gap-1">
                  <span className="text-bold font-sans-xs text-ink">Active Filters:</span>
                  <TagGroup
                    tagProps={[
                      { value: 'Category: Healthcare', color: 'primary', dismissible: true },
                      { value: 'Status: Open Grants', color: 'info', dismissible: true },
                      { value: 'Min Funding: $50k', color: 'success', dismissible: true },
                    ]}
                  />
                </div>
                <Select
                  id="sort-order"
                  name="sortOrder"
                  label=""
                  options={[
                    { value: 'relevance', label: 'Sort by: Relevance' },
                    { value: 'date-desc', label: 'Sort by: Newest First' },
                    { value: 'funding-desc', label: 'Sort by: Highest Funding' },
                  ]}
                  defaultValue="relevance"
                />
              </div>

              <CardGroup
                cardProps={[
                  {
                    title: 'Rural Community Healthcare Development Grant',
                    description: 'Funding to expand telehealth infrastructure and rural clinic capacity across eligible counties.',
                    tags: [
                      { value: 'Healthcare', color: 'primary' },
                      { value: 'Open', color: 'success' },
                      { value: '$100k - $500k', color: 'info' },
                    ],
                    actions: [{ children: 'View Program', variant: 'primary' }],
                    className: 'tablet:grid-col-6',
                  },
                  {
                    title: 'Clean Energy & Water Conservation Initiative',
                    description: 'Grants supporting local government municipal water recycling and solar grid installations.',
                    tags: [
                      { value: 'Environment', color: 'accent-cool' },
                      { value: 'Open', color: 'success' },
                      { value: '$250k - $1M', color: 'info' },
                    ],
                    actions: [{ children: 'View Program', variant: 'primary' }],
                    className: 'tablet:grid-col-6',
                  },
                ]}
              />

              <Pagination totalPages={6} currentPage={1} pathname="#" />

            </Section>
          </Page>
        }
        leftSidebar={
          <div className="display-flex flex-column margin-top-3 gap-3">
            <h3 className="text-ink margin-top-0 margin-bottom-15">Refine Search</h3>
            <Fieldset legend="Program Category">
              <Checkbox id="cat-health" name="cat" label="Healthcare (14)" checked />
              <Checkbox id="cat-env" name="cat" label="Environment (8)" />
              <Checkbox id="cat-edu" name="cat" label="Education (12)" />
              <Checkbox id="cat-infra" name="cat" label="Infrastructure (6)" />
            </Fieldset>

            <RangeSlider
              id="funding-range"
              name="fundingRange"
              label="Minimum Funding ($k)"
              min={10}
              max={500}
              step={10}
              defaultValue={50}
            />

            <Fieldset legend="Application Status">
              <Checkbox id="status-open" name="status" label="Open Grants Only" checked />
              <Checkbox id="status-upcoming" name="status" label="Forecasted / Upcoming" />
              <Checkbox id="status-closed" name="status" label="Closed / Under Review" />
            </Fieldset>

            <DatePicker
              id="deadline-date"
              name="deadlineDate"
              label="Deadline Before"
              hint="mm/dd/yyyy"
            />

            <ButtonGroup
              buttonProps={[
                { children: 'Apply Filters', variant: 'primary' },
                { children: 'Reset All', variant: 'secondary' },
              ]}
              direction="vertical"
            />
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-adv' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};