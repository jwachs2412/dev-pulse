import type { MoodEntry, CreateEntryRequest } from '../types';

// The backend URL - reads from environment variable in production
const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all mood entries from the backend.
 *
 * What happens:
 * 1. Sends GET request to /api/entries
 * 2. Backend queries its data store
 * 3. Backend sends back JSON array of entries
 * 4. We parse the JSON and return it as typed data
 */
export async function getEntries(): Promise<MoodEntry[]> {
  const response = await fetch(`${API_URL}/entries`);

  if (!response.ok) {
    throw new Error(`Failed to fetch entries: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new mood entry.
 *
 * What happens:
 * 1. Sends POST request to /api/entries with the entry data
 * 2. Backend validates the data
 * 3. Backend creates the entry and assigns an ID
 * 4. Backend sends back the created entry
 * 5. We return the created entry
 */
export async function createEntry(
  data: CreateEntryRequest
): Promise<MoodEntry> {
  const response = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create entry');
  }

  return response.json();
}
