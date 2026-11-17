"use client";

import ChatForm from "@/components/ChatForm";
import ChatHeader from "@/components/ChatHeader";
import MessageArea from "@/components/MessageArea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import React, { FC, useState } from "react";


const genui: FC = () => {
    const [draft, setDraft] = useState("");
    const { messages, setMessages, sendMessage, status, stop } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/genui"
        })
    });
    const busy = status === "submitted" || status === "streaming";
    const canSend = draft.trim().length > 0 && !busy;
    const handleOnSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = draft?.trim();
        if (!text || busy) {
            return;
        }
        void sendMessage({ text: text });
        setDraft("");
    }



    return (
        <>
            <ChatHeader messages={messages} setMessages={setMessages} setDraft={setDraft} busy={busy} />
            <MessageArea busy={busy} messages={messages} />
            <ChatForm onSubmit={handleOnSubmit} handleOnStop={stop} busy={busy} canSend={canSend} draft={draft} setDraft={setDraft} />
        </>
    )

}
export default genui;