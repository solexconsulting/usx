import React from 'react';
import { DataTablePattern } from './DataTable.jsx';

export default {
  title: 'Patterns/Data Table',
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="maxw-desktop margin-x-auto padding-y-3">
      <DataTablePattern key={args.state} {...args} />
    </div>
  ),
};
export const Normal = { args: { state: 'normal' } };
export const Loading = { args: { state: 'loading' } };
export const Empty = { args: { state: 'empty' } };
export const ServerError = { args: { state: 'error' } };
export const PermissionDenied = { args: { state: 'denied' } };
export const PartialData = { args: { state: 'partial' } };
