import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-full shadow-soft border border-blush-100">
        <div className="h-3 w-3 rounded-full bg-blush-300 animate-bounce" />
        <div className="h-3 w-3 rounded-full bg-peach-300 animate-bounce [animation-delay:0.1s]" />
        <div className="h-3 w-3 rounded-full bg-mint-200 animate-bounce [animation-delay:0.2s]" />
        <span className="text-xs text-slate-600 pl-1">Sprinkling pastel analytics...</span>
      </div>
    </div>
  );
};

export default Loader;
