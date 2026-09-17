import { ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Prose from '../prose/Prose';
import ButtonGroup, { ButtonGroupProps } from '../button-group/ButtonGroup';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  heading?: string;
  description?: string;
  actionProps?: ButtonGroupProps['buttonProps'];
  size?: 'default' | 'lg' | 'lg-collapsed';
  forceAction?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Modal({
  id = 'usx-modal',
  heading,
  description,
  actionProps = [
    { children: 'Continue', variant: 'primary', extraAttributes: { 'data-close-modal': true } },
    { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', extraAttributes: { 'data-close-modal': true } },
  ],
  size = 'default',
  forceAction = false,
  className = '',
  children,
  ...props
}: ModalProps) {
  const classes = classNames('usa-modal', 'usx-modal', {
    'usa-modal--lg': size === 'lg',
    'usx-modal--lg-collapsed': size === 'lg-collapsed',
  }, className);

  return (
    <div
      className={classes}
      id={id}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-description`}
      {...(forceAction ? { 'data-force-action': true } : {})}
      {...props}
    >
      <div className="usa-modal__content">
        <div className="usa-modal__main">
          <h2 className="usa-modal__heading" id={`${id}-heading`}>
            {heading}
          </h2>
          <Prose>
            <p id={`${id}-description`}>{children ?? description}</p>
          </Prose>
          <div className="usa-modal__footer">
            <ButtonGroup buttonProps={actionProps} />
          </div>
        </div>
        {!forceAction && (
          <button
            type="button"
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            data-close-modal
          >
            <Icon name="close" />
          </button>
        )}
      </div>
    </div>
  );
}
