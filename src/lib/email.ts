import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

interface EmailOptions {
    to: string
    subject: string
    html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        })
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}