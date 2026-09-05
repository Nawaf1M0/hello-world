import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export function DataSettings() {
  const { exportData, importData, resetToDefaults } = useApp();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    try {
      const text = await file.text();
      importData(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not import that file.');
    }
  }

  return (
    <div>
      <h2>Data</h2>
      <p className="hint">
        Everything lives in your browser's local storage. Export a backup, move it to another browser, or start
        fresh.
      </p>

      <div className="data-actions">
        <button className="btn" onClick={exportData}>
          Export as JSON
        </button>
        <button className="btn" onClick={() => fileInput.current?.click()}>
          Import from JSON
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
        <button className="btn btn-danger" onClick={resetToDefaults}>
          Reset to defaults
        </button>
      </div>

      {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
    </div>
  );
}
