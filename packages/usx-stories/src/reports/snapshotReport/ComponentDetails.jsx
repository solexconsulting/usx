import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import RenderedStories from './RenderedStories.jsx';
import SideBySideDiff from './SideBySideDiff.jsx';
import { SOURCES, SOURCE_LABELS } from './labels.js';
import StatusTag from './StatusTag.jsx';

const ranPlays = (component) =>
  SOURCES.flatMap((source) => (component.plays[source].state === 'ran' ? [{ source, result: component.plays[source].result }] : []));

function GenerationAlerts({ component }) {
  return SOURCES.map((source) => {
    const generation = component.generation[source];
    if (generation.state !== 'recorded') return null;
    const { status, message, warnings } = generation.result;
    const label = SOURCE_LABELS[source];
    return (
      <React.Fragment key={source}>
        {status === 'failed' && (
          <Alert variant="error" heading={`${label} snapshot was not generated`} className="margin-bottom-2">
            {message}
          </Alert>
        )}
        {warnings.length > 0 && (
          <Alert variant="warning" heading={`${label} snapshot warnings`} className="margin-bottom-2">
            <ul className="margin-0">{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
          </Alert>
        )}
      </React.Fragment>
    );
  });
}

function PlayAlerts({ component }) {
  return ranPlays(component).map(({ source, result }) => (
    <React.Fragment key={source}>
      {result.message && (
        <Alert
          variant={result.status === 'flaky' ? 'warning' : 'error'}
          heading={`Play ${result.status === 'flaky' ? 'flaked' : 'failed'} (${SOURCE_LABELS[source]})`}
          className="margin-bottom-2"
        >
          {result.message}
        </Alert>
      )}
      {result.consoleErrors.length > 0 && (
        <Alert variant="warning" heading={`Console errors (${SOURCE_LABELS[source]})`} className="margin-bottom-2">
          <ul className="margin-0">
            {result.consoleErrors.map((error) => (
              <li key={`${error.message}${error.url}`} style={{ overflowWrap: 'anywhere' }}>
                {error.message}
                {error.url && ` [${error.url}]`}
                {error.count > 1 && ` (x${error.count})`}
              </li>
            ))}
          </ul>
        </Alert>
      )}
    </React.Fragment>
  ));
}

function Section({ section, storyIds }) {
  return (
    <section className="margin-bottom-4">
      <h4 className="margin-top-0">
        {section.title} <StatusTag status={section.status} />
        {section.changedLines ? <small> ({section.changedLines} changed lines)</small> : null}
      </h4>
      {section.expected && (
        <Alert variant="info" heading="Expected difference" className="margin-bottom-2">
          {section.expected}
        </Alert>
      )}
      {section.diff ? (
        <SideBySideDiff diff={section.diff} />
      ) : (
        <p>This section exists only in the {section.status === 'react-only' ? 'React' : 'Django'} snapshot.</p>
      )}
      <RenderedStories title={section.title} storyIds={storyIds} />
    </section>
  );
}

/** Everything wrong with a component, shown when its row is expanded. */
export default function ComponentDetails({ component, storyIds }) {
  const differing = component.comparison.sections.filter((section) => section.status !== 'identical');
  const stale = component.comparison.staleExpectations;
  const generationNotes = SOURCES.some((source) => {
    const generation = component.generation[source];
    return generation.state === 'recorded' && (generation.result.status === 'failed' || generation.result.warnings.length > 0);
  });
  const playNotes = ranPlays(component).some(({ result }) => result.message || result.consoleErrors.length > 0);
  if (!differing.length && !stale.length && !generationNotes && !playNotes)
    return <p className="margin-0">Nothing to report.</p>;
  return (
    <div className="padding-2">
      <GenerationAlerts component={component} />
      <PlayAlerts component={component} />
      {stale.length > 0 && (
        <Alert variant="warning" heading="Expectations no longer needed" className="margin-bottom-2">
          {stale.join(', ')}
        </Alert>
      )}
      {differing.map((section) => (
        <Section key={section.title} section={section} storyIds={storyIds[component.name]} />
      ))}
    </div>
  );
}
