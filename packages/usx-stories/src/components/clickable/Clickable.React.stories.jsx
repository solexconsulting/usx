import React from 'react';
import Clickable from '../../../../usx-react/src/components/clickable/Clickable.tsx';
import config from '../../../../usx-react/src/components/clickable/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const spriteHref = (iconName) => {
  const base = (typeof window !== 'undefined' && window.usxBaseUrl) || '/';
  return `${base}img/sprite.svg#${iconName}`;
};

const Icon = ({ name, className = 'usa-icon usa-icon--size-3', ariaHidden = true }) => (
  <svg className={className} aria-hidden={ariaHidden} focusable="false" role="img">
    <use href={spriteHref(name)} />
  </svg>
);

export const storyDefs = {
  SingleClickable: {
    href: 'https://google.com',
    className: 'display-flex flex-column padding-2 border',
  },
  MultipleClickableCard: {
    href: 'https://google.com',
    className: 'display-flex padding-1 flex-column flex-align-center',
  },
  WithColorChange: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
  },
  ReadJohnsStoryCta: {
    href: 'https://google.com',
    className: 'display-flex flex-row flex-align-center margin-1 usx-width-fit',
  },
  ReadJohnsStoryInsideBlockquote: {
    href: 'https://google.com',
    className: 'usx-block usx-block--callout usx-border-primary',
  },
  AllClassesSingleElement: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ColorClassesWithinLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ColorClassesOutsideLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
  },
  ButtonSurface: {
    className: 'usa-button usx-button usx-button--ghost',
  },
};

export default {
  title: 'React/USX/Clickable',
  component: Clickable,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const SingleClickable = {
  args: storyDefs.SingleClickable,
  render: (args) => (
    <Clickable {...args}>
      Everything taking up space in this box is clickable, but only the text below appears as a link.
      <br />
      <Clickable.Link>I look clickable</Clickable.Link>
    </Clickable>
  ),
};

export const MultipleClickables = {
  args: storyDefs.MultipleClickableCard,
  render: (args) => (
    <div className="grid-row grid-gap-6 bg-base-lighter padding-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="grid-col-12 display-flex flex-justify-center tablet:grid-col-4">
          <Clickable {...args}>
            <div className="font-heading-2xl text-secondary text-center">#{n}</div>
            <Clickable.Link>Choose this door</Clickable.Link>
          </Clickable>
        </div>
      ))}
    </div>
  ),
};

export const WithColorChange = {
  args: storyDefs.WithColorChange,
  render: (args) => (
    <div className="grid-row grid-gap-6 bg-base-lighter padding-2">
      <div className="grid-col-12 display-flex flex-justify-center tablet:grid-col-4">
        <Clickable {...args}>
          <Clickable.ColorChange>
            <Icon name="tornado" className="usa-icon usa-icon--size-3" />
          </Clickable.ColorChange>
          <Clickable.Link className="margin-left-1">Auntie Em!</Clickable.Link>
        </Clickable>
      </div>
      <div className="grid-col-12 display-flex flex-justify-center margin-top-2 tablet:margin-top-0 tablet:grid-col-4">
        <Clickable {...args}>
          <Clickable.ColorChange>
            <Icon name="my_location" className="usa-icon usa-icon--size-3" />
          </Clickable.ColorChange>
          <Clickable.Link className="margin-left-1">We're not in Kansas anymore</Clickable.Link>
        </Clickable>
      </div>
      <div className="grid-col-12 display-flex flex-justify-center margin-top-2 tablet:margin-top-0 tablet:grid-col-4">
        <Clickable {...args}>
          <Clickable.ColorChange>
            <Icon name="pets" className="usa-icon usa-icon--size-3" />
          </Clickable.ColorChange>
          <Clickable.Link className="margin-left-1">Oh, Toto!</Clickable.Link>
        </Clickable>
      </div>
    </div>
  ),
};

export const ReadJohnsStoryCta = {
  name: "Read John's Story CTA",
  args: storyDefs.ReadJohnsStoryCta,
  render: (args) => (
    <Clickable {...args}>
      <Clickable.BgColorChange className="usx-circle bg-black text-white display-flex flex-align-center flex-justify-center width-4 height-4">
        <Icon name="arrow_forward" className="usa-icon usa-icon--size-3" />
      </Clickable.BgColorChange>
      <Clickable.Link className="margin-left-1">Read John's Story</Clickable.Link>
    </Clickable>
  ),
};

export const ReadJohnsStoryInsideBlockquote = {
  name: "Read John's Story in blockquote",
  args: storyDefs.ReadJohnsStoryInsideBlockquote,
  render: (args) => (
    <Clickable {...args}>
      <div className="usx-block__content usx-border-info maxw-tablet margin-0">
        <p className="font-serif-lg maxw-tablet margin-0">
          ❝We found this wand shop that had the best wands, and we were like, "We have to go here!" So we went there.❞
        </p>
        <div className="usx-block__attribution">
          <div className="usx-attribution">
            <span className="usx-attribution__content">
              <span className="usx-attribution__primary">John Doe</span>
              <span className="usx-attribution__secondary">Under Secretary for the Department of Magic and Mystical Affairs</span>
            </span>
          </div>
        </div>
        <div className="display-flex flex-align-center margin-top-2">
          <Clickable.BgColorChange className="usx-circle bg-black text-white display-flex flex-align-center flex-justify-center width-4 height-4">
            <Icon name="arrow_forward" className="usa-icon usa-icon--size-3" />
          </Clickable.BgColorChange>
          <Clickable.Link className="margin-left-1">Read John's Story</Clickable.Link>
        </div>
      </div>
    </Clickable>
  ),
};

export const AllClassesSingleElement = {
  args: storyDefs.AllClassesSingleElement,
  render: (args) => (
    <Clickable {...args}>
      <Clickable.Link colorChange bgColorChange>
        Background and text changes color.
      </Clickable.Link>
    </Clickable>
  ),
};

export const ColorClassesWithinLinkClass = {
  args: storyDefs.ColorClassesWithinLinkClass,
  render: (args) => (
    <Clickable {...args}>
      <Clickable.Link>
        <Clickable.BgColorChange>Background changes color.</Clickable.BgColorChange>
        <Clickable.ColorChange> Text changes color.</Clickable.ColorChange>
        {' '}No change to background or color.
      </Clickable.Link>
    </Clickable>
  ),
};

export const ColorClassesOutsideLinkClass = {
  args: storyDefs.ColorClassesOutsideLinkClass,
  render: (args) => (
    <Clickable {...args}>
      <Clickable.BgColorChange>Background changes color.</Clickable.BgColorChange>
      <Clickable.ColorChange> Text changes color. </Clickable.ColorChange>
      <Clickable.Link>No change to background or color.</Clickable.Link>
    </Clickable>
  ),
};

export const ButtonSurface = {
  args: storyDefs.ButtonSurface,
  render: (args) => (
    <Clickable {...args} onClick={() => {}}>
      <Clickable.Link>Action-style clickable (button mode)</Clickable.Link>
    </Clickable>
  ),
};
