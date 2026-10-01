import React, { useEffect, useRef, useState } from 'react';
import ExampleFrame from './ExampleFrame.jsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Breadcrumb from '../../../usx-react/src/components/breadcrumb/Breadcrumb.tsx';
import StepIndicator from '../../../usx-react/src/components/step-indicator/StepIndicator.tsx';
import TaskList from '../../../usx-react/src/components/task-list/TaskList.tsx';
import { FormSection, ReviewConfirmation } from '../patterns/BuildingBlocks.jsx';
import { PageState } from '../patterns/Feedback.jsx';

const sections = [
  {
    title: 'Applicant',
    fields: [
      { name: 'firstName', label: 'First name', required: true, autoComplete: 'given-name' },
      { name: 'lastName', label: 'Last name', required: true, autoComplete: 'family-name' },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        full: true,
        autoComplete: 'email',
      },
    ],
  },
  {
    title: 'Organization',
    fields: [
      {
        name: 'organization',
        label: 'Organization name',
        required: true,
        full: true,
        autoComplete: 'organization',
      },
    ],
  },
  {
    title: 'Access requested',
    fields: [
      { name: 'access', label: 'Data access requested', required: true, full: true },
      { name: 'purpose', label: 'Research purpose', required: true, full: true },
    ],
  },
];
const completeValues = {
  firstName: 'Alex',
  lastName: 'Olson',
  email: 'alex@example.org',
  organization: 'Example Research Institute',
  access: 'Controlled Data',
  purpose: 'Population health research',
};

