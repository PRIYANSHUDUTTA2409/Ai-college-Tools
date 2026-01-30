export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma"; // Import singleton Prisma client

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
    const { message, systemPrompt, email, branch, skills, tool } = body; // Extract extra fields

    // Basic validation
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // User Tracking & Logging (Non-blocking / Fail-safe)
    // ---------------------------------------------------------
    try {
      const userEmail = email || null; // Null for anonymous users

      // 1. Identify User
      let userId: string | null = null;

      if (userEmail) {
        // Find or create identifiable user
        const user = await prisma.user.upsert({
          where: { email: userEmail },
          update: {
            usageCount: { increment: 1 },
            lastLogin: new Date()
          },
          create: {
            email: userEmail,
            usageCount: 1,
            lastLogin: new Date()
          }
        });
        userId = user.id;
      } else {
        // Anonymous user - just log search without creating a User record 
        // OR create a specialized anonymous record if needed. 
        // Requirement says: "If email does NOT exist: Create a new anonymous User (email = null)."
        // BUT Prisma schema says email is unique and String, not optional?
        // Let's check schema: email String @unique. It is NOT optional.
        // So we cannot create a user with email=null.
        // ADAPTATION: We will skip creating a User record for anonymous users to avoid constraint violations,
        // unless we want to use a fake email. 
        // Re-reading Constraint: "Create a new anonymous User (email = null)".
        // Schema definition: "email String @unique". 
        // This is a conflict. I will SKIP user creation for now to be safe, 
        // OR I must update schema to `email String? @unique` to allow multiple changes.
        // "String? @unique" allows ONLY ONE null in some SQL dialects, multiple in Postgres.
        // Safest approach without changing schema again: Log it as anonymous in SearchLog, skip User record creation.
        // Wait, the user *just* asked me to modify the code.
        // Let's look at the requirement again: "If email does NOT exist: Create a new anonymous User (email = null)."
        // The User model I defined earlier: `email String @unique`.
        // I cannot fulfil "email = null" with the current schema.
        // FIX: I will log the search with userId = null.
        console.log("Anonymous user: skipping User creation due to schema constraints.");
      }

      // 2. Log Search
      await prisma.searchLog.create({
        data: {
          userId: userId, // Link to user if exists
          email: userEmail,
          tool: tool || "unknown_tool",
          query: `Message: ${message.substring(0, 50)}... | Branch: ${branch || 'N/A'} | Skills: ${skills || 'N/A'}`,
        }
      });

      console.log(`[DB] Logged search for ${userEmail || 'anonymous'}`);

    } catch (dbError) {
      // Vital: Do not fail the API call if DB logging fails
      console.error("[DB Error] Failed to log usage:", dbError);
    }
    // ---------------------------------------------------------

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
      max_tokens: 4096,
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
