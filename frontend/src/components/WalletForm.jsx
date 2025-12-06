import React, { useState } from 'react';

const WalletForm = ({ onSubmit, loading }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) return;
    onSubmit(address.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mb-6 bg-white/80 rounded-3xl shadow-soft p-4 md:p-5 flex flex-col gap-4"
    >
      <label className="text-sm font-medium text-slate-700">
        Wallet Address (0x...)
      </label>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="0x pastel wallet..."
          className="flex-1 rounded-2xl border border-blush-100 bg-cream-50/80 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blush-200 focus:border-blush-200"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blush-300 to-peach-300 text-white shadow-soft hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Reading your universe...' : 'Make it Kawaii 💙'}
        </button>
      </div>
      <p className="text-[11px] text-slate-500">
        Only public on-chain data is used ^⁠_⁠^
      </p>
    </form>
  );
};

export default WalletForm;
