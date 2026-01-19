import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-muted/40 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">AI</span>
                            </div>
                            <h3 className="font-bold text-lg tracking-tight">AI College Tools</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering students with next-gen AI tools for smarter, faster, and better academic projects.
                            <br /><span className="text-xs opacity-70 mt-2 block">We do not store personal academic data.</span>
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Tools</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/ideas" className="text-muted-foreground hover:text-primary transition-colors">
                                    Idea Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/abstract" className="text-muted-foreground hover:text-primary transition-colors">
                                    Abstract Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="/ppt" className="text-muted-foreground hover:text-primary transition-colors">
                                    PPT Outline
                                </Link>
                            </li>
                            <li>
                                <Link href="/vlogs" className="text-muted-foreground hover:text-primary transition-colors">
                                    Vlogs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AI College Tools. Made with ❤️ for Students.</p>
                </div>
            </div>
        </footer>
    );
}
