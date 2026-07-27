import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const message = await prisma.contactMessage.update({
            where: { id },
            data: {
                isRead: body.isRead !== undefined ? body.isRead : undefined,
                isReplied: body.isReplied !== undefined ? body.isReplied : undefined,
                status: body.status || undefined,
                notes: body.notes || undefined,
                repliedAt: body.isReplied ? new Date() : undefined,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Message mis à jour avec succès',
            data: message,
        })
    } catch (error) {
        console.error('Error updating contact message:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour du message' },
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

        await prisma.contactMessage.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Message supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting contact message:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du message' },
            { status: 500 }
        )
    }
}