import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import Input from '../input/Input';

import type { ButtonProps } from '../button/Button';

export interface SearchProps {
  id?: string;
  ariaLabel?: string;
  searchKey?: string;
  label?: string;
  icon?: string;
  iconOnly?: boolean;
  buttonVariant?: ButtonProps['variant'];
  big?: boolean;
  action?: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (query: FormDataEntryValue | null) => void;
  className?: string;
}

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
}: SearchProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const query = formData.get(searchKey);
      onSubmit(query);
    }
  };

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
          formGroup={false}
        />
        <Button variant={buttonVariant} type="submit">
          {!iconOnly && <span className="usa-search__submit-text">{label}</span>}
          <Icon name={icon} className={iconClasses} aria-hidden="true" alt={label} />
        </Button>
      </form>
    </section>
  );
}
