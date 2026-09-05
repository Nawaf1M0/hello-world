import { useState } from 'react';

export interface ColorListItem {
  id: string;
  name: string;
  color: string;
}

interface Props {
  items: ColorListItem[];
  onAdd: (name: string, color: string) => void;
  onUpdate: (id: string, patch: { name?: string; color?: string }) => void;
  onDelete: (id: string) => void;
  onReorder?: (orderedIds: string[]) => void;
  addLabel: string;
  defaultColor?: string;
}

export function ColorListEditor({ items, onAdd, onUpdate, onDelete, onReorder, addLabel, defaultColor = '#2563eb' }: Props) {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(defaultColor);

  function submitAdd() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAdd(trimmed, newColor);
    setNewName('');
  }

  function move(index: number, direction: -1 | 1) {
    if (!onReorder) return;
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onReorder(next.map((i) => i.id));
  }

  return (
    <div className="editable-list">
      {items.map((item, index) => (
        <div className="editable-row" key={item.id}>
          {onReorder && (
            <div className="reorder-buttons">
              <button disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move up">
                ▲
              </button>
              <button disabled={index === items.length - 1} onClick={() => move(index, 1)} aria-label="Move down">
                ▼
              </button>
            </div>
          )}
          <input type="color" value={item.color} onChange={(e) => onUpdate(item.id, { color: e.target.value })} />
          <input
            type="text"
            value={item.name}
            onChange={(e) => onUpdate(item.id, { name: e.target.value })}
          />
          <button className="btn btn-icon btn-danger" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`}>
            ✕
          </button>
        </div>
      ))}

      <div className="add-row">
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <input
          type="text"
          placeholder={addLabel}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitAdd()}
        />
        <button className="btn btn-sm" onClick={submitAdd}>
          Add
        </button>
      </div>
    </div>
  );
}
