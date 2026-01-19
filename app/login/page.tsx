'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useUser();
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        // Simulate sending OTP
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep('otp');
        setIsSubmitting(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return;

        setIsSubmitting(true);
        // Simulate verifying OTP (accept any OTP for now)
        await login(email);

        // Redirect to dashboard (or home for now)
        router.push('/');
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
            <Card className="w-full max-w-md shadow-lg border-none">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome Student!</CardTitle>
                    <CardDescription>
                        {step === 'email'
                            ? "Enter your email to receive a magic code."
                            : `Code sent to ${email}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'email' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="student@college.edu"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    className="h-12 px-4 bg-muted/50"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold rounded-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Enter 6-digit code (Use 123456)"
                                    value={otp}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                                    className="h-12 px-4 bg-muted/50 text-center tracking-widest text-lg font-mono"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold rounded-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-xs text-muted-foreground hover:text-primary transition-colors text-center"
                            >
                                Wrong email? Go back
                            </button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center border-t py-6 bg-muted/10">
                    <p className="text-xs text-muted-foreground text-center">
                        By logging in, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
