import type { MoodEntry } from '../types';

interface EntryListProps {
  entries: MoodEntry[];
}

// Map mood values to display emojis
const MOOD_EMOJI: Record<MoodEntry['mood'], string> = {
  happy: '😊',
  energized: '⚡',
  neutral: '😐',
  tired: '😴',
  frustrated: '😤',
};

export function EntryList({ entries }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="entry-list-empty">
        <p>No entries yet. Log your first mood above!</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      <h2>Your Mood History</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-header">
            <span className="entry-mood">
              {MOOD_EMOJI[entry.mood]} {entry.mood}
            </span>
            <span className="entry-energy">
              Energy: {'●'.repeat(entry.energy)}
              {'○'.repeat(5 - entry.energy)}
            </span>
          </div>
          <p className="entry-note">{entry.note}</p>
          <time className="entry-date">
            {new Date(entry.createdAt).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </div>
      ))}
    </div>
  );
}
