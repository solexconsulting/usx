import config from '../../../../usx-react/src/components/clickable/config.json';
import React from 'react';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  MultipleClickableCard: {
    href: 'https://google.com',
    className: 'padding-1 display-flex flex-column flex-align-center',
  },
  WithColorChange: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
  },
  SingleClickable: {
    href: 'https://google.com',
    className: 'display-flex flex-column padding-2 border',
    children: 'Everything taking up space in this box is clickable, but only the text below appears as a link.<br /><span class="usx-clickable__link">I look clickable</span>',
  },
  ReadJohnsStoryCta: {
    href: 'https://google.com',
    className: 'display-flex flex-row flex-align-center margin-1 usx-width-fit',
    children: '<span class="usx-circle bg-black text-white usx-clickable__bg-color-on-hover display-flex flex-align-center flex-justify-center width-4 height-4"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#arrow_forward"></use></svg></span><span class="margin-left-1 usx-clickable__link">Read John\'s Story</span>',
  },
  ClickableQuote: {
    href: 'https://google.com',
    className: 'display-block maxw-tablet',
    children: '<div class="usx-quote usx-quote--vertical"><div class="usx-callout usx-callout--vertical border-info usx-callout--big"><figure class="usx-quote__body"><blockquote class="usx-quote__content font-serif-lg">❝We found this wand shop that had the best wands, and we were like, "We have to go here!" So we went there.❞</blockquote><figcaption class="usx-quote__attribution"><div class="usx-attribution"><span class="usx-attribution__content"><span class="usx-attribution__primary">John Doe</span><span class="usx-attribution__secondary">Under Secretary for the Department of Magic and Mystical Affairs</span></span></div></figcaption></figure></div></div><div class="display-flex flex-align-center margin-top-2"><span class="usx-circle bg-black text-white usx-clickable__bg-color-on-hover display-flex flex-align-center flex-justify-center width-4 height-4"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#arrow_forward"></use></svg></span><span class="margin-left-1 usx-clickable__link">Read John\'s Story</span></div>',
  },
  AllClassesSingleElement: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
    children: '<span class="usx-clickable__bg-color-on-hover usx-clickable__color-on-hover usx-clickable__link">Background and text changes color.</span>',
  },
  ColorClassesWithinLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
    children: '<span class="usx-clickable__link"><span class="usx-clickable__bg-color-on-hover">Background changes color.</span><span class="usx-clickable__color-on-hover"> Text changes color.</span> No change to background or color.</span>',
  },
  ColorClassesOutsideLinkClass: {
    href: 'https://google.com',
    className: 'text-primary-lightest',
    children: '<span class="usx-clickable__bg-color-on-hover">Background changes color.</span><span class="usx-clickable__color-on-hover"> Text changes color. </span><span class="usx-clickable__link">No change to background or color.</span>',
  },
};

export default {
  title: 'Django/USX/Clickable',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const createStory = createDjangoStory({ componentName: 'clickable' });

export const SingleClickable = createStory(storyDefs.SingleClickable);

const renderClickable = (args) => createStory(args).render(args);
const doorChildren = (n) =>
  `<div class="font-heading-2xl text-secondary text-center">#${n}</div><span class="usx-clickable__link">Choose this door</span>`;
export const MultipleClickables = {
  ...createStory(storyDefs.MultipleClickableCard),
  render: () => (
    <div className="grid-row grid-gap-6 bg-surface-2 padding-2">
      {[1, 2, 3].map((n) => (
        <div key={n} className="grid-col-12 display-flex flex-justify-center tablet:grid-col-4">
          {renderClickable({ ...storyDefs.MultipleClickableCard, children: doorChildren(n) })}
        </div>
      ))}
    </div>
  ),
};

const colorChangeChildren = (icon, text) =>
  `<span class="usx-clickable__color-on-hover"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#${icon}"></use></svg></span><span class="margin-left-1 usx-clickable__link">${text}</span>`;
const colorChangeItems = [
  ['tornado', 'Auntie Em!', 'grid-col-12 display-flex flex-justify-center tablet:grid-col-4'],
  ['my_location', "We're not in Kansas anymore", 'grid-col-12 display-flex flex-justify-center margin-top-2 tablet:margin-top-0 tablet:grid-col-4'],
  ['pets', 'Oh, Toto!', 'grid-col-12 display-flex flex-justify-center margin-top-2 tablet:margin-top-0 tablet:grid-col-4'],
];
export const WithColorChange = {
  ...createStory(storyDefs.WithColorChange),
  render: () => (
    <div className="grid-row grid-gap-6 bg-surface-2 padding-2">
      {colorChangeItems.map(([icon, text, wrapperClass]) => {
        return (
          <div key={icon} className={wrapperClass}>
            {renderClickable({ ...storyDefs.WithColorChange, children: colorChangeChildren(icon, text) })}
          </div>
        );
      })}
    </div>
  ),
};

export const ReadJohnsStoryCta = {
  ...createStory(storyDefs.ReadJohnsStoryCta),
  name: "Read John's Story CTA",
};
export const ClickableQuote = createStory(storyDefs.ClickableQuote);

const quoteText = 'We found this wand shop that had the best wands, and we were like, "We have to go here!" So we went there.';
const storyRow = storyDefs.ClickableQuote.children.match(/<div class="display-flex flex-align-center margin-top-2">.*<\/div>$/)[0];
export const ClickableQuoteManualMarkup = {
  ...createStory({
    ...storyDefs.ClickableQuote,
    children: `<div class="usx-callout usx-callout--vertical border-info usx-callout--big usx-quote"><figure class="usx-quote__body"><blockquote class="usx-quote__content font-serif-lg">❝${quoteText}❞</blockquote><figcaption class="usx-quote__attribution"><div class="usx-attribution"><span class="usx-attribution__content"><span class="usx-attribution__primary">John Doe</span><span class="usx-attribution__secondary">Under Secretary for the Department of Magic and Mystical Affairs</span></span></div></figcaption>${storyRow}</figure></div>`,
  }),
  name: 'Clickable Quote v2 (Manual Markup)',
};
export const AllClassesSingleElement = createStory(storyDefs.AllClassesSingleElement);
export const ColorClassesWithinLinkClass = createStory(storyDefs.ColorClassesWithinLinkClass);
export const ColorClassesOutsideLinkClass = createStory(storyDefs.ColorClassesOutsideLinkClass);
