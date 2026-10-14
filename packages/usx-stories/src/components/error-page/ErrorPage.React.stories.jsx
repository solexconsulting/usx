import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import ErrorPage from '../../../../usx-react/src/components/error-page/ErrorPage.tsx';
import config from '../../../../usx-react/src/components/error-page/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    ...(config.default || {}),
    children: (
      <p>
        If the address is correct and you still can't reach the page, contact support so the broken
        link can be fixed.
      </p>
    ),
  },
  Cats: {
    ...(config.default || {}),
    id: 'cats-error',
    cats: true,
  },
  PermissionDenied: {
    id: 'permission-denied',
    title: "You don't have access to this page",
    description: 'Your account does not have permission to view this information.',
    guidance:
      'Sign in with an authorized account, or request access if you need this information for your work.',
    actions: [
      { label: 'Sign in with another account', href: '/sign-in', variant: 'primary' },
      { label: 'Request access', href: '/request-access', variant: 'outline' },
    ],
    supportHeading: 'Need help with access?',
    supportLinks: [{ label: 'Contact the access support team', href: 'mailto:access@example.gov' }],
    errorCode: '403',
  },
  SessionExpired: {
    id: 'session-expired',
    title: 'Your session has expired',
    description: 'For your security, we signed you out after a period of inactivity.',
    guidance:
      'Sign in again to continue. Information you did not save may need to be entered again.',
    actions: [
      { label: 'Sign in again', href: '/sign-in', variant: 'primary' },
      { label: 'Visit the home page', href: '/', variant: 'unstyled' },
    ],
  },
  UnexpectedError: {
    id: 'unexpected-error',
    title: "We couldn't complete your request",
    description: 'The service encountered an unexpected problem.',
    guidance:
      'Wait a few minutes and try again. If you were submitting information, check whether it was received before you resubmit it.',
    actions: [
      { label: 'Visit the home page', href: '/', variant: 'primary' },
      { label: 'Check service status', href: '/status', variant: 'outline' },
    ],
    supportHeading: 'Still need help?',
    supportText: 'Give the reference ID below to support so they can find this event.',
    supportLinks: [
      { label: 'Email support', href: 'mailto:support@example.gov' },
      { label: 'Call 800-555-0100', href: 'tel:+18005550100' },
    ],
    errorCode: 500,
    referenceId: '7C4A-29F1',
  },
  ServiceUnavailable: {
    id: 'service-unavailable',
    title: 'This service is temporarily unavailable',
    description: 'The service is unavailable during scheduled maintenance.',
    guidance:
      'Try again after Tuesday, October 20, 2026, at 3:00 p.m. Central time. Your saved information will still be available.',
    actions: [
      { label: 'Visit the agency home page', href: '/', variant: 'primary' },
      { label: 'Check service status', href: '/status', variant: 'outline' },
    ],
    supportHeading: 'Use another channel',
    supportLinks: [{ label: 'Call 800-555-0100', href: 'tel:+18005550100' }],
    errorCode: '503',
  },
  TooManyRequests: {
    id: 'too-many-requests',
    title: "You've made too many requests",
    description: 'The service has temporarily limited requests from your account.',
    guidance: 'Wait 10 minutes before trying again. Requests made sooner may be rejected.',
    actions: [{ label: 'Return to the dashboard', href: '/dashboard', variant: 'primary' }],
    errorCode: '429',
  },
  ClientPageFallback: {
    id: 'client-page-fallback',
    title: 'There is a problem with this page',
    description: "We couldn't display this page.",
    guidance:
      'Reload the page. If the problem continues, return to the dashboard and try again later.',
    actions: [
      { label: 'Return to the dashboard', href: '/dashboard', variant: 'primary' },
      { label: 'Visit the home page', href: '/', variant: 'outline' },
    ],
    supportHeading: 'Report this problem',
    supportLinks: [{ label: 'Contact technical support', href: '/contact' }],
  },
  CustomRecoveryContent: {
    id: 'custom-recovery-content',
    title: 'Your application could not be submitted',
    description: 'We saved your application as a draft.',
    children: (
      <>
        <p>Before you try again:</p>
        <ul>
          <li>Review the files attached to your application.</li>
          <li>Make sure each file is smaller than 25 MB.</li>
          <li>Return to your draft and submit it again.</li>
        </ul>
      </>
    ),
    actions: [{ label: 'Return to your draft', href: '/applications/draft', variant: 'primary' }],
    referenceId: 'APP-2026-10482',
  },
  TechnicalDetails: {
    id: 'unexpected-error-with-details',
    title: "We couldn't complete your request",
    description: 'The service encountered an unexpected problem.',
    guidance: 'Return to the dashboard and try again after the problem has been resolved.',
    actions: [{ label: 'Return to the dashboard', href: '/dashboard', variant: 'primary' }],
    errorCode: 500,
    referenceId: '7C4A-29F1',
    detailsProps: {
      summary: 'Technical details',
      text: `Traceback (most recent call last):
  File "/app/records/views.py", line 42, in submit
    validate_record(payload)
ValueError: A <script> tag & an invalid record were rejected.`,
    },
  },
  Minimal: {
    id: 'minimal-error',
    title: 'This page is unavailable',
    description: 'Please try again later.',
  },
};

export default {
  title: 'React/USX/ErrorPage',
  component: ErrorPage,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          'A full-page recovery surface shared by React error fallbacks and Django error handlers. The host application sets the HTTP response status and document title, logs diagnostics, and moves focus after a client-side transition. The optional detailsProps composes the generic Details component; authorize the viewer and redact sensitive values before supplying diagnostics.',
      },
    },
  },
};

export const Default = { args: storyDefs.Default };
export const PermissionDenied = { args: storyDefs.PermissionDenied };
export const SessionExpired = { args: storyDefs.SessionExpired };
export const UnexpectedError = { args: storyDefs.UnexpectedError };
export const ServiceUnavailable = { args: storyDefs.ServiceUnavailable };
export const TooManyRequests = { args: storyDefs.TooManyRequests };
export const ClientPageFallback = { args: storyDefs.ClientPageFallback };
export const CustomRecoveryContent = { args: storyDefs.CustomRecoveryContent };

/**
 * Technical details remain in the page source while collapsed. The host must authorize the viewer
 * and redact credentials, personal information, and request data before providing this object.
 */
export const TechnicalDetails = { args: storyDefs.TechnicalDetails };
export const Minimal = { args: storyDefs.Minimal };

/**
 * WARNING: "Cats" is an optional feature that displays a cat image corresponding to the
 * HTTP error code. This is just for fun and is not recommended.
 */
export const Cats = {
  args: storyDefs.Cats,
  render: (args) => (
    <>
      <Alert
        variant="warning"
        heading="Just for fun!"
        text={`
          "Cats" is an optional feature that displays a cat image corresponding to the
          HTTP error code. This is just for fun and is not recommended.
        `}
      />
      <ErrorPage {...args} />
    </>
  ),
};
