import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

interface Props {
    params: {
        slug: string;
    };
}

// SSG: Generate params for all posts
export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// SEO: Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; // Await params in newer Next.js versions if needed, though usually strict
    // Note: params in generateMetadata is a promise in Next.js 15+, but let's handle strictness safely.
    // Actually, standard type is Props.

    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | AI College Tools`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className="min-h-screen pb-20">
            {/* Progress/Nav Bar could go here */}

            <div className="container mx-auto px-4 max-w-3xl py-12">
                <Button variant="ghost" size="sm" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                    <Link href="/blog" className="text-muted-foreground hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Link>
                </Button>

                {/* Article Header */}
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime} min read</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-foreground">
                        {post.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {post.description}
                    </p>
                </header>

                <AdPlaceholder />

                <div className="my-10 h-px bg-border/50" />

                {/* Markdown Content */}
                <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-img:shadow-lg">
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Footer / CTA */}
                <div className="mt-16 pt-10 border-t">
                    <div className="bg-secondary/30 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
                        <p className="text-muted-foreground mb-6">
                            Don't just read about it. Use our AI tools to generate the perfect project for your resume.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="/ideas">Generate Project Ideas</Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="rounded-full">
                                <Link href="/abstract">Write Abstract</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <AdPlaceholder />
                </div>
            </div>
        </div>
    );
}
