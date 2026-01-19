import Link from 'next/link';
import { ArrowRight, Lightbulb, FileText, Presentation, Sparkles, Code2, Cpu, Globe, CheckCircle2, ChevronRight, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI College Tools – Project Ideas, Abstract & PPT Generator',
  description: 'Finish your college projects faster with free AI tools. Generate unique ideas, abstracts, and PPT outlines designed for engineering and science students.',
};

export default function Home() {
  const tools = [
    {
      title: 'Project Ideas Generator',
      description: 'Get unique and innovative college project ideas based on your branch and interests.',
      icon: Lightbulb,
      href: '/ideas',
      color: 'from-amber-500 to-orange-500',
      preview: 'Smart Waste Management using IoT...'
    },
    {
      title: 'Abstract Generator',
      description: 'Generate professional project abstracts and summaries instantly.',
      icon: FileText,
      href: '/abstract',
      color: 'from-blue-500 to-cyan-500',
      preview: 'This project aims to automate...'
    },
    {
      title: 'PPT Outline generator',
      description: 'Create structured presentation outlines for your project defense.',
      icon: Presentation,
      href: '/ppt',
      color: 'from-purple-500 to-pink-500',
      preview: 'Slide 1: Introduction, Slide 2...'
    },
  ];

  const features = [
    { title: "Final Year Project Ideas", icon: Lightbulb, desc: "Tailored to your branch (CSE, ECE, Mech)." },
    { title: "AI Abstract Writing", icon: FileText, desc: "Academic tone and proper formatting." },
    { title: "Seminar & PPT Generator", icon: Presentation, desc: "slide-by-slide content structure." },
    { title: "Saves 5–10 Hours", icon: ClockIcon, desc: "Skip the research struggle." },
  ];

  const faqs = [
    { q: "Is this free for students?", a: "Yes! All our tools are currently 100% free for students to use." },
    { q: "Can I use this for final year projects?", a: "Absolutely. Our AI is trained to generate academic-level project content suitable for B.Tech, BCA, and MCA final years." },
    { q: "Is AI-generated content allowed?", a: "Use these tools as a brainstorming partner. Always review and customize the content to add your own research and voice." },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 animate-fade-in border border-border/50">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Supercharge your academic journey</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl leading-tight">
          Finish Your College Projects <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Faster with AI
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          Get instant project ideas, abstracts, and PPT outlines designed specifically for engineering and science students.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
          <Button size="lg" className="rounded-full px-8 text-base shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all" asChild>
            <Link href="/ideas">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 text-base hover:bg-secondary/50" asChild>
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium animate-fade-in delay-100">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => <div key={i} className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground">🎓</div>)}
            </div>
            ⭐ Trusted by 1,000+ students
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            For B.Tech, BCA, MCA & Diploma
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-background relative z-10 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What You Get</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit to supercharge your academic projects from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Project Ideas", icon: Lightbulb, desc: "AI-generated topics tailored to your branch." },
              { title: "Abstract Generator", icon: FileText, desc: "Professional summaries ready for submission." },
              { title: "PPT Outlines", icon: Presentation, desc: "Structured slide decks for your defense." },
              { title: "Video Tutorials", icon: Users, desc: "Expert vlogs and step-by-step guides." }
            ].map((item, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 hidden md:block" />
            {[
              { step: "01", title: "Choose a Tool", desc: "Select from our specialized AI tools." },
              { step: "02", title: "Enter Details", desc: "Input your branch, topic, or area of interest." },
              { step: "03", title: "Get Results", desc: "Receive instant, tailored project content." }
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border relative">
                <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center font-bold absolute -top-5 left-1/2 -translate-x-1/2 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mt-4 mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Power Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to go from "blank page" to "project done".
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.title} className="group border-none shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-base mt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono truncate opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-primary font-bold">Output:</span> {tool.preview}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full group-hover:bg-primary/90" asChild>
                  <Link href={tool.href}>
                    Generate Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <f.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl p-6 bg-card hover:bg-muted/20 transition-colors">
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                {faq.q}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Get Weekly Project Ideas</h2>
          <p className="mb-8 opacity-90">Join 1,000+ students receiving the latest AI trends and project topics.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 rounded-full px-4 py-3 text-foreground focus:outline-none" />
            <Button variant="secondary" className="rounded-full px-6 font-bold">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
