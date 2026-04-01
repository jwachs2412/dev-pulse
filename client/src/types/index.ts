export interface MoodEntry {
  id: number;
  mood: 'happy' | 'neutral' | 'frustrated' | 'tired' | 'energized';
  energy: number;
  note: string;
  createdAt: string;
}

export interface CreateEntryRequest {
  mood: MoodEntry['mood'];
  energy: number;
  note: string;
}
