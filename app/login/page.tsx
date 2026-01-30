'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, ArrowRight, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState<'email' | 'password'>('email');
    const [isNewUser, setIsNewUser] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useUser();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleCheckEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/auth/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Failed to check email');
            const data = await res.json();
            setIsNewUser(!data.exists);
            setStep('password');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;
        setError(null);
        setIsSubmitting(true);

        try {
            await login(email, password, isNewUser);
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <Card className="w-full max-w-[400px] shadow-xl border-none bg-white rounded-2xl overflow-hidden">
                <CardHeader className="text-center space-y-4 pt-10 pb-2">
                    <div className="mx-auto w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner ring-1 ring-blue-600/20">
                        {step === 'email' ? (
                            <Mail className="h-7 w-7 text-blue-600" />
                        ) : isNewUser ? (
                            <UserPlus className="h-7 w-7 text-blue-600" />
                        ) : (
                            <LogIn className="h-7 w-7 text-blue-600" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                            {step === 'email' ? 'Welcome back' : isNewUser ? 'Create Account' : 'Welcome back'}
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-base">
                            {step === 'email'
                                ? "Sign in to continue to your account"
                                : isNewUser
                                    ? `Setting up account for ${email}`
                                    : `Enter password for ${email}`}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pb-8 pt-4">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 flex items-start gap-3 text-sm border border-red-100">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    {step === 'email' ? (
                        <form onSubmit={handleCheckEmail} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email address</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 px-4 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all font-medium"
                                    required
                                    autoFocus
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-medium rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                                    </>
                                ) : (
                                    <>
                                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleAuth} className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-11 px-4 pr-10 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all font-medium"
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-medium rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isNewUser ? 'Creating Account...' : 'Logging In...'}
                                    </>
                                ) : (
                                    isNewUser ? 'Sign Up' : 'Login'
                                )}
                            </Button>
                            <button
                                type="button"
                                onClick={() => {
                                    setStep('email');
                                    setPassword('');
                                    setError(null);
                                    setShowPassword(false);
                                }}
                                className="w-full text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors text-center"
                            >
                                Wrong email? Go back
                            </button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 py-6 bg-gray-50/50">
                    <p className="text-xs text-gray-400 text-center font-medium">
                        By continuing, you agree to our <Link href="/terms" className="underline hover:text-gray-700 transition-colors">Terms</Link> and <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">Privacy Policy</Link>.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
