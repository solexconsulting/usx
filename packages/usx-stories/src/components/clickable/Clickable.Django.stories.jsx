import config from '../../../../core/src/components/clickable/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  SingleClickable: {
    href: 'https://google.com',
    className: 'display-flex flex-column padding-2 border',
    children: 'Everything taking up space in this box is clickable, but only the text below appears as a link.<br /><span class="usx-clickable__link">I look clickable</span>',
  },
  MultipleClickableCardOne: {
    href: 'https://google.com',
    className: 'padding-1 display-flex flex-column flex-align-center',
    children: '<div class="font-heading-2xl text-secondary text-center">#1</div><span class="usx-clickable__link">Choose this door</span>',
  },
  MultipleClickableCardTwo: {
    href: 'https://google.com',
    className: 'padding-1 display-flex flex-column flex-align-center',
    children: '<div class="font-heading-2xl text-secondary text-center">#2</div><span class="usx-clickable__link">Choose this door</span>',
  },
  MultipleClickableCardThree: {
    href: 'https://google.com',
    className: 'padding-1 display-flex flex-column flex-align-center',
    children: '<div class="font-heading-2xl text-secondary text-center">#3</div><span class="usx-clickable__link">Choose this door</span>',
  },
  WithColorChangeTornado: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
    children: '<svg class="usa-icon usa-icon--size-3 usx-clickable__color-on-hover" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#tornado"></use></svg><span class="margin-left-1 usx-clickable__link">Auntie Em!</span>',
  },
  WithColorChangeLocation: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
    children: '<svg class="usa-icon usa-icon--size-3 usx-clickable__color-on-hover" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#my_location"></use></svg><span class="margin-left-1 usx-clickable__link">We\'re not in Kansas anymore</span>',
  },
  WithColorChangePets: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center',
    children: '<svg class="usa-icon usa-icon--size-3 usx-clickable__color-on-hover" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#pets"></use></svg><span class="margin-left-1 usx-clickable__link">Oh, Toto!</span>',
  },
  ReadJohnsStoryCta: {
    href: 'https://google.com',
    className: 'display-flex flex-align-center margin-1 usx-width-fit',
    children: '<span class="usx-circle bg-black text-white usx-clickable__bg-color-on-hover display-flex flex-align-center flex-justify-center width-4 height-4"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#arrow_forward"></use></svg></span><span class="margin-left-1 usx-clickable__link">Read John\'s Story</span>',
  },
  ReadJohnsStoryInsideBlockquote: {
    href: 'https://google.com',
    className: 'usx-block usx-block--callout usx-border-primary',
    children: '<div class="usx-block__content usx-border-info maxw-tablet margin-0"><p class="font-serif-lg maxw-tablet margin-0">❝We found this wand shop that had the best wands, and we were like, "We have to go here!" So we went there.❞</p><div class="usx-block__attribution"><div class="usx-attribution"><span class="usx-attribution__content"><span class="usx-attribution__primary">John Doe</span><span class="usx-attribution__secondary">Under Secretary for the Department of Magic and Mystical Affairs</span></span></div></div><div class="display-flex flex-align-center margin-top-2"><span class="usx-circle bg-black text-white usx-clickable__bg-color-on-hover display-flex flex-align-center flex-justify-center width-4 height-4"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="./img/sprite.svg#arrow_forward"></use></svg></span><span class="margin-left-1 usx-clickable__link">Read John\'s Story</span></div></div>',
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
export const MultipleClickableCardOne = createStory(storyDefs.MultipleClickableCardOne);
export const MultipleClickableCardTwo = createStory(storyDefs.MultipleClickableCardTwo);
export const MultipleClickableCardThree = createStory(storyDefs.MultipleClickableCardThree);
export const WithColorChangeTornado = createStory(storyDefs.WithColorChangeTornado);
export const WithColorChangeLocation = createStory(storyDefs.WithColorChangeLocation);
export const WithColorChangePets = createStory(storyDefs.WithColorChangePets);
export const ReadJohnsStoryCta = createStory(storyDefs.ReadJohnsStoryCta);
export const ReadJohnsStoryInsideBlockquote = createStory(storyDefs.ReadJohnsStoryInsideBlockquote);
export const AllClassesSingleElement = createStory(storyDefs.AllClassesSingleElement);
export const ColorClassesWithinLinkClass = createStory(storyDefs.ColorClassesWithinLinkClass);
export const ColorClassesOutsideLinkClass = createStory(storyDefs.ColorClassesOutsideLinkClass);
