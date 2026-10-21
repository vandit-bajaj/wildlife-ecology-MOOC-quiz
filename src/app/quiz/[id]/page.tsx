import React, { Suspense } from 'react';
import { QuizClient } from './QuizClient';

interface PageProps {
  params: Promise<{ id: string }>;
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
