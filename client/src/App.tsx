import { useState, useEffect } from 'react';
import type { MoodEntry, CreateEntryRequest } from './types';
import { getEntries, createEntry } from './services/api';
import { EntryForm } from './components/EntryForm';
import { EntryList } from './components/EntryList';
import { MoodChart } from './components/MoodChart';
import './App.css';

function App() {
  // ─── STATE ─────────────────────────────────────────────────
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ─── LOAD ENTRIES ON MOUNT ─────────────────────────────────
  // useEffect with [] runs once when the component first appears.
  // This is where we load initial data from the backend.
  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      setIsLoading(true);
      const data = await getEntries();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries. Is the backend running?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // ─── HANDLE NEW ENTRY ──────────────────────────────────────
  async function handleCreateEntry(data: CreateEntryRequest) {
    const newEntry = await createEntry(data);
    // Add the new entry to the beginning of the list (newest first)
    setEntries((prev) => [newEntry, ...prev]);
  }

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="app-header">
        <h1>Dev Pulse</h1>
        <p>Track your developer mood</p>
      </header>

      <main className="app-main">
        <EntryForm onSubmit={handleCreateEntry} />

        {isLoading && <p className="loading">Loading entries...</p>}
        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && (
          <>
            <MoodChart entries={entries} />
            <EntryList entries={entries} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
