import { scrollToTop } from './backToTopDemo.jsx';
import React from 'react';
import BackToTop from '../../../../usx-react/src/components/back-to-top/BackToTop.tsx';
import config from '../../../../usx-react/src/components/back-to-top/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/BackToTop',
  component: BackToTop,
  render: (args) => (
    <BackToTop {...args} onClick={args.onClick === true ? scrollToTop : args.onClick} />
  ),
  tags: ['USX', 'autodocs'],
  // An inferred onClick would turn every default link into a button.
  parameters: { actions: { argTypesRegex: null } },
  argTypes: { ...buildArgTypes(config.props || {}), onClick: { control: 'boolean' } },
  excludeStories: ['storyDefs', 'renderAllVariants'],
};

export const storyDefs = {
  Default: config.default,
  IconLeft: { ...config.default, iconPosition: 'left' },
  IconOnlySmall: { ...config.default, label: null, iconSize: 3 },
  IconOnlyLarge: { ...config.default, label: null, iconSize: 4 },
  CustomHref: { ...config.default, label: 'Back to preview', href: '#storybook-root' },
  WithOnClick: { label: 'Back to top', onClick: true, variant: 'primary', iconSize: 2 },
};

export const Default = { args: storyDefs.Default };
export const IconLeft = { args: storyDefs.IconLeft };
export const IconOnlySmall = { args: storyDefs.IconOnlySmall };
export const IconOnlyLarge = { args: storyDefs.IconOnlyLarge };

export const LinkOnDark = {
  render: () => (
    <div className="bg-surface-inverse padding-1">
      <BackToTop inverse />
    </div>
  ),
};

export const CustomHref = { args: storyDefs.CustomHref };
export const WithOnClick = {
  args: storyDefs.WithOnClick,
  parameters: {
    docs: {
      description: {
        story:
          'Optional button usage. The host supplies the click handler; BackToTop provides no scrolling JavaScript.',
      },
    },
  },
};

const stackProps = (position) => [
  { label: 'Back to top', iconPosition: position, iconSize: 2 },
  { label: 'Back to top', variant: 'primary', ghost: false, iconPosition: position, iconSize: 2 },
  { label: null, variant: 'primary', iconSize: 3, className: 'width-6' },
  { label: null, variant: 'primary', iconSize: 4, className: 'width-7' },
  {
    label: 'Back to top',
    href: '#storybook-root',
    variant: 'unstyled',
    ghost: false,
    iconPosition: position,
    iconSize: 2,
  },
];

// Keep the original two-column comparison shared by both renderers.
export const renderAllVariants = (renderBackToTop) => (
  <div className="display-flex flex-wrap" style={{ gap: '2rem' }}>
    {[
      ['right', 'Button (icon right)', 'flex-justify-start flex-align-self-start'],
      ['left', 'Button (icon left)', 'flex-align-end margin-left-auto'],
    ].map(([position, heading, alignment]) => (
      <div
        key={position}
        className={`display-flex flex-column ${alignment}`}
        style={{ gap: '0.5rem' }}
      >
        <h4>{heading}</h4>
        {stackProps(position).map((props, index) => (
          <React.Fragment key={index}>{renderBackToTop(props)}</React.Fragment>
        ))}
        <div className="bg-surface-inverse padding-1">
          {renderBackToTop({
            label: 'Back to top',
            iconPosition: position,
            iconSize: 2,
            inverse: true,
          })}
        </div>
      </div>
    ))}
  </div>
);

export const AllVariants = {
  render: () =>
    renderAllVariants((props) => (
      <BackToTop {...props} onClick={props.onClick ? scrollToTop : undefined} />
    )),
};
