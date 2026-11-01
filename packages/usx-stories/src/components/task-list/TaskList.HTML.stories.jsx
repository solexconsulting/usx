import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/task-list/task-list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/task-list/task-list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './TaskList.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/TaskList',
  tags: ['USX', 'autodocs'],
};

const checkTasks = (def) => async (list) => {
  await expect(list.tagName).toBe('UL');
  await expect(list).toHaveClass('usx-task-list');
  const items = [...list.children];
  await expect(items).toHaveLength(def.tasks.length);

  for (const [index, task] of def.tasks.entries()) {
    const link = items[index].querySelector(':scope > a.usx-task-list__item');
    await expect(link).toHaveClass('usx-clickable');
    await expect(link).toHaveAttribute('href', task.href);
    await expect(link.querySelector('.usx-task-list__link')).toHaveTextContent(task.name);

    const hint = link.querySelector('.usx-task-list__hint');
    if (task.hint) await expect(hint).toHaveTextContent(task.hint);
    else await expect(hint).toBeNull();

    // The status is a tag at the end of the row, with an icon only when the tag has one.
    const tag = link.querySelector('.usx-tag');
    if (task.tagProps) {
      await expect(tag.textContent.trim()).toBe(task.tagProps.value);
      await expect(tag).toHaveClass(`bg-${task.tagProps.color}`);
      await expect(tag.querySelector('svg') !== null).toBe(Boolean(task.tagProps.icon));
      await expect(tag.getBoundingClientRect().left).toBeGreaterThan(
        link.querySelector('.usx-task-list__link').getBoundingClientRect().left
      );
    } else {
      await expect(tag).toBeNull();
    }
    await expect(link).toHaveAccessibleName(new RegExp(task.name));
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkTasks(def)])
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
