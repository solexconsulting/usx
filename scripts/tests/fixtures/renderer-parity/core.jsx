import React from 'react';

// Focused regressions supplement every component's contract example.
export default [
  {
    component: 'accordion-item',
    cases: [
      {
        label: 'custom heading and expanded panel',
        props: {
          id: 'item', title: 'Details', content: 'Item content', expanded: true,
          headingAs: 'h2', headingClassName: 'custom-heading', contentClassName: 'custom-content',
        },
      },
      ...[null, false, true, 0, ''].map((value) => ({
        label: `scalar slots ${JSON.stringify(value)}`,
        props: { id: 'item', title: value, content: value },
      })),
      ...[null, false, true, 0, '', 'Child'].map((children) => ({
        label: `children precedence ${JSON.stringify(children)}`,
        props: { id: 'item', title: 'Title', content: 'Fallback', children },
      })),
      {
        label: 'rich children override content',
        props: { id: 'item', title: 'Title', content: 'Fallback', children: '<p>Child &amp; text</p>' },
        safeProps: ['children'],
        reactProps: { id: 'item', title: 'Title', content: 'Fallback', children: <p>Child &amp; text</p> },
      },
      {
        label: 'rich content and escaped title',
        props: { id: 'rich', title: '<title> & text', content: '<p>Content &amp; details</p>' },
        safeProps: ['content'],
        reactProps: { id: 'rich', title: '<title> & text', content: <p>Content &amp; details</p> },
      },
    ],
  },
  {
    component: 'accordion',
    cases: [
      {
        label: 'parent overrides and fallback id',
        props: {
          id: 'group', headingAs: 'h4', headingClassName: 'group-heading',
          contentClassName: 'group-content',
          items: [
            { title: 'First', content: 'First body' },
            { id: 'second', title: 'Second', content: 'Second body', expanded: true },
          ],
        },
      },
      ...[null, false, true, 0, '', 'Child'].map((children) => ({
        label: `nested children precedence ${JSON.stringify(children)}`,
        props: {
          id: 'group',
          items: [{ title: 'Title', content: 'Fallback', children }],
        },
      })),
    ],
  },
  {
    component: 'modal',
    cases: [
      {
        label: 'simple description',
        props: { id: 'modal', heading: 'Review', description: 'Details', actionProps: [] },
      },
      {
        label: 'complex children',
        props: {
          id: 'modal', heading: 'Review', description: 'Fallback', actionProps: [],
          children: '<p>Details</p><ul><li>Item</li></ul>',
        },
        reactProps: {
          id: 'modal', heading: 'Review', description: 'Fallback', actionProps: [],
          children: <><p>Details</p><ul><li>Item</li></ul></>,
        },
      },
      ...['', false, true, 0].map((children) => ({
        label: `children ${JSON.stringify(children)}`,
        props: { id: 'modal', heading: 'Review', description: 'Fallback', actionProps: [], children },
      })),
    ],
  },
  {
    component: 'page',
    cases: [
      { label: 'missing title with eyebrow', props: { titleId: 'missing', eyebrow: 'Orphan' } },
      ...[null, '', false, true, 0].map((title) => ({
        label: `title ${JSON.stringify(title)}`,
        props: { title, titleId: 'title', eyebrow: 'Category' },
      })),
      ...[null, '', false, true, 0].map((eyebrow) => ({
        label: `eyebrow ${JSON.stringify(eyebrow)}`,
        props: { title: 'Services', eyebrow },
      })),
      {
        label: 'plain text containing markup',
        props: { title: '<em>Services</em> & more', eyebrow: '<b>Category</b> & more' },
      },
      {
        label: 'rich title and eyebrow',
        props: {
          title: '<em>Services &amp; support</em>',
          eyebrow: '<strong>Category &lt;one&gt;</strong>',
          titleId: 'title',
        },
        safeProps: ['title', 'eyebrow'],
        reactProps: {
          title: <em>Services &amp; support</em>,
          eyebrow: <strong>Category &lt;one&gt;</strong>,
          titleId: 'title',
        },
      },
    ],
  },
  ...['input', 'search'].map((component) => ({
    component,
    cases: [
      ['omitted value', {}],
      ['empty value', { value: '' }],
      ['default value', { defaultValue: 'Initial value' }],
      ['null value uses default', { value: null, defaultValue: 'Initial value' }],
      ['empty value overrides default', { value: '', defaultValue: 'Ignored' }],
      ['value overrides default', { value: 'Current', defaultValue: 'Ignored' }],
    ].map(([label, props]) => ({ label, props: { id: 'parity-field', label: 'Field', ...props } })),
  })),
  {
    component: 'input',
    cases: [
      {
        label: 'unwrapped input without value',
        props: { id: 'bare', label: 'Field', formGroup: false },
      },
    ],
  },
  {
    component: 'memorable-date',
    cases: [
      { label: 'initial date', props: { defaultDay: '12', defaultYear: '2000' } },
      {
        label: 'empty date overrides defaults',
        props: { day: '', year: '', defaultDay: '12', defaultYear: '2000' },
      },
    ],
  },
  {
    component: 'character-count',
    cases: [
      { label: 'empty default', props: { id: 'count', label: 'Count', max: 20 } },
      {
        label: 'initial value',
        props: { id: 'count', label: 'Count', max: 20, defaultValue: 'Initial' },
      },
    ],
  },
  {
    component: 'back-to-top',
    cases: [
      { label: 'default anchor', props: {} },
      { label: 'icon-only anchor', props: { label: null } },
      { label: 'empty label', props: { label: '', ariaLabel: 'Return to top' } },
      { label: 'native link', props: { href: '#top', iconPosition: 'left' } },
      { label: 'custom href', props: { href: '#section-start' } },
      { label: 'shared inverse Button variant', props: { inverse: true } },
      { label: 'filled Button', props: { ghost: false } },
      { label: 'alternate ghost color', props: { variant: 'secondary' } },
      { label: 'unstyled Button', props: { variant: 'unstyled', ghost: false } },
      { label: 'filled host-controlled Button', props: { onClick: true, ghost: false } },
      { label: 'null href uses default', props: { href: null } },
      { label: 'empty href', props: { href: '' } },
      { label: 'host-bound button', props: { onClick: true } },
      { label: 'button takes precedence over href', props: { onClick: true, href: '#ignored' } },
      { label: 'false callback retains anchor', props: { onClick: false } },
      { label: 'null callback retains anchor', props: { onClick: null } },
      {
        label: 'React callback matches host-bound Django button',
        props: { onClick: true, href: '#ignored', label: null },
        reactProps: { onClick: () => {}, href: '#ignored', label: null },
      },
    ],
  },
  {
    component: 'copy-to-clipboard',
    cases: [
      {
        label: 'icon-only button without tooltip',
        props: { copyText: '<p>"Quoted" & literal</p>' },
      },
      {
        label: 'visible label and custom assets',
        props: { copyText: 'Copy me', label: 'Copy', staticBaseUrl: '/assets/' },
      },
      {
        label: 'custom tooltip',
        props: { copyText: 'Copy me', tooltipProps: { label: 'Copy code', copiedTooltip: 'Done' } },
      },
    ],
  },
  {
    component: 'hero',
    cases: [
      {
        label: 'combined style declarations',
        props: {
          title: 'Hero',
          backgroundImage: '/hero.jpg',
          backgroundPosition: '70% 40%',
          overlayOpacity: 0.5,
          calloutMaxWidth: '28rem',
        },
      },
      {
        label: 'search without initial value',
        props: { title: 'Search', searchProps: { id: 'hero-search' } },
      },
    ],
  },
];
