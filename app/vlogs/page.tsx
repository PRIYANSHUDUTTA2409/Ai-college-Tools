'use client';

import { useState } from 'react';
import { Play, Filter, Calendar } from 'lucide-react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface Video {
    id: number;
    thumbnail: string;
    title: string;
    duration: string;
    description: string;
    views: string;
    date: string;
}

const videos: Video[] = [
    {
        id: 1,
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        title: "How to Build a Portfolio that Hires You",
        duration: "12:45",
        description: "Learn the secrets to creating a developer portfolio that stands out to recruiters.",
        views: "1.2k",
        date: "2 days ago"
    },
    {
        id: 2,
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        title: "Final Year Project Ideas 2024",
        duration: "08:30",
        description: "Top 5 project ideas for CS students using React, AI, and Blockchain.",
        views: "5.4k",
        date: "1 week ago"
    },
    {
        id: 3,
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        title: "Mastering React Hooks",
        duration: "15:20",
        description: "A complete guide to using useState, useEffect, and custom hooks effectively.",
        views: "3.1k",
        date: "3 weeks ago"
    },
    {
        id: 4,
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        title: "AI Tools for Students",
        duration: "10:15",
        description: "Boost your productivity with these 10 amazing AI tools for students.",
        views: "2.8k",
        date: "1 month ago"
    }
];
const categories = ["All", "Top Tutorials", "Final Year Projects", "Career Tips", "AI Tools"];

export default function VlogsPage() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Banner */}
            <div className="bg-muted/30 py-16 md:py-24 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Student <span className="text-primary">Vlogs & Tutorials</span>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat)}
                                className="rounded-full"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {videos.map((video) => (
                        <Card key={video.id} className="group overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card rounded-2xl flex flex-col">
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video overflow-hidden cursor-pointer">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                    <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <Play className="h-6 w-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                                    {video.duration}
                                </div>
                            </div>

                            <CardContent className="p-4 flex-1 flex flex-col">
                                <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                                    {video.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
                                    {video.description}
                                </p>
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground/80 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Play className="h-3 w-3" /> {video.views} views
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {video.date}
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="sm" className="w-full text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" asChild>
                                        <NextLink href="/ideas">
                                            Try this tool &rarr;
                                        </NextLink>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mb-16">
                    <AdPlaceholder />
                </div>
            </div>
        </div>
    );
}
