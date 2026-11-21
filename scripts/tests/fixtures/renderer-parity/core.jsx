// Focused regressions supplement every component's contract example.
export default [
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
