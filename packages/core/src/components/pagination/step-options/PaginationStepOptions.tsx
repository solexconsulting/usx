import React from 'react';
import ClassNames from 'classnames';
import Select from '../../select/Select';

export interface PaginationStepOptionsProps {
  pageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange: (size: number) => void;
  label?: string;
  id?: string;
  className?: string;
}

export default function PaginationStepOptions({
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  label = 'Items per page',
  id = 'pagination-step-options',
  className = '',
}: PaginationStepOptionsProps) {
  const classes = ClassNames(
    'usx-pagination__step-options',
    className
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className={classes}>
      <Select
        id={id}
        label={label}
        value={pageSize}
        onChange={handleChange}
        options={pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))}
      />
    </div>
  );
}
