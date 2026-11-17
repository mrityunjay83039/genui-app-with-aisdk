"use client";

import ChatForm from "@/components/ChatForm";
import ChatHeader from "@/components/ChatHeader";
import MessageArea from "@/components/MessageArea";
import { useChat } from "@ai-sdk/react";
import { FC, useState } from "react";


const genui: FC = () => {
    const [draft, setDraft] = useState("");
    const { messages, setMessages, status, stop } = useChat();
    const busy = status === "submitted" || status === "streaming";
    const canSend = draft.trim().length > 0 && !busy;
    const handleOnSubmit = () => {

    }



    return (
        <>
            <ChatHeader messages={messages} setMessages={setMessages} setDraft={setDraft} busy={busy} />
            <MessageArea busy={busy} messages={messages} />
            <ChatForm status="streaming" onSubmit={handleOnSubmit} handleOnStop={stop} busy={busy} canSend={canSend} draft={draft} setDraft={setDraft} />
        </>
    )

}
export default genui;