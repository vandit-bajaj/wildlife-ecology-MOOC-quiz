import type { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

export const metadata: Metadata = {
  title: 'All Quizzes & Mock Tests | Wildlife Ecology (2026)',
  description:
    'Choose from 12 individual weekly assignments or take the full 120-question practice mock exam in sequential or shuffled mode.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
