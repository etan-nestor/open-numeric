import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Créer un transporteur avec fallback
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  // Vérifier si les variables d'environnement sont définies
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️ Email credentials not configured. Email sending will be disabled.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  return transporter
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = getTransporter()
  
  if (!transporter) {
    console.warn('⚠️ Email sending skipped: No transporter configured')
    return
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    console.log('✅ Email sent successfully')
  } catch (error) {
    console.error('❌ Error sending email:', error)
    throw error
  }
}

// Fonction pour tester la configuration email
export async function testEmailConfig(): Promise<boolean> {
  try {
    const transporter = getTransporter()
    if (!transporter) return false
    
    await transporter.verify()
    return true
  } catch (error) {
    console.error('Email config test failed:', error)
    return false
  }
}