import React from 'react';

const SeasonsStrip = ({ seasons }) => {
  if (!seasons || seasons.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Wallet Seasons</span>
        <span className="text-[11px] text-slate-500">
          Phases of activity on the Base meadow
        </span>
      </h2>
      <div className="flex flex-wrap gap-3">
        {seasons.map((s) => (
          <div
            key={s.id}
            className="flex-1 min-w-[160px] bg-white/80 rounded-3xl p-3 border border-cream-100 shadow-soft flex items-start gap-2"
          >
            <div className="text-xl">{s.emoji}</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-800">{s.label}</div>
              <div className="text-[11px] text-slate-500">
                {s.startMonth} → {s.endMonth}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {s.txCount} transactions in this little chapter
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonsStrip;
