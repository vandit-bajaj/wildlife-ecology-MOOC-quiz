'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QuizMode, BestScoreRecord, QuizProgressState } from '@/lib/types';
import { ModeToggle } from './ModeToggle';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';

interface AssignmentCardProps {
  id: string; // 'a1'..'a12'
  index: number; // 0..11
  title: string;
  bestScore?: BestScoreRecord | null;
  inProgress?: QuizProgressState | null;
}

export function AssignmentCard({
  id,
  index,
  title,
  bestScore,
  inProgress,
}: AssignmentCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<QuizMode>('order');

  const paddedNum = String(index + 1).padStart(2, '0');
  const targetUrl = `/quiz/${id}?mode=${mode}`;

  const handleCardClick = () => {
    router.push(targetUrl);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#111a14] border border-stone-200/90 dark:border-emerald-950/70 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      {/* Top row: Number badge & Best score */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-emerald-950/60 text-stone-600 dark:text-emerald-400 border border-stone-200/60 dark:border-emerald-900/50">
          {paddedNum}
        </span>

        {bestScore ? (
          <div
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60 px-2 py-0.5 rounded-full"
            title={`Completed on ${new Date(bestScore.completedAt).toLocaleDateString()}`}
          >
            <Trophy className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>
              {bestScore.score}/{bestScore.total} ({bestScore.percentage}%)
            </span>
          </div>
        ) : inProgress && !inProgress.isFinished ? (
          <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Resume (Q{inProgress.currentIndex + 1})</span>
          </div>
        ) : null}
      </div>

      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          10 practice MCQs with explanations
        </p>
      </div>

      {/* Bottom controls: Mode toggle & Action button */}
      <div
        className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100 dark:border-emerald-950/60"
        onClick={(e) => e.stopPropagation()}
      >
        <ModeToggle mode={mode} onChange={setMode} size="sm" />

        <Link
          href={targetUrl}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Start</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
