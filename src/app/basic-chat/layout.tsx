import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Chat",
  description: "Chat with Gemini in an accessible, adaptive workspace.",
};

export default function BasicChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

