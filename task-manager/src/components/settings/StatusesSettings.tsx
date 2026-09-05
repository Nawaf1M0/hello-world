import { useApp } from '../../context/AppContext';
import { ColorListEditor } from './ColorListEditor';

export function StatusesSettings() {
  const { config, tasks, addStatus, updateStatus, deleteStatus, reorderStatuses } = useApp();

  return (
    <div>
      <h2>Statuses</h2>
      <p className="hint">
        These become the columns on your board. Add, rename, recolor, reorder, or remove them to match your
        workflow.
      </p>
      <ColorListEditor
        items={config.statuses}
        addLabel="New status name"
        onAdd={(name, color) => addStatus({ name, color })}
        onUpdate={(id, patch) => updateStatus(id, patch)}
        onReorder={reorderStatuses}
        onDelete={(id) => {
          if (config.statuses.length <= 1) {
            alert('You need at least one status.');
            return;
          }
          const count = tasks.filter((t) => t.statusId === id).length;
          const fallback = config.statuses.find((s) => s.id !== id);
          if (!fallback) return;
          const message =
            count > 0
              ? `Delete this status? ${count} task(s) will move to "${fallback.name}".`
              : 'Delete this status?';
          if (confirm(message)) deleteStatus(id, fallback.id);
        }}
      />
    </div>
  );
}
