<div align="center">

# 🌿 Wildlife Ecology (2026) — Practice Quiz

**An interactive, accessible, and fast practice quiz platform for the NPTEL "Wildlife Ecology (2026)" course.**

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-15803d?style=for-the-badge&logo=vercel&logoColor=white)](https://wildlife-ecology-mooc-quiz.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-7%20Passed-729B1B?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

<p align="center">
  <a href="https://wildlife-ecology-mooc-quiz.vercel.app"><strong>Explore The Live App »</strong></a>
  <br />
  <a href="https://wildlife-ecology-mooc-quiz.vercel.app/dashboard">View Dashboard</a>
  ·
  <a href="https://wildlife-ecology-mooc-quiz.vercel.app/quiz/all">Full 120-Q Mock</a>
  ·
  <a href="https://github.com/vandit-bajaj/wildlife-ecology-MOOC-quiz/issues">Report Issue</a>
</p>

Designed and developed with care by **[Vandit Bajaj](https://www.linkedin.com/in/vandit-bajaj-373829209/)**.

</div>

---

## 📖 Overview

Preparing for NPTEL certification exams by reading static PDF answer sheets is passive and often leads to overconfidence. **Wildlife Ecology Quiz** turns the complete 12-week course curriculum (120 questions across 12 assignments) into an active, test-driven study experience.

### Key Highlights
* **Active Recall**: Immediate answer validation with locked choices and auto-reveal of correct options.
* **Anti-Memorization Engine**: Uses the **Fisher–Yates algorithm** to randomize question sequences and option choices so you learn concepts, not option letters.
* **Targeted Revision**: Finished a quiz with mistakes? Click **"Retry only wrong questions"** to focus solely on your knowledge gaps.
* **Zero Friction**: No accounts, no logins, and no servers. Runs entirely in your browser with automatic `localStorage` persistence.

---

## 🎯 Quiz Modes

| Mode | Description | Best For |
|---|---|---|
| **Assignment-Wise (In Order)** | 10 questions per weekly assignment, in chronological textbook order. | Initial weekly practice and conceptual revision. |
| **Assignment-Wise (Shuffled)** | 10 questions shuffled with randomized option order (A, B, C, D). | Testing recall without positional bias. |
| **Full Mock (In Order)** | All 120 questions from Assignment 1 to 12 in sequence. | End-of-semester comprehensive review. |
| **Full Mock (Shuffled)** | All 120 questions and all options randomized via Fisher–Yates. | Simulating true exam conditions. |

---

## ✨ Features

- **120 Verified Questions**: Direct import from official NPTEL course assignments, including verified corrections for errata (Week 9 Q5, Q6, Q7).
- **Keyboard Shortcuts**: Complete hands-on-keyboard navigation for speed:
  - `1` – `4` or `A` – `D`: Select option.
  - `→` or `Enter`: Advance to next question.
  - `←`: Return to previous question.
- **Interactive Question Palette**: Visual numbered grid tracking unanswered (grey), correct (green), and incorrect (red) questions.
- **Full Assignment Analytics**: Detailed mastery table breaking down your score assignment-by-assignment at the end of the full mock.
- **Offline Progress Saving**: Safe, SSR-guarded `localStorage` sync ensures refreshing never loses your current quiz or best scores.
- **Nature Theme & Dark Mode**: Organic earth and emerald tones, smooth micro-interactions, and accessible high-contrast focus indicators.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Unit Testing** | [Vitest](https://vitest.dev/) (7 passing test suites) |
| **Hosting** | [Vercel](https://vercel.com/) (Edge CDN prerendered) |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/vandit-bajaj/wildlife-ecology-MOOC-quiz.git
cd wildlife-ecology-MOOC-quiz
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** (or `http://localhost:3001` if port 3000 is occupied).

### 3. Run Test Suite
```bash
npm test
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider, Navbar & Footer
│   ├── page.tsx                # Landing hero page with course overview
│   ├── globals.css             # Nature theme tokens & a11y focus rings
│   ├── icon.svg                # Vector leaf favicon
│   ├── dashboard/
│   │   ├── page.tsx            # Dashboard SEO page metadata
│   │   └── DashboardClient.tsx # 12 assignment cards + full quiz card
│   └── quiz/[id]/
│       ├── page.tsx            # Static params generator & suspense boundary
│       └── QuizClient.tsx      # Core quiz engine, timer, and state machine
├── components/
│   ├── AssignmentCard.tsx      # Responsive card with mode toggles & badges
│   ├── ConfirmationModal.tsx   # Unanswered warning modal
│   ├── Footer.tsx              # Minimalist footer with quote & author links
│   ├── FullQuizCard.tsx        # Hero card for the 120-question mock
│   ├── ModeToggle.tsx          # Segmented pill toggle (In order vs Shuffled)
│   ├── Navbar.tsx              # Sticky header with social links & theme toggle
│   ├── OptionButton.tsx        # Interactive locking MCQ option button
│   ├── ProgressBar.tsx         # Live score counter and progress tracker
│   ├── QuestionCard.tsx        # Question container with tags and feedback
│   ├── QuestionPalette.tsx     # Color-coded interactive jump grid
│   ├── ResultSummary.tsx       # Score cards, retry actions & analytics
│   ├── ReviewList.tsx          # Filterable question review (All/Wrong/Skipped)
│   ├── ThemeProvider.tsx       # Dark/Light mode context provider
│   └── ThemeToggle.tsx         # Sun/Moon animated switch
├── data/
│   └── questions.json          # Master source of 120 MCQs with answers
└── lib/
    ├── quiz.ts                 # Fisher-Yates shuffle, quiz builders, score helpers
    ├── storage.ts              # SSR-safe localStorage persistence wrapper
    ├── types.ts                # TypeScript interfaces
    └── quiz.test.ts            # Vitest unit tests for verification
```

---

## 👨‍💻 Author

**Vandit Bajaj**
* **LinkedIn**: [linkedin.com/in/vandit-bajaj-373829209](https://www.linkedin.com/in/vandit-bajaj-373829209/)
* **GitHub**: [@vandit-bajaj](https://github.com/vandit-bajaj)

---

## 📄 License & Attribution

- Built as an open-source study companion for the **NPTEL "Wildlife Ecology (2026)"** MOOC.
- Design inspiration: [ala-quiz.vercel.app](https://ala-quiz.vercel.app/).
