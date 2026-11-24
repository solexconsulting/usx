import React from 'react';
import classnames from 'classnames';
import AccordionItem from '../accordion-item/AccordionItem';
import type { AccordionHeadingAs, AccordionItemProps } from '../accordion-item/AccordionItem';

export type { AccordionHeadingAs, AccordionItemProps } from '../accordion-item/AccordionItem';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    extraAttributes?: Record<string, unknown>;
    bordered?: boolean;
    items?: (Omit<AccordionItemProps, 'id'> & { id?: string })[];
    multiselectable?: boolean;
    headingAs?: AccordionHeadingAs;
    iconPosition?: 'start' | 'end';
    headingClassName?: string;
    contentClassName?: string;
}

export function Accordion({
    id,
    bordered = false,
    items = [],
    multiselectable = false,
    headingAs = 'h3',
    iconPosition,
    className = '',
    headingClassName = '',
    contentClassName = '',
    extraAttributes,
    ...props
}: AccordionProps) {
    const accordionClasses = classnames(
        'usa-accordion',
        'usx-accordion',
        bordered && 'usa-accordion--bordered',
        (iconPosition === 'start' || iconPosition === 'end') && `usa-accordion--icon-${iconPosition}`,
        className
    )


    return (
        <div
            id={id}
            className={accordionClasses}
            data-allow-multiple={multiselectable ? true : undefined}
            {...props}
            {...extraAttributes}
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={item.id || `${id ?? ''}-${index}`}
                    {...item}
                    id={item.id || `${id ?? ''}-${index}`}
                    headingAs={headingAs}
                    headingClassName={headingClassName}
                    contentClassName={contentClassName}
                />
            ))}
        </div>
    );
}

export default Accordion;
