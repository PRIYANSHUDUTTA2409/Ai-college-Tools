export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl text-muted-foreground mb-6">
                    AI Tools for College Projects is dedicated to helping students succeed in their academic journey through the power of artificial intelligence.
                </p>
                <p className="mb-4">
                    We understand the pressure students face when it comes to final year projects, presentations, and submissions. Our mission is to simplify the brainstorming and content creation process, allowing you to focus on the core implementation and learning.
                </p>
                <h2 className="text-2xl font-bold mt-8 mb-4">Our Tools</h2>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li><strong>Project Idea Generator:</strong> Get tailored ideas based on your specific branch and interests.</li>
                    <li><strong>Abstract Generator:</strong> Create professional abstracts that summarize your work effectively.</li>
                    <li><strong>PPT Outline Generator:</strong> Structure your presentations logically for maximum impact.</li>
                </ul>
                <h2 className="text-2xl font-bold mt-8 mb-4">Technology</h2>
                <p>
                    Our platform is built using the latest web technologies including Next.js 14, TypeScript, and OpenAI's advanced language models. We prioritize speed, reliability, and user privacy.
                </p>
            </div>
        </div>
    );
}// Force redeploy – env fix
