import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, UIMessage } from "ai";

export async function POST(req: Request) {

    const { message }: { message: UIMessage[] } = await req.json();

    const response = streamText({
        model: process.env.NODE_ENV,
        instructions: "",
        prompt: await convertToModelMessages(message)
    })

    return createUIMessageStreamResponse({
        stream: toUIMessageStream({ stream: response.stream })
    })

}