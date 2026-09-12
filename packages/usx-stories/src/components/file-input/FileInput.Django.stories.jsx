import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../core/src/components/file-input/config.json';
import { buildArgTypes, createDjangoStory, componentTag } from '../../utils/storyHelpers.jsx';
import { useDjangoRenderedHtml } from '../../utils/djangoComponent.js';
import {
  storyDefs,
  ManagedMultiple as ManagedMultipleReactStory,
  PreloadedDownloadable as PreloadedDownloadableReactStory,
  PreloadedNotDownloadable as PreloadedNotDownloadableReactStory,
  PreloadedDisabled as PreloadedDisabledReactStory,
  PreloadedNameOnly as PreloadedNameOnlyReactStory,
  LongFileName as LongFileNameReactStory,
} from './FileInput.React.stories.jsx';
import fileInput from '@uswds/uswds/js/usa-file-input';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because it's struggling
        const timeout = setTimeout(() => {
          fileInput.on();
        }, 400);
        return () => {
          clearTimeout(timeout);
          fileInput.off();
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'file-input' });

export const Default = createStory(storyDefs.Default);
export const AcceptSpecificTypes = createStory(storyDefs.AcceptSpecificTypes);
export const AcceptImages = createStory(storyDefs.AcceptImages);
export const Multiple = createStory(storyDefs.Multiple);
export const WithError = createStory(storyDefs.WithError);
export const Disabled = createStory(storyDefs.Disabled);

// manageIndividualFiles/defaultFiles are React-only (see config.json), so the
// Django preview composes the plain `file-input` template with a separate
// `file-list` template, matching how FileInput.jsx renders the pair itself.
const inputPropNames = new Set(
  Object.keys(config.props || {}).filter(
    (key) => !['manageIndividualFiles', 'defaultFiles', 'fileListHint', 'onFilesChange'].includes(key)
  )
);
const toInputArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => inputPropNames.has(key))
);
const toFileListArgs = (args) => ({
  files: (args.defaultFiles || []).map((entry, idx) => ({ key: idx + 1, ...entry })),
  hint: args.fileListHint,
  disabled: args.disabled,
});

function ManagedFileInputPreview({ inputArgs, listArgs, hasFiles }) {
  const { html: inputHtml, error: inputError } = useDjangoRenderedHtml('file-input', inputArgs);
  const { html: listHtml, error: listError } = useDjangoRenderedHtml('file-list', listArgs);

  const error = inputError || (hasFiles ? listError : null);
  if (error) {
    return <div style={{ color: 'red' }}>Error rendering component: {error}</div>;
  }

  return (
    <>
      <div className="usx-file-input__add-only" dangerouslySetInnerHTML={{ __html: inputHtml }} />
      {hasFiles && <div dangerouslySetInnerHTML={{ __html: listHtml }} />}
    </>
  );
}

ManagedFileInputPreview.propTypes = {
  inputArgs: PropTypes.object.isRequired,
  listArgs: PropTypes.object.isRequired,
  hasFiles: PropTypes.bool.isRequired,
};

const createManagedStory = (reactStory) => {
  const args = reactStory.args;
  const hasFiles = (args.defaultFiles || []).length > 0;
  return {
    args,
    parameters: {
      docs: {
        source: {
          code: [
            componentTag({ name: 'file-input', props: toInputArgs(args) }),
            hasFiles ? componentTag({ name: 'file-list', props: toFileListArgs(args) }) : null,
          ].filter(Boolean).join('\n\n'),
        },
      },
    },
    render: (storyArgs) => (
      <ManagedFileInputPreview
        inputArgs={toInputArgs(storyArgs)}
        listArgs={toFileListArgs(storyArgs)}
        hasFiles={(storyArgs.defaultFiles || []).length > 0}
      />
    ),
  };
};

export const ManagedMultiple = createManagedStory(ManagedMultipleReactStory);
export const PreloadedDownloadable = createManagedStory(PreloadedDownloadableReactStory);
export const PreloadedNotDownloadable = createManagedStory(PreloadedNotDownloadableReactStory);
export const PreloadedDisabled = createManagedStory(PreloadedDisabledReactStory);
export const PreloadedNameOnly = createManagedStory(PreloadedNameOnlyReactStory);
export const LongFileName = createManagedStory(LongFileNameReactStory);

