import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streaming Chat",
  description: "Live streaming multi-turn chat powered by Vercel AI SDK and Gemini.",
};

export default function StreamingChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

