import { google } from "@ai-sdk/google";
import { generateText } from "ai";



export async function POST(req: Request) {
    const { prompt } = await req.json();
    const MODEL = process.env.AI_MODEL;
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