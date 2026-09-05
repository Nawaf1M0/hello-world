import { useApp } from '../../context/AppContext';
import type { ThemeMode } from '../../types';

const ACCENT_PRESETS = ['#2563eb', '#7c3aed', '#dc2626', '#d97706', '#16a34a', '#0891b2', '#db2777'];

export function AppearanceSettings() {
  const { config, updateTheme, setItemLabel } = useApp();

  return (
    <div>
      <h2>Appearance</h2>
      <p className="hint">Tune the look of the app and the vocabulary it uses.</p>

      <div className="field-group">
        <label>Theme mode</label>
        <div className="theme-mode-options">
          {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              className={`btn btn-sm${config.theme.mode === mode ? ' btn-primary' : ''}`}
              onClick={() => updateTheme({ mode })}
            >
              {mode[0].toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label>Accent color</label>
        <div className="color-swatches">
          {ACCENT_PRESETS.map((color) => (
            <button
              key={color}
              className={`color-swatch${config.theme.accent === color ? ' selected' : ''}`}
              style={{ background: color }}
              onClick={() => updateTheme({ accent: color })}
              aria-label={`Use accent ${color}`}
            />
          ))}
          <input
            type="color"
            value={config.theme.accent}
            onChange={(e) => updateTheme({ accent: e.target.value })}
            style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="field-group">
        <label>Card density</label>
        <div className="theme-mode-options">
          {(['comfortable', 'compact'] as const).map((density) => (
            <button
              key={density}
              className={`btn btn-sm${config.theme.density === density ? ' btn-primary' : ''}`}
              onClick={() => updateTheme({ density })}
            >
              {density[0].toUpperCase() + density.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="itemLabel">What should a "task" be called?</label>
        <input
          id="itemLabel"
          type="text"
          value={config.itemLabel}
          onChange={(e) => setItemLabel(e.target.value || 'Task')}
          style={{
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '7px 10px',
            background: 'var(--bg)',
            color: 'var(--text)',
            maxWidth: 220,
          }}
        />
      </div>
    </div>
  );
}
