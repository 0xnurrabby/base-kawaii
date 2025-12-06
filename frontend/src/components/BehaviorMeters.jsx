import React from 'react';

const Meter = ({ label, value, subtitle }) => {
  const pct = Math.round((value || 0) * 100);
  return (
    <div className="bg-white/80 rounded-3xl p-4 shadow-soft border border-cream-100 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-blush-300">
            {label}
          </div>
          {subtitle && (
            <div className="text-[11px] text-slate-500 mt-1">{subtitle}</div>
          )}
        </div>
        <div className="text-lg font-semibold text-slate-800">{pct}%</div>
      </div>
      <div className="w-full h-2 rounded-full bg-cream-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blush-300 to-peach-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const BehaviorMeters = ({ behavior }) => {
  if (!behavior) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Behavioral Vibes</span>
        <span className="text-[11px] text-slate-500">
          How this wallet moves through its pastel universe
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Meter
          label="Curiosity Index"
          value={behavior.curiosityIndex}
          subtitle="How often it explores new contracts"
        />
        <Meter
          label="Comfort Zone Index"
          value={behavior.comfortZoneIndex}
          subtitle="How much it loves familiar places"
        />
        <Meter
          label="Adventurer Score"
          value={behavior.adventurerScore}
          subtitle="How boldly it hops into new adventures"
        />
      </div>
    </section>
  );
};

export default BehaviorMeters;
