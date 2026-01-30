import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyAdmin } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
            return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
        }

        // Verify User and Clear OTP
        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                otp: null,
                otpExpiresAt: null,
            },
        });

        // Notify Admin
        // Fire and forget - don't block the response
        notifyAdmin({ email }).catch(err => console.error("Failed to notify admin:", err));

        return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
