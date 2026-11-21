import { createDjangoStory } from '../../../../utils/storyHelpers.jsx';
import { storyDefs, Linked as ReactLinked } from './ChatContext.React.stories.jsx';
export default { title: 'Django/USX/Chat/Context' };
const story = createDjangoStory({ componentName: 'chat-context' });
export const Default = story(storyDefs.Default);
export const Linked = createDjangoStory({
  componentName: 'chat-context',
  renderTree: ReactLinked.render,
})(storyDefs.Linked);
