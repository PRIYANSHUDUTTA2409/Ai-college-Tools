'use client';

import { useState } from 'react';
import { useAiTool } from '@/hooks/use-ai-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Loader2 } from 'lucide-react';

export default function ProjectIdeasPage() {
    const [branch, setBranch] = useState('');
    const [interest, setInterest] = useState('');

    const systemPrompt = `You are a creative academic assistant. Generate 5 unique and practical college project ideas based on the student's branch and interests. 
  Output strictly in this JSON format:
  {
    "items": [
      {
        "title": "Project Title",
        "description": "Detailed description of the project, problem it solves, and its scope.",
        "techStack": ["React", "Node.js", "MongoDB"]
      }
    ]
  }
  Ensure the ideas are suitable for final year college projects.`;

    const { loading, error, data, generate } = useAiTool<{ items: any[] }>({
        systemPrompt,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Branch: ${branch}, Interests: ${interest}. Generate 5 ideas.`;
        generate(message);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-8">AI Project Idea Generator</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Enter Your Details</CardTitle>
                    <CardDescription>We'll generate tailored project ideas for you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Branch / Major</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="e.g. Computer Science, Mechanical"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Interests / Skills</label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="e.g. AI, IoT, Web Dev"
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Ideas...
                                </>
                            ) : (
                                'Generate Ideas'
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
                    <h2 className="text-2xl font-bold">Suggested Projects</h2>
                    <div className="grid gap-6">
                        {data.items.map((item: any, index: number) => (
                            <Card key={index} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                                <CardHeader className="bg-muted/30">
                                    <CardTitle className="text-xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="mb-4 text-muted-foreground">{item.description}</p>
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2">Recommended Tech Stack:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.techStack.map((tech: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
