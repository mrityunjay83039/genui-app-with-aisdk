"use client";

import ChatForm from "@/components/ChatForm";
import { FC } from "react";


const genui: FC = () => {
    const handleOnSubmit = () => {

    }

    const handleOnStop = () => {

    }

    return <ChatForm status="streaming" onSubmit={handleOnSubmit} handleOnStop={handleOnStop} />

}
export default genui;