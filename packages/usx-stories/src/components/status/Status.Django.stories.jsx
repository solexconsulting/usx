// import React from 'react';
import config from '../../../../usx-react/src/components/status/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import {
  storyDefs,
  renderAllVariants,
  colorProps,
  sizeProps,
  animationProps,
} from './Status.React.stories.jsx';

export default {
  title: 'Django/USX/Status',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'status' });

export const Default = createStory(storyDefs.Default);
export const Primary = createStory(storyDefs.Primary);
export const AccentCool = createStory(storyDefs.AccentCool);
export const AccentWarm = createStory(storyDefs.AccentWarm);
export const Secondary = createStory(storyDefs.Secondary);
export const Success = createStory(storyDefs.Success);
export const Warning = createStory(storyDefs.Warning);
export const Error = createStory(storyDefs.Error);
export const SizeXs = { name: 'Size: xs', ...createStory(storyDefs.SizeXs) };
export const SizeSm = { name: 'Size: sm', ...createStory(storyDefs.SizeSm) };
export const SizeMd = { name: 'Size: md', ...createStory(storyDefs.SizeMd) };
export const SizeLg = { name: 'Size: lg', ...createStory(storyDefs.SizeLg) };
export const SizeXl = { name: 'Size: xl', ...createStory(storyDefs.SizeXl) };
export const Ping = createStory(storyDefs.Ping);
export const Pulse = createStory(storyDefs.Pulse);
export const Bounce = createStory(storyDefs.Bounce);

const renderStatus = (props) => createStory(props).render(props);
export const AllColors = { render: () => renderAllVariants(renderStatus, colorProps, '0.75rem') };
export const AllSizes = { render: () => renderAllVariants(renderStatus, sizeProps, '0.75rem') };
export const AllAnimations = { render: () => renderAllVariants(renderStatus, animationProps, '1.5rem') };
