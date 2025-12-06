import React from 'react';

const formatStory = (story) => {
  if (!story) return '';
  // simple formatting: convert **bold** and line breaks
  return story;
};

const StoryCard = ({ story }) => {
  if (!story) return null;

  return (
    <section className="mt-6 mb-10">
      <h2 className="text-sm font-semibold mb-2 text-slate-800 flex items-center gap-2">
        <span>Please Read U'r Wallet Story🥹</span>
        <span className="text-[11px] text-slate-500">
          Cozy narrative about this wallet&apos;s adventures
        </span>
      </h2>
      <div className="bg-gradient-to-br from-blush-50 via-cream-50 to-mint-50 rounded-3xl border border-blush-100 shadow-soft p-4 max-h-[480px] overflow-y-auto">
        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
          {formatStory(story)}
        </p>
      </div>
    </section>
  );
};

export default StoryCard;
