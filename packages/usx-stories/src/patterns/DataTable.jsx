import React, { useId, useRef, useState } from 'react';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import Table from '../../../usx-react/src/components/table/Table.tsx';
import Tag from '../../../usx-react/src/components/tag/Tag.tsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import { PageHeader, DestructiveAction } from './BuildingBlocks.jsx';
import { EmptyState, PageState } from './Feedback.jsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';

const applications = [
    { id: 'APP-001', name: 'Population health study', status: 'Active', updated: '2026-09-28' },
    { id: 'APP-002', name: 'Genomic research access', status: 'Pending', updated: '2026-09-27' },
    { id: 'APP-003', name: 'Clinical outcomes analysis', status: 'Draft', updated: '2026-09-26' },
    { id: 'APP-004', name: 'Community health survey', status: 'Active', updated: '2026-09-25' },
    { id: 'APP-005', name: 'Environmental exposure study', status: 'Pending', updated: '2026-09-24' },
    { id: 'APP-006', name: 'Longitudinal cohort request', status: 'Draft', updated: '2026-09-23' },
];

export function DataTablePattern({ state = 'normal' }) {
    const prefix = useId();
    const [records, setRecords] = useState(state === 'empty' ? [] : applications);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [selected, setSelected] = useState([]);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [message, setMessage] = useState('');
    const [recovered, setRecovered] = useState(false);
    const confirmation = useRef(null);
    const returnFocus = useRef(null);
    const filtered = records.filter(
        (record) =>
            record.name.toLowerCase().includes(query.toLowerCase()) &&
            (!status || record.status === status)
    );
    const clear = () => {
        setQuery('');
        setStatus('');
        setSelected([]);
    };
    const exportRecords = () => {
        const rows = selected.length
            ? filtered.filter((record) => selected.includes(record.id))
            : filtered;
        const url = URL.createObjectURL(
            new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = 'applications.json';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMessage(`Exported ${rows.length} applications.`);
    };
    return (
        <>
            <PageHeader
                title="Applications"
                description="Manage requests for controlled data access."
                actions={[
                    {
                        children: 'Create',
                        href: '?id=examples-workflows--ordered&viewMode=story',
                        iconProps: [{ name: 'add' }],
                    },
                ]}
            />
            <PageState state={recovered ? 'normal' : state} onRetry={() => setRecovered(true)}>
                <div className="grid-row grid-gap flex-align-end margin-bottom-2">
                    <div className="tablet:grid-col-3">
                        <Select
                            id={`${prefix}-status`}
                            label="Status"
                            placeholder="All statuses"
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                                setSelected([]);
                            }}
                            options={[
                                ...['Active', 'Pending', 'Draft'].map((value) => ({ value, label: value })),
                            ]}
                        />
                    </div>
                    <div className="tablet:grid-col-6 display-relative">
                        <Input
                            key={`${prefix}-keyword-input`}
                            id={`${prefix}-keyword-input`}
                            label="Search by keyword"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                            }}
                        />
                        {query && (
                            <Button
                                variant="unstyled"
                                className="padding-x-1 margin-left-1"
                                onClick={clear}
                                style={{ position: 'absolute', left: '0', bottom: '-25px' }}
                            >Clear</Button>
                        )}
                    </div>
                    <div className="tablet:grid-col-fill display-flex flex-row flex-justify-end">
                        <Button
                            variant="outline"
                            iconProps={[{ name: 'file_download' }]}
                            onClick={exportRecords}
                            disabled={!filtered.length}
                        >
                            Export
                        </Button>
                    </div>
                </div>
                {message && <Alert variant="success" slim text={message} />}
                <p role="status">{selected.length} selected</p>
                {filtered.length ? (
                    <Table
                        key={`${query}-${status}-${records.length}`}
                        id={`${prefix}-table`}
                        aria-label="Applications"
                        className="width-full"
                        borderless
                        responsive="stack"
                        sortable
                        selectionMode="checkbox"
                        select={selected}
                        onSelect={setSelected}
                        paginate={{ pageSize: 5, pageSizeOptions: [5, 10], showSummary: true }}
                        data={filtered}
                        columns={[
                            { key: 'name', header: 'Name', primary: true },
                            {
                                key: 'status',
                                header: 'Status',
                                render: (row) => (
                                    <Tag
                                        value={row.status}
                                        outline
                                        color={row.status === 'Active' ? 'success' : 'base'}
                                    />
                                ),
                            },
                            {
                                key: 'updated',
                                header: 'Updated',
                                render: (row) =>
                                    state === 'partial' && row.id === 'APP-001' ? 'Not provided' : row.updated,
                            },
                            {
                                key: 'actions',
                                header: 'Actions',
                                sortable: false,
                                render: (row) => (
                                    <Button
                                        variant="unstyled"
                                        aria-label={`Delete ${row.name}`}
                                        title={`Delete ${row.name}`}
                                        iconProps={[{ name: 'delete' }]}
                                        onClick={(event) => {
                                            returnFocus.current = event.currentTarget;
                                            setPendingDelete(row);
                                            requestAnimationFrame(() => confirmation.current?.focus());
                                        }}
                                    />
                                ),
                            },
                        ]}
                    />
                ) : (
                    <EmptyState
                        title={records.length ? 'No applications found' : 'No applications yet'}
                        description={
                            records.length
                                ? 'No applications match your current filters.'
                                : 'Create an application to request data access.'
                        }
                        onClear={records.length ? clear : undefined}
                    />
                )}
                {pendingDelete && (
                    <div ref={confirmation} tabIndex={-1}>
                        <DestructiveAction
                            name={pendingDelete.name}
                            onCancel={() => {
                                setPendingDelete(null);
                                returnFocus.current?.focus();
                            }}
                            onDelete={() => {
                                setRecords(records.filter((record) => record.id !== pendingDelete.id));
                                setSelected(selected.filter((id) => id !== pendingDelete.id));
                                setMessage(`${pendingDelete.name} deleted.`);
                                setPendingDelete(null);
                            }}
                        />
                    </div>
                )}
                {query || status ? (
                    <Button
                        children="Clear filters"
                        variant="outline"
                        onClick={clear}
                    />
                ) : null}
            </PageState>
        </>
    );
}
