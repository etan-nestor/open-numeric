/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer tous les membres
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const isVisible = searchParams.get('isVisible')
        const isCore = searchParams.get('isCore') === 'true'

        const where: any = {}
        if (isVisible !== null) where.isVisible = isVisible === 'true'
        if (isCore) where.isCore = true

        const team = await prisma.teamMember.findMany({
            where,
            orderBy: { order: 'asc' },
        })

        return NextResponse.json({ success: true, data: team })
    } catch (error) {
        console.error('Error fetching team:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération de l\'équipe' },
            { status: 500 }
        )
    }
}

// POST - Créer un membre
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const member = await prisma.teamMember.create({
            data: {
                name: body.name,
                position: body.position,
                bio: body.bio,
                imageUrl: body.imageUrl,
                email: body.email,
                phone: body.phone,
                linkedin: body.linkedin,
                twitter: body.twitter,
                facebook: body.facebook,
                instagram: body.instagram,
                github: body.github,
                portfolio: body.portfolio,
                // 🔥 IMPORTANT: Convertir order en nombre entier
                order: typeof body.order === 'string' ? parseInt(body.order) : Number(body.order) || 0,
                isVisible: body.isVisible !== undefined ? body.isVisible : true,
                isCore: body.isCore || false,
                joinedAt: body.joinedAt ? new Date(body.joinedAt) : null,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Membre ajouté avec succès',
            data: member,
        })
    } catch (error) {
        console.error('Error creating team member:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du membre' },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour un membre
export async function PUT(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID requis' },
                { status: 400 }
            )
        }

        const body = await request.json()

        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name: body.name,
                position: body.position,
                bio: body.bio,
                imageUrl: body.imageUrl,
                email: body.email,
                phone: body.phone,
                linkedin: body.linkedin,
                twitter: body.twitter,
                facebook: body.facebook,
                instagram: body.instagram,
                github: body.github,
                portfolio: body.portfolio,
                // 🔥 IMPORTANT: Convertir order en nombre entier
                order: typeof body.order === 'string' ? parseInt(body.order) : Number(body.order) || 0,
                isVisible: body.isVisible,
                isCore: body.isCore,
                joinedAt: body.joinedAt ? new Date(body.joinedAt) : null,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Membre mis à jour avec succès',
            data: member,
        })
    } catch (error) {
        console.error('Error updating team member:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un membre
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID requis' },
                { status: 400 }
            )
        }

        await prisma.teamMember.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Membre supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting team member:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}