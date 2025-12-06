import React from 'react';

const formatDate = (iso) => {
  if (!iso) return 'Unknown';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Unknown';
  return d.toISOString().slice(0, 10);
};

const BestiesGrid = ({ contracts }) => {
  if (!contracts || contracts.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Contract Besties</span>
        <span className="text-[11px] text-slate-500">
          Places this wallet keeps visiting on Base
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {contracts.map((c) => (
          <div
            key={c.address}
            className="bg-white/80 rounded-3xl p-3 border border-cream-100 shadow-soft flex flex-col gap-1"
          >
            <div className="text-xs font-semibold text-slate-800 break-all">
              {c.label || c.address}
            </div>
            <div className="text-[11px] text-slate-500 break-all">
              {c.address}
            </div>
            <div className="text-[11px] text-slate-500">
              Visits:{' '}
              <span className="font-semibold text-slate-700">
                {c.callCount}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              First: {formatDate(c.firstSeen)} • Last: {formatDate(c.lastSeen)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestiesGrid;
