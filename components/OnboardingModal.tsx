'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Using Input for selects for now or we can use native select or create Select component
import { GraduationCap, CheckCircle2 } from 'lucide-react';

const DEGREES = ['B.Tech', 'BCA', 'MCA', 'Diploma', 'Other'];
const BRANCHES = ['CSE', 'ISE', 'ECE', 'EEE', 'Mech', 'Civil', 'Other'];

export function OnboardingModal() {
    const { user, updateProfile } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [degree, setDegree] = useState(DEGREES[0]);
    const [branch, setBranch] = useState(BRANCHES[0]);

    useEffect(() => {
        // Show modal if user is logged in BUT has no degree set
        if (user.isLoggedIn && !user.degree) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [user.isLoggedIn, user.degree]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(degree as any, branch as any);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <Card className="w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Tell us about yourself</CardTitle>
                    <CardDescription>
                        We use this to personalize your project ideas and AI results.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Degree / Qualification</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            >
                                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Branch / Major</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>

                        <Button type="submit" className="w-full mt-4">
                            Save & Continue <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
