import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "./ui/input-group";
import React from "react";

const ChatForm = ({ onSubmit, status, handleOnStop }) => {
    const [draft, setDraft] = React.useState("");
    const formRef = React.useRef<HTMLFormElement>(null);
    const busy = status === "submitted" || status === "streaming";
    const canSend = draft.trim().length > 0 && !busy;

    return <form ref={formRef} onSubmit={onSubmit} className="w-full">
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
                        size="icon-sm"
                        onClick={handleOnStop}
                        className="size-8 rounded-full ml-auto"
                        aria-label="Stop generation"
                    >
                        <SquareIcon className="size-3.5 fill-current" />
                    </InputGroupButton>
                ) : (
                    <InputGroupButton
                        type="submit"
                        variant="default"
                        size="icon-sm"
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
}
export default ChatForm;