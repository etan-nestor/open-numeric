/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer tous les tags
export async function GET(request: NextRequest) {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                posts: {
                    where: { status: 'PUBLISHED' },
                    select: { id: true },
                },
            },
            orderBy: { name: 'asc' },
        })

        return NextResponse.json({ success: true, data: tags })
    } catch (error) {
        console.error('Error fetching tags:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des tags' },
            { status: 500 }
        )
    }
}

// POST - Créer un tag
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const tag = await prisma.tag.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Tag créé avec succès',
            data: tag,
        })
    } catch (error) {
        console.error('Error creating tag:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création' },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour un tag
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

        const tag = await prisma.tag.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Tag mis à jour avec succès',
            data: tag,
        })
    } catch (error) {
        console.error('Error updating tag:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un tag
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

        await prisma.tag.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Tag supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting tag:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}