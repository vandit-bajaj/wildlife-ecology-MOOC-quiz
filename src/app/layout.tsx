import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wildlife Ecology Quiz | NPTEL 2026',
  description:
    'Comprehensive practice quiz for the 12 NPTEL Wildlife Ecology (2026) course assignments. 120 MCQs with instant feedback, explanations, and shuffled modes.',
  keywords: [
    'Wildlife Ecology',
    'NPTEL',
    'MOOC',
    'Quiz',
    'Exam Prep',
    'Assignments',
    'Multiple Choice Questions',
  ],
  authors: [{ name: 'Vandit Bajaj' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfdfa] text-[#1c2620] dark:bg-[#090e0b] dark:text-[#ecf3ee] transition-colors">
        <ThemeProvider>
          <div className="flex-1 flex flex-col min-h-screen nature-gradient">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
