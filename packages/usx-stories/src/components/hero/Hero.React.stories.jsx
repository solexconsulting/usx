import Hero from '../../../../usx-react/src/components/hero/Hero.tsx';
import config from '../../../../usx-react/src/components/hero/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { expect } from 'storybook/test';

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultButton = { href: '#', label: 'Call to action' };
const defaultParagraph = 'A short description of the hero section that provides context for the call to action.';
const defaultImage = 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg';

export const storyDefs = {
  Default: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    buttonProps: defaultButton,
    backgroundImage: defaultImage,
    overlay: true,
  },
  NoBackground: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    buttonProps: defaultButton,
    overlay: true,
  },
  WithoutCallout: {
    title: 'The hero heading',
    paragraph: defaultParagraph,
    buttonProps: defaultButton,
    backgroundImage: defaultImage,
    overlay: true,
  },
  WithoutButton: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    backgroundImage: defaultImage,
    overlay: true,
  },
  NoOverlay: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    buttonProps: defaultButton,
    backgroundImage: defaultImage,
    overlay: false,
  },
  WithSearch: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    backgroundImage: defaultImage,
    overlay: true,
    searchProps: {
      id: 'hero-search',
      label: 'Search',
      placeholder: 'Search...',
      big: true,
      iconOnly: true
    },
  },
};

storyDefs.RightAligned = { ...storyDefs.Default, contentPosition: 'right', backgroundPosition: 'left center' };
storyDefs.NarrowCallout = { ...storyDefs.Default, calloutMaxWidth: '28rem', backgroundPosition: 'right center' };
storyDefs.Centered = { ...storyDefs.Default, contentPosition: 'center', boxed: false, overlayOpacity: 0.8 };
storyDefs.Unboxed = { ...storyDefs.Default, boxed: false, overlayOpacity: 0.8 };
storyDefs.SplitContent = {
  ...storyDefs.Default,
  title: 'Public services',
  callout: 'Your community',
  paragraph: 'Find the services and information you need, all in one place.',
  buttonProps: { href: '#services', label: 'Explore services' },
  boxed: false,
  overlayOpacity: 0.8,
  secondaryContent: {
    title: 'Need a hand?',
    paragraph: 'Our team can help you find the right service or answer questions about your application.',
    link: { href: '#contact', text: 'Contact our team' },
  },
};
storyDefs.SplitContentRight = { ...storyDefs.SplitContent, contentPosition: 'right' };
storyDefs.SectionHeading = { ...storyDefs.SplitContent, headingLevel: 'h2' };
storyDefs.LongContent = {
  ...storyDefs.SplitContent,
  callout: 'Support for you and your household',
  title: 'Find help with housing, food, healthcare, and everyday expenses',
  paragraph: 'Explore programs that can help you and your household stay healthy, find stable housing, and cover essential costs. Learn who can apply, what information you will need, and what happens after you submit an application. You can review the available services before deciding where to start, whether you are applying for yourself, helping a family member, or supporting someone in your community.',
  buttonProps: { href: '#services', label: 'Explore available services' },
  secondaryContent: {
    title: 'Get support at every step of your application',
    paragraph: 'You do not have to work through the process alone. Our team can explain eligibility requirements, help you gather documents, and answer questions about an application you have already started. Language assistance and accessible formats are available. Contact us to discuss your circumstances and find a way to get help that works for you.',
    link: { href: '#contact', text: 'Contact the support team' },
  },
};

export default {
  title: 'React/USX/Hero',
  component: Hero,
  tags: ['USX', 'autodocs'],
  argTypes: {
    ...generatedArgTypes,
    overlayOpacity: { ...generatedArgTypes.overlayOpacity, type: { name: 'number' }, control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const NoBackground = { name: 'No background image', args: storyDefs.NoBackground };
export const WithoutCallout = { name: 'Without callout', args: storyDefs.WithoutCallout };
export const WithoutButton = { name: 'Without button', args: storyDefs.WithoutButton };
export const NoOverlay = { name: 'No overlay', args: storyDefs.NoOverlay };
export const WithSearch = { name: 'With search', args: storyDefs.WithSearch };
export const RightAligned = {
  args: storyDefs.RightAligned,
  play: async ({ canvasElement }) => {
    const hero = canvasElement.querySelector('.usx-hero');
    await expect(hero).toHaveClass('usx-hero--content-right');
    await expect(hero.style.backgroundPosition).toBe('left center');
    await expect(hero).toHaveStyle({ backgroundPosition: '0% 50%' });
  },
};
export const Centered = { args: storyDefs.Centered };
export const NarrowCallout = {
  args: storyDefs.NarrowCallout,
  play: async ({ canvasElement }) => {
    const callout = canvasElement.querySelector('.usx-hero__callout');
    const hero = canvasElement.querySelector('.usx-hero');
    await expect(callout.style.maxWidth).toBe('28rem');
    await expect(callout.getBoundingClientRect().width).toBeLessThanOrEqual(28 * parseFloat(getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize) + 1);
    await expect(hero.scrollWidth).toBeLessThanOrEqual(hero.clientWidth);
  },
};
export const Unboxed = {
  args: storyDefs.Unboxed,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.usx-hero')).toHaveClass('usx-hero--unboxed');
    await expect(canvasElement.querySelector('.usx-hero__callout')).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '0px' });
  },
};
export const SplitContent = { args: storyDefs.SplitContent };
export const SplitContentRight = { args: storyDefs.SplitContentRight };
export const LongContent = {
  args: storyDefs.LongContent,
  play: async ({ canvasElement }) => {
    const hero = canvasElement.querySelector('.usx-hero');
    const inner = hero.querySelector('.usx-hero__inner');
    const heroBounds = hero.getBoundingClientRect();
    const innerStyle = getComputedStyle(inner);
    const paddingTop = parseFloat(innerStyle.paddingTop);
    const paddingBottom = parseFloat(innerStyle.paddingBottom);
    const minimumHeight = parseFloat(getComputedStyle(hero).minHeight);
    const rootFontSize = parseFloat(getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize);
    const wide = canvasElement.ownerDocument.defaultView.matchMedia('(min-width: 40em)').matches;
    const expectedBlockPadding = (wide ? 4 : 3) * rootFontSize;
    const expectedInlinePadding = (wide ? 2 : 1.25) * rootFontSize;

    await expect(paddingTop).toBe(expectedBlockPadding);
    await expect(paddingBottom).toBe(expectedBlockPadding);
    await expect(parseFloat(innerStyle.paddingLeft)).toBe(expectedInlinePadding);
    await expect(parseFloat(innerStyle.paddingRight)).toBe(expectedInlinePadding);
    await expect(heroBounds.height + 1).toBeGreaterThanOrEqual(Math.max(minimumHeight, inner.getBoundingClientRect().height));
    await expect(hero.scrollWidth).toBeLessThanOrEqual(hero.clientWidth);
    for (const content of inner.children) {
      const bounds = content.getBoundingClientRect();
      await expect(bounds.top - heroBounds.top + 1).toBeGreaterThanOrEqual(paddingTop);
      await expect(heroBounds.bottom - bounds.bottom + 1).toBeGreaterThanOrEqual(paddingBottom);
    }
  },
};
export const SectionHeading = {
  args: storyDefs.SectionHeading,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: /Public services/ })).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 3, name: 'Need a hand?' })).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Contact our team' })).toHaveAttribute('href', '#contact');
    await expect(canvasElement.querySelector('.usx-hero')).toHaveClass('usx-hero--split');
  },
};

