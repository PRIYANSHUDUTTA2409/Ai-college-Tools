import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | AI College Tools',
    description: 'Our commitment to protecting your privacy and data.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>
                    At one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AI College Tools and how we use it.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
                <p>
                    We collect minimal information to provide and improve our services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li> We may collect personal information that you voluntarily provide to us when you register on the website (e.g., email address) or express an interest in obtaining information about us or our products and services.</li>
                    <li> We may collect non-personal information about your interactions with the website, such as pages visited and time spent, to analyze performance.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new services, features, and functionality</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. Google AdSense & DoubleClick Cookie</h2>
                <p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>.
                </p>
                <p className="mt-2">
                    Our advertising partners may use cookies and web beacons on our site. Our advertising partners include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Google AdSense</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Analytics</h2>
                <p>
                    We use Google Analytics to monitor and analyze the use of our Service. Google Analytics involves the use of cookies to collect data about your traffic interactions. You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Third Party Privacy Policies</h2>
                <p>
                    AI College Tools's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">6. Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>
            </div>
        </div>
    );
}
