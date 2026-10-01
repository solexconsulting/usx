import React from 'react';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Icon from '../../../usx-react/src/components/icon/Icon.tsx';
import Spinner from '../../../usx-react/src/components/spinner/Spinner.tsx';

export function EmptyState({
  title = 'No applications found',
  description = "There aren't any applications matching your current filters.",
  onClear,
  actionLabel = 'Clear filters',
}) {
  return (
    <div className="text-center padding-y-5" role="status">
      <Icon name="search" size={5} className="text-base" aria-hidden="true" />
      <h2 className="font-sans-lg margin-bottom-1">{title}</h2>
      <p className="margin-top-0">{description}</p>
      {onClear && (
        <Button variant="outline" onClick={onClear}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function PageState({ state, onRetry, children }) {
  if (state === 'loading')
    return (
      <Spinner size={4} label="Loading records..." className="margin-top-3" />
    );
  if (state === 'error')
    return (
      <Alert variant="error" heading="Unable to load records">
        <p>Your changes have not been lost. Please try again.</p>
        {onRetry && (
          <Button variant="unstyled" onClick={onRetry}>
            Try again
          </Button>
        )}
      </Alert>
    );
  if (state === 'denied')
    return (
      <Alert
        variant="warning"
        heading="Permission denied"
        text="You do not have access to these records. Contact your administrator to request access."
      />
    );
  return (
    <>
      {state === 'partial' && (
        <Alert
          variant="warning"
          slim
          text="Some records are incomplete. Missing information is marked as not provided."
        />
      )}
      {children}
    </>
  );
}
