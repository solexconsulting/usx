import React from 'react';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import { formatDuration } from './format.js';
import { SOURCE_LABELS } from './labels.js';
import { playStatus, isPlayStale } from './rows.js';
import StatusTag from './StatusTag.jsx';

function Details({ result }) {
  const errors = result.consoleErrors.reduce((sum, error) => sum + error.count, 0);
  const regressed = ['fail', 'error'].includes(result.status) && result.previousStatus === 'pass';
  const parts = [
    result.assertions != null && `${result.assertions} assertions`,
    formatDuration(result.durationMs),
    result.attempts > 1 && `${result.attempts} attempts`,
    regressed && 'was Pass',
    errors > 0 && `${errors} console error${errors > 1 ? 's' : ''}`,
  ].filter(Boolean);
  return <small>{parts.join(' · ')}</small>;
}

/** One source's play: its outcome, and a link to the story when it has one. */
export default function PlayCell({ play, component, source }) {
  return (
    <div className="display-flex flex-align-start flex-column" style={{ gap: '0.5rem' }}>
      <div className="display-flex flex-align-center flex-row flex-wrap" style={{ gap: '0.5rem' }}>
        <StatusTag
          status={playStatus(play)}
          title={play.state === 'ran' ? play.result.message : undefined}
        />
        {play.state === 'ran' && <Details result={play.result} />}
      </div>
      {isPlayStale(play) && (
        <StatusTag status="stale" title="The sources changed after this play was recorded" />
      )}
      {play.storyId && (
        <Button
          variant="unstyled"
          href={`./?path=/story/${play.storyId}`}
          target="_top"
          aria-label={`View the ${SOURCE_LABELS[source]} story for ${component}`}
        >
          View
        </Button>
      )}
    </div>
  );
}
