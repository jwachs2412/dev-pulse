import { useState } from 'react';
import type { CreateEntryRequest, MoodEntry } from '../types';

// The five mood options with display labels and emoji
const MOOD_OPTIONS: { value: MoodEntry['mood']; label: string }[] = [
  { value: 'happy', label: 'Happy 😊' },
  { value: 'energized', label: 'Energized ⚡' },
  { value: 'neutral', label: 'Neutral 😐' },
  { value: 'tired', label: 'Tired 😴' },
  { value: 'frustrated', label: 'Frustrated 😤' },
];

interface EntryFormProps {
  onSubmit: (data: CreateEntryRequest) => Promise<void>;
}

export function EntryForm({ onSubmit }: EntryFormProps) {
  // ─── STATE ─────────────────────────────────────────────────
  // Each piece of form data gets its own state variable
  // When the user types or selects something, the state updates,
  // and React re-renders the component to reflect the change.
  const [mood, setMood] = useState<MoodEntry['mood']>('neutral');
  const [energy, setEnergy] = useState(3);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ─── FORM SUBMISSION ───────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the browser's default form behavior (page reload)
    e.preventDefault();

    // Client-side validation (for quick user feedback)
    if (note.trim().length === 0) {
      setError('Please write a note about your day');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit({ mood, energy, note: note.trim() });
      // Reset form on success
      setMood('neutral');
      setEnergy(3);
      setNote('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <h2>How are you feeling?</h2>

      {/* Mood Selection */}
      <div className="mood-selector">
        {MOOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`mood-button ${mood === option.value ? 'active' : ''}`}
            onClick={() => setMood(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Energy Level */}
      <div className="energy-selector">
        <label htmlFor="energy">
          Energy Level: <strong>{energy}</strong>/5
        </label>
        <input
          id="energy"
          type="range"
          min={1}
          max={5}
          step={1}
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
        />
      </div>

      {/* Note */}
      <div className="note-input">
        <label htmlFor="note">What happened today?</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Solved a tricky bug, learned about TypeScript generics..."
          rows={3}
          maxLength={500}
        />
        <span className="char-count">{note.length}/500</span>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit Button */}
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Log Entry'}
      </button>
    </form>
  );
}
