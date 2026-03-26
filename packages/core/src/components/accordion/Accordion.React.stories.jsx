import React from 'react';
import Component from './Accordion.jsx';
import config from '../config.json';
import { buildArgTypes } from '../stories/helper.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
    title: 'React/Accordion',
    component: Component,
    tags: ['autodocs'],
    argTypes: generatedArgTypes,
};

const items1 = [
    {
        title: 'Accordion Item 1',
        id: 'item1',
        content: 'Content for accordion item 1.',
    },
    {
        title: 'Accordion Item 2',
        id: 'item2',
        content: 'Content for accordion item 2.',
    },
    {
        title: 'Accordion Item 3',
        id: 'item3',
        content: 'Content for accordion item 3.'
    }
]

export const Default = {
    args: {
        items: items1
    }
}

export const Bordered = {
    args: {
        items: items1,
        bordered: true
    }
}

export const MultiSelectable = {
    args: {
        items: items1,
        multiselectable: true
    }
}

export const CustomHeadingLevel = {
    args: {
        items: items1,
        headingLevel: 'h2'
    }
}

export const BorderedMultiSelectableH4 = {
    args: {
        items: items1,
        bordered: true,
        multiselectable: true,
        headingLevel: 'h4'
    }
}