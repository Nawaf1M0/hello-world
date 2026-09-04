import { useApp } from '../../context/AppContext';
import { ColorListEditor } from './ColorListEditor';

export function PrioritiesSettings() {
  const { config, addPriority, updatePriority, deletePriority, reorderPriorities } = useApp();

  const sorted = [...config.priorities].sort((a, b) => a.rank - b.rank);

  return (
    <div>
      <h2>Priorities</h2>
      <p className="hint">
        Define as many priority levels as you need, in whatever order makes sense to you (top = most urgent).
      </p>
      <ColorListEditor
        items={sorted}
        addLabel="New priority name"
        defaultColor="#d97706"
        onAdd={(name, color) => addPriority({ name, color, rank: sorted.length })}
        onUpdate={(id, patch) => updatePriority(id, patch)}
        onReorder={reorderPriorities}
        onDelete={(id) => {
          if (confirm('Delete this priority? Tasks using it will have their priority cleared.')) {
            deletePriority(id);
          }
        }}
      />
    </div>
  );
}
