"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
    ArrowUpIcon,
    SquareIcon,
    RotateCwIcon,
    SparklesIcon,
    LightbulbIcon,
    Code2Icon,
    CompassIcon,
    FileTextIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Message, MessageContent } from "@/components/ui/message";
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Markdown } from "@/components/ui/markdown";

type ChatMessage = UIMessage;

const PROMPT_SUGGESTIONS = [
    {
        icon: LightbulbIcon,
        title: "Know Vercel AI SDK",
        prompt: "What is Vecel AI SDK. What can be done with it?",
    },
    {
        icon: Code2Icon,
        title: "Learn SSE(Server Sent Event)",
        prompt: "What is SSE and how to use it. Give a complete example with code.",
    },
    {
        icon: CompassIcon,
        title: "Shadcn UI for AI Components",
        prompt: "How to use Shadcn to create AI Components with AI SDK?",
    },
    {
        icon: FileTextIcon,
        title: "How to use Markdown",
        prompt: "How to use Markdown in AI Chatbox created with AI SDK?",
    },
];

export default function StreamingChatWithShadcn() {
    const [draft, setDraft] = React.useState("");
    const formRef = React.useRef<HTMLFormElement>(null);

    const { messages, sendMessage, setMessages, status, stop } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/stream",
        }),
    });

    const busy = status === "submitted" || status === "streaming";
    const canSend = draft.trim().length > 0 && !busy;

    const handleSend = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || busy) return;
        void sendMessage({ text: trimmed });
        setDraft("");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSend(draft);
    };

    return (
        <MessageScrollerProvider>
            <div className="flex h-dvh w-full flex-col bg-background text-foreground overflow-hidden">
                {/* Top Header */}
                <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <SparklesIcon className="size-4" />
                        </span>
                        <div className="flex items-center gap-1.5 font-semibold text-sm">
                            <span>Gemini 2.5 Flash</span>
                            <span className="text-xs text-muted-foreground font-normal">
                                via AI SDK
                            </span>
                        </div>
                    </div>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8 rounded-full"
                                        aria-label="New chat"
                                        onClick={() => {
                                            setMessages([]);
                                            setDraft("");
                                        }}
                                        disabled={busy && messages.length === 0}
                                    >
                                        <RotateCwIcon className="size-4" />
                                    </Button>
                                }
                            />
                            <TooltipContent side="bottom">New Chat</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </header>

                {/* Message Area */}
                <div className="min-h-0 flex-1 flex flex-col">
                    {messages.length === 0 ? (
                        /* ChatGPT-style Empty Welcome View */
                        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto px-4 text-center">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted mb-4">
                                <SparklesIcon className="size-6 text-foreground" />
                            </div>
                            <h1 className="text-2xl font-semibold mb-2">
                                What can I help with today?
                            </h1>
                            <p className="text-sm text-muted-foreground mb-8">
                                Type your question below or pick a suggestion to get started.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {PROMPT_SUGGESTIONS.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleSend(item.prompt)}
                                            className="flex items-start gap-3 p-3.5 rounded-2xl border bg-card/60 hover:bg-accent/50 text-left transition-colors cursor-pointer text-sm"
                                        >
                                            <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                                            <div>
                                                <div className="font-medium text-foreground">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">
                                                    {item.prompt}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <MessageScroller>
                            <MessageScrollerViewport className="flex-1">
                                <MessageScrollerContent
                                    aria-busy={busy}
                                    className="max-w-3xl mx-auto w-full px-4 py-6 gap-6"
                                >
                                    {messages.map((message) => {
                                        const isUser = message.role === "user";
                                        const reply = message.parts
                                            .filter((part) => part.type === "text")
                                            .map((part) => part.text)
                                            .join("");

                                        return (
                                            <MessageScrollerItem
                                                key={message.id}
                                                messageId={message.id}
                                                scrollAnchor={isUser}
                                            >
                                                <Message align={isUser ? "end" : "start"}>
                                                    <MessageContent className="w-full max-w-full">
                                                        {isUser ? (
                                                            /* User bubble: sleek rounded pill on the right */
                                                            <div className="ml-auto w-fit max-w-[80%] rounded-3xl bg-muted/80 dark:bg-muted/60 px-5 py-3 text-sm whitespace-pre-wrap leading-relaxed">
                                                                {reply}
                                                            </div>
                                                        ) : (
                                                            /* Assistant response: full-width natural text with markdown */
                                                            <div className="w-full text-sm leading-relaxed pl-1">
                                                                {reply ? (
                                                                    <Markdown>{reply}</Markdown>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                                        <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
                                                                        <span>Thinking...</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </MessageContent>
                                                </Message>
                                            </MessageScrollerItem>
                                        );
                                    })}
                                </MessageScrollerContent>
                            </MessageScrollerViewport>
                            <MessageScrollerButton />
                        </MessageScroller>
                    )}
                </div>

                {/* ChatGPT-style Floating Input Bar */}
                <div className="shrink-0 p-4 pt-0">
                    <div className="max-w-3xl mx-auto w-full">
                        <form ref={formRef} onSubmit={onSubmit} className="w-full">
                            <InputGroup className="rounded-[26px] border bg-muted/40 dark:bg-muted/20 px-3 py-2 shadow-xs transition-colors focus-within:border-ring/60 focus-within:bg-background">
                                <InputGroupTextarea
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                    placeholder="Ask Gemini anything..."
                                    aria-label="Message"
                                    className="min-h-12 max-h-48 resize-none bg-transparent border-0 shadow-none focus-visible:ring-0 text-sm leading-relaxed"
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" && !event.shiftKey) {
                                            event.preventDefault();
                                            formRef.current?.requestSubmit();
                                        }
                                    }}
                                />
                                <InputGroupAddon align="block-end" className="pt-1">
                                    {busy ? (
                                        <InputGroupButton
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={stop}
                                            className="size-8 rounded-full ml-auto"
                                            aria-label="Stop generation"
                                        >
                                            <SquareIcon className="size-3.5 fill-current" />
                                        </InputGroupButton>
                                    ) : (
                                        <InputGroupButton
                                            type="submit"
                                            variant="default"
                                            size="icon"
                                            disabled={!canSend}
                                            className="size-8 rounded-full ml-auto disabled:opacity-20 transition-opacity"
                                            aria-label="Send message"
                                        >
                                            <ArrowUpIcon className="size-4" />
                                        </InputGroupButton>
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                        </form>
                        <p className="mt-2 text-center text-[11px] text-muted-foreground">
                            This is Developed using Vercel AI SDK, Next JS, Shadcn, Typescript
                        </p>
                    </div>
                </div>
            </div>
        </MessageScrollerProvider>
    );
}