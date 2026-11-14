import Link from "next/link";

const FEATURES = [
  {
    title: "Instant Completions",
    description:
      "Powered by Vercel AI SDK and Google Gemini with clean request handling and retry support.",
  },
  {
    title: "Accessible by Default",
    description:
      "Semantic landmarks, keyboard-first shortcuts, IME-safe submission, and screen-reader feedback.",
  },
  {
    title: "Adaptive Light & Dark UI",
    description:
      "Automatically matches your system color scheme, contrast preferences, and reduced-motion settings.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold">AI Chatbox</span>
          </div>
          <nav aria-label="Primary" className="flex items-center gap-2">
            <Link
              href="/basic-chat"
              className="interactive-btn inline-flex min-h-10 items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3.5 py-2 text-sm font-semibold text-[var(--foreground)]"
            >
              Basic Chat
            </Link>
            <Link
              href="/streaming-chat"
              className="interactive-btn inline-flex min-h-10 items-center rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Streaming Chat
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-1 text-xs font-medium text-[var(--foreground-muted)]">
            Vercel AI SDK + Next.js
          </p>
          <h1 className="mt-5 text-[clamp(2rem,1.4rem+3vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-balance">
            Conversational AI, designed for clarity and speed.
          </h1>
          <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--foreground-muted)] text-pretty sm:text-lg">
            Ask questions, explore ideas, and copy responses effortlessly in a responsive chat interface built with modern web standards.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/basic-chat"
              className="interactive-btn inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--accent-contrast)]"
            >
              <span>Basic Chat</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/streaming-chat"
              className="interactive-btn inline-flex min-h-12 items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-6 py-3 text-base font-semibold text-[var(--foreground)]"
            >
              <span>Streaming Chat</span>
            </Link>
          </div>
        </div>

        <section aria-label="Highlights" className="mt-14 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-xs"
            >
              <h2 className="text-base font-semibold text-balance">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)] text-pretty">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-5 text-center text-xs text-[var(--foreground-muted)]">
        Built with Next.js App Router and Vercel AI SDK
      </footer>
    </div>
  );
}
