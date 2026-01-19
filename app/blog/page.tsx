import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | AI College Tools',
    description: 'Latest articles, guides, and project ideas for engineering students.',
};

export default function BlogListingPage() {
    const posts = getBlogPosts();

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-muted/30 py-16 md:py-20 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Student <span className="text-primary">Resource Hub</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tutorials, project ideas, and career tips for the modern engineering student.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Card key={post.slug} className="group flex flex-col hover:shadow-lg transition-all duration-300 border-none shadow-md overflow-hidden">
                            {/* Image Placeholder (Optional - can add images to frontmatter later) */}
                            <div className="h-48 bg-gradient-to-br from-primary/5 to-secondary/50 w-full flex items-center justify-center text-muted-foreground/20">
                                <span className="text-4xl text-primary/20 font-bold">Blog</span>
                            </div>

                            <CardHeader>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <CardTitle className="leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-2 mt-2">
                                    {post.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0">
                                <Button variant="ghost" className="p-0 h-auto font-semibold hover:bg-transparent hover:text-primary" asChild>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No articles found. Check back later!
                    </div>
                )}
            </div>
        </div>
    );
}
