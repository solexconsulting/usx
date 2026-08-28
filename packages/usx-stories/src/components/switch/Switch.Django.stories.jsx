// import React from 'react';
import config from '../../../../core/src/components/switch/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Switch.React.stories.jsx';

export default {
  title: 'Django/USX/Switch',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'switch' });

export const Default = createStory(storyDefs.Default);
export const XS = createStory(storyDefs.XS);
export const SM = createStory(storyDefs.SM);
export const MD = createStory(storyDefs.MD);
export const LG = createStory(storyDefs.LG);
export const XL = createStory(storyDefs.XL);
export const Primary = createStory(storyDefs.Primary);
export const Success = createStory(storyDefs.Success);
export const Warning = createStory(storyDefs.Warning);
export const Error = createStory(storyDefs.Error);
export const PreChecked = createStory(storyDefs.PreChecked);
export const Disabled = createStory(storyDefs.Disabled);
export const DisabledChecked = createStory(storyDefs.DisabledChecked);

export const Indeterminate = createStory({ indeterminate: true, ariaChecked: 'mixed' });
export const WithLabel = createStory({ ...storyDefs.Default, label: 'Switch Label' });
