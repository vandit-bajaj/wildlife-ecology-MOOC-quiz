'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionButtonProps {
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isSelected: boolean;
  isCorrectOption: boolean;
  isLocked: boolean; // Once an option is chosen, all options are locked
  onClick: () => void;
  index: number;
}

export function OptionButton({
  label,
  text,
  isSelected,
  isCorrectOption,
  isLocked,
  onClick,
  index,
}: OptionButtonProps) {
  // Determine state styles
  let stateClasses =
    'bg-white dark:bg-[#111a14] border-stone-200/90 dark:border-emerald-950/80 text-stone-800 dark:text-stone-200 hover:border-emerald-500/70 dark:hover:border-emerald-600/70 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 active:scale-[0.99]';
  let badgeClasses =
    'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700';
  let icon = null;

  if (isLocked) {
    if (isSelected && isCorrectOption) {
      // User selected correctly
      stateClasses =
        'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
      badgeClasses =
        'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-stone-950 border-emerald-600';
      icon = <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    } else if (isSelected && !isCorrectOption) {
      // User selected wrong
      stateClasses =
        'bg-rose-50 dark:bg-rose-950/50 border-rose-500 dark:border-rose-400 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30';
      badgeClasses =
        'bg-rose-600 dark:bg-rose-500 text-white dark:text-stone-950 border-rose-600';
      icon = <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
    } else if (!isSelected && isCorrectOption) {
      // Reveal correct answer when user was wrong or skipped
      stateClasses =
        'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500/80 dark:border-emerald-400/80 text-emerald-900 dark:text-emerald-200 border-dashed';
      badgeClasses =
        'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border-emerald-400';
      icon = <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    } else {
      // Other unselected options
      stateClasses =
        'bg-stone-50/50 dark:bg-[#0c1410]/50 border-stone-200/60 dark:border-emerald-950/40 text-stone-400 dark:text-stone-500 opacity-60';
      badgeClasses =
        'bg-stone-100 dark:bg-stone-800/60 text-stone-400 dark:text-stone-600 border-transparent';
    }
  }

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={onClick}
      className={`group relative w-full flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer disabled:cursor-default ${stateClasses}`}
      aria-label={`Option ${label}: ${text}`}
    >
      {/* Option Label Badge (A, B, C, D) */}
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold border transition-colors shrink-0 mt-0.5 ${badgeClasses}`}
      >
        {label}
      </span>

      {/* Option text */}
      <span className="flex-1 text-sm sm:text-base leading-snug font-medium pt-0.5">
        {text}
      </span>

      {/* Status icon if locked */}
      {icon}
    </button>
  );
}
