import config from '../../../../core/src/components/swap/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Swap.React.stories.jsx';

export default {
  title: 'Django/USX/Swap',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'swap' });

export const Default = createStory(storyDefs.Default);
export const DefaultIcon = createStory(storyDefs['Default - Icon']);
export const ActiveAlwaysOn = createStory(storyDefs['Active - Always On']);
export const RotateText = createStory(storyDefs['Rotate - Text']);
export const RotateIcon = createStory(storyDefs['Rotate - Icon']);
export const FlipText = createStory(storyDefs['Flip - Text']);
export const FlipEmoji = createStory(storyDefs['Flip - Emoji']);
export const ColorChangeIcon = createStory(storyDefs['Color Change - Icon']);
export const AdvancedCustomChildren = createStory(storyDefs['Advanced - Custom Children']);
export const TriggerAlertOnSwap = createStory({
  ...storyDefs['Trigger Alert On Swap'],
  inputProps: {
    onChange: "alert('Swap triggered!')",
  }
});