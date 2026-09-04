import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { useThemeEffect } from './useThemeEffect';

function Shell() {
  const { config } = useApp();
  const [view, setView] = useState<'board' | 'settings'>('board');
  useThemeEffect(config.theme);

  return (
    <>
      <Header view={view} onViewChange={setView} />
      <main className="content">{view === 'board' ? <Board /> : <SettingsPanel />}</main>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

export default App;
