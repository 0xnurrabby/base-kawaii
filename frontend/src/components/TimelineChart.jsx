import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const TimelineChart = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="mt-6 bg-white/80 rounded-3xl p-4 border border-cream-100 text-xs text-slate-500">
        Not enough activity yet to draw a cozy timeline.
      </div>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Activity Timeline</span>
        <span className="text-[11px] text-slate-500">
          Transactions per month on Base
        </span>
      </h2>
      <div className="bg-white/90 rounded-3xl p-4 border border-cream-100 shadow-soft h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeline}>
            <defs>
              <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff99bb" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#ffefd5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffe6f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                borderRadius: '9999px',
                border: '1px solid #ffbfd2',
                backgroundColor: '#fff5f8',
                fontSize: 12
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#ff76a5"
              fillOpacity={1}
              fill="url(#colorTx)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TimelineChart;
