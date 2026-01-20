export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const { message, systemPrompt } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages = [
      ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ✅ MOST STABLE
      messages,
      temperature: 0.7,
    });

    return NextResponse.json({
      result: completion.choices[0]?.message?.content || "",
    });

  } catch (error: any) {
    console.error("GROQ API ERROR:", error);
    return NextResponse.json(
      {
        error: "Groq request failed",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
