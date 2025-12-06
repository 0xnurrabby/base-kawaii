import React from 'react';

const ErrorAlert = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-4 rounded-2xl bg-blush-50 border border-blush-200 text-xs text-blush-700 px-3 py-2 flex items-start gap-2">
      <span>⚠️</span>
      <div className="flex-1">
        <div className="font-semibold mb-0.5">Something felt a little off</div>
        <div>{error.message}</div>
        {error.code && (
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-blush-400">
            CODE: {error.code}
          </div>
        )}
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="text-[10px] ml-2 text-blush-500 hover:text-blush-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
