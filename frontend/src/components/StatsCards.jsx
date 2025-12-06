import React from 'react';

const StatCard = ({ label, value, hint }) => {
  return (
    <div className="bg-white/80 rounded-3xl p-4 shadow-soft flex flex-col gap-1 border border-blush-50">
      <div className="text-[11px] uppercase tracking-[0.14em] text-blush-300">
        {label}
      </div>
      <div className="text-xl font-semibold text-slate-800">{value}</div>
      {hint && <div className="text-[11px] text-slate-500">{hint}</div>}
    </div>
  );
};

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
      <StatCard
        label="Total Transactions"
        value={stats.totalTransactions ?? 0}
        hint="All Base movements we can see"
      />
      <StatCard
        label="Contract Calls"
        value={stats.smartContractCalls ?? 0}
        hint="Interactions with smart contracts"
      />
      <StatCard
        label="Unique Contracts"
        value={stats.uniqueContracts ?? 0}
        hint="Different contract friends"
      />
      <StatCard
        label="Token Transfers"
        value={stats.tokenTransferCount ?? 0}
        hint="Tokens tossed around"
      />
      <StatCard
        label="Total Gas Used"
        value={stats.totalGasUsed ?? 0}
        hint="Raw gas units"
      />
      <StatCard
        label="Gas Spent (approx)"
        value={`${(stats.totalGasFeeNative ?? 0).toFixed(5)} ETH`}
        hint="Rough total gas on Base"
      />
    </div>
  );
};

export default StatsCards;
