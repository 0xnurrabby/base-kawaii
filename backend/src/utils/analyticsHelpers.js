import { toDate, monthKey } from './time.js';

export const buildTimeline = (transactions = []) => {
  const bucket = {};
  for (const tx of transactions) {
    const d = toDate(tx.timeStamp);
    const key = monthKey(d);
    if (!key) continue;
    bucket[key] = (bucket[key] || 0) + 1;
  }

  return Object.entries(bucket)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, count]) => ({ month, count }));
};

export const buildHabitClock = (transactions = []) => {
  const arr = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
  for (const tx of transactions) {
    const d = toDate(tx.timeStamp);
    if (!d) continue;
    const hour = d.getUTCHours();
    arr[hour].count += 1;
  }
  return arr;
};

export const firstAndLastTx = (transactions = []) => {
  if (!transactions.length) return { first: null, last: null };
  const sorted = [...transactions].sort(
    (a, b) => Number(a.timeStamp || 0) - Number(b.timeStamp || 0)
  );
  return {
    first: toDate(sorted[0].timeStamp),
    last: toDate(sorted[sorted.length - 1].timeStamp)
  };
};

export const topContracts = (transactions = [], limit = 10) => {
  const map = new Map();

  for (const tx of transactions) {
    const to = tx.to?.toLowerCase?.();
    if (!to) continue;
    if (!map.has(to)) {
      map.set(to, {
        address: to,
        callCount: 0,
        firstSeen: toDate(tx.timeStamp),
        lastSeen: toDate(tx.timeStamp)
      });
    }
    const item = map.get(to);
    item.callCount += 1;
    const d = toDate(tx.timeStamp);
    if (d && item.firstSeen && d < item.firstSeen) item.firstSeen = d;
    if (d && item.lastSeen && d > item.lastSeen) item.lastSeen = d;
  }

  return Array.from(map.values())
    .sort((a, b) => b.callCount - a.callCount)
    .slice(0, limit);
};

export const topTokens = (tokenTransfers = [], limit = 10) => {
  const map = new Map();
  for (const t of tokenTransfers) {
    const key = `${t.contractAddress?.toLowerCase?.() || ''}-${t.tokenSymbol || ''}`;
    if (!map.has(key)) {
      map.set(key, {
        symbol: t.tokenSymbol || 'UNKNOWN',
        contractAddress: t.contractAddress || null,
        transfers: 0
      });
    }
    const item = map.get(key);
    item.transfers += 1;
  }
  return Array.from(map.values())
    .sort((a, b) => b.transfers - a.transfers)
    .slice(0, limit);
};

export const buildDiary = (timeline, stats) => {
  if (!timeline || timeline.length === 0) return [];

  const entries = [];
  const totalMonths = timeline.length;

  for (const item of timeline) {
    const mood =
      item.count === 0
        ? 'Resting quietly, holding space.'
        : item.count < 5
        ? 'A gentle sprinkle of activity.'
        : item.count < 20
        ? 'A playful flurry of cozy transactions.'
        : 'A sparkling burst of adventures.';

    entries.push({
      month: item.month,
      txCount: item.count,
      mood
    });
  }

  return entries;
};

export const computeBehaviorScores = (transactions = [], tokenTransfers = []) => {
  const totalTx = transactions.length;
  const tokenTx = tokenTransfers.length;

  // contract diversity
  const contractCounts = new Map();
  for (const tx of transactions) {
    const to = tx.to?.toLowerCase?.();
    if (!to) continue;
    contractCounts.set(to, (contractCounts.get(to) || 0) + 1);
  }

  const uniqueContracts = contractCounts.size;
  const calls = Array.from(contractCounts.values()).sort((a, b) => b - a);
  const topTotal = calls.slice(0, 3).reduce((sum, v) => sum + v, 0);
  const loyalty = totalTx ? topTotal / totalTx : 0;

  const comfortZoneIndex = loyalty; // reuse
  const adventurerScore = uniqueContracts ? Math.min(1, uniqueContracts / 30) : 0;

  // volatility = tx per month variance
  const monthsMap = {};
  for (const tx of transactions) {
    const key = monthKey(toDate(tx.timeStamp));
    if (!key) continue;
    monthsMap[key] = (monthsMap[key] || 0) + 1;
  }
  const monthCounts = Object.values(monthsMap);
  let stabilityChaosScore = 0.5;
  if (monthCounts.length > 1) {
    const avg = monthCounts.reduce((a, b) => a + b, 0) / monthCounts.length;
    const variance =
      monthCounts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / monthCounts.length;
    const norm = Math.min(1, variance / (avg + 1));
    stabilityChaosScore = norm; // closer to 0 = stable, >0.7 = chaotic
  }

  // overall curiosity based on new contracts discovery
  const curiosityIndex = Math.min(1, uniqueContracts / (totalTx || 1));

  // mood label
  let moodLabel = 'Cozy';
  if (totalTx === 0 && tokenTx === 0) moodLabel = 'Sleepy';
  else if (adventurerScore > 0.6 && curiosityIndex > 0.5) moodLabel = 'Adventurous';
  else if (comfortZoneIndex > 0.7) moodLabel = 'Loyal';
  else if (stabilityChaosScore > 0.7) moodLabel = 'Chaotic Sparkles';
  else if (tokenTx > totalTx * 2) moodLabel = 'Gift Giver';

  // simple spirit animal heuristic
  let spiritAnimal = 'Bunny';
  if (adventurerScore > 0.7) spiritAnimal = 'Fox';
  else if (comfortZoneIndex > 0.75) spiritAnimal = 'Panda';
  else if (stabilityChaosScore > 0.7) spiritAnimal = 'Hummingbird';
  else if (tokenTx > 200) spiritAnimal = 'Songbird';

  return {
    curiosityIndex,
    loyaltyScore: loyalty,
    stabilityChaosScore,
    comfortZoneIndex,
    adventurerScore,
    moodLabel,
    spiritAnimal
  };
};
