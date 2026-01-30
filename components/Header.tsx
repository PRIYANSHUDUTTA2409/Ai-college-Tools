'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Project Ideas', href: '/ideas' },
        { name: 'Abstract Generator', href: '/abstract' },
        { name: 'PPT Outline', href: '/ppt' },
        { name: 'Vlogs', href: '/vlogs' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        AI College Tools
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-full transition-all duration-200"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pl-2 flex items-center gap-2">
                        <Button variant="ghost" className="hidden lg:inline-flex rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/50" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild className="hidden lg:inline-flex bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                            <Link href="/ideas">Get Started</Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 bg-background/95 backdrop-blur-md absolute w-full shadow-xl">
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-2 flex flex-col gap-2">
                            <Button variant="ghost" className="w-full rounded-full justify-start px-4" asChild>
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                            </Button>
                            <Button asChild className="w-full rounded-full">
                                <Link href="/ideas" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
