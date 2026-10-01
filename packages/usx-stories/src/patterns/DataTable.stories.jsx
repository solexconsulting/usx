import React from 'react';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import { DataTablePattern } from './DataTable.jsx';

export default {
  title: 'Patterns/Data Table',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Layout>
      <Page title="Applications">
        <DataTablePattern key={args.state} {...args} />
      </Page>
    </Layout>
  ),
};
export const Normal = { args: { state: 'normal' } };
export const Loading = { args: { state: 'loading' } };
export const Empty = { args: { state: 'empty' } };
export const ServerError = { args: { state: 'error' } };
export const PermissionDenied = { args: { state: 'denied' } };
export const PartialData = { args: { state: 'partial' } };
