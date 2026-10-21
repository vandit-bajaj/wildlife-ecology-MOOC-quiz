import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { QuizClient } from './QuizClient';
import { getAssignmentById } from '@/lib/quiz';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id.toLowerCase() === 'all') {
    return {
      title: 'Full Quiz (All 120 Questions) | Wildlife Ecology',
      description:
        'Take all 120 questions across 12 assignments with instant answer checking and complete per-assignment scoring.',
    };
  }
  const assignment = getAssignmentById(id);
  const title = assignment ? assignment.title : `Assignment ${id.toUpperCase()}`;
  return {
    title: `${title} Quiz | Wildlife Ecology`,
    description: `Practice 10 verified multiple choice questions for NPTEL Wildlife Ecology ${title}.`,
  };
}

export function generateStaticParams() {
  return [
    { id: 'a1' },
    { id: 'a2' },
    { id: 'a3' },
    { id: 'a4' },
    { id: 'a5' },
    { id: 'a6' },
    { id: 'a7' },
    { id: 'a8' },
    { id: 'a9' },
    { id: 'a10' },
    { id: 'a11' },
    { id: 'a12' },
    { id: 'all' },
  ];
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Loading quiz...
          </p>
        </div>
      }
    >
      <QuizClient quizId={id} />
    </Suspense>
  );
}
