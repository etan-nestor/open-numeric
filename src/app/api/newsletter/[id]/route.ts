import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT - Mettre à jour un abonné
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const subscriber = await prisma.newsletterSubscription.update({
            where: { id },
            data: {
                isActive: body.isActive !== undefined ? body.isActive : undefined,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Abonné mis à jour avec succès',
            data: subscriber,
        })
    } catch (error) {
        console.error('Error updating subscriber:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un abonné
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.newsletterSubscription.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Abonné supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting subscriber:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}