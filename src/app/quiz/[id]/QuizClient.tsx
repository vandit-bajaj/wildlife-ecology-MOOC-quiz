'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  buildQuiz,
  buildRetryQuiz,
  calculateQuizResult,
  calculateAssignmentBreakdown,
  getAssignmentById,
} from '@/lib/quiz';
import {
  getInProgressQuiz,
  saveInProgressQuiz,
  clearInProgressQuiz,
  saveBestScore,
  getBestScore,
} from '@/lib/storage';
import { QuizQuestion, QuizMode, AssignmentScoreBreakdown } from '@/lib/types';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionPalette } from '@/components/QuestionPalette';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { ResultSummary } from '@/components/ResultSummary';
import { ReviewList } from '@/components/ReviewList';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

interface QuizClientProps {
  quizId: string;
}

export function QuizClient({ quizId }: QuizClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode defaults to 'order' unless explicitly specified as 'shuffle'
  const modeParam = searchParams.get('mode');
  const mode: QuizMode = modeParam === 'shuffle' ? 'shuffle' : 'order';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isRetryWrongOnlyMode, setIsRetryWrongOnlyMode] = useState(false);

  const isFullQuiz = quizId.toLowerCase() === 'all';

  const quizTitle = useMemo(() => {
    if (isRetryWrongOnlyMode) return 'Retry Missed Questions';
    if (isFullQuiz) return 'Full Quiz — All 120 Questions';
    const a = getAssignmentById(quizId);
    return a ? a.title : `Assignment ${quizId.toUpperCase()}`;
  }, [quizId, isFullQuiz, isRetryWrongOnlyMode]);

  // Initialize or restore quiz state on mount
  useEffect(() => {
    setMounted(true);

    try {
      // Check saved in-progress attempt for this quiz ID & mode
      const saved = getInProgressQuiz(quizId);
      if (
        saved &&
        saved.mode === mode &&
        !saved.isFinished &&
        saved.questions &&
        saved.questions.length > 0
      ) {
        setQuestions(saved.questions);
        setAnswers(saved.answers || {});
        setCurrentIndex(Math.min(saved.currentIndex || 0, saved.questions.length - 1));
        return;
      }
    } catch {
      // Fallback if storage fails
    }

    // Build fresh quiz
    try {
      const freshQuestions = buildQuiz(quizId, mode);
      setQuestions(freshQuestions);
      setAnswers({});
      setCurrentIndex(0);
      setIsFinished(false);

      // Save initial state to avoid re-shuffling on page refresh
      saveInProgressQuiz({
        quizId,
        mode,
        questions: freshQuestions,
        answers: {},
        currentIndex: 0,
        isFinished: false,
        startedAt: Date.now(),
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.error('Failed to build quiz:', err);
      router.push('/dashboard');
    }
  }, [quizId, mode, router]);

  // Sync in-progress state to localStorage
  const persistState = useCallback(
    (newAnswers: Record<string, number>, newIndex: number) => {
      if (isRetryWrongOnlyMode) return; // Don't overwrite main attempt when retrying wrong
      if (questions.length === 0) return;

      saveInProgressQuiz({
        quizId,
        mode,
        questions,
        answers: newAnswers,
        currentIndex: newIndex,
        isFinished: false,
        startedAt: Date.now(),
        updatedAt: Date.now(),
      });
    },
    [quizId, mode, questions, isRetryWrongOnlyMode]
  );

  // Handle selecting an option
  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (questions.length === 0 || isFinished) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      // Check if already answered (locked)
      if (answers[currentQ.id] !== undefined) return;

      const updated = {
        ...answers,
        [currentQ.id]: optionIndex,
      };

      setAnswers(updated);
      persistState(updated, currentIndex);
    },
    [questions, currentIndex, answers, isFinished, persistState]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistState(answers, nextIdx);
    } else {
      // If at last question, check if finished
      handleAttemptFinish();
    }
  }, [currentIndex, questions.length, answers, persistState]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      persistState(answers, prevIdx);
    }
  }, [currentIndex, answers, persistState]);

  const handleSelectQuestionFromPalette = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
        persistState(answers, index);
      }
    },
    [questions.length, answers, persistState]
  );

  // Finish quiz execution
  const finishQuizNow = useCallback(() => {
    setIsFinished(true);
    setShowConfirmFinish(false);

    // Calculate score & record
    const { total, correctCount, percentage } = calculateQuizResult(questions, answers);

    if (!isRetryWrongOnlyMode) {
      // Save best score to localStorage
      const wasSaved = saveBestScore(quizId, {
        score: correctCount,
        total,
        percentage,
        completedAt: Date.now(),
        mode,
      });

      if (wasSaved) {
        setIsNewBest(true);
      }

      // Clear in-progress attempt
      clearInProgressQuiz(quizId);
    }

    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, isRetryWrongOnlyMode, quizId, mode]);

  const handleAttemptFinish = useCallback(() => {
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questions.length - answeredCount;

    if (unansweredCount > 0) {
      setShowConfirmFinish(true);
    } else {
      finishQuizNow();
    }
  }, [answers, questions.length, finishQuizNow]);

  // Restart / Retry handlers
  const handleRetrySameQuiz = () => {
    clearInProgressQuiz(quizId);
    const fresh = buildQuiz(quizId, mode);
    setQuestions(fresh);
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setIsNewBest(false);
    setIsRetryWrongOnlyMode(false);
    saveInProgressQuiz({
      quizId,
      mode,
      questions: fresh,
      answers: {},
      currentIndex: 0,
      isFinished: false,
      startedAt: Date.now(),
      updatedAt: Date.now(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryWrongOnly = () => {
    const wrongQuestions = questions.filter((q) => {
      const chosen = answers[q.id];
      return chosen !== undefined && !q.options[chosen]?.isCorrect;
    });

    if (wrongQuestions.length === 0) return;

    const retryQuizQuestions = buildRetryQuiz(wrongQuestions, mode);
    setQuestions(retryQuizQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setIsNewBest(false);
    setIsRetryWrongOnlyMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener:
  // 1-4, A-D for options
  // ArrowRight, Enter for Next
  // ArrowLeft for Previous
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input, dialog, or if quiz is finished
      if (
        isFinished ||
        showConfirmFinish ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Next / Previous
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }

      // Options 1-4 or a-d
      let optionIdx: number | null = null;
      if (key === '1' || key === 'a') optionIdx = 0;
      else if (key === '2' || key === 'b') optionIdx = 1;
      else if (key === '3' || key === 'c') optionIdx = 2;
      else if (key === '4' || key === 'd') optionIdx = 3;

      if (optionIdx !== null) {
        e.preventDefault();
        handleSelectOption(optionIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, showConfirmFinish, handleNext, handlePrev, handleSelectOption]);

  if (!mounted || questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          Preparing your quiz questions...
        </p>
      </div>
    );
  }

  // Calculate live scores
  const scoreResult = calculateQuizResult(questions, answers);
  const currentQuestion = questions[currentIndex];
  const selectedOptionIndex = currentQuestion ? answers[currentQuestion.id] : undefined;
  const unansweredCount = questions.length - Object.keys(answers).length;
  const assignmentBreakdowns: AssignmentScoreBreakdown[] = isFinished
    ? calculateAssignmentBreakdown(questions, answers)
    : [];

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8 flex flex-col justify-between">
      {/* Quiz Active View */}
      {!isFinished ? (
        <>
          {/* Top Progress & Score Bar */}
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            correctCount={scoreResult.correctCount}
            wrongCount={scoreResult.wrongCount}
            answeredCount={Object.keys(answers).length}
            mode={mode}
            quizTitle={quizTitle}
          />

          {/* Question Card */}
          {currentQuestion && (
            <div className="mb-6">
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOptionIndex={selectedOptionIndex}
                onSelectOption={handleSelectOption}
                showAssignmentTag={isFullQuiz}
              />
            </div>
          )}

          {/* Action Bar (Prev / Finish / Next) */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-white dark:bg-[#111a14] border border-stone-200 dark:border-emerald-950 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAttemptFinish}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
              >
                <span>Finish</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-stone-950 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>{currentIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette */}
          <div className="mt-2">
            <QuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              onSelectQuestion={handleSelectQuestionFromPalette}
            />
          </div>

          {/* Unanswered Finish Warning Modal */}
          <ConfirmationModal
            isOpen={showConfirmFinish}
            unansweredCount={unansweredCount}
            onConfirm={finishQuizNow}
            onCancel={() => setShowConfirmFinish(false)}
          />
        </>
      ) : (
        /* Result & Review View */
        <div className="space-y-8 animate-in fade-in duration-300">
          <ResultSummary
            score={scoreResult.correctCount}
            total={scoreResult.total}
            percentage={scoreResult.percentage}
            wrongCount={scoreResult.wrongCount}
            unansweredCount={scoreResult.unansweredCount}
            assignmentBreakdowns={assignmentBreakdowns}
            isFullQuiz={isFullQuiz}
            isNewBest={isNewBest}
            onRetryAll={handleRetrySameQuiz}
            onRetryWrongOnly={handleRetryWrongOnly}
          />

          <ReviewList questions={questions} answers={answers} />
        </div>
      )}
    </div>
  );
}
