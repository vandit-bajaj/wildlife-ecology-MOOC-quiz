'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { ChevronDown, ChevronUp, LayoutGrid } from 'lucide-react';

interface QuestionPaletteProps {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, number>;
  onSelectQuestion: (index: number) => void;
}

export function QuestionPalette({
  questions,
  currentIndex,
  answers,
  onSelectQuestion,
}: QuestionPaletteProps) {
  const [isOpen, setIsOpen] = useState(true);
  const total = questions.length;
  const isLargeQuiz = total > 20;

  return (
    <div className="w-full bg-white dark:bg-[#101813] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Palette header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Question Palette
          </h3>
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
            ({Object.keys(answers).length}/{total})
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span>Unanswered</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Correct</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Wrong</span>
          </span>
        </div>

        {/* Mobile collapse button if large quiz */}
        {isLargeQuiz && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
            aria-label={isOpen ? 'Collapse palette' : 'Expand palette'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Grid of buttons */}
      {isOpen && (
        <div
          className={`grid gap-1.5 sm:gap-2 max-h-60 sm:max-h-72 overflow-y-auto p-1 pr-1.5 ${
            isLargeQuiz
              ? 'grid-cols-6 sm:grid-cols-10 md:grid-cols-12'
              : 'grid-cols-5 sm:grid-cols-10'
          }`}
        >
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const chosenOptionIndex = answers[q.id];
            const isAnswered = chosenOptionIndex !== undefined;
            const isCorrect = isAnswered && q.options[chosenOptionIndex]?.isCorrect;

            let buttonStyle =
              'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle =
                  'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-stone-950 font-bold border-emerald-600 dark:border-emerald-500';
              } else {
                buttonStyle =
                  'bg-rose-600 dark:bg-rose-500 text-white dark:text-stone-950 font-bold border-rose-600 dark:border-rose-500';
              }
            }

            const currentRing = isCurrent
              ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-[#101813] scale-105 font-bold z-10'
              : '';

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                title={`Question ${idx + 1}${
                  isAnswered ? (isCorrect ? ' (Correct)' : ' (Wrong)') : ' (Not answered)'
                }`}
                aria-label={`Jump to Question ${idx + 1}`}
                className={`flex items-center justify-center h-8 text-xs rounded-lg border transition-all cursor-pointer ${buttonStyle} ${currentRing}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
