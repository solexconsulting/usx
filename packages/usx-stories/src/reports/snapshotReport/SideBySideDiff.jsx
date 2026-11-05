import React from 'react';

const codeStyle = {
  margin: 0,
  padding: '0.125rem 0.5rem',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  font: 'inherit',
};
const CHANGE_CLASS = { left: 'bg-warning text-black', right: 'bg-info text-black' };
// The side with no line is tinted like the side that has one, so a gap reads as an addition or removal.
const MISSING_CLASS = { left: 'bg-warning-light', right: 'bg-info-light' };

function cellClass(row, side) {
  if (row.kind !== 'change') return '';
  return row[side] === undefined ? MISSING_CLASS[side] : CHANGE_CLASS[side];
}

function Cell({ row, side }) {
  return (
    <pre className={cellClass(row, side)} style={codeStyle}>
      {row[side] ?? <span className="usa-sr-only">No line on this side</span>}
    </pre>
  );
}

/** Pairs each run of removed lines with the added lines that replaced them. */
export function toRows(diff) {
  const rows = [];
  let index = 0;
  while (index < diff.length) {
    const entry = diff[index];
    if (entry.kind === 'same') {
      rows.push({ kind: 'same', left: entry.text, right: entry.text });
      index++;
    } else if (entry.kind === 'gap') {
      rows.push({ kind: 'gap', count: entry.count });
      index++;
    } else {
      const removed = [];
      const added = [];
      while (index < diff.length && ['removed', 'added'].includes(diff[index].kind)) {
        (diff[index].kind === 'removed' ? removed : added).push(diff[index].text);
        index++;
      }
      for (let row = 0; row < Math.max(removed.length, added.length); row++)
        rows.push({ kind: 'change', left: removed[row], right: added[row] });
    }
  }
  return rows;
}

/** React's lines on the left, Django's on the right, changes highlighted. */
export default function SideBySideDiff({ diff }) {
  return (
    <div
      className="font-mono-xs"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid currentColor' }}
    >
      <strong className="bg-base-lightest padding-x-1">React</strong>
      <strong className="bg-base-lightest padding-x-1">Django</strong>
      {toRows(diff).map((row, index) =>
        row.kind === 'gap' ? (
          <div key={index} className="text-base padding-x-1" style={{ gridColumn: '1 / -1' }}>
            {row.count} unchanged lines
          </div>
        ) : (
          <React.Fragment key={index}>
            <Cell row={row} side="left" />
            <Cell row={row} side="right" />
          </React.Fragment>
        )
      )}
    </div>
  );
}
