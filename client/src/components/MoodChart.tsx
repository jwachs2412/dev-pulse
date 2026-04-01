import type { MoodEntry } from '../types';

interface MoodChartProps {
  entries: MoodEntry[];
}

const MOOD_COLORS: Record<MoodEntry['mood'], string> = {
  happy: '#4ade80',
  energized: '#facc15',
  neutral: '#94a3b8',
  tired: '#818cf8',
  frustrated: '#f87171',
};

export function MoodChart({ entries }: MoodChartProps) {
  if (entries.length === 0) return null;

  // Count occurrences of each mood
  const moodCounts = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const maxCount = Math.max(...Object.values(moodCounts));

  return (
    <div className="mood-chart">
      <h2>Mood Overview</h2>
      <div className="chart-bars">
        {Object.entries(moodCounts).map(([mood, count]) => (
          <div key={mood} className="chart-bar-container">
            <div
              className="chart-bar"
              style={{
                height: `${(count / maxCount) * 100}%`,
                backgroundColor: MOOD_COLORS[mood as MoodEntry['mood']],
              }}
            >
              <span className="chart-count">{count}</span>
            </div>
            <span className="chart-label">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
