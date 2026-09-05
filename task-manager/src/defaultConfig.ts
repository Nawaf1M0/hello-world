import type { AppConfig, AppData, Task } from './types';

// This is only a starting point. Every list here is meant to be edited,
// reordered, or deleted from the Settings panel — nothing about it is
// load-bearing for the app to keep working.

export const defaultConfig: AppConfig = {
  itemLabel: 'Task',
  statuses: [
    { id: 'status_todo', name: 'To Do', color: '#64748b' },
    { id: 'status_in_progress', name: 'In Progress', color: '#2563eb' },
    { id: 'status_done', name: 'Done', color: '#16a34a' },
  ],
  priorities: [
    { id: 'priority_low', name: 'Low', color: '#64748b', rank: 3 },
    { id: 'priority_medium', name: 'Medium', color: '#d97706', rank: 2 },
    { id: 'priority_high', name: 'High', color: '#dc2626', rank: 1 },
  ],
  tags: [
    { id: 'tag_bug', name: 'Bug', color: '#dc2626' },
    { id: 'tag_feature', name: 'Feature', color: '#7c3aed' },
  ],
  customFields: [],
  theme: {
    mode: 'system',
    accent: '#2563eb',
    density: 'comfortable',
  },
};

const now = () => new Date().toISOString();

export const defaultTasks: Task[] = [
  {
    id: 'task_welcome',
    title: 'Welcome to your task manager 👋',
    description:
      'This board starts simple on purpose. Open Settings to add your own statuses, priorities, tags, and custom fields — the board reshapes itself around whatever you configure.',
    statusId: 'status_todo',
    priorityId: 'priority_medium',
    tagIds: ['tag_feature'],
    dueDate: null,
    customFields: {},
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: 'task_customize',
    title: 'Try renaming a column',
    description: 'Statuses, priorities, and tags all support rename, recolor, reorder, and delete.',
    statusId: 'status_in_progress',
    priorityId: 'priority_low',
    tagIds: [],
    dueDate: null,
    customFields: {},
    createdAt: now(),
    updatedAt: now(),
  },
];

export function buildDefaultData(): AppData {
  return {
    version: 1,
    config: defaultConfig,
    tasks: defaultTasks,
  };
}
