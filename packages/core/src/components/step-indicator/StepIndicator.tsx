import React from 'react';
import ClassNames from 'classnames';
import './step-indicator.scss';

export interface Step {
  label: string;
}

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: Step[];
  currentStep?: number | string;
  variant?: '' | 'no-labels' | 'center' | 'counters' | 'counters-sm';
  headingTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps = [],
  currentStep = 1,
  variant = '',
  headingTag: HeadingTag = 'h4',
  className = '',
  ...props
}) => {
  const step = Number(currentStep);

  const classes = ClassNames(
    'usa-step-indicator',
    'usx-step-indicator',
    variant && `usa-step-indicator--${variant}`,
    className
  );

  const getStatus = (index: number) => {
    const n = index + 1;
    if (n < step) return 'complete';
    if (n === step) return 'current';
    return '';
  };

  const currentLabel = steps[step - 1]?.label || '';

  return (
    <div className={classes} {...props}>
      <ol className="usa-step-indicator__segments">
        {steps.map((s, index) => {
          const status = getStatus(index);
          return (
            <li
              key={index}
              className={ClassNames(
                'usa-step-indicator__segment',
                status === 'complete' && 'usa-step-indicator__segment--complete',
                status === 'current' && 'usa-step-indicator__segment--current'
              )}
              {...(status === 'current' ? { 'aria-current': 'true' } : {})}
            >
              <span className="usa-step-indicator__segment-label">
                {s.label}
                {status === 'complete' && <span className="usa-sr-only"> completed</span>}
                {status === '' && <span className="usa-sr-only"> not completed</span>}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="usa-step-indicator__header">
        <HeadingTag className="usa-step-indicator__heading">
          <span className="usa-step-indicator__heading-counter">
            <span className="usa-sr-only">Step</span>{' '}
            <span className="usa-step-indicator__current-step">{step}</span>
            <span className="usa-step-indicator__total-steps"> of {steps.length}</span>{' '}
          </span>
          <span className="usa-step-indicator__heading-text">{currentLabel}</span>
        </HeadingTag>
      </div>
    </div>
  );
};

export default StepIndicator;
