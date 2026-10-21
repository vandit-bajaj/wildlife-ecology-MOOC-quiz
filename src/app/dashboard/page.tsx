'use client';

import React, { useEffect, useState } from 'react';
import { getAllAssignments } from '@/lib/quiz';
import { AssignmentCard } from '@/components/AssignmentCard';
import { FullQuizCard } from '@/components/FullQuizCard';
import { getAllDashboardBestScores, getInProgressQuiz } from '@/lib/storage';
import { BestScoreRecord, QuizProgressState } from '@/lib/types';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const assignments = getAllAssignments();
  const [bestScores, setBestScores] = useState<Record<string, BestScoreRecord | null>>({});
  const [inProgressMap, setInProgressMap] = useState<Record<string, QuizProgressState | null>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    refreshStorageData();
  }, []);

  const refreshStorageData = () => {
    const ids = assignments.map((a) => a.id);
    const scores = getAllDashboardBestScores(ids);
    setBestScores(scores);

    const progress: Record<string, QuizProgressState | null> = {};
    for (const id of ids) {
      progress[id] = getInProgressQuiz(id);
    }
    progress['all'] = getInProgressQuiz('all');
    setInProgressMap(progress);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
      {/* Intro Header */}
      <div className="mb-8 md:mb-10 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Wildlife Ecology • 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
          Pick a quiz
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Take one assignment at a time (10 questions each) or attempt the comprehensive 120-question mock.
          Toggle between sequential practice or Fisher–Yates shuffled modes.
        </p>
      </div>

      {/* Featured: Full Quiz Card */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>Full Quiz</span>
          </h2>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            120 questions • All assignments
          </span>
        </div>
        <FullQuizCard
          bestScore={mounted ? bestScores['all'] : null}
          inProgress={mounted ? inProgressMap['all'] : null}
        />
      </section>

      {/* Assignment-wise Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Assignment-wise</span>
          </h2>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            12 weekly assignments
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment, index) => (
            <AssignmentCard
              key={assignment.id}
              id={assignment.id}
              index={index}
              title={assignment.title}
              bestScore={mounted ? bestScores[assignment.id] : null}
              inProgress={mounted ? inProgressMap[assignment.id] : null}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