function ApplicationWorkflow({ ordered = true, state = 'normal', allowDrafts = false }) {
  const ready = state === 'review' || state === 'error' || state === 'success';
  const [values, setValues] = useState(
    ready
      ? completeValues
      : state === 'partial'
        ? { firstName: 'Alex', lastName: 'Olson', email: 'alex@example.org' }
        : {}
  );
  const [completed, setCompleted] = useState(ready ? [0, 1, 2] : state === 'partial' ? [0] : []);
  const [active, setActive] = useState(ready ? 3 : ordered ? 0 : null);
  const [submitted, setSubmitted] = useState(state === 'success');
  const [submitError, setSubmitError] = useState(state === 'error');
  const [editingReview, setEditingReview] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const focusTarget = useRef(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    focusTarget.current?.focus();
  }, [active, submitted]);
  const reviewItems = [
    { label: 'Applicant', value: `${values.firstName || ''} ${values.lastName || ''}`.trim() },
    { label: 'Organization', value: values.organization },
    { label: 'Access requested', value: values.access },
  ];
  return (
    <ExampleFrame target="application-workflow">
      <Layout>
          <Breadcrumb
            items={[
              { label: 'Applications', href: '?id=examples-applications--normal&viewMode=story' },
              { label: submitted ? 'Confirmation' : 'New application', current: true },
            ]}
          />
        <Page id="application-workflow" title="Request data access" tabIndex={-1}>
          <p>Application for controlled research data.</p>
          <Section aria-label="Application">
          <PageState state={state === 'error' ? 'normal' : state}>
            <div ref={focusTarget} tabIndex={-1}>
              {submitted ? (
                <>
                  <Alert
                    variant="success"
                    heading="Application submitted"
                    text="Your request has been received. Reference: USX-2026-001."
                  />
                  <p>Applicant: {reviewItems[0].value}</p>
                  <Button href="?id=examples-applications--normal&viewMode=story" variant="outline">
                    Return to applications
                  </Button>
                </>
              ) : (
                <>
                  {ordered && (
                    <StepIndicator
                      steps={[
                        ...sections.map((section) => ({ label: section.title })),
                        { label: 'Review' },
                      ]}
                      currentStep={active + 1}
                      headingTag="h2"
                    />
                  )}
                  {!ordered && (
                    <>
                      <p role="status">{completed.length} of 3 tasks complete</p>
                      <div
                        onClick={(event) => {
                          const link = event.target.closest('a');
                          const match = link
                            ?.getAttribute('href')
                            ?.match(/^#application-task-(\d)$/);
                          if (match) {
                            event.preventDefault();
                            setActive(Number(match[1]));
                          }
                        }}
                      >
                        <TaskList
                          tasks={sections.map((section, index) => ({
                            name: section.title,
                            href: `#application-task-${index}`,
                            tagProps: {
                              value: completed.includes(index) ? 'Completed' : drafts.includes(index) ? 'In-Progress' : 'Not Started',
                              color: completed.includes(index) ? 'success' : drafts.includes(index) ? 'accent-cool-darker' : 'base',
                              outline: (!completed.includes(index) && !drafts.includes(index))
                            },
                          }))}
                        />
                      </div>
                      {active === null && (
                        <Button
                          className="margin-top-3"
                          disabled={completed.length !== 3}
                          onClick={() => setActive(3)}
                        >
                          Review application
                        </Button>
                      )}
                    </>
                  )}
                  {active !== null && active < 3 && (
                    <div id={`application-task-${active}`} className="margin-top-4">
                      <FormSection
                        key={active}
                        title={sections[active].title}
                        fields={sections[active].fields}
                        values={values}
                        state={state === 'validation' && active === 0 ? 'validation' : 'normal'}
                        submitLabel={ordered && !editingReview ? 'Continue' : 'Save and return'}
                        onSaveDraft={allowDrafts ? (data, complete) => {
                          setValues((previous) => ({ ...previous, ...data }));
                          setCompleted((previous) => complete
                            ? [...new Set([...previous, active])]
                            : previous.filter((index) => index !== active));
                          setDrafts((previous) => [...new Set([...previous, active])]);
                          setEditingReview(false);
                          if (!ordered) setActive(null);
                        } : undefined}
                        onCancel={() => {
                          setActive(editingReview ? 3 : ordered ? Math.max(0, active - 1) : null);
                          setEditingReview(false);
                        }}
                        onSave={(data) => {
                          setValues({ ...values, ...data });
                          setCompleted([...new Set([...completed, active])]);
                          setActive(editingReview ? 3 : ordered ? active + 1 : null);
                          setEditingReview(false);
                        }}
                      />
                    </div>
                  )}
                  {active === 3 && (
                    <>
                      {submitError && (
                        <Alert
                          variant="error"
                          heading="Submission failed"
                          text="Your application is saved in this session. Try submitting again."
                        />
                      )}
                      <ReviewConfirmation
                        items={reviewItems}
                        disabled={completed.length !== 3}
                        onEdit={(index) => {
                          setEditingReview(true);
                          setActive(index);
                        }}
                        onSubmit={() => {
                          if (completed.length === 3) {
                            setSubmitError(false);
                            setSubmitted(true);
                          }
                        }}
                      />
                      <Button variant="unstyled" onClick={() => setActive(ordered ? 2 : null)}>
                        Back
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </PageState>
          </Section>
        </Page>
      </Layout>
    </ExampleFrame>
  );
}

export default {
  title: 'Examples/Workflows',
  parameters: { layout: 'fullscreen' },
  render: (args) => <ApplicationWorkflow key={`${args.ordered}-${args.state}-${args.allowDrafts}`} {...args} />,
};
export const Ordered = { args: { ordered: true, state: 'normal' } };
export const Unordered = { args: { ordered: false, state: 'normal' } };
export const OrderedWithDrafts = { args: { ordered: true, state: 'normal', allowDrafts: true } };
export const UnorderedWithDrafts = { args: { ordered: false, state: 'normal', allowDrafts: true } };
export const ValidationError = { args: { ordered: true, state: 'validation' } };
export const Review = { args: { ordered: true, state: 'review' } };
export const ServerError = { args: { ordered: true, state: 'error' } };
export const PermissionDenied = { args: { ordered: true, state: 'denied' } };
export const Loading = { args: { ordered: true, state: 'loading' } };
export const Success = { args: { ordered: true, state: 'success' } };
export const Incomplete = { args: { ordered: false, state: 'partial' } };
