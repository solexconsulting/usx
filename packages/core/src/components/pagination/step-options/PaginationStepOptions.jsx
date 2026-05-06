import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Select from '../../select/Select';

export default function PaginationStepOptions({
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  label = 'Items per page',
  id = 'pagination-step-options',
  className = '',
}) {
  const classes = ClassNames(
    'usx-pagination__step-options',
    className
  );

  const handleChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className={classes}>
      <Select
        id={id}
        label={label}
        value={pageSize}
        onChange={handleChange}
        options={pageSizeOptions.map((size) => ({ value: size, label: size }))}
      />
    </div>
  );
}

PaginationStepOptions.propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageSizeChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};
