import { NextRequest, NextResponse } from "next/server";
import { anthropic, CLAUDE_MODEL } from "@/lib/claude";

const SYSTEM_PROMPT = `You are an expert fitness coach at AAMDAR Fitness Club, Parbhani. Generate personalized workout plans. Always respond in valid JSON:
{
  "summary": "brief plan overview",
  "weeklySplit": [
    { "day": "Monday", "focus": "Chest & Triceps", "exercises": ["Bench Press 4x8", "..."] }
  ],
  "tips": ["tip1", "tip2"]
}
Include 5-6 training days. Be specific with sets and reps. Tailor to user's goal and experience.`;

export async function POST(request: NextRequest) {
  try {
    const { age, weight, height, goal, experience } = await request.json();

    if (!age || !weight || !height || !goal || !experience) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        plan: getFallbackPlan(goal, experience),
      });
    }

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Create a workout plan for: Age ${age}, Weight ${weight}kg, Height ${height}cm, Goal: ${goal}, Experience: ${experience}. JSON only.`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const plan = JSON.parse(cleaned);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Workout generator error:", error);
    return NextResponse.json(
      { error: "Failed to generate workout plan" },
      { status: 500 }
    );
  }
}

function getFallbackPlan(goal: string, experience: string) {
  return {
    summary: `A ${experience}-level ${goal.replace("_", " ")} program designed for AAMDAR Fitness Club members.`,
    weeklySplit: [
      {
        day: "Monday",
        focus: "Push — Chest & Shoulders",
        exercises: [
          "Bench Press 4×8-10",
          "Incline Dumbbell Press 3×10",
          "Shoulder Press 3×10",
          "Lateral Raises 3×15",
          "Tricep Pushdowns 3×12",
        ],
      },
      {
        day: "Tuesday",
        focus: "Pull — Back & Biceps",
        exercises: [
          "Deadlift 4×6",
          "Lat Pulldown 3×10",
          "Seated Row 3×10",
          "Face Pulls 3×15",
          "Barbell Curls 3×12",
        ],
      },
      {
        day: "Wednesday",
        focus: "Legs",
        exercises: [
          "Squats 4×8",
          "Leg Press 3×12",
          "Romanian Deadlift 3×10",
          "Leg Curls 3×12",
          "Calf Raises 4×15",
        ],
      },
      {
        day: "Friday",
        focus: "Upper Body",
        exercises: [
          "Pull-ups 3×max",
          "Dumbbell Bench 3×10",
          "Cable Flyes 3×12",
          "Hammer Curls 3×12",
        ],
      },
      {
        day: "Saturday",
        focus: "Cardio & Core",
        exercises: [
          "20 min treadmill intervals",
          "Planks 3×60s",
          "Hanging Leg Raises 3×15",
          "Russian Twists 3×20",
        ],
      },
    ],
    tips: [
      "Warm up 10 minutes before every session",
      "Progressive overload — add weight when you hit top reps",
      "Rest 48 hours between training same muscle groups",
      "Stay hydrated and prioritize protein intake",
    ],
  };
}
