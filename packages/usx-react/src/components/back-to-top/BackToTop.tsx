import React from 'react';
import Button, { type ButtonProps } from '../button/Button';

export type BackToTopProps = Pick<ButtonProps, 'variant' | 'ghost' | 'inverse' | 'className'> & {
  label?: ButtonProps['label'] | null;
  ariaLabel?: string;
  href?: ButtonProps['href'] | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  onClick?: ButtonProps['onClick'] | boolean;
};

export default function BackToTop({
  label = 'Back to top',
  ariaLabel = 'Back to top',
  href = '#top',
  variant = 'primary',
  ghost = true,
  inverse = false,
  iconPosition = 'right',
  iconSize = 2,
  className = '',
  onClick = undefined,
}: BackToTopProps) {
  return (
    <Button
      href={onClick ? undefined : href || '#top'}
      onClick={typeof onClick === 'function' ? onClick : undefined}
      label={label ?? undefined}
      aria-label={label ? undefined : ariaLabel}
      variant={variant ?? 'primary'}
      ghost={ghost}
      inverse={inverse}
      iconProps={[{ name: 'arrow_upward', position: iconPosition, size: iconSize }]}
      className={className}
    />
  );
}
