import { Router } from 'express';
import { MoodEntry, CreateEntryRequest } from '../types';

const router = Router();

// ─── IN-MEMORY DATA STORE ────────────────────────────────────
// This array acts as our "database" for now.
// WARNING: Data is lost when the server restarts.
// In Level 2, we replace this with a real database.
let entries: MoodEntry[] = [];
let nextId = 1;

// ─── GET /api/entries ────────────────────────────────────────
// Returns all mood entries, newest first.
//
// Request: GET /api/entries
// Response: 200 OK, [{ id, mood, energy, note, createdAt }, ...]
router.get('/', (_req, res) => {
  // Return entries sorted newest first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json(sorted);
});

// ─── POST /api/entries ───────────────────────────────────────
// Creates a new mood entry.
//
// Request: POST /api/entries
//          Body: { mood: "happy", energy: 4, note: "Great day" }
// Response: 201 Created, { id, mood, energy, note, createdAt }
router.post('/', (req, res) => {
  const { mood, energy, note } = req.body as CreateEntryRequest;

  // ─── VALIDATION ──────────────────────────────────────────
  // Never trust data from the client. Always validate.
  // The browser is untrusted territory.

  const validMoods = ['happy', 'neutral', 'frustrated', 'tired', 'energized'];

  if (!mood || !validMoods.includes(mood)) {
    res.status(400).json({
      error:
        'Invalid mood. Must be one of the following: ' + validMoods.join(', '),
    });
    return;
  }

  if (!energy || energy < 1 || energy > 5 || !Number.isInteger(energy)) {
    res.status(400).json({
      error: 'Energy must be an integer between 1 and 5',
    });
    return;
  }

  if (!note || typeof note !== 'string' || note.trim().length === 0) {
    res.status(400).json({
      error: 'Note is required and must be a non-empty string',
    });
    return;
  }

  if (note.length > 500) {
    res.status(400).json({
      error: 'Note must be 500 characters or fewer',
    });
    return;
  }

  // ─── CREATE ENTRY ────────────────────────────────────────
  const newEntry: MoodEntry = {
    id: nextId++,
    mood,
    energy,
    note: note.trim(),
    createdAt: new Date().toISOString(),
  };

  entries.push(newEntry);

  // 201 = "Created" = the standard status code when a new resource is made
  res.status(201).json(newEntry);
});

export { router as entriesRouter };
