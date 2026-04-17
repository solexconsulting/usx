import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';
import accordion from "@uswds/uswds/js/usa-accordion";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Accordion',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        accordion.on();
        const uswds_min = document.createElement('script');
        uswds_min.src = '../node_modules/@uswds/uswds/dist/js/uswds.min.js';
        document.body.appendChild(uswds_min);

        return () => {
          accordion.off();
          document.body.removeChild(uswds_min);
        };
      }, []);

      return <Story />;
    }
  ]
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

export const Accordion = {
  args: {
    items: items1
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'accordion',
          props: {
            items: items1
          }
        })
      }
    }
  },
  render: djangoComponent('accordion')
};
