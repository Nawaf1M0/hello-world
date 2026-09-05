import { useEffect } from 'react';
import type { ThemeConfig } from './types';

/** Applies theme config (mode/accent/density) to the document root as CSS vars/attributes. */
export function useThemeEffect(theme: ThemeConfig) {
  useEffect(() => {
    const root = document.documentElement;

    function resolveMode(): 'light' | 'dark' {
      if (theme.mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme.mode;
    }

    function apply() {
      root.dataset.theme = resolveMode();
    }

    apply();

    if (theme.mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme.mode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', theme.accent);
  }, [theme.accent]);

  useEffect(() => {
    document.documentElement.dataset.density = theme.density;
  }, [theme.density]);
}
