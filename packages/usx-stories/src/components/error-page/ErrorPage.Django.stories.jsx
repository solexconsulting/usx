import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import config from '../../../../usx-react/src/components/error-page/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './ErrorPage.React.stories.jsx';

export default {
  title: 'Django/USX/ErrorPage',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'error-page' });

export const Default = createStory(storyDefs.Default);
export const PermissionDenied = createStory(storyDefs.PermissionDenied);
export const SessionExpired = createStory(storyDefs.SessionExpired);
export const UnexpectedError = createStory(storyDefs.UnexpectedError);
export const ServiceUnavailable = createStory(storyDefs.ServiceUnavailable);
export const TooManyRequests = createStory(storyDefs.TooManyRequests);
export const ClientPageFallback = createStory(storyDefs.ClientPageFallback);
export const CustomRecoveryContent = createStory(storyDefs.CustomRecoveryContent);

/**
 * Technical details remain in the page source while collapsed. The host must authorize the viewer
 * and redact credentials, personal information, and request data before providing this object.
 */
export const TechnicalDetails = createStory(storyDefs.TechnicalDetails);
export const Minimal = createStory(storyDefs.Minimal);

/**
 * WARNING: "Cats" is an optional feature that displays a cat image corresponding to the
 * HTTP error code. This is just for fun and is not recommended.
 */
export const Cats = {
  ...createStory(storyDefs.Cats),
  render: (args) => (
    <>
      <Alert
        variant="warning"
        heading="Just for fun!"
        text={`
          "Cats" is an optional feature that displays a cat image corresponding to the
          HTTP error code. This is just for fun and is not recommended.
        `}
      />
      {createStory(storyDefs.Cats).render(args)}
    </>
  ),
};
