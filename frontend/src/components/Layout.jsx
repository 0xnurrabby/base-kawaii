import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-blush-50 to-peach-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col items-center gap-2">
          <div className="px-4 py-1 rounded-full bg-white/70 shadow-soft text-xs uppercase tracking-[0.2em] text-blush-400">
            Base Kawaii • Mini App
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">
            Base <span className="text-blush-400">Kawaii</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 text-center max-w-xl">
            A pastel intelligence layer for your Base wallet: feelings, habits, seasons,
            friendships, and a story you can fall in love with.
          </p>
        </header>
        {children}
        <footer className="mt-10 text-center text-xs text-slate-500 opacity-70">
          Crafted with pastel vibes on Base💙 By nurrabby.base.eth
        </footer>
      </div>
    </div>
  );
};

export default Layout;
