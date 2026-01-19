'use client';

import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface AccessGateProps {
    children: React.ReactNode;
}

export function AccessGate({ children }: AccessGateProps) {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-muted-foreground animate-pulse">Loading access...</div>
            </div>
        );
    }

    if (!user.isLoggedIn) {
        return (
            <div className="relative min-h-[600px] w-full overflow-hidden rounded-xl border bg-background/50">
                {/* Blurred Content Placeholder */}
                <div className="absolute inset-0 blur-md opacity-20 pointer-events-none select-none p-8" aria-hidden="true">
                    {children}
                </div>

                {/* Lock Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-10 p-6 text-center">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Student Access Required</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                        This AI tool is exclusive to registered students. Login for free to generate unlimited project ideas and downloads.
                    </p>
                    <Button size="lg" className="rounded-full px-8" asChild>
                        <Link href="/login">
                            Login to Unlock
                        </Link>
                    </Button>
                    <p className="mt-4 text-xs text-muted-foreground">
                        No credit card required. 100% Free for students.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
