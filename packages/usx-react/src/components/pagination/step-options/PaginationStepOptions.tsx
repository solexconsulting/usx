import React from 'react';
import ClassNames from 'classnames';
import Select from '../../select/Select';

export interface PaginationStepOptionsProps {
  pageSize: number;
  pageSizeOptions?: number[];
  label?: string;
  id?: string;
  className?: string;
}

export default function PaginationStepOptions({
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  label = 'Items per page',
  id = 'pagination-step-options',
  className = '',
}: PaginationStepOptionsProps) {
  const classes = ClassNames(
    'usx-pagination__step-options',
    className
  );

  return (
    <div className={classes}>
      <Select
        key={pageSize}
        id={id}
        label={label}
        defaultValue={String(pageSize)}
        formGroup={false}
        options={pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))}
      />
    </div>
  );
}
