import React from 'react';

const TokenPill = ({ token }) => {
  const sizeClass =
    token.transfers > 200
      ? 'text-xs px-3 py-2'
      : token.transfers > 50
      ? 'text-[11px] px-2.5 py-1.5'
      : 'text-[11px] px-2 py-1';

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blush-50 to-mint-50 border border-blush-100 shadow-soft ${sizeClass}`}
    >
      <span>🌸</span>
      <span className="font-medium text-slate-700">{token.symbol}</span>
      <span className="text-[10px] text-slate-500">
        {token.transfers} blooms
      </span>
    </div>
  );
};

const TokenGarden = ({ tokens }) => {
  if (!tokens || tokens.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Token Garden</span>
        <span className="text-[11px] text-slate-500">
          Flowers grown from all the tokens this wallet touches
        </span>
      </h2>
      <div className="bg-white/80 rounded-3xl p-4 border border-cream-100 shadow-soft flex flex-wrap gap-2">
        {tokens.map((t) => (
          <TokenPill key={`${t.contractAddress}-${t.symbol}`} token={t} />
        ))}
      </div>
    </section>
  );
};

export default TokenGarden;
