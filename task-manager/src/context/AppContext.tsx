import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type {
  AppConfig,
  AppData,
  CustomFieldDef,
  PriorityDef,
  StatusDef,
  TagDef,
  Task,
  ThemeConfig,
} from '../types';
import { loadData, saveData, exportDataToFile, parseImportedData } from '../storage';
import { buildDefaultData } from '../defaultConfig';
import { makeId } from '../utils/id';

interface AppContextValue {
  config: AppConfig;
  tasks: Task[];

  // Tasks
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, statusId: string) => void;

  // Statuses
  addStatus: (status: Omit<StatusDef, 'id'>) => void;
  updateStatus: (id: string, patch: Partial<Omit<StatusDef, 'id'>>) => void;
  deleteStatus: (id: string, fallbackStatusId: string) => void;
  reorderStatuses: (orderedIds: string[]) => void;

  // Priorities
  addPriority: (priority: Omit<PriorityDef, 'id'>) => void;
  updatePriority: (id: string, patch: Partial<Omit<PriorityDef, 'id'>>) => void;
  deletePriority: (id: string) => void;
  reorderPriorities: (orderedIds: string[]) => void;

  // Tags
  addTag: (tag: Omit<TagDef, 'id'>) => void;
  updateTag: (id: string, patch: Partial<Omit<TagDef, 'id'>>) => void;
  deleteTag: (id: string) => void;

  // Custom fields
  addCustomField: (field: Omit<CustomFieldDef, 'id'>) => void;
  updateCustomField: (id: string, patch: Partial<Omit<CustomFieldDef, 'id'>>) => void;
  deleteCustomField: (id: string) => void;

  // Theme / misc config
  updateTheme: (patch: Partial<ThemeConfig>) => void;
  setItemLabel: (label: string) => void;

  // Data management
  exportData: () => void;
  importData: (text: string) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  const value = useMemo<AppContextValue>(() => {
    const touch = (task: Task): Task => ({ ...task, updatedAt: new Date().toISOString() });

    return {
      config: data.config,
      tasks: data.tasks,

      addTask: (task) =>
        setData((d) => ({
          ...d,
          tasks: [
            ...d.tasks,
            {
              ...task,
              id: makeId('task'),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, patch) =>
        setData((d) => ({
          ...d,
          tasks: d.tasks.map((t) => (t.id === id ? touch({ ...t, ...patch }) : t)),
        })),

      deleteTask: (id) =>
        setData((d) => ({ ...d, tasks: d.tasks.filter((t) => t.id !== id) })),

      moveTask: (id, statusId) =>
        setData((d) => ({
          ...d,
          tasks: d.tasks.map((t) => (t.id === id ? touch({ ...t, statusId }) : t)),
        })),

      addStatus: (status) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            statuses: [...d.config.statuses, { ...status, id: makeId('status') }],
          },
        })),

      updateStatus: (id, patch) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            statuses: d.config.statuses.map((s) => (s.id === id ? { ...s, ...patch } : s)),
          },
        })),

      deleteStatus: (id, fallbackStatusId) =>
        setData((d) => ({
          ...d,
          config: { ...d.config, statuses: d.config.statuses.filter((s) => s.id !== id) },
          tasks: d.tasks.map((t) => (t.statusId === id ? touch({ ...t, statusId: fallbackStatusId }) : t)),
        })),

      reorderStatuses: (orderedIds) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            statuses: orderedIds
              .map((id) => d.config.statuses.find((s) => s.id === id))
              .filter((s): s is StatusDef => Boolean(s)),
          },
        })),

      addPriority: (priority) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            priorities: [...d.config.priorities, { ...priority, id: makeId('priority') }],
          },
        })),

      updatePriority: (id, patch) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            priorities: d.config.priorities.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          },
        })),

      deletePriority: (id) =>
        setData((d) => ({
          ...d,
          config: { ...d.config, priorities: d.config.priorities.filter((p) => p.id !== id) },
          tasks: d.tasks.map((t) => (t.priorityId === id ? touch({ ...t, priorityId: null }) : t)),
        })),

      reorderPriorities: (orderedIds) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            priorities: orderedIds
              .map((id, index) => {
                const p = d.config.priorities.find((pr) => pr.id === id);
                return p ? { ...p, rank: index } : undefined;
              })
              .filter((p): p is PriorityDef => Boolean(p)),
          },
        })),

      addTag: (tag) =>
        setData((d) => ({
          ...d,
          config: { ...d.config, tags: [...d.config.tags, { ...tag, id: makeId('tag') }] },
        })),

      updateTag: (id, patch) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            tags: d.config.tags.map((t) => (t.id === id ? { ...t, ...patch } : t)),
          },
        })),

      deleteTag: (id) =>
        setData((d) => ({
          ...d,
          config: { ...d.config, tags: d.config.tags.filter((t) => t.id !== id) },
          tasks: d.tasks.map((t) =>
            t.tagIds.includes(id) ? touch({ ...t, tagIds: t.tagIds.filter((tid) => tid !== id) }) : t,
          ),
        })),

      addCustomField: (field) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            customFields: [...d.config.customFields, { ...field, id: makeId('field') }],
          },
        })),

      updateCustomField: (id, patch) =>
        setData((d) => ({
          ...d,
          config: {
            ...d.config,
            customFields: d.config.customFields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
          },
        })),

      deleteCustomField: (id) =>
        setData((d) => ({
          ...d,
          config: { ...d.config, customFields: d.config.customFields.filter((f) => f.id !== id) },
          tasks: d.tasks.map((t) => {
            if (!(id in t.customFields)) return t;
            const rest = { ...t.customFields };
            delete rest[id];
            return touch({ ...t, customFields: rest });
          }),
        })),

      updateTheme: (patch) =>
        setData((d) => ({ ...d, config: { ...d.config, theme: { ...d.config.theme, ...patch } } })),

      setItemLabel: (label) => setData((d) => ({ ...d, config: { ...d.config, itemLabel: label } })),

      exportData: () => exportDataToFile(data),

      importData: (text) => setData(parseImportedData(text)),

      resetToDefaults: () => {
        if (confirm('Reset all tasks and customization back to the defaults? This cannot be undone.')) {
          setData(buildDefaultData());
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
