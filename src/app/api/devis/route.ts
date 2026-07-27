import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { devisSchema } from '@/lib/validations'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = devisSchema.parse(body)

        const devis = await prisma.devisRequest.create({
            data: {
                name: validatedData.name,
                company: validatedData.company,
                email: validatedData.email,
                phone: validatedData.phone,
                projectType: validatedData.projectType,
                budget: validatedData.budget,
                timeline: validatedData.timeline,
                description: validatedData.description,
            },
        })

        await sendEmail({
            to: 'tech00.02in@gmail.com',
            subject: `[Devis] Nouvelle demande de devis - ${validatedData.name}`,
            html: `
        <h1>Nouvelle demande de devis</h1>
        <p><strong>Nom:</strong> ${validatedData.name}</p>
        <p><strong>Entreprise:</strong> ${validatedData.company || 'Non renseigné'}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Téléphone:</strong> ${validatedData.phone || 'Non renseigné'}</p>
        <p><strong>Type de projet:</strong> ${validatedData.projectType}</p>
        <p><strong>Budget:</strong> ${validatedData.budget}</p>
        <p><strong>Délai:</strong> ${validatedData.timeline}</p>
        <p><strong>Description:</strong></p>
        <p>${validatedData.description}</p>
      `,
        })

        return NextResponse.json({
            success: true,
            message: 'Demande de devis envoyée avec succès',
            data: devis,
        })
    } catch (error) {
        console.error('Error in devis API:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de l\'envoi du devis' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '50')

        const where: any = {}
        if (status) where.status = status

        const devis = await prisma.devisRequest.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        })

        return NextResponse.json({
            success: true,
            data: devis,
        })
    } catch (error) {
        console.error('Error fetching devis:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des devis' },
            { status: 500 }
        )
    }
}