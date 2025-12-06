import { monthKey } from './time.js';

// Build "seasons" from monthly transaction counts
export const buildSeasons = (timeline) => {
  if (!timeline || timeline.length === 0) return [];

  // simple heuristic: sort by month, cluster adjacent months with non-zero tx
  const months = timeline
    .filter((m) => m.count > 0)
    .sort((a, b) => (a.month < b.month ? -1 : 1));

  if (months.length === 0) return [];

  const clusters = [];
  let current = { start: months[0].month, end: months[0].month, total: months[0].count };

  for (let i = 1; i < months.length; i++) {
    const prev = months[i - 1];
    const cur = months[i];

    const [py, pm] = prev.month.split('-').map((x) => Number(x));
    const [cy, cm] = cur.month.split('-').map((x) => Number(x));

    const diff = (cy - py) * 12 + (cm - pm);

    if (diff <= 1) {
      current.end = cur.month;
      current.total += cur.count;
    } else {
      clusters.push(current);
      current = { start: cur.month, end: cur.month, total: cur.count };
    }
  }
  clusters.push(current);

  // map clusters to pastel seasons
  return clusters.map((c, idx) => {
    let label = 'Cozy Season';
    let emoji = '✨';

    if (c.total < 10) {
      label = 'Quiet Nest';
      emoji = '🌙';
    } else if (c.total < 40) {
      label = 'Gentle Bloom';
      emoji = '🌸';
    } else if (c.total < 120) {
      label = 'Adventure Arc';
      emoji = '🌈';
    } else {
      label = 'Starburst Surge';
      emoji = '⭐';
    }

    return {
      id: `season-${idx}`,
      label,
      emoji,
      startMonth: c.start,
      endMonth: c.end,
      txCount: c.total
    };
  });
};
