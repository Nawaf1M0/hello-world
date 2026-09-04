import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CustomFieldType } from '../../types';

const TYPE_LABELS: Record<CustomFieldType, string> = {
  text: 'Text',
  number: 'Number',
  date: 'Date',
  select: 'Dropdown',
  checkbox: 'Checkbox',
};

export function CustomFieldsSettings() {
  const { config, addCustomField, updateCustomField, deleteCustomField } = useApp();
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<CustomFieldType>('text');

  function submitAdd() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    addCustomField({ name: trimmed, type: newType, options: newType === 'select' ? [] : undefined });
    setNewName('');
    setNewType('text');
  }

  return (
    <div>
      <h2>Custom fields</h2>
      <p className="hint">
        Add extra fields — text, numbers, dates, dropdowns, or checkboxes — that appear on every task.
      </p>

      <div className="editable-list">
        {config.customFields.map((field) => (
          <div className="editable-row" key={field.id} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateCustomField(field.id, { name: e.target.value })}
              />
              <select
                value={field.type}
                onChange={(e) =>
                  updateCustomField(field.id, {
                    type: e.target.value as CustomFieldType,
                    options: e.target.value === 'select' ? field.options ?? [] : undefined,
                  })
                }
              >
                {(Object.keys(TYPE_LABELS) as CustomFieldType[]).map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-icon btn-danger"
                onClick={() => {
                  if (confirm(`Delete the "${field.name}" field? Its values will be removed from all tasks.`)) {
                    deleteCustomField(field.id);
                  }
                }}
                aria-label={`Delete ${field.name}`}
              >
                ✕
              </button>
            </div>
            {field.type === 'select' && (
              <SelectOptionsEditor
                options={field.options ?? []}
                onChange={(options) => updateCustomField(field.id, { options })}
              />
            )}
          </div>
        ))}
      </div>

      <div className="add-row">
        <input
          type="text"
          placeholder="New field name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitAdd()}
        />
        <select value={newType} onChange={(e) => setNewType(e.target.value as CustomFieldType)}>
          {(Object.keys(TYPE_LABELS) as CustomFieldType[]).map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <button className="btn btn-sm" onClick={submitAdd}>
          Add field
        </button>
      </div>
    </div>
  );
}

function SelectOptionsEditor({ options, onChange }: { options: string[]; onChange: (options: string[]) => void }) {
  const [newOption, setNewOption] = useState('');

  function submit() {
    const trimmed = newOption.trim();
    if (!trimmed || options.includes(trimmed)) return;
    onChange([...options, trimmed]);
    setNewOption('');
  }

  return (
    <div className="select-options-editor">
      {options.map((opt) => (
        <span className="chip" key={opt}>
          {opt}
          <button onClick={() => onChange(options.filter((o) => o !== opt))} aria-label={`Remove ${opt}`}>
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder="Add option"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        style={{ width: 120, border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', background: 'var(--bg)' }}
      />
    </div>
  );
}
