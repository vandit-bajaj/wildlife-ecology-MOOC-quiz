export interface RawQuestion {
  id: string;
  number: number;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface RawAssignment {
  id: string;
  title: string;
  questions: RawQuestion[];
}

export interface QuestionsData {
  course: string;
  year: number;
  source?: string;
  assignments: RawAssignment[];
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  originalIndex: number;
}

export interface QuizQuestion {
  id: string;
  number: number;
  question: string;
  options: QuizOption[];
  assignmentId: string;
  assignmentTitle: string;
  originalAnswerIndex: number;
}

export type QuizMode = 'order' | 'shuffle';

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionIndex: number | null; // index in current question's options array
  isCorrect: boolean;
  answeredAt?: number;
}

export interface QuizProgressState {
  quizId: string; // 'a1'..'a12' or 'all'
  mode: QuizMode;
  questions: QuizQuestion[];
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  currentIndex: number;
  isFinished: boolean;
  startedAt: number;
  updatedAt: number;
}

export interface AssignmentScoreBreakdown {
  assignmentId: string;
  assignmentTitle: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface BestScoreRecord {
  score: number;
  total: number;
  percentage: number;
  completedAt: number;
  mode: QuizMode;
}
