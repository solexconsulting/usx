import React, { useMemo, useState } from 'react';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import DataTable from '../../../usx-react/src/components/data-table/DataTable.tsx';
import ComponentDetails from './snapshotReport/ComponentDetails.jsx';
import PlayCell from './snapshotReport/PlayCell.jsx';
import SnapshotsCell from './snapshotReport/SnapshotsCell.jsx';
import StatusTag from './snapshotReport/StatusTag.jsx';
import { formatTime, sectionSummary, tally } from './snapshotReport/format.js';
import { SOURCES } from './snapshotReport/labels.js';
import { FILTERS, isPlayStale, playStatus, toRow, visibleComponents } from './snapshotReport/rows.js';
import useReport from './snapshotReport/useReport.js';


const FILTER_OPTIONS = FILTERS.map(({ value, label }) => ({ value, label }));

function Tallies({ counts }) {
  return Object.entries(counts).map(([status, count]) => {
    return (
      <span key={status} className="margin-right-2">
        <StatusTag status={status} count={count} />
      </span>
    );
  });
}

const columns = [
  { key: 'component', header: 'Component', primary: true, sortable: true },
  { key: 'snapshots', header: 'Snapshots', render: (row) => <SnapshotsCell component={row} /> },
  {
    key: 'comparisonStatus',
    header: 'React vs Django',
    sortable: true,
    render: (row) => (
      <>
        <StatusTag status={row.comparison.status} /><br/>
        <small>{sectionSummary(row.comparison)}</small>
      </>
    ),
  },
  {
    key: 'reactPlay',
    header: 'Play (React)',
    sortable: true,
    render: (row) => <PlayCell play={row.plays.react} component={row.name} source="react" />,
  },
  {
    key: 'djangoPlay',
    header: 'Play (Django)',
    sortable: true,
    render: (row) => <PlayCell play={row.plays.django} component={row.name} source="django" />,
  },
  { key: 'playedAt', header: 'Last played', sortable: true, render: (row) => <small>{formatTime(row.playedAt)}</small> },
];

export default function SnapshotReport() {
  const state = useReport();
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const components = useMemo(
    () => (state.status === 'ready' ? state.report.components : []),
    [state]
  );
  const rows = useMemo(
    () => visibleComponents(components, search, filter).map(toRow),
    [components, search, filter]
  );

  if (state.status === 'loading') return <p className="padding-3">Loading report…</p>;
  if (state.status === 'error')
    return (
      <div className="padding-3">
        <Alert variant="error" heading="Report unavailable">
          {state.message}
        </Alert>
      </div>
    );

  const plays = components.flatMap((component) => SOURCES.map((source) => playStatus(component.plays[source])));
  const stalePlays = components.flatMap((component) => SOURCES.filter((source) => isPlayStale(component.plays[source])));
  return (
    <div className="padding-3">
      <h1 className="margin-top-0">Snapshot report</h1>
      <p>
        Built {formatTime(state.report.generatedAt)}. Refresh it with <code>pnpm snapshots report</code>; run plays with{' '}
        <code>pnpm snapshots plays [--changed] [--failed]</code>.
      </p>
      <p>
        <strong>React vs Django:</strong> <Tallies counts={tally(components.map((component) => component.comparison.status))} />
      </p>
      <p>
        <strong>Play tests:</strong> <Tallies counts={tally(plays)} />
        {stalePlays.length > 0 && <small> ({stalePlays.length} recorded before the sources last changed)</small>}
      </p>
      <div className="display-flex flex-wrap flex-align-end" style={{ gap: '1rem' }}>
        <Select label="Show" id="report-filter" placeholder="All components" options={FILTER_OPTIONS} value={filter} onChange={(event) => setFilter(event.target.value)} />
        <Input label="Component name" id="report-search" placeholder="Filter by name" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <DataTable
        columns={columns}
        data={rows}
        primaryKey="id"
        striped
        caption={`${rows.length} of ${components.length} components`}
        rowDetails={(row) => <ComponentDetails component={row} storyIds={state.storyIds} />}
        placeholder="No components match."
      />
    </div>
  );
}
