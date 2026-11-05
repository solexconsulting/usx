import React from 'react';
import config from '../../../../usx-react/src/components/modal/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Modal.React.stories.jsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import Modal from '../../../../usx-react/src/components/modal/Modal.tsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Modal',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['Unenhanced'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`modal.init()`')
      }
    }
  },
  decorators: [...componentInit('modal')]
};

const createStory = createDjangoStory({
  componentName: 'modal',
  renderTree: ({ triggerLabel, ...modalArgs }) => (
    <>
      <Button
        href={`#${modalArgs.id}`}
        variant="outline"
        extraAttributes={{ 'aria-controls': modalArgs.id, 'data-open-modal': true }}
      >
        {triggerLabel || 'Open modal'}
      </Button>
      <Modal {...modalArgs} />
    </>
  ),
});

export const Default = createStory(storyDefs.Default);
export const Unenhanced = { ...createStory(storyDefs.Unenhanced), parameters: { docs: { description: { story: 'The trigger and dialog markup remain, but the USWDS modal script is needed to open and close the dialog.' } } } };
export const Large = createStory(storyDefs.Large);
export const LargeCollapsed = createStory(storyDefs.LargeCollapsed);
export const ForceAction = createStory(storyDefs.ForceAction);

