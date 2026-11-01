import React from 'react';
import BackToTop from '../../../../usx-react/src/components/back-to-top/BackToTop.tsx';
import config from '../../../../usx-react/src/components/back-to-top/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USX/BackToTop',
  component: BackToTop,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs', 'renderAllVariants'],
};

export const storyDefs = {
  Default: {
    label: 'Back to top',
    iconPosition: 'right',
    iconSize: 2,
  },
  Primary: {
    label: 'Back to top',
    variant: 'primary',
    iconPosition: 'right',
    iconSize: 2,
  },
  IconOnlySmall: {
    label: null,
    variant: 'primary',
    iconSize: 3,
    className: 'width-6',
  },
  IconOnlyLarge: {
    label: null,
    variant: 'primary',
    iconSize: 4,
    className: 'width-7',
  },
  LinkDefault: {
    label: 'Back to top',
    href: '#back-to-top',
    iconPosition: 'right',
    iconSize: 2,
  },
  DefaultIconLeft: {
    label: 'Back to top',
    iconPosition: 'left',
    iconSize: 2,
  },
  PrimaryIconLeft: {
    label: 'Back to top',
    variant: 'primary',
    iconPosition: 'left',
    iconSize: 2,
  },
  LinkIconLeft: {
    label: 'Back to top',
    href: '#back-to-top',
    iconPosition: 'left',
    iconSize: 2,
  },
};

export const Default = { args: storyDefs.Default };
export const Primary = { args: storyDefs.Primary };
export const IconOnlySmall = { args: storyDefs.IconOnlySmall };
export const IconOnlyLarge = { args: storyDefs.IconOnlyLarge };
export const LinkDefault = { args: storyDefs.LinkDefault };
export const DefaultIconLeft = { args: storyDefs.DefaultIconLeft };
export const PrimaryIconLeft = { args: storyDefs.PrimaryIconLeft };
export const LinkIconLeft = { args: storyDefs.LinkIconLeft };

export const LinkOnDark = {
  render: () => (
    <div className="bg-primary-darkest padding-1">
      <BackToTop
        label="Back to top"
        href="#back-to-top"
        iconPosition="right"
        iconSize={2}
        className="text-white hover:text-accent-cool"
      />
    </div>
  ),
};

const stackProps = (position) => [
  { label: 'Back to top', iconPosition: position, iconSize: 2 },
  { label: 'Back to top', variant: 'primary', iconPosition: position, iconSize: 2 },
  { label: null, variant: 'primary', iconSize: 3, className: 'width-6' },
  { label: null, variant: 'primary', iconSize: 4, className: 'width-7' },
  { label: 'Back to top', href: '#back-to-top', iconPosition: position, iconSize: 2 },
];
const onDarkProps = (position) => ({
  label: 'Back to top',
  href: '#back-to-top',
  iconPosition: position,
  iconSize: 2,
  className: 'text-white hover:text-accent-cool',
});

// Shared with the Django stories, which pass in a renderer for the Django-rendered link/button.
export const renderAllVariants = (renderBackToTop) => (
  <div className="display-flex flex-wrap" style={{ gap: '2rem' }}>
    {[
      ['right', 'Button (icon right)', 'flex-justify-start flex-align-self-start'],
      ['left', 'Button (icon left)', 'flex-align-end margin-left-auto'],
    ].map(([position, heading, alignment]) => (
      <div key={position} className={`display-flex flex-column ${alignment}`} style={{ gap: '0.5rem' }}>
        <h4>{heading}</h4>
        {stackProps(position).map((props, index) => (
          <React.Fragment key={index}>{renderBackToTop(props)}</React.Fragment>
        ))}
        <div className="bg-primary-darkest padding-1">{renderBackToTop(onDarkProps(position))}</div>
      </div>
    ))}
  </div>
);

export const AllVariants = {
  render: () => renderAllVariants((props) => <BackToTop {...props} />),
};
