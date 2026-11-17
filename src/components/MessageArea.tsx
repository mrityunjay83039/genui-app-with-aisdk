"use client";

import { TerminalIcon } from "lucide-react";
import { Markdown } from "./ui/markdown";
import { Message, MessageContent } from "./ui/message";
import { MessageScrollerContent, MessageScrollerViewport, MessageScroller, MessageScrollerItem, MessageScrollerButton, MessageScrollerProvider } from "./ui/message-scroller";
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceIcon, TraceLine, TraceTitle } from "./ui/trace";
import { CodeBlock } from "streamdown";
import { CodeBlockContent } from "./ui/code-block";

const MessageArea = ({ messages, busy, }) => {
    return <MessageScrollerProvider>
        <MessageScroller>
            <MessageScrollerViewport className="flex-1">
                <MessageScrollerContent
                    aria-busy={busy}
                    className="max-w-3xl mx-auto w-full px-4 py-6 gap-6"
                >
                    {messages.map((message) => {
                        const isUser = message.role === "user";
                        return message.parts.map((part, index) => {
                            switch (part.type) {
                                case "text":
                                    return <MessageScrollerItem key={`${message.id}-${index}`} messageId={message.id} scrollAnchor={isUser}>
                                        <Message align={isUser ? "end" : "start"}>
                                            <MessageContent className="w-full max-w-full">
                                                {isUser ? (
                                                    /* User bubble: sleek rounded pill on the right */
                                                    <div className="ml-auto w-fit max-w-[80%] rounded-3xl bg-muted/90 dark:bg-muted/60 px-5 py-3 text-sm whitespace-pre-wrap leading-relaxed shadow-2xs">
                                                        {part.text}
                                                    </div>
                                                ) : (
                                                    /* Assistant response: full-width natural text with markdown */
                                                    <div className="w-full text-sm leading-relaxed text-foreground pl-1">
                                                        {part.text ? (
                                                            <Markdown>{part.text}</Markdown>
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

                                case "tool-getWeather": {
                                    const partKey = `${message.id}-${index}`;
                                    const output = part.output as { temp?: number; tempmin?: number; tempmax?: number; error?: string } | undefined;
                                    const isError = part.state === "output-error" || Boolean(output?.error);

                                    return (
                                        <Trace key={partKey}>
                                            <TraceCollapsible defaultOpen>
                                                <TraceCollapsibleTrigger>
                                                    <TraceLine status={isError ? "error" : undefined}>
                                                        <TraceIcon>
                                                            <TerminalIcon />
                                                        </TraceIcon>
                                                        <TraceTitle>{isError ? "Weather Tool Failed" : "Weather Tool Called"}</TraceTitle>
                                                    </TraceLine>
                                                </TraceCollapsibleTrigger>
                                                <TraceCollapsibleContent>
                                                    <CodeBlock size="sm">
                                                        <CodeBlockContent wrap className="max-h-64">
                                                            {part.state === "output-error" ? (
                                                                part.errorText
                                                            ) : part.state === "output-available" ? (
                                                                output?.error ? (
                                                                    <p className="text-destructive font-sans">{output.error}</p>
                                                                ) : output?.temp != null ? (
                                                                    <div>
                                                                        <p>Temperature: {Math.round(output.temp)}°C</p>
                                                                        <p>Min Temp.: {output.tempmin != null ? `${Math.round(output.tempmin)}°C` : "N/A"}</p>
                                                                        <p>Max Temp.: {output.tempmax != null ? `${Math.round(output.tempmax)}°C` : "N/A"}</p>
                                                                    </div>
                                                                ) : (
                                                                    "Please check the city name"
                                                                )
                                                            ) : (
                                                                <div className="text-muted-foreground animate-pulse">Fetching weather data...</div>
                                                            )}
                                                        </CodeBlockContent>
                                                    </CodeBlock>
                                                </TraceCollapsibleContent>
                                            </TraceCollapsible>
                                        </Trace>
                                    );
                                }
                                default:
                                    return null;
                            }
                        })

                    })}
                </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
        </MessageScroller>
    </MessageScrollerProvider>
}

export default MessageArea;