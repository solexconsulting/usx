import React from 'react';
import ClassNames from 'classnames';

export interface ProcessListItem {
  heading: string;
  headingTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  headingClassName?: string;
  body?: string | React.ReactNode;
  bodyClassName?: string;
  className?: string;
}

export interface ProcessListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  items?: ProcessListItem[];
  className?: string;
}

function renderContent(content: string | React.ReactNode) {
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}

const ProcessList: React.FC<ProcessListProps> = ({ items = [], className = '', ...props }) => {
  const classes = ClassNames('usa-process-list', 'usx-process-list', className);
  return (
    <ol className={classes} {...props}>
      {items.map((item, index) => {
        const HeadingTag = item.headingTag || 'h4';
        return (
          <li key={index} className={ClassNames('usa-process-list__item', item.className)}>
            <HeadingTag className={ClassNames('usa-process-list__heading', item.headingClassName)}>
              {item.heading}
            </HeadingTag>
            {item.body && (
              typeof item.body === 'string' || item.bodyClassName ? (
                <p className={ClassNames(item.bodyClassName)}>
                  {renderContent(item.body)}
                </p>
              ) : (
                renderContent(item.body)
              )
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default ProcessList;
