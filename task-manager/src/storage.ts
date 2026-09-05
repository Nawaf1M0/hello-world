import type { AppData } from './types';
import { buildDefaultData } from './defaultConfig';

const STORAGE_KEY = 'task-manager-data-v1';

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildDefaultData();
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed || typeof parsed !== 'object' || !parsed.config || !Array.isArray(parsed.tasks)) {
      return buildDefaultData();
    }
    return parsed;
  } catch {
    return buildDefaultData();
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be unavailable (private browsing, quota exceeded, etc.)
    // Silently no-op rather than crash the app.
  }
}

export function exportDataToFile(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `task-manager-export-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseImportedData(text: string): AppData {
  const parsed = JSON.parse(text) as AppData;
  if (!parsed || typeof parsed !== 'object' || !parsed.config || !Array.isArray(parsed.tasks)) {
    throw new Error('This file does not look like a valid task manager export.');
  }
  return parsed;
}
