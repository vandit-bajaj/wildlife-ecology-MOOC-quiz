import questionsDataRaw from '@/data/questions.json';
import {
  QuestionsData,
  RawAssignment,
  QuizQuestion,
  QuizOption,
  QuizMode,
  AssignmentScoreBreakdown,
} from './types';

export const questionsData = questionsDataRaw as QuestionsData;

/**
 * Genuine immutable Fisher–Yates shuffle
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Returns all raw assignments
 */
export function getAllAssignments(): RawAssignment[] {
  return questionsData.assignments;
}

/**
 * Gets a specific raw assignment by ID ('a1'..'a12')
 */
export function getAssignmentById(id: string): RawAssignment | undefined {
  return questionsData.assignments.find((a) => a.id.toLowerCase() === id.toLowerCase());
}

/**
 * Transforms a raw question into a QuizQuestion with options containing `isCorrect`.
 * In shuffle mode, the options are shuffled.
 */
function prepareQuestion(
  rawQ: QuestionsData['assignments'][0]['questions'][0],
  assignmentId: string,
  assignmentTitle: string,
  mode: QuizMode
): QuizQuestion {
  // Turn options into { text, isCorrect, originalIndex } BEFORE shuffling
  const initialOptions: QuizOption[] = rawQ.options.map((optText, index) => ({
    text: optText,
    isCorrect: index === rawQ.answerIndex,
    originalIndex: index,
  }));

  const finalOptions = mode === 'shuffle' ? shuffle(initialOptions) : initialOptions;

  return {
    id: rawQ.id,
    number: rawQ.number,
    question: rawQ.question,
    options: finalOptions,
    assignmentId,
    assignmentTitle,
    originalAnswerIndex: rawQ.answerIndex,
  };
}

/**
 * Builds a quiz for a given target ('all' or 'a1'..'a12') and mode ('order' | 'shuffle').
 */
export function buildQuiz(id: string, mode: QuizMode = 'order'): QuizQuestion[] {
  const normalizedId = id.toLowerCase();

  let questions: QuizQuestion[] = [];

  if (normalizedId === 'all') {
    for (const assignment of questionsData.assignments) {
      for (const q of assignment.questions) {
        questions.push(prepareQuestion(q, assignment.id, assignment.title, mode));
      }
    }
  } else {
    const assignment = getAssignmentById(normalizedId);
    if (!assignment) {
      throw new Error(`Assignment with ID "${id}" not found.`);
    }
    for (const q of assignment.questions) {
      questions.push(prepareQuestion(q, assignment.id, assignment.title, mode));
    }
  }

  if (mode === 'shuffle') {
    questions = shuffle(questions);
  }

  return questions;
}

/**
 * Builds a re-attempt quiz containing only questions answered incorrectly.
 */
export function buildRetryQuiz(
  questionsToRetry: QuizQuestion[],
  mode: QuizMode = 'order'
): QuizQuestion[] {
  let list = questionsToRetry.map((q) => {
    // If reshuffling options for the retry:
    const options = mode === 'shuffle' ? shuffle(q.options) : [...q.options];
    return {
      ...q,
      options,
    };
  });

  if (mode === 'shuffle') {
    list = shuffle(list);
  }

  return list;
}

/**
 * Evaluates current answers and returns score breakdown
 */
export function calculateQuizResult(
  questions: QuizQuestion[],
  answers: Record<string, number>
) {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  for (const q of questions) {
    const chosenIndex = answers[q.id];
    if (chosenIndex === undefined || chosenIndex === null) {
      unansweredCount++;
    } else if (q.options[chosenIndex]?.isCorrect) {
      correctCount++;
    } else {
      wrongCount++;
    }
  }

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return {
    total,
    correctCount,
    wrongCount,
    unansweredCount,
    percentage,
  };
}

/**
 * Breaks down scores by assignment (used on Full quiz result screen)
 */
export function calculateAssignmentBreakdown(
  questions: QuizQuestion[],
  answers: Record<string, number>
): AssignmentScoreBreakdown[] {
  const breakdownMap = new Map<
    string,
    { title: string; total: number; correct: number }
  >();

  for (const q of questions) {
    let entry = breakdownMap.get(q.assignmentId);
    if (!entry) {
      entry = { title: q.assignmentTitle, total: 0, correct: 0 };
      breakdownMap.set(q.assignmentId, entry);
    }
    entry.total += 1;
    const chosenIndex = answers[q.id];
    if (chosenIndex !== undefined && q.options[chosenIndex]?.isCorrect) {
      entry.correct += 1;
    }
  }

  return Array.from(breakdownMap.entries()).map(([assignmentId, data]) => ({
    assignmentId,
    assignmentTitle: data.title,
    total: data.total,
    correct: data.correct,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));
}
