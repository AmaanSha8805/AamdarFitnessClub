const GREETINGS = ["hi", "hello", "hey", "namaste"];

const KEYWORD_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["weight loss", "lose weight", "fat loss", "slim"],
    response: `Great goal! Here's a starter weight loss plan for AAMDAR members:

**Training:** 4-5 days/week — mix strength training (3 days) with cardio (2 days). Strength preserves muscle while you lose fat.

**Sample Week:**
- Mon: Full body strength + 15 min incline walk
- Tue: HIIT cardio 20-25 min
- Wed: Upper body + core
- Thu: Rest or light walk
- Fri: Lower body strength
- Sat: 30 min steady-state cardio

**Nutrition:** Aim for a 300-500 calorie deficit. Protein: 1.6-2g per kg bodyweight. Eat whole foods — dal, rice, roti, eggs, paneer, vegetables.

**AAMDAR Tip:** Use our morning batch (5:30-10 AM) for consistency. Track progress weekly in the member portal!

For a personalized plan, try our AI Workout Generator or visit the gym for a free consultation.`,
  },
  {
    keywords: ["muscle", "gain", "bulk", "hypertrophy", "bigger"],
    response: `Muscle building at AAMDAR — here's your roadmap:

**Training:** 4-5 days/week, focus on compound lifts with progressive overload.

**Push/Pull/Legs Split:**
- Day 1 Push: Bench press, OHP, incline DB, tricep dips
- Day 2 Pull: Deadlifts, rows, pull-ups, bicep curls
- Day 3 Legs: Squats, leg press, RDL, calf raises
- Day 4: Repeat or rest

**Nutrition:** Caloric surplus of 300-500 cal. Protein: 2g/kg. Carbs around workouts. Sleep 7-8 hours.

**Key:** Add weight or reps every week. Our QR equipment guides show perfect form for every machine.

Want a custom plan? Head to /workout-generator on our website!`,
  },
  {
    keywords: ["eat", "food", "diet", "nutrition", "protein", "calorie", "meal"],
    response: `Nutrition basics for AAMDAR members:

**Protein targets:** 1.6-2.2g per kg bodyweight daily. Sources: eggs, chicken, fish, paneer, dal, whey.

**Post-workout:** Eat within 1-2 hours — protein + carbs (e.g., banana + whey, dal chawal, paneer roti).

**Indian-friendly meals:**
- Breakfast: Oats + eggs + fruit
- Lunch: Dal + rice + sabzi + curd
- Dinner: Grilled protein + roti + salad
- Snacks: Peanuts, fruit, protein shake

**Hydration:** 3-4 litres water daily, more on training days.

For a personalized diet plan, speak with our trainers or enquire on WhatsApp!`,
  },
  {
    keywords: ["beginner", "start", "new", "first time"],
    response: `Welcome to AAMDAR Fitness Club! Beginner guide:

**Week 1-2:** Learn form on machines using our QR Equipment Guide. Start with 3 days/week.

**Starter workout (Full Body):**
1. Leg press — 3×12
2. Lat pulldown — 3×10
3. Chest press machine — 3×10
4. Shoulder press machine — 3×10
5. Plank — 3×30 sec

**Tips:**
- Start light, focus on form
- Rest 60-90 sec between sets
- Morning batch: 5:30-10 AM | Evening: 4-9 PM
- Location: Ganpati Chowk, Aamdar Complex, Parbhani

Join online at our website or WhatsApp us to get started!`,
  },
  {
    keywords: ["timing", "hours", "open", "time", "when", "batch"],
    response: `AAMDAR Fitness Club timings:

🌅 **Morning Batch:** 5:30 AM – 10:00 AM
🌆 **Evening Batch:** 4:00 PM – 9:00 PM
📅 **Days:** Monday – Saturday

📍 **Location:** Ganpati Chowk, Aamdar Complex, Parbhani 431401

For membership pricing, visit /packages or WhatsApp us directly!`,
  },
  {
    keywords: ["price", "cost", "fee", "membership", "plan", "join"],
    response: `AAMDAR membership plans (₹):

- **Monthly:** ₹1,500
- **Quarterly:** ₹4,000
- **Half-Yearly:** ₹7,500 ⭐ Most Popular
- **Annual:** ₹12,000
- **Personal Training Add-on:** ₹5,000/month
- **Couple Plan:** ₹7,000/quarter

All plans include gym access, locker, and AI coach access.

Join online at /join or WhatsApp us for a tour!`,
  },
  {
    keywords: ["whatsapp", "contact", "call", "phone", "location", "address"],
    response: `Contact AAMDAR Fitness Club:

📍 Ganpati Chowk, Aamdar Complex, Parbhani 431401, Maharashtra
📞 Check our website footer for phone number
💬 WhatsApp us directly from the green button on any page
📧 Or use the contact form at /contact

We'd love to show you around the gym!`,
  },
];

export function getFallbackChatResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  if (GREETINGS.some((g) => lower === g || lower.startsWith(g + " "))) {
    return `Hey there! 💪 I'm your AI fitness coach at AAMDAR Fitness Club, Parbhani.

I can help with:
- Workout plans (weight loss, muscle gain, beginner)
- Nutrition & diet advice
- Gym timings & membership info
- Equipment guidance

What would you like to know? Try asking "Create a weight loss plan" or "What should I eat post-workout?"`;
  }

  for (const { keywords, response } of KEYWORD_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }

  return `Thanks for your question! As your AAMDAR Fitness Club AI coach, I'm here to help with workouts, nutrition, and gym-related queries.

For your question about "${userMessage.slice(0, 80)}${userMessage.length > 80 ? "..." : ""}" — I'd recommend:

1. **Visit our AI Workout Generator** at /workout-generator for a personalized plan
2. **Browse equipment guides** at /equipment-guide with QR codes
3. **Speak with our trainers** in person for hands-on guidance
4. **WhatsApp us** for immediate help with membership or specific questions

Keep pushing — every rep counts! 🔥`;
}
