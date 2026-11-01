import React from 'react';
import ClassNames from 'classnames';

export interface ProcessListItem {
  heading: string;
  headingAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  headingClassName?: string;
  body?: React.ReactNode;
  bodyClassName?: string;
  className?: string;
}

export interface ProcessListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  items?: ProcessListItem[];
  className?: string;
}

const ProcessList: React.FC<ProcessListProps> = ({ items = [], className = '', ...props }) => {
  const classes = ClassNames('usa-process-list', 'usx-process-list', className);
  return (
    <ol className={classes} {...props}>
      {items.map((item, index) => {
        const Heading = item.headingAs || 'h4';
        return (
          <li key={index} className={ClassNames('usa-process-list__item', item.className)}>
            <Heading className={ClassNames('usa-process-list__heading', item.headingClassName)}>
              {item.heading}
            </Heading>
            {item.body && (item.bodyClassName ? <div className={item.bodyClassName}>{item.body}</div> : item.body)}
          </li>
        );
      })}
    </ol>
  );
};

export default ProcessList;
