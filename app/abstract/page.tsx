'use client';

import { useState } from 'react';
import { useAiTool } from '@/hooks/use-ai-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Loader2 } from 'lucide-react';
import { AccessGate } from '@/components/AccessGate';

export default function AbstractPage() {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const systemPrompt = `You are an academic writing assistant. Write a professional abstract for the college project described by the user.
  Output strictly in this JSON format:
  {
    "items": [
      {
        "title": "Abstract",
        "description": "The full abstract text...",
        "techStack": ["Keyword 1", "Keyword 2", "Keyword 3"]
      }
    ]
  }
  The abstract should be around 200-300 words, formal, and structured.`;

    const { loading, error, data, generate } = useAiTool<{ items: any[] }>({
        systemPrompt,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Project Title: ${title}\nProject Details: ${details}`;
        generate(message);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">AI Abstract Generator</h1>

            <AccessGate>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>Enter your project info to generate a professional abstract.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Title</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="e.g. Smart Traffic Management System"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Description / Key Points</label>
                                <textarea
                                    required
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="Briefly describe what your project does..."
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Abstract...
                                    </>
                                ) : (
                                    'Generate Abstract'
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
                        <h2 className="text-2xl font-bold">Generated Abstract</h2>
                        {data.items.map((item: any, index: number) => (
                            <Card key={index} className="overflow-hidden border-2">
                                <CardContent className="pt-6">
                                    <div className="prose max-w-none dark:prose-invert">
                                        <p className="whitespace-pre-wrap leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t">
                                        <h4 className="font-semibold text-sm mb-2">Keywords:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.techStack.map((tech: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </AccessGate>
        </div>
    );
}
