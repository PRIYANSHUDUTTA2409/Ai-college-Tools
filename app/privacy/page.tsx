export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">1. Introduction</h2>
                <p>
                    Welcome to AI Tools for College Projects. We respect your privacy and are committed to protecting your personal data.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">2. Data Collection</h2>
                <p>
                    We do not collect any personal information when you use our AI tools. The input data you provide (project details, etc.) is sent to OpenAI API for processing and is not stored by us.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">3. Third-Party Services</h2>
                <p>
                    We use Google AdSense to serve ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-2 text-foreground">4. Cookies</h2>
                <p>
                    We may use cookies to improve user experience. You can choose to disable cookies through your browser settings.
                </p>
            </div>
        </div>
    );
}
