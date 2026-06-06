import { NextRequest, NextResponse } from "next/server";
import { anthropic, EQUIPMENT_GUIDE_SYSTEM_PROMPT, CLAUDE_MODEL } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { equipmentName, imageBase64, mode } = body;

    if (mode === "photo" && imageBase64) {
      const response = await anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: EQUIPMENT_GUIDE_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: imageBase64,
                },
              },
              {
                type: "text",
                text: "Identify this gym equipment and provide a complete exercise guide in JSON format.",
              },
            ],
          },
        ],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      return NextResponse.json({ guide: JSON.parse(text) });
    }

    if (mode === "browse" && equipmentName) {
      const response = await anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: EQUIPMENT_GUIDE_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Generate a complete exercise guide for: ${equipmentName}. Respond in JSON format only.`,
          },
        ],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
      return NextResponse.json({ guide: JSON.parse(cleaned) });
    }

    return NextResponse.json(
      { error: "Invalid request. Provide equipmentName or imageBase64." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Equipment API error:", error);
    return NextResponse.json(
      { error: "Failed to generate equipment guide" },
      { status: 500 }
    );
  }
}
