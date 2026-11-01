import config from '../../../../usx-react/src/components/file-list/config.json';
import { waitFor } from 'storybook/test';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './FileList.React.stories.jsx';

export default {
  title: 'Django/USX/FileList',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'file-list' });
const connected = new WeakSet();
const withRemovalDemo = (story, override = false) => ({
  ...story,
  // This is consumer code in the story, equivalent to supplying React's onRemove callback.
  play: async ({ canvasElement }) => {
    const list = await waitFor(() => {
      const node = canvasElement.querySelector('.usx-file-input__list');
      if (!node) throw new Error('File list has not rendered');
      return node;
    });
    if (connected.has(list)) return;
    connected.add(list);
    list.addEventListener('click', (event) => {
      const button = event.target.closest?.('.usx-file-input__delete-button');
      if (!button || !list.contains(button)) return;
      const row = button.closest('.usx-file-input__file-item');
      if (override && row.querySelector('.usx-file-input__file-name')?.textContent === 'w2-2023.pdf') {
        // eslint-disable-next-line no-console
        console.log('Custom delete for "w2-2023.pdf"');
      }
      row.remove();
      const remaining = list.querySelectorAll('.usx-file-input__file-item');
      if (!remaining.length) list.remove();
      else list.querySelector('[aria-live="polite"]').textContent = `You have selected the file: ${remaining[remaining.length - 1].querySelector('.usx-file-input__file-name').textContent}.`;
    });
  },
});
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => ({
  ...Object.fromEntries(Object.entries(args).filter(([key]) => allowedPropNames.has(key))),
  // The consumer owns the removal handler; the template needs its presence to render Delete.
  onRemove: args.onRemove === null ? null : 'storyFileListRemove',
});

export const Default = withRemovalDemo(createStory(toDjangoArgs(storyDefs.Default)));
export const WithDownloadLink = withRemovalDemo(createStory(toDjangoArgs(storyDefs.WithDownloadLink)));
export const CustomHint = withRemovalDemo(createStory(toDjangoArgs(storyDefs.CustomHint)));
export const ZeroSize = withRemovalDemo(createStory(toDjangoArgs(storyDefs.ZeroSize)));
export const Disabled = createStory(toDjangoArgs(storyDefs.Disabled));
export const NoOnRemove = createStory(toDjangoArgs(storyDefs.NoOnRemove));
export const LongFileName = withRemovalDemo(createStory(toDjangoArgs(storyDefs.LongFileName)));
export const PerFileOverride = withRemovalDemo(createStory(toDjangoArgs({
  files: [
    { key: 1, name: 'test1.jpg', size: 7000 },
    { key: 2, name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf', onRemove: 'storyFileListOverride' },
  ],
})), true);
