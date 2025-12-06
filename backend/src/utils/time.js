export const toDate = (timestampSeconds) => {
  const n = Number(timestampSeconds);
  if (!n || Number.isNaN(n)) return null;
  return new Date(n * 1000);
};

export const monthKey = (date) => {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};
