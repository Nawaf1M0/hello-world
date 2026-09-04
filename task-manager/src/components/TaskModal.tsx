import { useState } from 'react';
import type { Task } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  task: Task | null;
  defaultStatusId: string;
  onClose: () => void;
}

type DraftTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export function TaskModal({ task, defaultStatusId, onClose }: Props) {
  const { config, addTask, updateTask, deleteTask } = useApp();
  const isNew = !task;

  const [draft, setDraft] = useState<DraftTask>(
    task
      ? {
          title: task.title,
          description: task.description,
          statusId: task.statusId,
          priorityId: task.priorityId,
          tagIds: task.tagIds,
          dueDate: task.dueDate,
          customFields: { ...task.customFields },
        }
      : {
          title: '',
          description: '',
          statusId: defaultStatusId,
          priorityId: config.priorities[0]?.id ?? null,
          tagIds: [],
          dueDate: null,
          customFields: {},
        },
  );

  const canSave = draft.title.trim().length > 0;

  function save() {
    if (!canSave) return;
    if (isNew) {
      addTask({ ...draft, title: draft.title.trim() });
    } else if (task) {
      updateTask(task.id, { ...draft, title: draft.title.trim() });
    }
    onClose();
  }

  function toggleTag(tagId: string) {
    setDraft((d) => ({
      ...d,
      tagIds: d.tagIds.includes(tagId) ? d.tagIds.filter((t) => t !== tagId) : [...d.tagIds, tagId],
    }));
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{isNew ? `New ${config.itemLabel}` : `Edit ${config.itemLabel}`}</h2>

        <div className="field-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            autoFocus
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder={`What needs doing?`}
          />
        </div>

        <div className="field-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          />
        </div>

        <div className="field-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={draft.statusId}
            onChange={(e) => setDraft((d) => ({ ...d, statusId: e.target.value }))}
          >
            {config.statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={draft.priorityId ?? ''}
            onChange={(e) => setDraft((d) => ({ ...d, priorityId: e.target.value || null }))}
          >
            <option value="">None</option>
            {config.priorities.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={draft.dueDate ?? ''}
            onChange={(e) => setDraft((d) => ({ ...d, dueDate: e.target.value || null }))}
          />
        </div>

        {config.tags.length > 0 && (
          <div className="field-group">
            <label>Tags</label>
            <div className="tag-picker">
              {config.tags.map((tag) => (
                <label key={tag.id}>
                  <input
                    type="checkbox"
                    checked={draft.tagIds.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        )}

        {config.customFields.map((field) => (
          <div className="field-group" key={field.id}>
            <label htmlFor={field.id}>{field.name}</label>
            {field.type === 'text' && (
              <input
                id={field.id}
                type="text"
                value={(draft.customFields[field.id] as string) ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    customFields: { ...d.customFields, [field.id]: e.target.value },
                  }))
                }
              />
            )}
            {field.type === 'number' && (
              <input
                id={field.id}
                type="number"
                value={(draft.customFields[field.id] as number) ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    customFields: {
                      ...d.customFields,
                      [field.id]: e.target.value === '' ? undefined : Number(e.target.value),
                    },
                  }))
                }
              />
            )}
            {field.type === 'date' && (
              <input
                id={field.id}
                type="date"
                value={(draft.customFields[field.id] as string) ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    customFields: { ...d.customFields, [field.id]: e.target.value },
                  }))
                }
              />
            )}
            {field.type === 'select' && (
              <select
                id={field.id}
                value={(draft.customFields[field.id] as string) ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    customFields: { ...d.customFields, [field.id]: e.target.value },
                  }))
                }
              >
                <option value="">None</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'checkbox' && (
              <div className="checkbox-row">
                <input
                  id={field.id}
                  type="checkbox"
                  checked={Boolean(draft.customFields[field.id])}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      customFields: { ...d.customFields, [field.id]: e.target.checked },
                    }))
                  }
                />
              </div>
            )}
          </div>
        ))}

        <div className="modal-actions">
          {!isNew && task && (
            <button
              className="btn btn-danger"
              onClick={() => {
                if (confirm(`Delete this ${config.itemLabel.toLowerCase()}?`)) {
                  deleteTask(task.id);
                  onClose();
                }
              }}
            >
              Delete
            </button>
          )}
          <div className="modal-actions-right">
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!canSave} onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
