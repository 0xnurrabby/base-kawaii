import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import WalletForm from './components/WalletForm.jsx';
import StatsCards from './components/StatsCards.jsx';
import BehaviorMeters from './components/BehaviorMeters.jsx';
import SeasonsStrip from './components/SeasonsStrip.jsx';
import TimelineChart from './components/TimelineChart.jsx';
import HabitClock from './components/HabitClock.jsx';
import BestiesGrid from './components/BestiesGrid.jsx';
import TokenGarden from './components/TokenGarden.jsx';
import DiaryList from './components/DiaryList.jsx';
import BadgesGrid from './components/BadgesGrid.jsx';
import PersonaCard from './components/PersonaCard.jsx';
import StoryCard from './components/StoryCard.jsx';
import Loader from './components/Loader.jsx';
import ErrorAlert from './components/ErrorAlert.jsx';
import { fetchWalletOverview } from './api/client.js';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (address) => {
    setError(null);
    setLoading(true);
    setWalletData(null);

    const res = await fetchWalletOverview(address);
    setLoading(false);

    if (!res.success) {
      setError(res.error || { message: 'Unknown error' });
      return;
    }

    const { data } = res;
    setWalletData({
      ...data,
      meta: {
        ...data.meta,
        chainId: data.chainId
      }
    });
  };

  return (
    <Layout>
      <WalletForm onSubmit={handleAnalyze} loading={loading} />
      <ErrorAlert error={error} onClear={() => setError(null)} />
      {loading && <Loader />}
      {walletData && !loading && (
        <div className="flex flex-col gap-6">
          <section className="bg-white/80 rounded-3xl shadow-soft p-4 border border-cream-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-blush-300">
                  Wallet Summary
                </div>
                <div className="text-sm text-slate-600 break-all">
                  {walletData.address}
                </div>
              </div>
              <div className="flex gap-2 items-center text-[11px] text-slate-500">
                <span className="px-2 py-1 rounded-full bg-mint-50 text-mint-500 border border-mint-100">
                  Base Chain • ID {walletData.chainId}
                </span>
                <span className="px-2 py-1 rounded-full bg-cream-100 text-slate-600">
                  Tx: {walletData.stats?.totalTransactions ?? 0}
                </span>
              </div>
            </div>
            <StatsCards stats={walletData.stats} />
          </section>

          <BehaviorMeters behavior={walletData.behavior} />
          <SeasonsStrip seasons={walletData.seasons} />
          <TimelineChart timeline={walletData.timeline} />
          <HabitClock habitClock={walletData.habitClock} />
          <BestiesGrid contracts={walletData.topContracts} />
          <TokenGarden tokens={walletData.topTokens} />
          <DiaryList diary={walletData.diary} />
          <BadgesGrid badges={walletData.simpleBadges} />
          <PersonaCard
            persona={walletData.aiPersona}
            address={walletData.address}
            meta={walletData.meta}
            behavior={walletData.behavior}
          />
          <StoryCard story={walletData.aiStory} />
        </div>
      )}
    </Layout>
  );
};

export default App;
