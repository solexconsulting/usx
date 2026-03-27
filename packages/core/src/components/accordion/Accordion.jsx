import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

function AccordionItem({
    title,
    id,
    content,
    expanded,
    className,
    headingLevel,
    handleToggle,
}) {
    const headingClasses = classnames('usa-accordion__heading', className)
    const contentClasses = classnames(
        'usa-accordion__content',
        'usa-prose',
        className
    )

    const Heading = headingLevel

    const handleClick = (e) => {
        // Prevent default navigation/behavior and stop other listeners
        // (including non-React handlers added by imported JS) from running.
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if (e && typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        handleToggle(e)
    }

    return (
        <>
            <Heading id={`${id}-heading`} className={headingClasses}>
                <button
                    type="button"
                    className="usa-accordion__button"
                    aria-expanded={expanded}
                    aria-controls={`${id}-content`}
                    data-testid={`accordionButton_${id}`}
                    onClickCapture={handleClick}>
                    {title}
                </button>
            </Heading>
            <div
                id={`${id}-content`}
                aria-labelledby={`${id}-heading`}
                data-testid={`accordionItem_${id}`}
                className={contentClasses}
                hidden={!expanded}>
                {content}
            </div>
        </>
    )
};

function buildExpansions(
    items,
    multiselectable,
    savedExpansions = new Map()
) {
    const lastExpandedItem = multiselectable
        ? undefined
        : items.findLast((item) => item.expanded || savedExpansions.get(item.id))
    return items.reduce((map, item) => {
        map.set(
            item.id,
            multiselectable
                ? (savedExpansions.get(item.id) ?? item.expanded)
                : !!lastExpandedItem && item.id === lastExpandedItem.id
        )
        return map
    }, new Map())
}

AccordionItem.propTypes = {
    title: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    expanded: PropTypes.bool,
    className: PropTypes.string,
    headingLevel: PropTypes.string,
    handleToggle: PropTypes.func,
}

Accordion.propTypes = {
    bordered: PropTypes.bool,
    items: PropTypes.arrayOf(
        AccordionItem.propTypes
    ),
    multiselectable: PropTypes.bool,
    headingLevel: PropTypes.string,
    className: PropTypes.string,
};

export function Accordion({
    bordered = false,
    items = [],
    multiselectable = false,
    headingLevel = 'h3',
    className = '',
    ...props
}) {
    const [savedExpansions, setSavedExpansions] = useState(() =>
        buildExpansions(items, multiselectable)
    )

    const [prevItems, setPrevItems] = useState(items)
    if (items !== prevItems) {
        setPrevItems(items)
        setSavedExpansions((prevExpansions) =>
            buildExpansions(items, multiselectable, prevExpansions)
        )
    }

    const accordionClasses = classnames(
        'usa-accordion',
        bordered && 'usa-accordion--bordered',
        className
    )


    const toggleItem = (itemId) => {
        setSavedExpansions((prevExpansions) => {
            const updatedExpansions = new Map(prevExpansions)
            if (updatedExpansions.get(itemId)) {
                updatedExpansions.set(itemId, false)
            } else {
                if (!multiselectable) {
                    updatedExpansions.forEach((_val, key, map) => map.set(key, false))
                }
                updatedExpansions.set(itemId, true)
            }
            return updatedExpansions
        })
    }

    return (
        <div
            className={accordionClasses}
            data-allow-multiple={multiselectable}
            {...props}
        >
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    {...item}
                    expanded={savedExpansions.get(item.id) ?? false}
                    handleToggle={(e) => {
                        if (item.handleToggle) item.handleToggle(e)
                        toggleItem(item.id)
                    }}
                    headingLevel={headingLevel}
                    className={className}
                />
            ))}
        </div>
    );
}

export default Accordion;