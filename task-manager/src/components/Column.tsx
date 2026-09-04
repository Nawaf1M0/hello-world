import { useState } from 'react';
import type { StatusDef, Task } from '../types';
import { TaskCard } from './TaskCard';

interface Props {
  status: StatusDef;
  tasks: Task[];
  itemLabel: string;
  draggingId: string | null;
  onOpenTask: (task: Task) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: () => void;
  onDrop: (statusId: string) => void;
  onAddTask: (statusId: string) => void;
}

export function Column({
  status,
  tasks,
  itemLabel,
  draggingId,
  onOpenTask,
  onDragStart,
  onDragEnd,
  onDrop,
  onAddTask,
}: Props) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`column${dragOver ? ' drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => {
        setDragOver(false);
        onDrop(status.id);
      }}
    >
      <div className="column-header">
        <span className="column-dot" style={{ background: status.color }} />
        <span>{status.name}</span>
        <span className="column-count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onOpen={onOpenTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            dragging={draggingId === task.id}
          />
        ))}
        {tasks.length === 0 && <div className="empty-column-hint">Drop a {itemLabel.toLowerCase()} here</div>}
        <button className="btn btn-sm" onClick={() => onAddTask(status.id)}>
          + Add {itemLabel.toLowerCase()}
        </button>
      </div>
    </div>
  );
}
