import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import iconConfig from '../components/icon/config.json';
import { buildArgTypes, componentTag } from './helper';

const generatedArgTypes = buildArgTypes(iconConfig.props || {});

export default {
  title: 'Django/Icon',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};


export const Icon = {
    args: {
        name: 'accessibility_new',
        size: 2
    },
    parameters: {
        docs: {
            source: {
                code: componentTag({
                    name: 'icon',
                    props: {
                        name: 'accessibility_new',
                        size: 2
                    }
                })
            }
        }
    },
    render: djangoComponent('icon')
}