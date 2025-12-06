import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const HabitClock = ({ habitClock }) => {
  if (!habitClock || habitClock.length === 0) return null;

  const data = habitClock.map((h) => ({
    hourLabel: `${String(h.hour).padStart(2, '0')}h`,
    count: h.count
  }));

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Habit Clock</span>
        <span className="text-[11px] text-slate-500">
          When this wallet is most awake (UTC)
        </span>
      </h2>
      <div className="bg-white/90 rounded-3xl p-4 border border-cream-100 shadow-soft h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="hourLabel" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip
              contentStyle={{
                borderRadius: '9999px',
                border: '1px solid #ffbfd2',
                backgroundColor: '#fff5f8',
                fontSize: 12
              }}
            />
            <Bar dataKey="count" fill="#ff99bb" radius={[999, 999, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default HabitClock;
