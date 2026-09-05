// Core domain types for the customizable task manager.
// Almost everything a user sees is data, not hardcoded UI: statuses,
// priorities, tags and even the fields a task carries are all defined
// in AppConfig and can be added, renamed, recolored, reordered or
// removed at runtime from the Settings panel.

export type CustomFieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox';

export interface CustomFieldDef {
  id: string;
  name: string;
  type: CustomFieldType;
  /** Only used when type === 'select'. */
  options?: string[];
}

export interface StatusDef {
  id: string;
  name: string;
  color: string;
}

export interface PriorityDef {
  id: string;
  name: string;
  color: string;
  /** Lower rank sorts first / is treated as more urgent. */
  rank: number;
}

export interface TagDef {
  id: string;
  name: string;
  color: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  accent: string;
  /** Compact vs comfortable card spacing. */
  density: 'comfortable' | 'compact';
}

export interface AppConfig {
  statuses: StatusDef[];
  priorities: PriorityDef[];
  tags: TagDef[];
  customFields: CustomFieldDef[];
  theme: ThemeConfig;
  /** Label used for the board's unit of work, e.g. "Task", "Ticket", "Story". */
  itemLabel: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string;
  priorityId: string | null;
  tagIds: string[];
  dueDate: string | null;
  customFields: Record<string, string | number | boolean | undefined>;
  createdAt: string;
  updatedAt: string;
}

export interface AppData {
  version: number;
  config: AppConfig;
  tasks: Task[];
}
