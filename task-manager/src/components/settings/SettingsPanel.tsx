import { useState } from 'react';
import { StatusesSettings } from './StatusesSettings';
import { PrioritiesSettings } from './PrioritiesSettings';
import { TagsSettings } from './TagsSettings';
import { CustomFieldsSettings } from './CustomFieldsSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { DataSettings } from './DataSettings';

const SECTIONS = [
  { id: 'statuses', label: 'Statuses', Component: StatusesSettings },
  { id: 'priorities', label: 'Priorities', Component: PrioritiesSettings },
  { id: 'tags', label: 'Tags', Component: TagsSettings },
  { id: 'fields', label: 'Custom Fields', Component: CustomFieldsSettings },
  { id: 'appearance', label: 'Appearance', Component: AppearanceSettings },
  { id: 'data', label: 'Data', Component: DataSettings },
] as const;

export function SettingsPanel() {
  const [activeId, setActiveId] = useState<(typeof SECTIONS)[number]['id']>('statuses');
  const Active = SECTIONS.find((s) => s.id === activeId)?.Component ?? StatusesSettings;

  return (
    <div className="settings">
      <nav className="settings-nav">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={activeId === section.id ? 'active' : ''}
            onClick={() => setActiveId(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <div className="settings-panel">
        <Active />
      </div>
    </div>
  );
}
