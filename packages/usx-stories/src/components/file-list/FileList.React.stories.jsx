import React, { useState } from 'react';
import FileList from '../../../../usx-react/src/components/file-list/FileList.tsx';
import config from '../../../../usx-react/src/components/file-list/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USX/FileList',
  component: FileList,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    files: [
      { key: 1, name: 'test1.jpg', size: 7000 },
      { key: 2, name: 'test2.jpg', size: 7200 },
    ],
  },
  WithDownloadLink: {
    files: [{ key: 1, name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' }],
  },
  CustomHint: {
    hint: 'Uploaded documents',
    files: [{ key: 1, name: 'government-id.jpg' }],
  },
  Disabled: {
    disabled: true,
    files: [{ key: 1, name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' }],
  },
  NoOnRemove: {
    onRemove: null,
    files: [{ key: 1, name: 'government-id.jpg' }],
  },
  // Long names should wrap (not overflow) and never push the Delete button
  // out of view — check this on both desktop and mobile viewport widths.
  LongFileName: {
    files: [
      {
        key: 1,
        name: 'this-is-an-unusually-long-supporting-document-filename-used-to-verify-wrapping-behavior.pdf',
        size: 1892400,
      },
      {
        key: 2,
        name: 'another-extremely-long-filename-for-a-downloadable-preloaded-file-to-check-the-download-icon-and-link-wrapping.pdf',
        size: 512000,
        url: 'https://example.com/files/another-extremely-long-filename-for-a-downloadable-preloaded-file.pdf',
      },
    ],
  },
};

// FileList is a controlled/presentational component (it doesn't own the
// files array) — wrap it with local state so Delete actually removes a row
// in the story canvas, the way a real consumer's onRemove would.
function InteractiveFileList(args) {
  const [files, setFiles] = useState(args.files);
  return (
    <FileList
      {...args}
      files={files}
      onRemove={args.onRemove === null ? null : (entry) => setFiles((prev) => prev.filter((f) => f.key !== entry.key))}
    />
  );
}

export const Default = { args: storyDefs.Default, render: InteractiveFileList };
export const WithDownloadLink = { args: storyDefs.WithDownloadLink, render: InteractiveFileList };
export const CustomHint = { args: storyDefs.CustomHint, render: InteractiveFileList };
export const Disabled = { args: storyDefs.Disabled, render: InteractiveFileList };

// No onRemove at all (component-level or per-file) — every Delete button is
// hidden, turning the list into a read-only record.
export const NoOnRemove = { args: storyDefs.NoOnRemove, render: InteractiveFileList };

export const LongFileName = { args: storyDefs.LongFileName, render: InteractiveFileList };

// One row provides its own onRemove (e.g. to hit a server-side delete
// endpoint for a specific preloaded file) — it takes priority over the
// component-level onRemove, which still handles every other row.
function PerFileOverrideRender(args) {
  const [files, setFiles] = useState(() =>
    args.files.map((entry) =>
      entry.key === 2
        ? {
            ...entry,
            onRemove: (removed) => {
              // Demo of a per-file override; a real app would call a delete API here.
              // eslint-disable-next-line no-console
              console.log(`Custom delete for "${removed.name}"`);
              setFiles((prev) => prev.filter((f) => f.key !== entry.key));
            },
          }
        : entry,
    ),
  );
  return (
    <FileList {...args} files={files} onRemove={(entry) => setFiles((prev) => prev.filter((f) => f.key !== entry.key))} />
  );
}

export const PerFileOverride = {
  args: {
    files: [
      { key: 1, name: 'test1.jpg', size: 7000 },
      { key: 2, name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' },
    ],
  },
  render: PerFileOverrideRender,
};
