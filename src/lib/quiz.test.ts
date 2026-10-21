import { describe, it, expect } from 'vitest';
import questionsRaw from '@/data/questions.json';
import {
  buildQuiz,
  getAllAssignments,
  getAssignmentById,
  shuffle,
  calculateQuizResult,
  calculateAssignmentBreakdown,
} from './quiz';

describe('Quiz Data & Logic', () => {
  it('loads exactly 12 assignments with 10 questions each (120 total)', () => {
    const assignments = getAllAssignments();
    expect(assignments).toHaveLength(12);

    let totalQuestions = 0;
    assignments.forEach((assignment, idx) => {
      expect(assignment.id).toBe(`a${idx + 1}`);
      expect(assignment.questions).toHaveLength(10);
      totalQuestions += assignment.questions.length;

      // Each question must have 4 options and valid answerIndex
      assignment.questions.forEach((q) => {
        expect(q.options).toHaveLength(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThanOrEqual(3);
      });
    });

    expect(totalQuestions).toBe(120);
  });

  it('builds full quiz with 120 questions in order', () => {
    const quiz = buildQuiz('all', 'order');
    expect(quiz).toHaveLength(120);

    // Verify ordering: a1-q1 ... a12-q10
    expect(quiz[0].id).toBe('a1-q1');
    expect(quiz[0].assignmentId).toBe('a1');
    expect(quiz[119].id).toBe('a12-q10');
    expect(quiz[119].assignmentId).toBe('a12');

    // In order mode, options preserve original index
    quiz.forEach((q) => {
      expect(q.options).toHaveLength(4);
      const correctOptions = q.options.filter((o) => o.isCorrect);
      expect(correctOptions).toHaveLength(1);
      expect(q.options[q.originalAnswerIndex].isCorrect).toBe(true);
    });
  });

  it('builds single assignment quiz with 10 questions', () => {
    for (let i = 1; i <= 12; i++) {
      const id = `a${i}`;
      const quiz = buildQuiz(id, 'order');
      expect(quiz).toHaveLength(10);
      expect(quiz[0].assignmentId).toBe(id);
      quiz.forEach((q) => {
        const correctOptions = q.options.filter((o) => o.isCorrect);
        expect(correctOptions).toHaveLength(1);
      });
    }
  });

  it('guarantees that after shuffling, every question still has exactly one correct option matching JSON source', () => {
    const shuffledQuiz = buildQuiz('all', 'shuffle');
    expect(shuffledQuiz).toHaveLength(120);

    // Create lookup for original questions
    const originalLookup = new Map<string, { options: string[]; answerIndex: number }>();
    for (const a of questionsRaw.assignments) {
      for (const q of a.questions) {
        originalLookup.set(q.id, { options: q.options, answerIndex: q.answerIndex });
      }
    }

    shuffledQuiz.forEach((q) => {
      // 4 options present
      expect(q.options).toHaveLength(4);

      // Exactly ONE option is marked isCorrect
      const correctOptions = q.options.filter((o) => o.isCorrect);
      expect(correctOptions).toHaveLength(1);

      // The correct option's text must match the original JSON answer text
      const orig = originalLookup.get(q.id)!;
      expect(orig).toBeDefined();
      const expectedCorrectText = orig.options[orig.answerIndex];
      expect(correctOptions[0].text).toBe(expectedCorrectText);
    });
  });

  it('spot-checks specific known questions and corrections', () => {
    const a1 = getAssignmentById('a1')!;
    expect(a1.questions[0].options[a1.questions[0].answerIndex]).toBe('interactions');
    expect(a1.questions[1].options[a1.questions[1].answerIndex]).toBe('Modern taxonomy');
    expect(a1.questions[2].options[a1.questions[2].answerIndex]).toBe('Theophrastus');
    expect(a1.questions[3].options[a1.questions[3].answerIndex]).toBe('Humboldt');

    // Week 9 corrections noted in ROADMAP.md:
    const a9 = getAssignmentById('a9')!;
    // Q5: Water purification
    expect(a9.questions[4].options[a9.questions[4].answerIndex]).toBe('Water purification');
    // Q6: Column
    expect(a9.questions[5].options[a9.questions[5].answerIndex]).toBe('Column');
    // Q7: foresight
    expect(a9.questions[6].options[a9.questions[6].answerIndex]).toBe('foresight');
  });

  it('Fisher-Yates shuffle does not mutate original array and preserves elements', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(original);

    expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(shuffled).toHaveLength(10);
    expect([...shuffled].sort((a, b) => a - b)).toEqual(original);
  });

  it('calculates quiz results and breakdown accurately', () => {
    const quiz = buildQuiz('a1', 'order');
    // Answer 7 correct, 2 wrong, 1 unanswered
    const answers: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      answers[quiz[i].id] = quiz[i].originalAnswerIndex; // correct
    }
    // Wrong answers for 7 and 8
    answers[quiz[7].id] = (quiz[7].originalAnswerIndex + 1) % 4;
    answers[quiz[8].id] = (quiz[8].originalAnswerIndex + 2) % 4;
    // quiz[9] left unanswered

    const result = calculateQuizResult(quiz, answers);
    expect(result.total).toBe(10);
    expect(result.correctCount).toBe(7);
    expect(result.wrongCount).toBe(2);
    expect(result.unansweredCount).toBe(1);
    expect(result.percentage).toBe(70);

    const breakdown = calculateAssignmentBreakdown(quiz, answers);
    expect(breakdown).toHaveLength(1);
    expect(breakdown[0].assignmentId).toBe('a1');
    expect(breakdown[0].correct).toBe(7);
    expect(breakdown[0].total).toBe(10);
    expect(breakdown[0].percentage).toBe(70);
  });
});
