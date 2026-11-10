"use client";
import { useState } from "react";

const ChatBox = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    const handleSubmit = async (e: FormDataEvent) => {
        e.preventDefault();
        setLoading(true);
        setPrompt("");

        try {
            const res = await fetch("/api/completion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt })
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "something went wrong!")
            }
            setResponse(data.text);

        } catch (error) {
            console.log(error);
            setError(error instanceof Error ? error.message : "something went wrong!");

        } finally {
            setLoading(false);
        }
    }


    return <div className="flex-col gap-5 p-5">
        {/* Response will display here */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? <div>Loading...</div> : <div className="flex justify-center p-2 mb-4 outline border-gray-500 min-h-100 rounded-sm h-[90vh]">{response}</div>}

        {/* ChatBox Form fields */}
        <form onSubmit={handleSubmit} name="chatbox" className="flex justify-center gap-2">
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="How may i help you today?" className="outline border-black rounded-sm w-50 p-2" />
            <button type="submit" className="outline p-2 rounded-sm text-blue-500">Send</button>
        </form>
    </div>
}

export default ChatBox;