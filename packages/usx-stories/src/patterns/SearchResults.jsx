import React, { useId, useState } from 'react';
import Accordion from '../../../usx-react/src/components/accordion/Accordion.tsx';
import CheckboxGroup from '../../../usx-react/src/components/checkbox-group/CheckboxGroup.tsx';
import Collection from '../../../usx-react/src/components/collection/Collection.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Search from '../../../usx-react/src/components/search/Search.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import Tag from '../../../usx-react/src/components/tag/Tag.tsx';
import { EmptyState, PageState } from './Feedback.jsx';
import { PageHeader } from './BuildingBlocks.jsx';

export const documentation = [
  {
    id: 'start',
    heading: 'Quick Start Guide',
    href: 'https://designsystem.digital.gov/documentation/getting-started-for-developers/',
    description:
      'Install USWDS, configure your project, and start building with the design system.',
    type: 'Guide',
    status: 'Published',
    category: 'Getting Started',
    updated: '2026-09-28',
  },
  {
    id: 'api',
    heading: 'API Authentication',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization',
    description:
      'Understand the HTTP Authorization header and authentication schemes for API requests.',
    type: 'Reference',
    status: 'Published',
    category: 'API Reference',
    updated: '2026-09-26',
  },
  {
    id: 'dashboard',
    heading: 'Dashboard Overview',
    href: '?id=examples-data-display--dashboard&viewMode=story',
    description:
      'Review key metrics, recent activity, and service availability in the example dashboard.',
    type: 'Guide',
    status: 'Draft',
    category: 'Getting Started',
    updated: '2026-09-27',
  },
];

export const programs = [
  {
    id: 'health',
    heading: 'Rural Community Healthcare Development Grant',
    href: 'https://www.grants.gov/search-grants',
    description:
      'Funding to expand telehealth infrastructure and rural clinic capacity across eligible counties.',
    category: 'Healthcare',
    type: 'Grant',
    status: 'Open',
    updated: '2026-09-28',
    deadline: '2026-10-31',
    funding: 500000,
  },
  {
    id: 'energy',
    heading: 'Clean Energy and Water Conservation Initiative',
    href: 'https://www.grants.gov/search-grants',
    description: 'Support for municipal water recycling and solar grid installations.',
    category: 'Environment',
    type: 'Grant',
    status: 'Upcoming',
    updated: '2026-09-25',
    deadline: '2026-12-01',
    funding: 1000000,
  },
];

