import { expect } from 'storybook/test';

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkMedia = async (card, def) => {
  const media = card.querySelector('.usa-card__media');
  const images = def.imageProps ?? [];
  if (!images.length) return expect(media).toBeNull();
  await hasClass(media, 'usa-card__media--inset', Boolean(def.mediaInset));
  await hasClass(media, 'usa-card__media--exdent', Boolean(def.mediaExdent));

  // One image is shown plainly; several become a carousel labelled by the card title.
  const carousel = media.querySelector('.usx-carousel');
  if (images.length === 1) {
    await expect(carousel).toBeNull();
    await expect(media.querySelector('img')).toHaveAttribute('src', images[0].src);
    await expect(media.querySelector('img')).toHaveAttribute('alt', images[0].alt);
    await expect(media.querySelector('figcaption')).toHaveTextContent(images[0].caption);
    return;
  }
  await expect(carousel).toHaveAttribute('aria-label', `${def.title} images`);
  if (def.showCarouselDots === false)
    await expect(carousel).toHaveAttribute('data-show-dots', 'false');
  else await expect(carousel).not.toHaveAttribute('data-show-dots');
  const slides = [...carousel.querySelectorAll('.usx-carousel__slide')];
  await expect(slides).toHaveLength(images.length);
  for (const [index, image] of images.entries()) {
    await expect(slides[index]).toHaveAttribute('aria-label', `${index + 1} of ${images.length}`);
    await expect(slides[index].querySelector('img')).toHaveAttribute('src', image.src);
    await expect(slides[index].querySelector('figcaption')).toHaveTextContent(image.caption);
    if (image.objectFit)
      await expect(slides[index].querySelector('figure')).toHaveClass(
        `usx-object-fit-${image.objectFit}`
      );
  }
};

const checkLayout = async (card, def) => {
  const media = card.querySelector('.usa-card__media');
  if (!media) return;
  const rect = (selector) => card.querySelector(selector).getBoundingClientRect();
  const [mediaRect, bodyRect, headerRect] = [
    media.getBoundingClientRect(),
    rect('.usa-card__body'),
    rect('.usa-card__header'),
  ];
  if (def.flag) {
    // Flag cards put the media beside the text, on the right when mediaRight is set.
    if (def.mediaRight) await expect(mediaRect.left).toBeGreaterThanOrEqual(bodyRect.right - 1);
    else await expect(mediaRect.right).toBeLessThanOrEqual(bodyRect.left + 1);
  } else if (def.headerFirst) {
    await expect(headerRect.top).toBeLessThan(mediaRect.top);
  } else {
    await expect(mediaRect.top).toBeLessThan(headerRect.top);
  }
};

// Checks one card's markup against the props it was rendered from.
export const checkCard = async (card, def) => {
  await expect(card).toHaveClass('usa-card', 'usx-card');
  await hasClass(card, 'usa-card--flag', Boolean(def.flag));
  await hasClass(card, 'usa-card--media-right', Boolean(def.mediaRight));
  await hasClass(card, 'usa-card--header-first', Boolean(def.headerFirst));
  if (def.className) await expect(card).toHaveClass(...def.className.split(' '));

  await expect(card.querySelector('.usa-card__header .usa-card__heading')).toHaveTextContent(
    def.title
  );
  const body = card.querySelector('.usa-card__body');
  await expect(body.querySelector('p')).toHaveTextContent(def.description);

  const tagGroup = body.querySelector('.usx-tag-group');
  if (def.tagProps) {
    const tags = [...tagGroup.querySelectorAll('.usx-tag')];
    await expect(tags.map((tag) => tag.textContent.trim())).toEqual(
      def.tagProps.map((tag) => tag.value)
    );
    for (const [index, tag] of def.tagProps.entries())
      await expect(tags[index]).toHaveClass(`bg-${tag.color}`);
  } else {
    await expect(tagGroup).toBeNull();
  }

  const footer = card.querySelector('.usa-card__footer');
  const actions = def.buttonProps ?? [];
  if (actions.length) {
    const buttons = [...footer.querySelectorAll('button')];
    await expect(buttons.map((button) => button.textContent.trim())).toEqual(
      actions.map((action) => action.children)
    );
    for (const [index, action] of actions.entries())
      await expect(buttons[index]).toHaveClass(`usa-button--${action.variant}`);
  } else {
    await expect(footer).toBeNull();
  }

  await checkMedia(card, def);
  await checkLayout(card, def);
};
