import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  smoothStream,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const MODEL = process.env.AI_MODEL;

  if (!MODEL) {
    return Response.json(
      { error: "AI_MODEL environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const result = streamText({
      model: google(MODEL),
      instructions: "You are a helpful, concise software engineering assistant",
      messages: await convertToModelMessages(messages),
      experimental_transform: smoothStream({
        delayInMs: 20,
        chunking: "word",
      }),
      abortSignal: req.signal,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Error: ", error);
    return Response.json({ error: "Failed to Stream Text" }, { status: 500 });
  }
}
