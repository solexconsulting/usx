import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/modal/config.json';
import { buildArgTypes, componentTag, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Modal.React.stories.jsx';
import Button from '../../../../core/src/components/button/Button.tsx';
import modal from "@uswds/uswds/js/usa-modal";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Modal',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`modal.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        const timeout = setTimeout(() => {
          modal.init();
        }, 200);

        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ]
};

const ModalDjango = djangoComponent({ componentName: 'modal' });

const createStory = (storyDef) => ({
  args: storyDef,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'modal',
          props: Object.fromEntries(
            Object.entries(storyDef).filter(([key]) => key !== 'triggerLabel')
          )
        })
      }
    }
  },
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
          {triggerLabel || 'Open modal'}
        </Button>
        <ModalDjango {...modalArgs} />
      </>
    );
  }
});

export const Default = createStory(storyDefs.Default);
export const Large = createStory(storyDefs.Large);
export const LargeCollapsed = createStory(storyDefs.LargeCollapsed);
export const ForceAction = createStory(storyDefs.ForceAction);

