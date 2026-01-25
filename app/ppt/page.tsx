'use client';

import { useState } from 'react';
import { useAiTool } from '@/hooks/use-ai-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Loader2 } from 'lucide-react';
import { AccessGate } from '@/components/AccessGate';

export default function PPTPage() {
    const [topic, setTopic] = useState('');

    const systemPrompt = `You are a presentation expert. Create a detailed 10-slide PowerPoint presentation outline for the given project topic.
  Output strictly in this JSON format:
  {
  "items": [
    {
      "title": "Slide Title",
      "description": "Content here. Use \\n for line breaks, do NOT use actual newlines.",
      "techStack": ["Visual suggestion"]
    }
  ]
}
Ensure logical flow. IMPORTANT: Return VALID JSON only. Escape all special characters. No trailing commas.`;

    const { loading, error, data, generate } = useAiTool<{ items: any[] }>({
        systemPrompt,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Project Topic: ${topic}. Create PPT outline.`;
        generate(message);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">AI PPT Outline Generator</h1>

            <AccessGate>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Presentation Topic</CardTitle>
                        <CardDescription>Get a structured outline for your presentation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Name / Topic</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="e.g. Blockchain Voting System"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Outline...
                                    </>
                                ) : (
                                    'Generate Outline'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <AdPlaceholder />

                {error && (
                    <div className="p-4 mb-8 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                        {error}
                    </div>
                )}

                {data && data.items && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Presentation Outline</h2>
                        <div className="grid gap-4">
                            {data.items.map((item: any, index: number) => (
                                <Card key={index} className="border-l-4 border-l-primary">
                                    <CardHeader className="py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                                                {index + 1}
                                            </span>
                                            <CardTitle className="text-lg">{item.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-4 pl-16">
                                        <div className="whitespace-pre-wrap text-muted-foreground mb-3 font-mono text-sm leading-relaxed">
                                            {item.description}
                                        </div>
                                        {item.techStack && item.techStack.length > 0 && (
                                            <div className="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                                                💡 {item.techStack[0]}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </AccessGate>
        </div>
    );
}
