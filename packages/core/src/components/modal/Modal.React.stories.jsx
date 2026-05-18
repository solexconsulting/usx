import React from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';
import modal from "@uswds/uswds/js/usa-modal";

export default {
  title: 'React/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        modal.on();
        return () => modal.off();
      }, []);

      return <Story />;
    }
  ]
};

const defaultActions = [
  { children: 'Continue without saving', variant: 'primary', extraAttributes: { 'data-close-modal': true } },
  { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', extraAttributes: { 'data-close-modal': true } },
];

const forceActions = [
  { children: 'Yes, stay signed in', variant: 'primary', extraAttributes: { 'data-close-modal': true } },
  { children: 'Sign out', variant: 'unstyled', className: 'padding-105 text-center', extraAttributes: { 'data-close-modal': true } },
];

export const storyDefs = {
  Default: {
    id: 'example-modal-4',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    actions: defaultActions,
    triggerLabel: 'Open modal',
  },
  Large: {
    id: 'example-modal-large',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    size: 'lg',
    actions: defaultActions,
    triggerLabel: 'Open large modal',
  },
  LargeCollapsed: {
    id: 'example-modal-lg-collapsed',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    size: 'lg-collapsed',
    actions: defaultActions,
    triggerLabel: 'Open large collapsed modal',
  },
  ForceAction: {
    id: 'example-modal-force',
    heading: 'Your session will end soon.',
    description: "You've been inactive for too long. Please choose to stay signed in or sign out. Otherwise, you'll be signed out automatically in 5 minutes.",
    forceAction: true,
    actions: forceActions,
    triggerLabel: 'Open modal with forced action',
  },
};

export const Default = {
  args: storyDefs.Default,
  render: (args) => {
    const { triggerLabel, ...modalArgs } = args;
    return (
      <>
        <Button
          href={`#${modalArgs.id}`}
          variant="outline"
          aria-controls={modalArgs.id}
          data-open-modal
        >
          {triggerLabel}
        </Button>
        <Modal {...modalArgs} />
      </>
    )
  }
};

export const Large = {
  args: storyDefs.Large,
  render: (args) => {
    const { triggerLabel, ...modalArgs } = args;
    return (
      <>
        <Button
          href={`#${modalArgs.id}`}
          variant="outline"
          aria-controls={modalArgs.id}
          data-open-modal
        >
          {triggerLabel}
        </Button>
        <Modal {...modalArgs} />
      </>
    );
  }
};

export const LargeCollapsed = {
  args: storyDefs.LargeCollapsed,
  render: (args) => {
    const { triggerLabel, ...modalArgs } = args;
    return (
      <>
        <Button
          href={`#${modalArgs.id}`}
          variant="outline"
          aria-controls={modalArgs.id}
          data-open-modal
        >
          {triggerLabel}
        </Button>
        <Modal {...modalArgs} />
      </>
    );
  }
};

export const ForceAction = {
  args: storyDefs.ForceAction,
  render: (args) => {
    const { triggerLabel, ...modalArgs } = args;
    return (
      <>
        <Button
          href={`#${modalArgs.id}`}
          variant="outline"
          aria-controls={modalArgs.id}
          data-open-modal
        >
          {triggerLabel}
        </Button>
        <Modal {...modalArgs} />
      </>
    );
  }
};