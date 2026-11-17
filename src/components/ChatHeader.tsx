"use client";

import { Button } from "@base-ui/react";
import { RotateCwIcon, SparklesIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatHeader = ({ messages, setMessages, setDraft, busy }) => {
    return (
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
        </header>)
}

export default ChatHeader;

