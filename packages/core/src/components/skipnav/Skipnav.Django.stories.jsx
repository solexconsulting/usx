import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Skipnav',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'skipnav', props: config.default || {} })
      }
    }
  },
  render: djangoComponent('skipnav')
};

export const WithCustomTarget = {
  args: { target: 'custom-target-django-1' },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'skipnav', props: { target: 'custom-target-django-1' } })
      }
    }
  },
  render: djangoComponent('skipnav')
};

export const CustomContent = {
  args: { target: 'custom-target-django-2', content: 'Skip to the main content (Django)' },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'skipnav', props: { target: 'custom-target-django-2', content: 'Skip to the main content (Django)' } })
      }
    }
  },
  render: djangoComponent('skipnav')
};

export const SimulatedInStorybook = {
  args: { target: 'storybook-target' },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'skipnav', props: { target: 'storybook-target' } })
      }
    }
  },
  render: (args) => {
    const Django = djangoComponent('skipnav');
    return (
      <>
        <Django {...args} />
        <div style={{ height: '1200px' }} />
        <div id="storybook-target" style={{ padding: '24px', background: '#f6f7f8' }}>
          <h2>Storybook Target (Django)</h2>
          <p>This is the simulated main content target for the Skipnav link rendered by Django.</p>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          // Enhance storybook behavior: intercept clicks on the skipnav anchor and simulate focus/scroll
          document.addEventListener('click', function(e) {
            const anchor = e.target.closest && e.target.closest('.usa-skipnav');
            if (!anchor) return;
            const href = anchor.getAttribute('href') || '';
            if (href.startsWith('#')) {
              e.preventDefault();
              const id = href.slice(1);
              const targetEl = document.getElementById(id);
              if (targetEl) {
                targetEl.setAttribute('tabindex', '-1');
                targetEl.focus();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }, { once: false });
        ` }} />
      </>
    );
  }
};
