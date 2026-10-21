'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { Check, X, Filter, MinusCircle } from 'lucide-react';

interface ReviewListProps {
  questions: QuizQuestion[];
  answers: Record<string, number>;
}

type FilterType = 'all' | 'wrong' | 'skipped';

export function ReviewList({ questions, answers }: ReviewListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredQuestions = questions.filter((q) => {
    const chosenIndex = answers[q.id];
    if (filter === 'all') return true;
    if (filter === 'skipped') return chosenIndex === undefined || chosenIndex === null;
    if (filter === 'wrong') {
      return chosenIndex !== undefined && !q.options[chosenIndex]?.isCorrect;
    }
    return true;
  });

  const wrongTotal = questions.filter((q) => {
    const chosen = answers[q.id];
    return chosen !== undefined && !q.options[chosen]?.isCorrect;
  }).length;

  const skippedTotal = questions.filter((q) => answers[q.id] === undefined).length;

  return (
    <div className="w-full bg-white dark:bg-[#111a14] border border-stone-200/90 dark:border-emerald-950/80 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-emerald-950/60">
        <div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Question Review
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Detailed walkthrough of each question and answer
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-xs font-medium">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'wrong'
                ? 'bg-white dark:bg-stone-700 text-rose-700 dark:text-rose-300 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-rose-600 dark:hover:text-rose-300'
            }`}
          >
            Wrong ({wrongTotal})
          </button>
          <button
            type="button"
            onClick={() => setFilter('skipped')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'skipped'
                ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-amber-600 dark:hover:text-amber-300'
            }`}
          >
            Skipped ({skippedTotal})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-stone-100 dark:divide-emerald-950/50 mt-4">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-sm text-stone-500 dark:text-stone-400">
            No questions match the current filter.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const chosenOptionIndex = answers[q.id];
            const isAnswered = chosenOptionIndex !== undefined;
            const chosenOption = isAnswered ? q.options[chosenOptionIndex] : null;
            const isCorrect = isAnswered && chosenOption?.isCorrect;
            const correctOption = q.options.find((opt) => opt.isCorrect);

            return (
              <div key={q.id} className="py-5 sm:py-6 first:pt-2">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      #{originalIndex + 1}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {q.assignmentTitle}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {isAnswered ? (
                    isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        <Check className="w-3.5 h-3.5" />
                        <span>Correct</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md">
                        <X className="w-3.5 h-3.5" />
                        <span>Wrong</span>
                      </span>
                    )
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                      <MinusCircle className="w-3.5 h-3.5" />
                      <span>Skipped</span>
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  {q.question}
                </p>

                {/* Answers Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div
                    className={`p-3 rounded-xl border ${
                      !isAnswered
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300'
                        : isCorrect
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900 text-emerald-950 dark:text-emerald-200'
                        : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                    }`}
                  >
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                      Your Choice:
                    </span>
                    <span className="font-medium">
                      {chosenOption ? chosenOption.text : 'No option chosen'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-400/80 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                      Correct Answer:
                    </span>
                    <span className="font-medium">
                      {correctOption ? correctOption.text : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
