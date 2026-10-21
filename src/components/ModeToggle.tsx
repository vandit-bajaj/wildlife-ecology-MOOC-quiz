'use client';

import React from 'react';
import { QuizMode } from '@/lib/types';
import { ArrowDownNarrowWide, Shuffle } from 'lucide-react';

interface ModeToggleProps {
  mode: QuizMode;
  onChange: (mode: QuizMode) => void;
  size?: 'sm' | 'md';
}

export function ModeToggle({ mode, onChange, size = 'sm' }: ModeToggleProps) {
  const isSm = size === 'sm';

  return (
    <div
      role="radiogroup"
      aria-label="Quiz mode selection"
      className="inline-flex items-center p-0.5 rounded-lg bg-stone-200/80 dark:bg-stone-900/90 border border-stone-300/60 dark:border-stone-800 text-[11px] font-medium"
      onClick={(e) => e.stopPropagation()} // Prevent card navigation when clicking container
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'order'}
        onClick={(e) => {
          e.stopPropagation();
          onChange('order');
        }}
        className={`flex items-center gap-1.5 ${
          isSm ? 'px-2 py-1' : 'px-3 py-1.5'
        } rounded-[6px] transition-all cursor-pointer ${
          mode === 'order'
            ? 'bg-white dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
        }`}
      >
        <ArrowDownNarrowWide className="w-3 h-3" />
        <span>In order</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'shuffle'}
        onClick={(e) => {
          e.stopPropagation();
          onChange('shuffle');
        }}
        className={`flex items-center gap-1.5 ${
          isSm ? 'px-2 py-1' : 'px-3 py-1.5'
        } rounded-[6px] transition-all cursor-pointer ${
          mode === 'shuffle'
            ? 'bg-white dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs'
            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
        }`}
      >
        <Shuffle className="w-3 h-3" />
        <span>Shuffled</span>
      </button>
    </div>
  );
}
