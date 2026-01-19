'use client';

import { useState } from 'react';
import { useAiTool } from '@/hooks/use-ai-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Loader2 } from 'lucide-react';

import { sendGAEvent } from '@/lib/analytics'; // Add import
import { AccessGate } from '@/components/AccessGate';

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

        // Track Event
        sendGAEvent({
            action: 'generate_ideas',
            category: 'AI Tool',
            label: `Branch: ${branch}, Interest: ${interest}`,
        });

        generate(message);
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-muted/30 py-12 md:py-20 mb-8">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        AI Project <span className="text-primary">Idea Generator</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Tell us what you like, and we'll generate the perfect college project idea for you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                <AccessGate>
                    <Card className="mb-12 border-none shadow-card">
                        <CardHeader className="bg-card rounded-t-2xl pb-2">
                            <CardTitle className="text-xl">Enter Your Details</CardTitle>
                            <CardDescription>We'll generate tailored project ideas for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/80">Branch / Major</label>
                                        <input
                                            required
                                            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-sm"
                                            placeholder="e.g. Computer Science, Mechanical"
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/80">Interests / Skills</label>
                                        <input
                                            required
                                            className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-sm"
                                            placeholder="e.g. AI, IoT, Web Dev"
                                            value={interest}
                                            onChange={(e) => setInterest(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-12 text-base rounded-full shadow-md hover:shadow-lg transition-all" size="lg" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Ideas...
                                        </>
                                    ) : (
                                        'Generate Ideas'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mb-12">
                        <AdPlaceholder />
                    </div>

                    {error && (
                        <div className="p-4 mb-8 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center">
                            {error}
                        </div>
                    )}

                    {data && data.items && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-border flex-1" />
                                <h2 className="text-2xl font-bold text-center">Suggested Projects</h2>
                                <div className="h-px bg-border flex-1" />
                            </div>

                            <div className="grid gap-6">
                                {data.items.map((item: any, index: number) => (
                                    <Card key={index} className="overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-300 group">
                                        <CardHeader className="bg-secondary/40 border-b border-border/50 pb-4">
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <p className="mb-6 text-muted-foreground leading-relaxed">{item.description}</p>
                                            <div>
                                                <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Recommended Tech Stack</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.techStack.map((tech: string, i: number) => (
                                                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
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
                </AccessGate>
            </div>
        </div>
    );
}
