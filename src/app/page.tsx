import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Shuffle, Award, CheckCircle2, Leaf, Compass } from 'lucide-react';
import { getAllAssignments } from '@/lib/quiz';

export default function LandingPage() {
  const assignments = getAllAssignments();
  const totalQuestions = assignments.reduce((acc, a) => acc + a.questions.length, 0);

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-12 pb-20 md:py-24 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle decorative background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-6 shadow-xs">
          <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>NPTEL MOOC 2026 • Wildlife Ecology</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 max-w-3xl leading-[1.1]">
          Master Your{' '}
          <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-400 bg-clip-text text-transparent">
            Wildlife Ecology
          </span>{' '}
          Assignments
        </h1>

        <p className="mt-6 text-base sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Prepare effectively with all <strong>12 weekly assignments</strong> and{' '}
          <strong>{totalQuestions} verified MCQs</strong>. Practice assignment-wise or test yourself with full mock exams, in original order or Fisher–Yates shuffled.
        </p>

        {/* Call to action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-stone-950 shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <span>Start practising</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/quiz/all?mode=order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30 transition-all cursor-pointer"
          >
            <span>Jump to Full Quiz (120 Qs)</span>
          </Link>
        </div>

        {/* Feature Badges / Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full text-left">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#111a14]/60 border border-stone-200/80 dark:border-emerald-950/80 backdrop-blur-xs">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">12 Assignments</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Week 1 through Week 12 complete curriculum
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#111a14]/60 border border-stone-200/80 dark:border-emerald-950/80 backdrop-blur-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">120 Questions</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Verified answers with corrected NPTEL errata
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#111a14]/60 border border-stone-200/80 dark:border-emerald-950/80 backdrop-blur-xs">
            <Shuffle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Two Modes</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Sequential review or Fisher-Yates randomized shuffle
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#111a14]/60 border border-stone-200/80 dark:border-emerald-950/80 backdrop-blur-xs">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">Offline Progress</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Saves your best scores and resume state in browser
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
