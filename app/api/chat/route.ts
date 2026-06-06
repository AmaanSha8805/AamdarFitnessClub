import { NextRequest, NextResponse } from "next/server";
import { anthropic, AI_COACH_SYSTEM_PROMPT, CLAUDE_MODEL } from "@/lib/claude";
import { getFallbackChatResponse } from "@/lib/ai-fallbacks";

async function streamText(text: string): Promise<Response> {
  const encoder = new TextEncoder();
  const words = text.split(" ");
  const readable = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        controller.enqueue(encoder.encode(words[i] + (i < words.length - 1 ? " " : "")));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const userText = lastUser?.content || "";

    if (!process.env.ANTHROPIC_API_KEY) {
      return streamText(getFallbackChatResponse(userText));
    }

    try {
      const stream = await anthropic.messages.stream({
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        system: AI_COACH_SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        },
      });

      return new Response(readable, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch {
      return streamText(getFallbackChatResponse(userText));
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
