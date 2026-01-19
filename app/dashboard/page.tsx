'use client';

import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, FileText, Presentation, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useUser();

    if (!user.isLoggedIn) {
        // Ideally middleware handles this, but for client-side auth:
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <Button asChild><Link href="/login">Go to Login</Link></Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user.email.split('@')[0]}! 👋</h1>
                    <p className="text-muted-foreground mt-1">
                        {user.degree && user.branch ? `${user.degree} in ${user.branch}` : 'Student'} • Ready to build something new?
                    </p>
                </div>
                <Button asChild>
                    <Link href="/ideas">New Project Idea <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/ideas'}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Project Generator</CardTitle>
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Ideas</div>
                        <p className="text-xs text-muted-foreground mt-1">Generate fresh topics</p>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/abstract'}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Abstract Writer</CardTitle>
                        <FileText className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Abstracts</div>
                        <p className="text-xs text-muted-foreground mt-1">Write professional summaries</p>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/ppt'}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">PPT Creator</CardTitle>
                        <Presentation className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Outlines</div>
                        <p className="text-xs text-muted-foreground mt-1">Structure your slides</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" /> Recent Activity
                </h2>
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        No recent activity yet. Start by generating a project idea!
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
