import React from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import config from './config.json';

export default {
  title: 'React/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        const uswds_min = document.createElement('script');
        const uswds_init = document.createElement('script');
        uswds_min.src = '../node_modules/@uswds/uswds/dist/js/uswds.min.js';
        uswds_init.src = '../node_modules/@uswds/uswds/dist/js/uswds-init.min.js';
        document.body.appendChild(uswds_min);
        document.body.appendChild(uswds_init);

        return () => {
          document.body.removeChild(uswds_min);
          document.body.removeChild(uswds_init);
        };
      }, []);

      return <Story />;
    }
  ]
};

export const Default = {
  render: () => {
    return (
      <>
        <Button
          href="#example-modal-4"
          variant="outline"
          aria-controls="example-modal-4"
          data-open-modal
        >
          Open modal
        </Button>
        <Modal
          id="example-modal-4"
          aria-labelledby="modal-4-heading"
          aria-describedby="modal-4-description"
          actions={[
            { children: 'Continue without saving', variant: 'primary', 'data-close-modal': true },
            { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', 'data-close-modal': true },
          ]}
        >
          You have unsaved changes that will be lost.
        </Modal>
      </>
    )
  }
};

export const Large = {
  render: () => (
    <>
      <Button
        href="#example-modal-large"
        variant="outline"
        aria-controls="example-modal-large"
        data-open-modal
      >
        Open large modal
      </Button>
      <Modal
        id="example-modal-large"
        size="lg"
        actions={[
          { children: 'Continue without saving', variant: 'primary', 'data-close-modal': true },
          { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', 'data-close-modal': true },
        ]}
      >
        You have unsaved changes that will be lost.
      </Modal>
    </>
  )
};

export const LargeCollapsed = {
  render: () => (
    <>
      <Button
        href="#example-modal-lg-collapsed"
        variant="outline"
        aria-controls="example-modal-lg-collapsed"
        data-open-modal
      >
        Open large collapsed modal
      </Button>
      <Modal
        id="example-modal-lg-collapsed"
        size="lg-collapsed"
        actions={[
          { children: 'Continue without saving', variant: 'primary', 'data-close-modal': true },
          { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', 'data-close-modal': true },
        ]}
      >
        You have unsaved changes that will be lost.
      </Modal>
    </>
  )
};

export const ForceAction = {
  render: () => (
    <>
      <Button
        href="#example-modal-force"
        variant="outline"
        aria-controls="example-modal-force"
        data-open-modal
      >
        Open modal with forced action
      </Button>
      <Modal
        id="example-modal-force"
        heading="Your session will end soon."
        forceAction
        actions={[
          { children: 'Yes, stay signed in', variant: 'primary', 'data-close-modal': true },
          { children: 'Sign out', variant: 'unstyled', className: 'padding-105 text-center', 'data-close-modal': true },
        ]}
      >
        You've been inactive for too long. Please choose to stay signed in or
        sign out. Otherwise, you'll be signed out automatically in 5 minutes.
      </Modal>
    </>
  )
};