# 🤖 AI SDK + Next.js + shadcn/ui Playground

> A comprehensive, hands-on playground exploring the full power of the **Vercel AI SDK**, **Next.js (App Router)**, and **shadcn/ui** powered by **Google Gemini**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-v7-black?style=flat-square&logo=vercel)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Provider-Google%20Gemini-4285F4?style=flat-square&logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)

---

## 📌 Project Overview

This repository is dedicated to systematically building and testing everything possible with the **Vercel AI SDK**. From standard completions to real-time token streaming, generative UI, complex tool calling, structured outputs, and agentic workflows—all wrapped in clean, accessible, and responsive user interfaces using **shadcn/ui** and **Tailwind CSS v4**.

---

## 🚀 Capabilities & Roadmap

| Feature | Description | Status |
| :--- | :--- | :---: |
| **Text Completion** | Single-turn generation with `generateText` and server route handlers | ✅ Complete |
| **Real-time Streaming** | Low-latency token streaming with `streamText`, `useChat`, and `smoothStream` | ✅ Complete |
| **Adaptive UI** | Accessible, keyboard-first chat with system dark/light mode support | ✅ Complete |
| **Tool / Function Calling** | Server and client tool executions (APIs, calculators, web search) | 🚧 In Progress |
| **Generative UI (GenUI)** | AI streaming interactive React components directly into chat threads | 🚧 In Progress |
| **Structured Outputs** | Strict type-safe JSON extraction with `generateObject` and Zod schemas | 📋 Planned |
| **Multi-Modal AI** | Image analysis, file parsing, and audio interactions | 📋 Planned |
| **Multi-Step Agents** | Reasoning loops, tool approvals, and human-in-the-loop interactions | 📋 Planned |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **AI Engine**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (`ai`, `@ai-sdk/react`)
- **LLM Provider**: [Google Gemini via `@ai-sdk/google`](https://github.com/vercel/ai/tree/main/packages/google)
- **Language**: TypeScript

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── completion/        # Single-turn completion endpoint (generateText)
│   │   │   └── stream/            # Streaming chat endpoint (streamText)
│   │   ├── frontend/
│   │   │   ├── chatbox/           # Standard single-turn completion chat interface
│   │   │   └── stream/            # Live streaming multi-turn chat interface (useChat)
│   │   ├── globals.css            # Design tokens, accessibility, and theme styling
│   │   ├── layout.tsx             # Root layout with Geist font & colorScheme metadata
│   │   └── page.tsx               # Landing page with feature showcases
│   └── components/                # Reusable UI components & widgets
├── public/                        # Static assets & SVG icons
├── .env.local                     # Local environment keys (ignored from git)
└── README.md
```

---

## 🌿 Branching Strategy

This project follows a modular **Feature Branch Workflow** to ensure the `main` branch remains clean and production-ready:

- **`main`**: The stable branch containing tested, polished, and ready-to-run implementations.
- **`feature/<name>`**: Dedicated experimental branches for each distinct AI capability (e.g., `feature/basic-setup`, `feature/tool-calling`, `feature/generative-ui`).

To start a new feature:
```bash
git checkout -b feature/<feature-name>
```

---

## ⚡ Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Google AI Studio API Key**: Get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mrityunjay83039/genui-app-with-aisdk.git
cd genui-app-with-aisdk
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Default Gemini Model
AI_MODEL=gemini-2.5-flash
```

> **Note**: Never commit `.env.local` to git. It is automatically ignored in `.gitignore`.

### 4. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- Visit `/` for the overview landing page.
- Visit `/frontend/chatbox` for the completion chat interface.
- Visit `/frontend/stream` for the live streaming multi-turn chat.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