export function SearchResultsPattern({
  records = documentation,
  state = 'normal',
  sidebar = false,
  title = 'Search Documentation',
  advanced = false,
}) {
  const prefix = useId();
  const [query, setQuery] = useState(state === 'no-results' ? 'unmatched query' : '');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('relevance');
  const [deadline, setDeadline] = useState('');
  const [funding, setFunding] = useState('');
  const [retry, setRetry] = useState(false);
  const [expanded, setExpanded] = useState({});
  const reset = () => {
    setQuery('');
    setFilters({});
    setDeadline('');
    setFunding('');
  };
  const data = state === 'empty' ? [] : records;
  const matching = data.filter(
    (record) =>
      `${record.heading} ${record.description} ${record.category}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      Object.entries(filters).every(
        ([key, values]) => !values.length || values.includes(record[key])
      ) &&
      (!deadline || record.deadline <= deadline) &&
      (!funding || record.funding >= Number(funding))
  );
  const results = [...matching].sort((first, second) =>
    sort === 'newest'
      ? second.updated.localeCompare(first.updated)
      : sort === 'title'
        ? first.heading.localeCompare(second.heading)
        : 0
  );
  const facets = (location) => (
    <Accordion
      bordered
      multiselectable
      iconPosition="start"
      contentClassName="padding-2"
      items={['category', 'type', 'status'].map((key) => ({
        id: `${prefix}-${location}-${key}`,
        title: { category: 'Category', type: 'Type', status: 'Status' }[key],
        expanded: !!expanded[`${location}-${key}`],
        handleToggle: () =>
          setExpanded({ ...expanded, [`${location}-${key}`]: !expanded[`${location}-${key}`] }),
        content: (
          <CheckboxGroup
            key={JSON.stringify(filters[key])}
            name={key}
            aria-label={key}
            onChange={(event) => {
              const value = event.target.value;
              const selected = filters[key] || [];
              setFilters({
                ...filters,
                [key]: event.target.checked
                  ? [...selected, value]
                  : selected.filter((entry) => entry !== value),
              });
            }}
            options={[...new Set(records.map((record) => record[key]))].map((value, index) => ({
              id: `${prefix}-${location}-${key}-${index}`,
              value,
              label: `${value} (${records.filter((record) => record[key] === value).length})`,
              checked: (filters[key] || []).includes(value),
            }))}
          />
        ),
      }))}
    />
  );
  const filterPanel = (location) => (
    <>
      {facets(location)}
      {advanced && (
        <>
          <Input
            id={`${prefix}-${location}-deadline`}
            label="Deadline before"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
          <Input
            id={`${prefix}-${location}-funding`}
            label="Minimum funding ($)"
            type="number"
            min="0"
            value={funding}
            onChange={(event) => setFunding(event.target.value)}
          />
        </>
      )}
      <Button variant="outline" className="margin-top-2" onClick={reset}>
        Clear filters
      </Button>
    </>
  );
  const content = (
    <div className="padding-y-4" id="search-results-content" tabIndex={-1}>
      <PageHeader title={title} />
      <Search
        key={query}
        id={`${prefix}-search`}
        defaultValue={query}
        onSubmit={(value) => setQuery(String(value || '').trim())}
        label="Search"
        big
      />
      <div className={sidebar ? 'desktop:display-none margin-y-3' : 'margin-y-3'}>
        <Accordion
          items={[
            {
              id: `${prefix}-filters`,
              title: 'Filters',
              expanded: !!expanded.mobile,
              handleToggle: () => setExpanded({ ...expanded, mobile: !expanded.mobile }),
              content: filterPanel('inline'),
            },
          ]}
        />
      </div>
      <div className="display-flex flex-column flex-wrap flex-align-start flex-justify margin-y-3">
        <span role="status">
          {state === 'loading'
            ? 'Loading results'
            : `${results.length} ${results.length === 1 ? 'result' : 'results'}`}
        </span>
        <Select
          id={`${prefix}-sort`}
          label="Sort"
          formGroup={false}
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          options={[
            { value: 'relevance', label: 'Relevance' },
            { value: 'newest', label: 'Newest first' },
            { value: 'title', label: 'Title' },
          ]}
        />
      </div>
      <div className="display-flex flex-wrap">
        {Object.entries(filters).flatMap(([key, values]) =>
          values.map((value) => (
            <Tag
              key={`${key}-${value}`}
              value={value}
              dismissible
              className="margin-right-1 margin-bottom-1"
              onDismiss={() =>
                setFilters({ ...filters, [key]: values.filter((entry) => entry !== value) })
              }
            />
          ))
        )}
      </div>
      <PageState state={retry ? 'normal' : state} onRetry={() => setRetry(true)}>
        {results.length ? (
          <Collection
            className="maxw-none"
            items={results.map((record) => ({
              ...record,
              description:
                state === 'partial' && record.id === records[0]?.id
                  ? 'Description not provided.'
                  : record.description,
              meta: [
                record.category,
                `Updated ${record.updated}`,
                ...(record.deadline
                  ? [`Deadline ${record.deadline}`, `$${record.funding.toLocaleString('en-US')}`]
                  : []),
              ],
              tags: [record.type, record.status],
            }))}
          />
        ) : (
          <EmptyState
            title={state === 'empty' ? 'No records yet' : 'No search results'}
            description={
              state === 'empty'
                ? 'Published records will appear here.'
                : 'No records match your search and filters.'
            }
            onClear={state === 'empty' ? undefined : reset}
          />
        )}
      </PageState>
    </div>
  );
  return sidebar ? (
    <Layout
      variant="grid"
      expandLeftSidebar={true}
      leftSidebar={
        <aside className="padding-y-4">
          <h2 className="font-sans-md">Filter Results</h2>
          {filterPanel('sidebar')}
        </aside>
      }
      content={content}
    />
  ) : (
    content
  );
}
