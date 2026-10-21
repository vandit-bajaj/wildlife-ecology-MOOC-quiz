'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QuizMode, BestScoreRecord, QuizProgressState } from '@/lib/types';
import { ModeToggle } from './ModeToggle';
import { Sparkles, Trophy, ArrowRight, BookOpen, Compass } from 'lucide-react';

interface FullQuizCardProps {
  bestScore?: BestScoreRecord | null;
  inProgress?: QuizProgressState | null;
}

export function FullQuizCard({ bestScore, inProgress }: FullQuizCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<QuizMode>('order');

  const targetUrl = `/quiz/all?mode=${mode}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-300/60 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/70 via-white to-stone-50/60 dark:from-[#112419] dark:via-[#0e1c14] dark:to-[#08110b] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Decorative nature gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white dark:bg-emerald-500 dark:text-stone-950 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Mock
            </span>

            {bestScore ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                <Trophy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Best Score: {bestScore.score}/{bestScore.total} ({bestScore.percentage}%)
              </span>
            ) : inProgress && !inProgress.isFinished ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800">
                In Progress: Question {inProgress.currentIndex + 1} of 120
              </span>
            ) : null}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              Full Quiz — All 120 Questions
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
              Every assignment combined into one comprehensive exam simulation (Assignments 1 through 12).
              At the end, receive an assignment-by-assignment mastery breakdown and review incorrect answers.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-500 dark:text-stone-400 pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              12 Assignments
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              120 Total Questions
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3.5 pt-2 md:pt-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Mode:</span>
            <ModeToggle mode={mode} onChange={setMode} size="md" />
          </div>

          <Link
            href={targetUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-stone-950 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Start Full Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
