import React from 'react';
import FileInput from '../../../../usx-react/src/components/file-input/FileInput.tsx';
import config from '../../../../usx-react/src/components/file-input/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/FileInput',
  component: FileInput,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`fileInput.init()`'),
      },
    },
  },
  decorators: [...componentInit('fileInput')],
};

export const storyDefs = {
  Default: {
    id: 'file-input-single',
    name: 'file-input-single',
    label: 'Input accepts a single file',
  },
  AcceptSpecificTypes: {
    id: 'file-input-specific',
    name: 'file-input-specific',
    label: 'Input accepts only specific file types',
    hint: 'Select PDF or TXT files',
    accept: '.pdf,.txt',
    invalidFileTypeMessage: 'Only PDF or TXT files are accepted.',
  },
  AcceptImages: {
    id: 'file-input-images',
    name: 'file-input-images',
    label: 'Input accepts any kind of image',
    hint: 'Select any type of image format',
    accept: 'image/*',
  },
  Multiple: {
    id: 'file-input-multiple',
    name: 'file-input-multiple',
    label: 'Input accepts multiple files',
    hint: 'Select one or more files',
    multiple: true,
  },
  WithError: {
    id: 'file-input-error',
    name: 'file-input-error',
    label: 'Input has an error',
    hint: 'Select any valid file',
    error: 'Display a helpful error message',
  },
  Disabled: {
    id: 'file-input-disabled',
    name: 'file-input-disabled',
    label: 'Disabled input',
    disabled: true,
  },
};

export const Default = { args: storyDefs.Default };
export const AcceptSpecificTypes = { args: storyDefs.AcceptSpecificTypes };
export const AcceptImages = { args: storyDefs.AcceptImages };
export const Multiple = { args: storyDefs.Multiple };
export const WithError = { args: storyDefs.WithError };
export const Disabled = { args: storyDefs.Disabled };

export const PreloadedSingle = {
  args: storyDefs.Default,
};

export const PreloadedMultiple = {
  args: storyDefs.Multiple,
};

// VA.gov's file-input-multiple pattern: a single, permanently-enhanced USWDS
// input is used purely to add files — it's reset after every selection (and
// its own preview UI suppressed via CSS) so it always looks empty/ready for
// the next one. Each added file lives as its own row in a parallel file list
// below, with its own Delete action. React only.
export const ManagedMultiple = {
  tags: ['USX'],
  args: {
    id: 'file-input-managed',
    name: 'file-input-managed',
    label: 'Upload supporting documents',
    hint: 'Select one or more files',
    multiple: true,
    manageIndividualFiles: true,
  },
};

// defaultFiles seeds rows for files that already exist on the server — here
// each row's name links out to download the file.
export const PreloadedDownloadable = {
  tags: ['USX'],
  args: {
    id: 'file-input-preloaded-downloadable',
    name: 'file-input-preloaded-downloadable',
    label: 'Supporting documents',
    hint: 'Select one or more files',
    multiple: true,
    manageIndividualFiles: true,
    defaultFiles: [
      { name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' },
      { name: 'pay-stub.pdf', size: 102400, url: 'https://example.com/files/pay-stub.pdf' },
    ],
  },
};

// Same as above, but the preloaded files have no url — the server has them,
// but they're not available for download from here.
export const PreloadedNotDownloadable = {
  tags: ['USX'],
  args: {
    id: 'file-input-preloaded-not-downloadable',
    name: 'file-input-preloaded-not-downloadable',
    label: 'Supporting documents',
    hint: 'Select one or more files',
    multiple: true,
    manageIndividualFiles: true,
    defaultFiles: [
      { name: 'w2-2023.pdf', size: 245800 },
      { name: 'pay-stub.pdf', size: 102400 },
    ],
  },
};

// Preloaded files with the whole input disabled — a fully locked, read-only
// record of what's already been submitted (no add, change, or delete).
export const PreloadedDisabled = {
  tags: ['USX'],
  args: {
    id: 'file-input-preloaded-disabled',
    name: 'file-input-preloaded-disabled',
    label: 'Supporting documents',
    hint: 'These files were submitted with your application',
    multiple: true,
    manageIndividualFiles: true,
    disabled: true,
    defaultFiles: [
      { name: 'w2-2023.pdf', size: 245800, url: 'https://example.com/files/w2-2023.pdf' },
      { name: 'pay-stub.pdf', size: 102400, url: 'https://example.com/files/pay-stub.pdf' },
    ],
  },
};

// A row can also be just a filename with no size and no download — a plain
// indicator that a file was previously uploaded, without a real file behind
// it in this view.
export const PreloadedNameOnly = {
  tags: ['USX'],
  args: {
    id: 'file-input-preloaded-name-only',
    name: 'file-input-preloaded-name-only',
    label: 'Supporting documents',
    hint: 'Select one or more files',
    multiple: true,
    manageIndividualFiles: true,
    defaultFiles: [{ name: 'government-id.jpg' }],
  },
};

// Long names should wrap (not overflow) and never push the Delete button
// out of view — check this on both desktop and mobile viewport widths.
export const LongFileName = {
  tags: ['USX'],
  args: {
    id: 'file-input-long-file-name',
    name: 'file-input-long-file-name',
    label: 'Upload supporting documents',
    hint: 'Select one or more files',
    multiple: true,
    manageIndividualFiles: true,
    defaultFiles: [
      {
        name: 'this-is-an-unusually-long-supporting-document-filename-used-to-verify-wrapping-behavior.pdf',
        size: 1892400,
      },
      {
        name: 'another-extremely-long-filename-for-a-downloadable-preloaded-file-to-check-the-download-icon-and-link-wrapping.pdf',
        size: 512000,
        url: 'https://example.com/files/another-extremely-long-filename-for-a-downloadable-preloaded-file.pdf',
      },
    ],
  },
};
