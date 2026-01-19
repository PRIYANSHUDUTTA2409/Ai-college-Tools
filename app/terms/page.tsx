import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | AI College Tools',
    description: 'Rules and regulations for the use of AI College Tools Website.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Introduction</h2>
                <p>
                    These terms and conditions outline the rules and regulations for the use of AI College Tools's Website. By accessing this website we assume you accept these terms and conditions. Do not continue to use AI College Tools if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Educational & Informational Purpose</h2>
                <p>
                    The content provided on AI College Tools (including AI-generated project ideas, abstracts, and outlines) is for <strong>educational and informational purposes only</strong>. It is intended to assist students in brainstorming and structuring their work.
                </p>
                <div className="bg-secondary/20 p-4 rounded-lg my-4 border-l-4 border-primary">
                    <p className="font-semibold text-foreground">Disclaimer:</p>
                    <p>We do not condone academic dishonesty or plagiarism. Students are expected to use these tools as a starting point and must add their own research, validation, and original work. We are not responsible for any academic penalties incurred by misuse of our tools.</p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. User Accounts</h2>
                <p>
                    To access certain features, you may be required to register an account. You strictly agree to maintain the confidentiality of your account credentials and are responsible for all activities that occur under your account.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Limitation of Liability</h2>
                <p>
                    In no event shall AI College Tools, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. We do not guarantee the accuracy, completeness, or usefulness of any AI-generated content.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Changes to These Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">6. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at support@aicollegetools.com.
                </p>
            </div>
        </div>
    );
}
