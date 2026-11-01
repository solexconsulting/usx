import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/collection/collection.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/collection/collection.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Collection.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Collection',
  tags: ['USWDS', 'autodocs'],
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkItem = async (li, item) => {
  const body = li.querySelector('.usa-collection__body');
  const link = body.querySelector('.usa-collection__heading > a.usx-link');
  await expect(link).toHaveAttribute('href', item.href);
  await expect(link).toHaveTextContent(item.heading);

  const description = body.querySelector('.usa-collection__description');
  if (item.description) await expect(description).toHaveTextContent(item.description);
  else await expect(description).toBeNull();

  const image = li.querySelector(':scope > .usa-collection__img');
  if (item.imgSrc) {
    await expect(image).toHaveAttribute('src', item.imgSrc);
    await expect(image).toHaveAttribute('alt', item.imgAlt);
    await expect(image.getBoundingClientRect().right).toBeLessThanOrEqual(
      body.getBoundingClientRect().left + 1
    );
  } else {
    await expect(image).toBeNull();
  }

  const calendar = li.querySelector(':scope > .usa-collection__calendar-date');
  if (item.calendarDateProps) {
    const [, , month, day] = item.calendarDateProps.datetime.match(/^(\d{4})-(\d{2})-(\d{2})/);
    await expect(calendar.querySelector('time')).toHaveAttribute(
      'datetime',
      item.calendarDateProps.datetime
    );
    await expect(calendar.querySelector('[class*="calendar-date-month"]')).toHaveTextContent(
      MONTHS[Number(month) - 1]
    );
    await expect(calendar.querySelector('[class*="calendar-date-day"]')).toHaveTextContent(
      String(Number(day))
    );
    await expect(calendar.getBoundingClientRect().right).toBeLessThanOrEqual(
      body.getBoundingClientRect().left + 1
    );
  } else {
    await expect(calendar).toBeNull();
  }

  // Metadata and topics are separate labelled lists, only present when there is something to list.
  const lists = [...body.querySelectorAll(':scope > ul.usa-collection__meta')];
  const info = lists.find((list) => list.getAttribute('aria-label') === 'More information');
  const topics = lists.find((list) => list.getAttribute('aria-label') === 'Topics');
  await expect(lists).toHaveLength(
    Number(Boolean(item.meta?.length)) + Number(Boolean(item.tags?.length))
  );
  if (item.meta?.length) {
    const entries = [...info.children];
    await expect(entries).toHaveLength(item.meta.length);
    for (const [index, meta] of item.meta.entries()) {
      await expect(entries[index]).toHaveTextContent(meta.text);
      if (meta.datetime)
        await expect(entries[index].querySelector('time')).toHaveAttribute(
          'datetime',
          meta.datetime
        );
      else await expect(entries[index].querySelector('time')).toBeNull();
    }
  }
  if (item.tags?.length) {
    const tags = [...topics.children];
    await expect(tags.map((tag) => tag.textContent.trim())).toEqual(
      item.tags.map((tag) => tag.label)
    );
    for (const [index, tag] of item.tags.entries())
      await hasClass(tags[index], 'usa-tag--new', Boolean(tag.isNew));
  }
};

const checkCollection = (def) => async (list) => {
  await expect(list.tagName).toBe('UL');
  await expect(list).toHaveClass('usa-collection', 'usx-collection');
  await hasClass(list, 'usa-collection--condensed', Boolean(def.condensed));
  const items = [...list.children];
  await expect(items).toHaveLength(def.items.length);
  for (const [index, item] of def.items.entries()) {
    await expect(items[index]).toHaveClass('usa-collection__item');
    await checkItem(items[index], item);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkCollection(def)])
  )
);

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
