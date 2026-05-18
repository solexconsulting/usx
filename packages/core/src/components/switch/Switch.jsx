import React from 'react';
import PropTypes from 'prop-types';
import './switch.scss';
import ClassNames from 'classnames';

export default function Switch({
  id,
  name,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  size = 'md',
  variant = '',
  className = '',
  label,
  indeterminate = false,
  ...props
}) {
  const classes = ClassNames(
    'usx-switch',
    size && `usx-toggle-${size}`,
    variant && `text-${variant}`,
    className,
  )

  return (
    (() => {
      const inputProps = {
        id,
        name,
        type: 'checkbox',
        className: classes,
        checked: typeof checked === 'boolean' ? checked : undefined,
        defaultChecked,
        disabled,
        'aria-checked': indeterminate ? 'mixed' : (typeof checked === 'boolean' ? checked : undefined),
        onChange,
        ...props,
      };

      const ref = React.useRef(null);
      React.useEffect(() => {
        if (ref.current) {
          ref.current.indeterminate = Boolean(indeterminate);
        }
      }, [indeterminate]);

      const input = <input ref={ref} {...inputProps} />;

      if (label) {
        return (
          <label className="usa-label usx-switch__label">
            {input}
            {label}
          </label>
        );
      }

      return input;
    })()
  );
}

Switch.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.node,
  indeterminate: PropTypes.bool,
};

