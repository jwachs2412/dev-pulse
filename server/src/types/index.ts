/**
 * Represents a single mood entry submitted by a developer.
 *
 *  Think of this as a row in a spreadsheet:
 *  | id | mood    | energy | note               | createdAt           |
 *  |----|---------|--------|--------------------|---------------------|
 *  | 1  | "happy" | 4      | "Great coding day" | 2026-03-01T14:00:00 |
 */

export interface MoodEntry {
  id: number;
  mood: 'happy' | 'neutral' | 'frustrated' | 'tired' | 'energized';
  energy: number; // 1-5 scale
  note: string;
  createdAt: string; // ISO 8601 date string
}

/**
 * The shape of data the client sends when creating a new entry.
 * Notice: no `id` or `createdAt` - the SERVER assigns those.
 *
 * Why? The client doesn't get to choose its own ID (that would be a security and consistency problem). The server is the authority.
 */

export interface CreateEntryRequest {
  mood: MoodEntry['mood'];
  energy: number;
  note: string;
}
