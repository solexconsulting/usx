import React from 'react';
import { formatTime } from './format.js';
import { SOURCES, SOURCE_LABELS } from './labels.js';
import StatusTag from './StatusTag.jsx';

function GenerationNotes({ generation }) {
  if (generation.state !== 'recorded') return null;
  const { result, freshness, recordedAt } = generation;
  const warnings = result.warnings;
  return (
    <>
      {result.status === 'failed' && (
        <>
          {' '}
          <StatusTag status="error" title={result.message} />
        </>
      )}
      {warnings.length > 0 && (
        <small title={warnings.join('\n')}>
          {' '}
          ({warnings.length} warning{warnings.length > 1 ? 's' : ''})
        </small>
      )}
      {freshness === 'stale' && (
        <>
          {' '}
          <StatusTag status="stale" title="The stories or component changed since this was generated" />
        </>
      )}
      <br />
      <small>Generated {formatTime(recordedAt)}</small>
    </>
  );
}

/** Which snapshots exist, and anything wrong with how they were generated. */
export default function SnapshotsCell({ component }) {
  return SOURCES.map((source) => (
    <div key={source}>
      {SOURCE_LABELS[source]}: {component.comparison.present.includes(source) ? 'yes' : 'no'}
      <GenerationNotes generation={component.generation[source]} />
    </div>
  ));
}
