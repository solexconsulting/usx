import React from 'react';
import ClassNames from 'classnames';
import './summary-box.scss';

export interface SummaryBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  heading: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
  id = 'summary-box-heading',
  heading,
  content = '',
  children = null,
  className = '',
  ...props
}) => {
  const classes = ClassNames('usa-summary-box', 'usx-summary-box', className);
  const headingId = id;
  const bodyContent = children ?? content;

  return (
    <div
      className={classes}
      role="region"
      aria-labelledby={headingId}
      {...props}
    >
      <div className="usa-summary-box__body">
        <h4 className="usa-summary-box__heading" id={headingId}>{heading}</h4>
        <div className="usa-summary-box__text">
          {bodyContent}
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
