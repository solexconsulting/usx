import React from 'react';
import ExampleFrame from './ExampleFrame.jsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import { DataTablePattern } from '../patterns/DataTable.jsx';

export default {
  title: 'Examples/Applications',
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <ExampleFrame>
      <Layout>
        <Page id="example-content" title="Applications" tabIndex={-1}>
          <DataTablePattern key={args.state} {...args} />
        </Page>
      </Layout>
    </ExampleFrame>
  ),
};
export const Normal = { args: { state: 'normal' } };
export const Loading = { args: { state: 'loading' } };
export const Empty = { args: { state: 'empty' } };
export const ServerError = { args: { state: 'error' } };
export const PermissionDenied = { args: { state: 'denied' } };
export const PartialData = { args: { state: 'partial' } };
