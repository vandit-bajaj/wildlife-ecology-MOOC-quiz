'use client';

import React from 'react';
import { QuizQuestion } from '@/lib/types';
import { OptionButton } from './OptionButton';
import { Bookmark, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | undefined;
  onSelectOption: (optionIndex: number) => void;
  showAssignmentTag?: boolean;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
  showAssignmentTag = false,
}: QuestionCardProps) {
  const isLocked = selectedOptionIndex !== undefined;
  const isAnswered = selectedOptionIndex !== undefined;
  const isSelectedCorrect =
    isAnswered && question.options[selectedOptionIndex]?.isCorrect;

  return (
    <div className="w-full bg-white dark:bg-[#101813] border border-stone-200/90 dark:border-emerald-950/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
      {/* Question metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100 dark:border-emerald-950/60">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-900/60 px-2.5 py-1 rounded-md">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          {showAssignmentTag && (
            <span className="font-mono text-xs font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2.5 py-1 rounded-md">
              {question.assignmentTitle} • Q{question.number}
            </span>
          )}
        </div>

        {/* Keyboard hints pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <span>Keys:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-[10px]">
            1-4
          </kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-mono text-[10px]">
            A-D
          </kbd>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-base sm:text-xl font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="space-y-2.5 sm:space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          return (
            <OptionButton
              key={index}
              index={index}
              label={OPTION_LABELS[index] || String(index + 1)}
              text={option.text}
              isSelected={isSelected}
              isCorrectOption={option.isCorrect}
              isLocked={isLocked}
              onClick={() => onSelectOption(index)}
            />
          );
        })}
      </div>

      {/* Instant Feedback Feedback Strip */}
      {isLocked && (
        <div
          className={`mt-5 p-3 sm:p-4 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-all ${
            isSelectedCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-300/80 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-300/80 dark:border-rose-800'
          }`}
        >
          {isSelectedCorrect ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Correct! Well done.</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>
                Incorrect choice. The correct answer is highlighted in green above.
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
