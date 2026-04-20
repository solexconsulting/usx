import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';
import Button from '../button/Button.jsx';
import modal from "@uswds/uswds/js/usa-modal";

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultActions = [
  { children: 'Continue without saving', variant: 'primary', extraAttributes: { 'data-close-modal': true } },
  { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', extraAttributes: { 'data-close-modal': true } },
];

const forceActions = [
  { children: 'Yes, stay signed in', variant: 'primary', extraAttributes: { 'data-close-modal': true } },
  { children: 'Sign out', variant: 'unstyled', className: 'padding-105 text-center', extraAttributes: { 'data-close-modal': true } },
];

export default {
  title: 'Django/Modal',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        return () => modal.off();
      }, []);

      return <Story />;
    }
  ]
};


var componentRendered = false;
function postRender() {
  if (!componentRendered) {
    modal.on();
  }
  componentRendered = true;
}

const ModalDjango = djangoComponent('modal', postRender=postRender);

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'modal', props: args })
      }
    }
  },
  render: (args) => (
    <>
      <Button
        href={`#${args.id}`}
        variant="outline"
        aria-controls={args.id}
        data-open-modal
      >
        Open modal
      </Button>
      <ModalDjango {...args} />
    </>
  )
});

export const Default = createStory({
  id: 'django-modal-default',
  heading: 'Are you sure you want to continue?',
  description: 'You have unsaved changes that will be lost.',
  actions: defaultActions,
});

export const Large = createStory({
  id: 'django-modal-large',
  heading: 'Are you sure you want to continue?',
  description: 'You have unsaved changes that will be lost.',
  size: 'lg',
  actions: defaultActions,
});

export const LargeCollapsed = createStory({
  id: 'django-modal-lg-collapsed',
  heading: 'Are you sure you want to continue?',
  description: 'You have unsaved changes that will be lost.',
  size: 'lg-collapsed',
  actions: defaultActions,
});

export const ForceAction = createStory({
  id: 'django-modal-force',
  heading: 'Your session will end soon.',
  description: "You've been inactive for too long. Please choose to stay signed in or sign out. Otherwise, you'll be signed out automatically in 5 minutes.",
  forceAction: true,
  actions: forceActions,
});

