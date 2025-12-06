import React from 'react';

const DiaryList = ({ diary }) => {
  if (!diary || diary.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>On-chain Diary</span>
        <span className="text-[11px] text-slate-500">
          Monthly little notes about this wallet&apos;s mood
        </span>
      </h2>
      <div className="bg-white/80 rounded-3xl p-4 border border-cream-100 shadow-soft max-h-60 overflow-y-auto">
        <ul className="space-y-2">
          {diary.map((entry) => (
            <li key={entry.month} className="text-xs text-slate-700">
              <span className="font-mono text-[11px] bg-cream-100 px-2 py-0.5 rounded-full mr-2">
                {entry.month}
              </span>
              <span className="font-semibold mr-2">
                {entry.txCount} tx
              </span>
              <span className="text-slate-500">{entry.mood}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiaryList;
