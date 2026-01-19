'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Small delay to prevent hydration mismatch/flicker
            const timer = setTimeout(() => {
                setShowConsent(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookie = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setShowConsent(false);

        // Reload page to activate analytics scripts if they depend on this check immediately,
        // or typically analytics component will check on mount.
        // However, since we conditionally render analytics component based on this value
        // and layout doesn't re-render entire tree on client state change easily for script injection,
        // a reload ensures the script is injected fresh.
        window.location.reload();
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-fade-in">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-background/95 backdrop-blur-md border shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h3 className="font-semibold text-lg">We value your privacy</h3>
                        <p className="text-sm text-muted-foreground">
                            We use cookies to enhance your experience and analyze site traffic.
                            By clicking "Accept", you agree to our use of cookies.
                            <Link href="/privacy-policy" className="text-primary hover:underline ml-1">
                                Learn more
                            </Link>.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowConsent(false)} className="rounded-full">
                            Close
                        </Button>
                        <Button onClick={acceptCookie} className="rounded-full shadow-md">
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
