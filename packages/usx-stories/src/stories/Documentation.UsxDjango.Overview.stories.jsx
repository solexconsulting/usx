import React from 'react';
import Code from '../../../usx-react/src/components/code/Code';
import List from '../../../usx-react/src/components/list/List';
import Prose from '../../../usx-react/src/components/prose/Prose';

export default {
  title: 'Documentation/USX Django/Overview',
  tags: ['autodocs'],
};

export const Overview = {
  render: () => (
    <Prose as="article" className="maxw-tablet-lg">
      <h1>USX Django</h1>
      <p>
        <code>solex-usx-django</code> renders USX components as Django template tags. It shares
        component contracts with USX React and renders USWDS/USX markup.
      </p>

      <h2>Install</h2>
      <Code lines={[{ code: 'python -m pip install solex-usx-django' }]} />
      <p>
        Add <code>usx_django</code> to <code>INSTALLED_APPS</code> and set{' '}
        <code>"APP_DIRS": True</code>
        on your <code>DjangoTemplates</code> backend. Python 3.12+ and Django 5.2–6.x are supported.
      </p>

      <h2>Use a component</h2>
      <Code
        lines={[
          { code: '{% load usx_components %}' },
          { code: '{% alert' },
          { code: '  variant="info"' },
          { code: '  heading="Application received"' },
          { code: '%}' },
          { code: '  Your request is ready for review.' },
          { code: '{% endalert %}' },
        ]}
      />
      <List
        items={[
          'Every component has a closing tag, even when its body is empty.',
          <>
            Use underscores in tag names: <code>button_group</code> for ButtonGroup.
          </>,
          <>
            Pass props as keyword arguments, or use <code>props=my_dict</code> for a context
            dictionary. Tags may span lines and contain nested components.
          </>,
        ]}
      />

      <h2>Styles and behavior</h2>
      <p>
        The Python package renders markup. Load USWDS and USX CSS, assets, and any required
        JavaScript through your frontend setup. Django's <code>STATIC_URL</code> supplies the
        default base for component assets.
      </p>
      <p>
        Use <strong>Documentation/USX Django → Workbench</strong> to try tags and props against a
        live preview.
      </p>
    </Prose>
  ),
};
