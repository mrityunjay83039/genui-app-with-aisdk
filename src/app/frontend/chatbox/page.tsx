"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useId, useState } from "react";

const ChatBox = () => {
  const [prompt, setPrompt] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  const inputId = useId();

  const { messages, sendMessage, stop, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/stream",
    })
  });
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="shrink-0 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </span>
            <h1 className="text-base font-semibold tracking-tight">AI Chatbox</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-5 sm:px-6">
        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="flex shrink-0 items-center gap-2.5 rounded-xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        )}

        {/* Response will display here */}
        <div className="chat-scroller flex-1 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-xs sm:p-6">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-[var(--foreground-muted)]">
              <progress
                aria-label="Loading response"
                className="loading-spinner"
              />
              <span className="text-sm font-medium">Loading...</span>
            </div>
          ) : messages ? messages.map((m) => {
            return <p className="mx-auto max-w-[65ch] whitespace-pre-wrap break-words text-[0.95rem] leading-relaxed text-[var(--foreground)] text-pretty">
              Role: {m.role}
              {m.parts.map((response, index) => {
                if (response.type === 'text') {
                  return <span key={index}>{response.text}</span>;
                }
                return null;
              })}
            </p>
          }) : (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-[var(--foreground-muted)]">
                Your response will display here.
              </p>
            </div>
          )
          }
        </div >

        {/* ChatBox Form fields */}
        < form
          onSubmit={handleSubmit}
          name="chatbox"
          className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-2 shadow-xs transition-colors focus-within:border-[var(--accent)]"
        >
          <label htmlFor={inputId} className="visually-hidden">
            Prompt
          </label>
          <input
            id={inputId}
            name="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How may I help you today?"
            className="min-h-11 flex-1 rounded-xl bg-transparent px-3 py-2 text-base text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="interactive-btn inline-flex min-h-11 min-w-20 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-55"
          >
            Send
          </button>
        </form >
      </main >
    </div >
  );
};

export default ChatBox;
