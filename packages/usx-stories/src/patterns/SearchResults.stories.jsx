import React from 'react';
import { SearchResultsPattern, programs } from './SearchResults.jsx';

export default {
  title: 'Patterns/Search Results',
  component: SearchResultsPattern,
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <SearchResultsPattern key={args.state} {...args} />
  ),
};
export const Normal = { args: { state: 'normal' } };
export const NoResults = { args: { state: 'no-results' } };
export const Loading = { args: { state: 'loading' } };
export const Error = { args: { state: 'error' } };
export const Empty = { args: { state: 'empty' } };
export const PermissionDenied = { args: { state: 'denied' } };
export const PartialData = { args: { state: 'partial' } };
export const AdvancedFilters = {
  args: { records: programs, advanced: true, title: 'Search funding programs' },
};
