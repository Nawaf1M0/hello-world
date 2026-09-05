import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Task } from '../types';
import { Column } from './Column';
import { TaskModal } from './TaskModal';

export function Board() {
  const { config, tasks, moveTask } = useApp();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [creatingInStatus, setCreatingInStatus] = useState<string | null>(null);

  const modalOpen = openTask !== null || creatingInStatus !== null;

  return (
    <>
      <div className="board">
        {config.statuses.map((status) => (
          <Column
            key={status.id}
            status={status}
            tasks={tasks.filter((t) => t.statusId === status.id)}
            itemLabel={config.itemLabel}
            draggingId={draggingId}
            onOpenTask={setOpenTask}
            onDragStart={(e, task) => {
              setDraggingId(task.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragEnd={() => setDraggingId(null)}
            onDrop={(statusId) => {
              if (draggingId) moveTask(draggingId, statusId);
              setDraggingId(null);
            }}
            onAddTask={(statusId) => setCreatingInStatus(statusId)}
          />
        ))}
        {config.statuses.length === 0 && (
          <div className="empty-column-hint">
            No statuses yet. Add one from Settings → Statuses to start building your board.
          </div>
        )}
      </div>

      {modalOpen && (
        <TaskModal
          task={openTask}
          defaultStatusId={creatingInStatus ?? config.statuses[0]?.id ?? ''}
          onClose={() => {
            setOpenTask(null);
            setCreatingInStatus(null);
          }}
        />
      )}
    </>
  );
}
