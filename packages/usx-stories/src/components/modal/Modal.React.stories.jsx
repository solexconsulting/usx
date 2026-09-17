import React from 'react';
import Modal from '../../../../core/src/components/modal/Modal.tsx';
import Button from '../../../../core/src/components/button/Button.tsx';
import config from '../../../../core/src/components/modal/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import modal from "@uswds/uswds/js/usa-modal";

export default {
  title: 'React/USWDS/Modal',
  component: Modal,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        setTimeout(() => {
          modal.on();
        }, 30);

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
    id: 'example-modal-default',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    actionProps: defaultActions,
    triggerLabel: 'Open modal',
  },
  Large: {
    id: 'example-modal-lg',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    size: 'lg',
    actionProps: defaultActions,
    triggerLabel: 'Open large modal',
  },
  LargeCollapsed: {
    id: 'example-modal-lg-collapsed',
    heading: 'Are you sure you want to continue?',
    description: 'You have unsaved changes that will be lost.',
    size: 'lg-collapsed',
    actionProps: defaultActions,
    triggerLabel: 'Open large collapsed modal',
  },
  ForceAction: {
    id: 'example-modal-force',
    heading: 'Your session will end soon.',
    description: "You've been inactive for too long. Please choose to stay signed in or sign out. Otherwise, you'll be signed out automatically in 5 minutes.",
    forceAction: true,
    actionProps: forceActions,
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
  tags: ['USX'],
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