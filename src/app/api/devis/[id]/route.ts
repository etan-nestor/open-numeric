import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { devisUpdateSchema } from '@/lib/validations'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const validatedData = devisUpdateSchema.parse(body)

        const devis = await prisma.devisRequest.update({
            where: { id },
            data: {
                status: validatedData.status || undefined,
                estimatedPrice: validatedData.estimatedPrice || undefined,
                notes: validatedData.notes || undefined,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Devis mis à jour avec succès',
            data: devis,
        })
    } catch (error) {
        console.error('Error updating devis:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour du devis' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.devisRequest.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Devis supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting devis:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du devis' },
            { status: 500 }
        )
    }
}