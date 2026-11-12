import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbox",
  description: "Chat with Gemini in an accessible, adaptive workspace.",
};

export default function ChatboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

