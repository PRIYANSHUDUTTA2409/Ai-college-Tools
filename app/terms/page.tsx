export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">2. Use License</h2>
                <p>
                    Permission is granted to temporarily use the materials on AI Tools for College Projects for personal, non-commercial transitory viewing only.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">3. Disclaimer</h2>
                <p>
                    The materials on this website are provided "as is". The AI-generated content is for reference and educational purposes only. We make no warranties regarding the accuracy or reliability of the results.
                </p>
            </div>
        </div>
    );
}
