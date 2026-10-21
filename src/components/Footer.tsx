import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200/80 dark:border-emerald-950/70 bg-stone-100/50 dark:bg-[#080d0a]/60 py-8 px-4 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
        <figure className="text-center sm:text-left">
          <blockquote className="italic font-serif text-stone-700 dark:text-stone-300">
            &ldquo;In nature, nothing exists alone.&rdquo;
          </blockquote>
          <figcaption className="text-xs text-stone-500 dark:text-stone-500 mt-0.5">
            — Rachel Carson, Silent Spring
          </figcaption>
        </figure>

        <div className="flex flex-col sm:items-end items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              Vandit Bajaj
            </span>
            <span>•</span>
            <a
              href="https://github.com/vandit-bajaj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/vandit-bajaj-373829209/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-[11px] text-stone-500">
            NPTEL &ldquo;Wildlife Ecology (2026)&rdquo; Course Study Companion
          </p>
        </div>
      </div>
    </footer>
  );
}
