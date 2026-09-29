import React, { useState } from 'react';
import {
  PageHeader as Header,
  FormSection as Form,
  MetricCard as Metric,
  ReviewConfirmation as Review,
  DestructiveAction as Destructive,
} from './BuildingBlocks.jsx';
import { EmptyState as Empty } from './Feedback.jsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';

export default {
  title: 'Patterns/Building Blocks',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="maxw-desktop margin-x-auto padding-2">
        <Story />
      </div>
    ),
  ],
};

export const PageHeader = {
  render: () => (
    <Header
      title="Applications"
      description="Manage requests for controlled data access."
      breadcrumbs={[
        { label: 'Dashboard', href: '?id=examples-data-display--dashboard' },
        { label: 'Applications', current: true },
      ]}
      actions={[
        {
          children: 'Create application',
          href: '?id=examples-workflows--ordered',
          iconProps: [{ name: 'add' }],
        },
      ]}
      alert={{ variant: 'info', slim: true, text: 'Applications close on October 31, 2026.' }}
    />
  ),
};
export const FormSection = {
  render: (args) => <Form key={args.state} {...args} />,
  args: { state: 'normal' },
  argTypes: { state: { control: 'select', options: ['normal', 'validation', 'error', 'success'] } },
};
export const ValidationError = { ...FormSection, args: { state: 'validation' } };
export const FormServerError = { ...FormSection, args: { state: 'error' } };
export const FormSuccess = { ...FormSection, args: { state: 'success' } };
export const StatusMetricCard = {
  render: () => (
    <div className="maxw-mobile">
      <Metric progress={72} />
    </div>
  ),
};
export const IncompleteMetric = {
  render: () => (
    <div className="maxw-mobile">
      <Metric state="partial" />
    </div>
  ),
};
export const EmptyState = {
  render: function EmptyExample() {
    const [cleared, setCleared] = useState(false);
    return cleared ? (
      <Alert variant="success" text="Filters cleared. All applications are now included." />
    ) : (
      <Empty onClear={() => setCleared(true)} />
    );
  },
};
export const DestructiveAction = {
  render: function DeleteExample() {
    const [state, setState] = useState('confirm');
    return state === 'confirm' ? (
      <Destructive onCancel={() => setState('cancelled')} onDelete={() => setState('deleted')} />
    ) : (
      <>
        <Alert
          variant={state === 'deleted' ? 'success' : 'info'}
          text={state === 'deleted' ? 'Application deleted.' : 'Application kept.'}
        />
        <Button variant="outline" onClick={() => setState('confirm')}>
          Reset example
        </Button>
      </>
    );
  },
};
export const ReviewConfirmation = {
  render: function ReviewExample() {
    const [submitted, setSubmitted] = useState(false);
    const [editing, setEditing] = useState(null);
    const [values, setValues] = useState([
      'Alex Olson',
      'Example Research Institute',
      'Controlled Data',
    ]);
    const labels = ['Applicant', 'Organization', 'Access requested'];
    if (submitted)
      return (
        <Alert
          variant="success"
          heading="Application submitted"
          text="Your request is ready for review."
        />
      );
    if (editing !== null)
      return (
        <Form
          key={editing}
          title={labels[editing]}
          fields={[{ name: 'value', label: labels[editing], required: true, full: true }]}
          values={{ value: values[editing] }}
          onCancel={() => setEditing(null)}
          onSave={(data) => {
            setValues(values.map((value, index) => (index === editing ? data.value : value)));
            setEditing(null);
          }}
        />
      );
    return (
      <Review
        items={labels.map((label, index) => ({ label, value: values[index] }))}
        onEdit={setEditing}
        onSubmit={() => setSubmitted(true)}
      />
    );
  },
};
