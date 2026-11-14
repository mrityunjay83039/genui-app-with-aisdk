"use client";

import * as React from "react";
import {
    Streamdown,
    useIsCodeFenceIncomplete,
    type ExtraProps,
} from "streamdown";
import { CheckIcon, CopyIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Copy Button with "Copied!" Feedback                                        */
/* -------------------------------------------------------------------------- */
function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = React.useState(false);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback if clipboard permissions fail
        }
    };

    return (
        <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer select-none"
            aria-label="Copy code"
        >
            {copied ? (
                <>
                    <CheckIcon className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
                </>
            ) : (
                <>
                    <CopyIcon className="size-3.5" />
                    <span className="text-[11px]">Copy code</span>
                </>
            )}
        </button>
    );
}

/* -------------------------------------------------------------------------- */
/* ChatGPT-Style Code Block Container                                         */
/* -------------------------------------------------------------------------- */
function MarkdownCodeBlock({
    code,
    language,
}: {
    code: string;
    language: string;
}) {
    const incomplete = useIsCodeFenceIncomplete();
    const displayLang = language || "code";

    return (
        <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm">
            {/* Top Header Bar */}
            <div className="flex h-9 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 text-xs">
                <span className="font-mono text-xs text-zinc-400 lowercase select-none font-medium">
                    {displayLang}
                </span>
                {!incomplete && <CopyButton code={code} />}
            </div>

            {/* Code Content */}
            <div className="overflow-x-auto p-4 text-[13px] font-mono leading-relaxed text-zinc-100 scrollbar-thin">
                <pre className="m-0 p-0 font-mono">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Code Discriminator (Inline vs Fenced)                                      */
/* -------------------------------------------------------------------------- */
function MarkdownCode({
    node,
    className,
    children,
    ...props
}: React.ComponentProps<"code"> & ExtraProps) {
    // 1. Inline code: e.g. `const name = "Gemini"`
    if (!("data-block" in props)) {
        return (
            <code
                className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground font-medium border border-border/50"
                {...props}
            >
                {children}
            </code>
        );
    }

    // 2. Fenced multi-line code block: ```typescript ... ```
    return (
        <MarkdownCodeBlock
            code={typeof children === "string" ? children.replace(/\n$/, "") : ""}
            language={/language-(\S+)/.exec(className ?? "")?.[1] ?? ""}
        />
    );
}

const DEFAULT_COMPONENTS = {
    code: MarkdownCode,
};

/* -------------------------------------------------------------------------- */
/* Main Markdown Component                                                    */
/* -------------------------------------------------------------------------- */
export function Markdown({
    className,
    components = DEFAULT_COMPONENTS,
    controls = false,
    ...props
}: React.ComponentProps<typeof Streamdown>) {
    return (
        <div className="text-sm leading-relaxed space-y-3">
            <Streamdown
                data-slot="markdown"
                components={components}
                controls={controls}
                className={`cn-markdown w-full min-w-0 overflow-hidden leading-relaxed ${className ?? ""}`}
                {...props}
            />
        </div>
    );
}