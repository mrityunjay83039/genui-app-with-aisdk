import { google } from "@ai-sdk/google";
import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, UIMessage } from "ai";

export async function POST(req: Request) {

    const { messages }: { messages: UIMessage[] } = await req.json();
    const MODEL = process.env.AI_MODEL;
    if (!MODEL) {
        return Response.json(
            { error: "AI_MODEL environment variable is not set" },
            { status: 500 }
        );
    }

    const response = streamText({
        model: google(MODEL),
        instructions: "hepful ai assitant",
        messages: await convertToModelMessages(messages)
    })

    return createUIMessageStreamResponse({
        stream: toUIMessageStream({ stream: response.stream })
    })

}