# 🌿 Wildlife Ecology (2026) — NPTEL MOOC Practice Quiz

A fast, modern, and accessible practice quiz website for the **NPTEL "Wildlife Ecology (2026)"** weekly assignments.

Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **All 120 Curated MCQs**: All 12 assignments (10 questions each) directly sourced from official course materials with verified errata corrections (Week 9 Q5, Q6, Q7).
- **Two Flexible Quiz Modes**:
  - **In Order**: Questions and options in their original chronological order.
  - **Fisher–Yates Shuffled**: True randomized shuffling of both question order and option positions. Answer correctness is decoupled from position and evaluated by boolean flag.
- **Assignment-Wise & Full Mock**:
  - Practice any single assignment (10 questions).
  - Take the comprehensive **120-question mock exam** with an assignment-by-assignment mastery breakdown at the end.
- **Instant Interactive Feedback**:
  - Locking question mechanism upon choice.
  - Correct answer highlights in green, incorrect choice highlights in red while revealing the correct answer.
- **Keyboard Shortcuts**:
  - `1` – `4` or `A` – `D`: Select options.
  - `→` or `Enter`: Next question.
  - `←`: Previous question.
- **Question Palette**:
  - Number grid showing live state: Unanswered (grey), Correct (green), Wrong (red).
  - One-click navigation to jump between questions.
- **Progress & Best Scores**:
  - Saved in browser `localStorage` with safe try/catch error handling.
  - Refreshing mid-quiz does not lose your in-progress answers or active question.
  - Best scores displayed on dashboard cards.
- **Review & Targeted Practice**:
  - Complete review list showing your choices vs correct answers.
  - Filter by **All**, **Wrong only**, or **Skipped**.
  - **Retry Missed Questions**: Starts a focused quiz containing only the questions you got wrong.
- **Design & Accessibility**:
  - Earthy nature theme (greens, sage, dark moss slate).
  - Dark mode support with instant toggle.
  - Fully responsive across desktop, tablet, and mobile (tested at 375px+).
  - High-contrast focus rings and `prefers-reduced-motion` support.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

### 3. Run Unit Tests (Vitest)
```bash
npm test
```
Runs the full suite verifying question counts, option structures, Fisher-Yates shuffle integrity, and scoring formulas.

### 4. Build for Production
```bash
npm run build
```

---

## 🚢 Deploying to Vercel

This repository is ready for zero-config deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub (already linked to `https://github.com/vandit-bajaj/wildlife-ecology-MOOC-quiz.git`).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import `wildlife-ecology-MOOC-quiz`.
4. Keep default settings:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`
5. Click **Deploy**!

---

## 📖 Course Credit & Attribution

- **Course**: NPTEL "Wildlife Ecology" (2026)
- **Built by**: Vandit Bajaj
- **Inspiration**: [ala-quiz.vercel.app](https://ala-quiz.vercel.app/)
