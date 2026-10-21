'use client';

import React from 'react';
import Link from 'next/link';
import { QuizMode } from '@/lib/types';
import { ArrowLeft, Shuffle, ArrowDownNarrowWide, Check, X } from 'lucide-react';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  answeredCount: number;
  mode: QuizMode;
  quizTitle: string;
}

export function ProgressBar({
  currentIndex,
  totalQuestions,
  correctCount,
  wrongCount,
  answeredCount,
  mode,
  quizTitle,
}: ProgressBarProps) {
  const percentComplete =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="w-full bg-white/90 dark:bg-[#0e1611]/90 border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 backdrop-blur-xs">
      {/* Top Header: Navigation back, Title, Mode, and Live Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 leading-none">
              {quizTitle}
            </span>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1">
              {mode === 'shuffle' ? (
                <>
                  <Shuffle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Fisher–Yates Shuffled</span>
                </>
              ) : (
                <>
                  <ArrowDownNarrowWide className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>In Original Order</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Live score pill */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-stone-500 dark:text-stone-400 font-mono">
            {answeredCount} of {totalQuestions} answered
          </span>
          <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-emerald-950/60 border border-stone-200 dark:border-emerald-900/60 px-2.5 py-1 rounded-lg">
            <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>{correctCount}</span>
            </span>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <span className="flex items-center gap-0.5 text-rose-600 dark:text-rose-400">
              <X className="w-3.5 h-3.5" />
              <span>{wrongCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-stone-100 dark:bg-stone-800/80 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </div>
  );
}
