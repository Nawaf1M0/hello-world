import type { Task } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  task: Task;
  onOpen: (task: Task) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
  dragging: boolean;
}

export function TaskCard({ task, onOpen, onDragStart, onDragEnd, dragging }: Props) {
  const { config } = useApp();
  const priority = config.priorities.find((p) => p.id === task.priorityId);
  const tags = task.tagIds
    .map((id) => config.tags.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div
      className={`task-card${dragging ? ' dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(task);
      }}
    >
      <div className="task-title">{task.title}</div>
      {task.description && <div className="task-desc">{task.description}</div>}
      <div className="badge-row">
        {priority && (
          <span className="badge" style={{ background: priority.color }}>
            {priority.name}
          </span>
        )}
        {tags.map((tag) => (
          <span key={tag.id} className="badge" style={{ background: tag.color }}>
            {tag.name}
          </span>
        ))}
      </div>
      {task.dueDate && <div className="task-meta">Due {task.dueDate}</div>}
    </div>
  );
}
