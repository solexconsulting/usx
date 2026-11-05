import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/carousel/carousel.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/carousel/carousel.django-snapshot.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './Carousel.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Carousel',
  tags: ['USX', 'autodocs'],
  decorators: [...componentInit('carousel')],
};

// Only the carousel's own parts: nested carousels (slides holding carousels) have their own.
const own = (carousel, selector) => [...carousel.querySelectorAll(`:scope > ${selector}`)];
const slidesOf = (carousel) =>
  own(carousel, '.usx-carousel__viewport > .usx-carousel__track > .usx-carousel__slide');
const dotsOf = (carousel) => own(carousel, '.usx-carousel__dots > .usx-carousel__dot');
const currentIndex = (carousel) =>
  dotsOf(carousel).findIndex((dot) => dot.getAttribute('aria-current') === 'true');

const checkCarousel = (def) => async (carousel) => {
  const slides = def.slides ?? (def.children ?? []).map(() => ({}));
  await expect(carousel).toHaveAttribute('role', 'region');
  await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  await expect(carousel).toHaveAccessibleName(def.ariaLabel);
  if (def.id) await expect(carousel.id).toMatch(snapshotId(def.id));
  if (def.showDots === false) await expect(carousel).toHaveAttribute('data-show-dots', 'false');
  else await expect(carousel).not.toHaveAttribute('data-show-dots');

  const rendered = slidesOf(carousel);
  await expect(rendered).toHaveLength(slides.length);
  for (const [index, slide] of slides.entries()) {
    await expect(rendered[index]).toHaveAttribute('aria-roledescription', 'slide');
    await expect(rendered[index]).toHaveAttribute(
      'aria-label',
      slide.label ?? `${index + 1} of ${slides.length}`
    );
  }
  if (slides.length)
    await expect(
      own(carousel, '.usx-carousel__viewport > .usx-carousel__track')[0]
    ).toHaveAttribute('aria-live', 'polite');

  // The script adds controls only to carousels that have something to move between, and only once.
  const enhanced = slides.length > 1 && !def.extraAttributes;
  if (!enhanced) {
    await expect(dotsOf(carousel)).toHaveLength(0);
    await expect(own(carousel, '.usx-carousel__viewport > .usx-carousel__button')).toHaveLength(0);
    return;
  }
  await waitFor(() => expect(carousel).toHaveAttribute('data-enhanced', 'true'));
  const buttons = own(carousel, '.usx-carousel__viewport > .usx-carousel__button');
  await expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
    'Previous slide',
    'Next slide',
  ]);
  const dots = dotsOf(carousel);
  await expect(dots).toHaveLength(slides.length);
  await expect(dots[0]).toHaveAttribute('aria-label', `Show slide 1 of ${slides.length}`);
  const dotGroup = carousel.querySelector(':scope > .usx-carousel__dots');
  await expect(dotGroup).toHaveAccessibleName('Choose a slide');
  if (def.showDots === false) await expect(dotGroup).toHaveClass('usx-carousel__dots--hidden');
  else await expect(dotGroup).not.toHaveClass('usx-carousel__dots--hidden');
  const status = carousel.querySelector(':scope > .usx-carousel__viewport > .usx-carousel__status');
  await expect(status).toHaveAttribute('aria-hidden', 'true');
  if (def.statusClassName) await expect(status).toHaveClass(def.statusClassName);
  await expect(currentIndex(carousel)).toBe(0);
  await expect(rendered[0]).not.toHaveAttribute('aria-hidden');
  await expect(rendered[1]).toHaveAttribute('aria-hidden', 'true');
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkCarousel(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Navigation', async () => {
    const carousel = sectionFor(context.canvasElement, 'Default');
    const [previous, next] = own(carousel, '.usx-carousel__viewport > .usx-carousel__button');
    const slides = slidesOf(carousel);
    const status = carousel.querySelector('.usx-carousel__status');
    const expectOnly = async (index) => {
      await expect(currentIndex(carousel)).toBe(index);
      for (const [i, slide] of slides.entries()) {
        if (i === index) await expect(slide).not.toHaveAttribute('aria-hidden');
        else await expect(slide).toHaveAttribute('aria-hidden', 'true');
      }
      await expect(status.dataset.status).toBe(`${index + 1}/${slides.length}`);
    };

    await userEvent.click(next);
    await expectOnly(1);
    await userEvent.click(next);
    await expectOnly(2);
    await userEvent.click(previous);
    await expectOnly(1);
    await userEvent.click(dotsOf(carousel)[0]);
    await expectOnly(0);
    // Arrow keys move between slides from the track and from the dots.
    own(carousel, '.usx-carousel__viewport > .usx-carousel__track')[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expectOnly(1);
    dotsOf(carousel)[1].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expectOnly(2);
    await expect(dotsOf(carousel)[2]).toHaveFocus();
  });
  await context.step('Rapid direction reversal keeps the requested slide active', async () => {
    const carousel = sectionFor(context.canvasElement, sectionTitle('CustomId'));
    const [previous, next] = own(carousel, '.usx-carousel__viewport > .usx-carousel__button');
    const wrongSelections = [];
    let afterPrevious = false;
    const observer = new MutationObserver(() => {
      const index = currentIndex(carousel);
      if (afterPrevious && index !== 0) wrongSelections.push(index);
    });
    observer.observe(carousel.querySelector('.usx-carousel__dots'), {
      attributes: true,
      subtree: true,
      attributeFilter: ['aria-current'],
    });
    try {
      next.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      afterPrevious = true;
      previous.click();
      await new Promise((resolve) => setTimeout(resolve, 450));
    } finally {
      observer.disconnect();
    }
    await expect(wrongSelections).toEqual([]);
    await expect(currentIndex(carousel)).toBe(0);
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
