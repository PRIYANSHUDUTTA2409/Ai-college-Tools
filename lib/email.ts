import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // Use SSL/TLS
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

export async function sendVerificationEmail(email: string, otp: string) {
    try {
        const info = await transport.sendMail({
            from: `"Ai College Tools" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - Ai College Tools",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Verify Your Email</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
        });
        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export async function notifyAdmin(userData: { email: string }) {
    const adminEmail = process.env.EMAIL_USER; // Default to sending to self if no specific ADMIN_EMAIL env var

    if (!adminEmail) {
        console.warn("No EMAIL_USER defined, skipping admin notification.");
        return false;
    }

    try {
        const info = await transport.sendMail({
            from: `"Ai College Tools System" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: "New User Registration - Ai College Tools",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #2563eb;">New User Registered! 🚀</h2>
                <p>A new user has just verified their email and joined the platform.</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold; color: #475569;">Email Address:</p>
                    <p style="margin: 5px 0 0 0; font-size: 18px; color: #0f172a;">${userData.email}</p>
                </div>
                <p style="color: #64748b; font-size: 14px;">Log in to the <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin">Admin Dashboard</a> to manage users.</p>
            </div>
          `,
        });
        console.log("Admin notification sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending admin notification:", error);
        return false;
    }
}
