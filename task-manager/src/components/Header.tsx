import { useApp } from '../context/AppContext';

interface Props {
  view: 'board' | 'settings';
  onViewChange: (view: 'board' | 'settings') => void;
}

export function Header({ view, onViewChange }: Props) {
  const { config } = useApp();

  return (
    <header className="app-header">
      <h1>{config.itemLabel} Board</h1>
      <div className="tabs">
        <button className={`tab-button${view === 'board' ? ' active' : ''}`} onClick={() => onViewChange('board')}>
          Board
        </button>
        <button
          className={`tab-button${view === 'settings' ? ' active' : ''}`}
          onClick={() => onViewChange('settings')}
        >
          Settings
        </button>
      </div>
    </header>
  );
}
