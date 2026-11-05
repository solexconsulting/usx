import type { CellOptions, TableColumn, TableRowData } from './types';

/** A cell's color utility replaces the same utility family from its column. */
export function mergeCellClasses(columnClass?: string, cellClass?: string): string {
  const cellTokens = cellClass?.split(/\s+/).filter(Boolean) || [];
  const replacesBackground = cellTokens.some((token) => token.startsWith('bg-'));
  const replacesText = cellTokens.some((token) => token.startsWith('text-'));
  const columnTokens = columnClass?.split(/\s+/).filter((token) => token &&
    !(replacesBackground && token.startsWith('bg-')) &&
    !(replacesText && token.startsWith('text-'))) || [];
  return [...columnTokens, ...cellTokens].join(' ');
}

export interface PlannedCell {
  column: TableColumn;
  options: CellOptions;
  colSpan: number;
  rowSpan: number;
}

export interface PlannedRow {
  row: TableRowData;
  cells: PlannedCell[];
}

/** Plan a rectangular body grid, omitting slots covered by spans. Spans stop at the current group/page. */
export function planCells(rows: TableRowData[], columns: TableColumn[]): PlannedRow[] {
  const occupied = rows.map(() => columns.map(() => false));
  return rows.map((row, rowIndex) => {
    const cellProps = row.cellProps || {};
    const cells: PlannedCell[] = [];
    columns.forEach((column, columnIndex) => {
      if (occupied[rowIndex][columnIndex]) return;
      const options = cellProps[column.key] || {};
      const desiredCols = Math.max(1, Math.floor(Number(options.colSpan) || 1));
      const desiredRows = Math.max(1, Math.floor(Number(options.rowSpan) || 1));
      let colSpan = 0;
      while (colSpan < desiredCols && columnIndex + colSpan < columns.length && !occupied[rowIndex][columnIndex + colSpan]) colSpan++;
      let rowSpan = 0;
      while (rowSpan < desiredRows && rowIndex + rowSpan < rows.length &&
        occupied[rowIndex + rowSpan].slice(columnIndex, columnIndex + colSpan).every((slot) => !slot)) rowSpan++;
      for (let r = rowIndex; r < rowIndex + rowSpan; r++) {
        for (let c = columnIndex; c < columnIndex + colSpan; c++) occupied[r][c] = true;
      }
      cells.push({ column, options, colSpan, rowSpan });
    });
    return { row, cells };
  });
}
