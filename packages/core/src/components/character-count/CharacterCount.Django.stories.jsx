import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './CharacterCount.React.stories.jsx';

export default {
  title: 'Django/CharacterCount',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('character-count');

export const Default = createStory(storyDefs.Default);
export const HardLimit = createStory(storyDefs.HardLimit);
export const WithHint = createStory(storyDefs.WithHint);
export const WithTextArea = createStory(storyDefs.WithTextArea);
export const WithTextAreaHardLimit = createStory(storyDefs.WithTextAreaHardLimit);
export const Required = createStory(storyDefs.Required);
export const SuccessState = createStory(storyDefs.SuccessState);
export const Disabled = createStory(storyDefs.Disabled);
