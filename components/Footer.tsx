import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">AI College Tools</h3>
                        <p className="text-sm text-muted-foreground">
                            Helping students achieve academic excellence with AI-powered tools.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Tools</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ideas" className="text-muted-foreground hover:text-primary">
                                    Idea Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/abstract" className="text-muted-foreground hover:text-primary">
                                    Abstract Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/ppt" className="text-muted-foreground hover:text-primary">
                                    PPT Outline
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AI College Tools. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
