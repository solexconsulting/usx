import React from 'react';
import BackToTop from './BackToTop';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
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

export const AllVariants = {
  render: () => (
    <div className="display-flex flex-wrap" style={{ gap: '2rem' }}>
      <div className="display-flex flex-column flex-justify-start flex-align-self-start" style={{ gap: '0.5rem' }}>
        <h4>Button (icon right)</h4>
        <BackToTop label="Back to top" iconPosition="right" iconSize={2} />
        <BackToTop label="Back to top" variant="primary" iconPosition="right" iconSize={2} />
        <BackToTop label={null} variant="primary" iconSize={3} className="width-6" />
        <BackToTop label={null} variant="primary" iconSize={4} className="width-7" />
        <BackToTop label="Back to top" href="#back-to-top" iconPosition="right" iconSize={2} />
        <div className="bg-primary-darkest padding-1">
          <BackToTop label="Back to top" href="#back-to-top" iconPosition="right" iconSize={2} className="text-white hover:text-accent-cool" />
        </div>
      </div>
      <div className="display-flex flex-column flex-align-end margin-left-auto" style={{ gap: '0.5rem' }}>
        <h4>Button (icon left)</h4>
        <BackToTop label="Back to top" iconPosition="left" iconSize={2} />
        <BackToTop label="Back to top" variant="primary" iconPosition="left" iconSize={2} />
        <BackToTop label={null} variant="primary" iconSize={3} className="width-6" />
        <BackToTop label={null} variant="primary" iconSize={4} className="width-7" />
        <BackToTop label="Back to top" href="#back-to-top" iconPosition="left" iconSize={2} />
        <div className="bg-primary-darkest padding-1">
          <BackToTop label="Back to top" href="#back-to-top" iconPosition="left" iconSize={2} className="text-white hover:text-accent-cool" />
        </div>
      </div>
    </div>
  ),
};

