import React from 'react';
import classNames from 'classnames';
import Clickable from '../clickable/Clickable';
import Tag from '../tag/Tag';
import './task-list.scss';

export type TaskStatus = 'complete' | 'incomplete';

export interface Task {
  name: string;
  href: string;
  status: TaskStatus;
  hint?: string;
}

export interface TaskListProps {
  tasks?: Task[];
  className?: string;
}

export default function TaskList({ tasks = [], className }: TaskListProps) {
  return (
    <ul className={classNames('usx-task-list', className)}>
      {tasks.map((task, i) => (
        <li key={i}>
          <Clickable href={task.href} className="usx-task-list__item">
            {task.hint ? (
              <div className="display-flex flex-column">
                <Clickable.Link className="usx-task-list__link">{task.name}</Clickable.Link>
                <span className="usa-hint usx-task-list__hint">{task.hint}</span>
              </div>
            ) : (
              <Clickable.Link className="usx-task-list__link">{task.name}</Clickable.Link>
            )}
            {task.status === 'complete'
              ? <Tag outline color="ink">Completed</Tag>
              : <Tag color="primary-light">Incomplete</Tag>
            }
          </Clickable>
        </li>
      ))}
    </ul>
  );
}
