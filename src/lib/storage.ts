import { BestScoreRecord, QuizProgressState, QuizMode } from './types';

const STORAGE_KEYS = {
  BEST_SCORE_PREFIX: 'wildlife_quiz_best_',
  IN_PROGRESS_PREFIX: 'wildlife_quiz_progress_',
} as const;

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getBestScoreKey(quizId: string, mode?: QuizMode): string {
  return mode
    ? `${STORAGE_KEYS.BEST_SCORE_PREFIX}${quizId}_${mode}`
    : `${STORAGE_KEYS.BEST_SCORE_PREFIX}${quizId}`;
}

function getProgressKey(quizId: string): string {
  return `${STORAGE_KEYS.IN_PROGRESS_PREFIX}${quizId}`;
}

/**
 * Gets the saved best score for a quiz.
 * Checks mode-specific key first, then falls back to general key.
 */
export function getBestScore(quizId: string, mode?: QuizMode): BestScoreRecord | null {
  if (!isClient()) return null;
  try {
    if (mode) {
      const modeData = window.localStorage.getItem(getBestScoreKey(quizId, mode));
      if (modeData) {
        return JSON.parse(modeData) as BestScoreRecord;
      }
    }
    // General fallback
    const raw = window.localStorage.getItem(getBestScoreKey(quizId));
    if (!raw) return null;
    return JSON.parse(raw) as BestScoreRecord;
  } catch (err) {
    console.warn(`[storage] Failed to read best score for ${quizId}:`, err);
    return null;
  }
}

/**
 * Saves best score if score is higher than current saved score (or if not previously saved).
 * Saves both to the mode-specific key and updates the generic key if percentage is higher.
 */
export function saveBestScore(quizId: string, record: BestScoreRecord): boolean {
  if (!isClient()) return false;
  try {
    // 1. Mode-specific check & update
    const modeKey = getBestScoreKey(quizId, record.mode);
    const existingModeRaw = window.localStorage.getItem(modeKey);
    let shouldSaveMode = true;
    if (existingModeRaw) {
      const existing = JSON.parse(existingModeRaw) as BestScoreRecord;
      if (existing.score >= record.score) {
        shouldSaveMode = false;
      }
    }
    if (shouldSaveMode) {
      window.localStorage.setItem(modeKey, JSON.stringify(record));
    }

    // 2. Generic quiz key check & update
    const genericKey = getBestScoreKey(quizId);
    const existingGenericRaw = window.localStorage.getItem(genericKey);
    let shouldSaveGeneric = true;
    if (existingGenericRaw) {
      const existing = JSON.parse(existingGenericRaw) as BestScoreRecord;
      if (existing.percentage >= record.percentage) {
        shouldSaveGeneric = false;
      }
    }
    if (shouldSaveGeneric) {
      window.localStorage.setItem(genericKey, JSON.stringify(record));
    }

    return shouldSaveMode || shouldSaveGeneric;
  } catch (err) {
    console.warn(`[storage] Failed to save best score for ${quizId}:`, err);
    return false;
  }
}

/**
 * Gets all best scores for quick display on dashboard cards.
 */
export function getAllDashboardBestScores(
  assignmentIds: string[]
): Record<string, BestScoreRecord | null> {
  const result: Record<string, BestScoreRecord | null> = {};
  for (const id of assignmentIds) {
    result[id] = getBestScore(id);
  }
  result['all'] = getBestScore('all');
  return result;
}

/**
 * Retrieves saved in-progress quiz state.
 */
export function getInProgressQuiz(quizId: string): QuizProgressState | null {
  if (!isClient()) return null;
  try {
    const raw = window.localStorage.getItem(getProgressKey(quizId));
    if (!raw) return null;
    return JSON.parse(raw) as QuizProgressState;
  } catch (err) {
    console.warn(`[storage] Failed to load in-progress quiz for ${quizId}:`, err);
    return null;
  }
}

/**
 * Saves in-progress quiz state.
 */
export function saveInProgressQuiz(state: QuizProgressState): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(
      getProgressKey(state.quizId),
      JSON.stringify({ ...state, updatedAt: Date.now() })
    );
  } catch (err) {
    console.warn(`[storage] Failed to save in-progress quiz for ${state.quizId}:`, err);
  }
}

/**
 * Clears saved in-progress quiz state when completed or restarted.
 */
export function clearInProgressQuiz(quizId: string): void {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(getProgressKey(quizId));
  } catch (err) {
    console.warn(`[storage] Failed to clear in-progress quiz for ${quizId}:`, err);
  }
}
