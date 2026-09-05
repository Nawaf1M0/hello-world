import { useApp } from '../../context/AppContext';
import { ColorListEditor } from './ColorListEditor';

export function TagsSettings() {
  const { config, addTag, updateTag, deleteTag } = useApp();

  return (
    <div>
      <h2>Tags</h2>
      <p className="hint">Free-form labels you can attach to any task — as many or as few as you like.</p>
      <ColorListEditor
        items={config.tags}
        addLabel="New tag name"
        defaultColor="#7c3aed"
        onAdd={(name, color) => addTag({ name, color })}
        onUpdate={(id, patch) => updateTag(id, patch)}
        onDelete={(id) => {
          if (confirm('Delete this tag? It will be removed from any tasks that use it.')) deleteTag(id);
        }}
      />
    </div>
  );
}
