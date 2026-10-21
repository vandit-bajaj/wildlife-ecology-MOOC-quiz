'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Mail, Layers } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.8 1.05.81-.23 1.68-.35 2.55-.35.86 0 1.74.12 2.55.35 1.95-1.33 2.8-1.05 2.8-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.96-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48 3.97-1.36 6.84-5.19 6.84-9.71C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.39c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.49H9.45V9h3.41v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.39v6.33ZM5.34 7.44A2.06 2.06 0 1 1 5.33 3.3a2.06 2.06 0 0 1 .01 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-emerald-950/70 bg-stone-50/80 dark:bg-[#090e0b]/80 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold text-stone-900 dark:text-stone-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-700/10 dark:bg-emerald-500/15 border border-emerald-600/20 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            🌿
          </span>
          <div className="flex flex-col">
            <span className="text-base tracking-tight font-bold">Wildlife Ecology</span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono tracking-wider uppercase -mt-0.5">
              NPTEL 2026
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          {pathname !== '/dashboard' && (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          )}

          <div className="h-4 w-px bg-stone-300 dark:bg-stone-800 mx-1 hidden sm:block" />

          {/* Social / Contact Dock */}
          <div className="flex items-center gap-0.5 sm:gap-1 text-stone-600 dark:text-stone-400">
            <a
              href="https://github.com/vandit-bajaj/wildlife-ecology-MOOC-quiz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="p-2 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
              className="p-2 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:placeholder@example.com"
              aria-label="Email"
              title="Contact Email"
              className="p-2 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-px bg-stone-300 dark:bg-stone-800 mx-1" />

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
