'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  unansweredCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  unansweredCount,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#121c16] border border-stone-200 dark:border-emerald-950 rounded-3xl p-6 sm:p-7 shadow-2xl text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Finish Quiz?
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Check your progress before submitting
            </p>
          </div>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          You still have{' '}
          <strong className="text-amber-600 dark:text-amber-400 font-bold">
            {unansweredCount} unanswered question{unansweredCount === 1 ? '' : 's'}
          </strong>
          . Are you sure you want to conclude this attempt now?
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Keep practicing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-stone-950 transition-colors shadow-xs cursor-pointer"
          >
            Yes, finish anyway
          </button>
        </div>
      </div>
    </div>
  );
}
