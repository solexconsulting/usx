import React from 'react';
import ExampleFrame from './ExampleFrame.jsx';
import { SearchResultsPattern, programs } from '../patterns/SearchResults.jsx';

export default {
  title: 'Examples/Data Display',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <ExampleFrame target="search-results-content">
      <SearchResultsPattern key={args.state} sidebar {...args} />
    </ExampleFrame>
  ),
};

export const SearchResults = { args: { state: 'normal' } };
export const SearchNoResults = { args: { state: 'no-results' } };
export const SearchLoading = { args: { state: 'loading' } };
export const SearchError = { args: { state: 'error' } };
export const SearchPermissionDenied = { args: { state: 'denied' } };
export const SearchPartialData = { args: { state: 'partial' } };
export const FundingPrograms = {
  args: { records: programs, advanced: true, title: 'Search funding programs' },
};
