import React from 'react';

const PersonaCard = ({ persona, address, meta, behavior }) => {
  if (!persona) return null;

  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Persona</span>
        <span className="text-[11px] text-slate-500">
          A pastel character based on this wallet
        </span>
      </h2>
      <div className="bg-white/90 rounded-3xl border border-mint-100 shadow-soft p-4 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-mint-400 mb-1">
              {persona.archetype || 'Wallet Persona'}
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              {persona.title || 'Pastel Wallet Soul'}
            </h3>
            <p className="text-xs text-slate-500 break-all mt-1">
              {address}
            </p>
          </div>
          <div className="flex flex-col items-end text-[11px] text-slate-500 gap-1">
            <span className="inline-flex px-2 py-1 rounded-full bg-mint-50 text-mint-500">
              {meta?.usedOpenAI ? 'AI Generated' : 'Fallback Story Mode'}
            </span>
            <span className="text-[10px]">
              Chain ID: <span className="font-mono">{meta?.chainId}</span>
            </span>
            {behavior && (
              <span className="text-[10px]">
                Mood:{' '}
                <span className="font-semibold text-blush-400">
                  {behavior.moodLabel}
                </span>{' '}
                • Spirit Animal:{' '}
                <span className="font-semibold text-peach-400">
                  {behavior.spiritAnimal}
                </span>
              </span>
            )}
          </div>
        </div>
        {persona.summary && (
          <p className="text-sm text-slate-700">{persona.summary}</p>
        )}
        {persona.traits && persona.traits.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-1">
            {persona.traits.map((t, i) => (
              <li
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-full bg-cream-100 text-slate-700"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PersonaCard;
