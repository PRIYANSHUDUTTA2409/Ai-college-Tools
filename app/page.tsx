import Link from 'next/link';
import { ArrowRight, Lightbulb, FileText, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const tools = [
    {
      title: 'Project Ideas Generator',
      description: 'Get unique and innovative college project ideas based on your branch and interests.',
      icon: Lightbulb,
      href: '/ideas',
      color: 'text-yellow-500',
    },
    {
      title: 'Abstract Generator',
      description: 'Generate professional project abstracts and summaries instantly.',
      icon: FileText,
      href: '/abstract',
      color: 'text-blue-500',
    },
    {
      title: 'PPT Outline generator',
      description: 'Create structured presentation outlines for your project defense.',
      icon: Presentation,
      href: '/ppt',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-5xl">
          AI Tools for <span className="text-primary">College Projects</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground text-xl">
          Supercharge your academic journey with our free AI-powered assistants. From ideation to presentation, we've got you covered.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/ideas">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {tools.map((tool) => (
          <Card key={tool.title} className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <tool.icon className={`h-12 w-12 mb-4 ${tool.color}`} />
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Optional content Preview or specific details */}
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={tool.href}>
                  Try functionality <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why use our AI tools?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left mt-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">Save Time</h3>
            <p className="text-muted-foreground">Skip the writer's block and get instant results for your project needs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Better Quality</h3>
            <p className="text-muted-foreground">Generated content follows academic standards and best practices.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Free to Use</h3>
            <p className="text-muted-foreground">All tools are completely free for students. No hidden charges.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
