'use client';

import React from 'react';
import Link from 'next/link';
import { AssignmentScoreBreakdown, BestScoreRecord } from '@/lib/types';
import { Trophy, RotateCcw, AlertOctagon, ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';

interface ResultSummaryProps {
  score: number;
  total: number;
  percentage: number;
  wrongCount: number;
  unansweredCount: number;
  assignmentBreakdowns: AssignmentScoreBreakdown[];
  isFullQuiz: boolean;
  isNewBest: boolean;
  onRetryAll: () => void;
  onRetryWrongOnly: () => void;
}

export function ResultSummary({
  score,
  total,
  percentage,
  wrongCount,
  unansweredCount,
  assignmentBreakdowns,
  isFullQuiz,
  isNewBest,
  onRetryAll,
  onRetryWrongOnly,
}: ResultSummaryProps) {
  let gradeColor = 'text-emerald-700 dark:text-emerald-400';
  let gradeMessage = 'Outstanding performance! You have mastered these concepts.';

  if (percentage < 50) {
    gradeColor = 'text-amber-600 dark:text-amber-400';
    gradeMessage = 'Good effort! Review the missed questions and try again to solidify your knowledge.';
  } else if (percentage < 80) {
    gradeColor = 'text-emerald-600 dark:text-emerald-400';
    gradeMessage = 'Great job! A bit more practice on your missed questions will get you to perfection.';
  }

  return (
    <div className="w-full bg-white dark:bg-[#111a14] border border-stone-200/90 dark:border-emerald-950/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 text-center sm:text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-emerald-950/60">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Quiz Completed!
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              {gradeMessage}
            </p>
          </div>
        </div>

        {isNewBest && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/70 dark:border-amber-800">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            New Personal Best!
          </span>
        )}
      </div>

      {/* Big Score Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0c1410] border border-stone-200/70 dark:border-emerald-950/50">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Total Score</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
            {score} <span className="text-base font-normal text-stone-400">/ {total}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0c1410] border border-stone-200/70 dark:border-emerald-950/50">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Percentage</span>
          <div className={`text-2xl sm:text-3xl font-extrabold mt-1 ${gradeColor}`}>
            {percentage}%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0c1410] border border-stone-200/70 dark:border-emerald-950/50">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Correct Answers</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>{score}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0c1410] border border-stone-200/70 dark:border-emerald-950/50">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Mistakes & Skipped</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
            <XCircle className="w-5 h-5" />
            <span>{wrongCount + unansweredCount}</span>
          </div>
        </div>
      </div>

      {/* Per-Assignment Breakdown Table for Full Quiz */}
      {isFullQuiz && assignmentBreakdowns.length > 0 && (
        <div className="my-8 text-left">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
            <span>Assignment Mastery Breakdown</span>
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-stone-200/90 dark:border-emerald-950/80">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-stone-50 dark:bg-[#0d1611] text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-emerald-950">
                <tr>
                  <th className="py-3 px-4 font-semibold">Assignment</th>
                  <th className="py-3 px-4 font-semibold text-center">Score</th>
                  <th className="py-3 px-4 font-semibold text-center">Percentage</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-emerald-950/50">
                {assignmentBreakdowns.map((item) => (
                  <tr key={item.assignmentId} className="hover:bg-stone-50/50 dark:hover:bg-emerald-950/20">
                    <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100">
                      {item.assignmentTitle}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-medium">
                      {item.correct} / {item.total}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {item.percentage}%
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full max-w-[120px] bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4 border-t border-stone-100 dark:border-emerald-950/60">
        <button
          type="button"
          onClick={onRetryAll}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-stone-950 transition-colors cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry same quiz</span>
        </button>

        {wrongCount > 0 && (
          <button
            type="button"
            onClick={onRetryWrongOnly}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-stone-950 transition-colors cursor-pointer shadow-xs"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Retry only wrong ({wrongCount})</span>
          </button>
        )}

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to dashboard</span>
        </Link>
      </div>
    </div>
  );
}
