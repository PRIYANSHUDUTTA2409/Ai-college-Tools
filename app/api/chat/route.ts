export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    // Debug logging (Server-side only)
    console.log("[API] Checking Groq API Key...");
    if (apiKey) {
      console.log(`[API] Key exists. Length: ${apiKey.length}`);
    } else {
      console.error("[API] GROQ_API_KEY is missing from process.env");
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    // Parse body safely
    const body = await req.json();
    const { message, systemPrompt } = body;

    // Basic validation
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("[API] Sending request to Groq SDK...");

    // Construct messages simply
    const messages = [
      ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
      { role: "user" as const, content: message },
    ];

    // Minimal stable request
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const result = completion.choices[0]?.message?.content || "";
    console.log("[API] Received response from Groq. Length:", result.length);

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error("GROQ API ERROR:", error); 
    // Log full object if possible
    if (error?.error) console.error("Full Error Details:", JSON.stringify(error.error, null, 2));

    return NextResponse.json(
      {
        error: "Groq request failed",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
