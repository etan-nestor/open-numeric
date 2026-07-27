/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '50')

        const where: any = {}
        if (status === 'unread') where.isRead = false
        if (status === 'read') where.isRead = true

        const messages = await prisma.contactMessage.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        })

        return NextResponse.json({
            success: true,
            data: messages,
        })
    } catch (error) {
        console.error('Error fetching contact messages:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des messages' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = contactSchema.parse(body)

        const message = await prisma.contactMessage.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
                phone: validatedData.phone || null,
                company: validatedData.company || null,
            },
        })


        return NextResponse.json({
            success: true,
            message: 'Message envoyé avec succès',
            data: message,
        })
    } catch (error) {
        console.error('Error in contact API:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        )
    }
}