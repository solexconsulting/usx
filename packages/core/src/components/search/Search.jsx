import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import Label from '../label/Label';
import Input from '../input/Input';
import './search.scss';

export default function Search({
  id,
  ariaLabel,
  searchKey = 'q',
  label = 'Search',
  icon = 'search',
  iconOnly = false,
  buttonVariant = 'primary',
  big = false,
  placeholder,
  action,
  defaultValue,
  onSubmit,
  className = ''
}) {

  const handleSubmit = (e) => {
    if (onSubmit) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const query = formData.get(searchKey);
      onSubmit(query);
    }
  }
  const iconClasses = ClassNames(
    'usa-search__submit-icon',
    {
      'display-inline-block': iconOnly
    }
  );

  const formClasses = ClassNames(
    'usa-search',
    {
      'usa-search--small': iconOnly && !big,
      'usa-search--big': big,
    },
    className
  );

  return (
    <section aria-label={ariaLabel || label}>
      <form
        id={`${id}-form`}
        className={formClasses}
        method="get" 
        role="search"
        {...(action ? { action } : {})}
        {...(onSubmit ? { onSubmit: handleSubmit } : {})}
      >
        <Input
          id={id}
          label={label}
          screenReaderOnlyLabel={true}
          placeholder={placeholder}
          defaultValue={defaultValue}
          type="search"
          name={searchKey}
        />
        <Button variant={buttonVariant} type="submit">
          {!iconOnly && <span className="usa-search__submit-text">{label}</span>}
          <Icon name={icon} className={iconClasses} aria-hidden="true" alt={label} />
        </Button>
      </form>
    </section>
  );
}

Search.propTypes = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  searchKey: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  iconOnly: PropTypes.bool,
  buttonVariant: PropTypes.string,
  big: PropTypes.bool,
  action: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};
