import React from 'react';

const BadgeCard = ({ badge }) => {
  return (
    <div className="bg-gradient-to-br from-cream-50 via-white to-mint-50 rounded-3xl p-4 border border-blush-50 shadow-soft">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blush-100 text-xs">
          💙
        </span>
        <h3 className="text-sm font-semibold text-slate-800">{badge.name}</h3>
      </div>
      <p className="text-xs text-slate-600">{badge.description}</p>
      {badge.tone && (
        <div className="mt-2 inline-flex text-[10px] px-2 py-1 rounded-full bg-blush-50 text-blush-400 uppercase tracking-[0.18em]">
          {badge.tone}
        </div>
      )}
    </div>
  );
};

const BadgesGrid = ({ badges }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Wallet Badges</span>
        <span className="text-[11px] text-slate-500">
          Little titles based on on-chain vibes
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {badges.map((b) => (
          <BadgeCard key={b.id || b.name} badge={b} />
        ))}
      </div>
    </section>
  );
};

export default BadgesGrid;
