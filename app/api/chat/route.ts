import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge'; // Optional: Use edge runtime if preferred, or remove for Node.js

export async function POST(req: Request) {
    try {
        // Validate API Key
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { message, systemPrompt } = body;

        // Validate Input
        if (!message || !systemPrompt) {
            return NextResponse.json(
                { error: 'Missing required fields: message or systemPrompt' },
                { status: 400 }
            );
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            response_format: { type: 'json_object' }, // Enforce JSON output
            temperature: 0.7,
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error('No content received from OpenAI');
        }

        // Parse JSON safely
        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON response from AI' },
                { status: 500 }
            );
        }

        return NextResponse.json(parsedContent);

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
