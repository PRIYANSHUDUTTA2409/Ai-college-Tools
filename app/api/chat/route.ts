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

    const body = await req.json();
    const { message, systemPrompt } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages: any[] = [];

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }

    messages.push({ role: "user", content: message });

    // Log key status
    const currentKey = process.env.GROQ_API_KEY;
    console.log("API Key Status:", currentKey ? "Present" : "Missing", "Key length:", currentKey?.length);

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    // Attempt to parse JSON from the response
    let parsedData;
    try {
      parsedData = JSON.parse(content);
    } catch (e) {
      // If direct parse fails, try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch (e2) {
          console.error("Failed to extract JSON:", e2);
          parsedData = { result: content, error: "Failed to parse JSON" };
        }
      } else {
        // Fallback if no JSON found
        parsedData = { result: content };
      }
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("GROQ API ERROR:", error);
    return NextResponse.json(
      {
        error: error?.message || "Request failed",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
