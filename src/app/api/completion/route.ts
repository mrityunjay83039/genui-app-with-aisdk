import { google } from "@ai-sdk/google";
import { generateText } from "ai";



export async function POST(req: Request) {
    const { prompt } = await req.json();
    const MODEL = process.env.AI_MODEL;
    if (!MODEL) {
        return Response.json(
            { error: "AI_MODEL environment variable is not set" },
            { status: 500 }
        );
    }

    try {
        const { text } = await generateText({
            model: google(MODEL),
            prompt
        })

        return Response.json({ text });
    } catch (error) {
        console.error("error: ", error);
        return Response.json({ error: "Failed to generate text" }, { status: 500 })
    }
}