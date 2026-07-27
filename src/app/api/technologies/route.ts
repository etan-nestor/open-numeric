/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer les technologies
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')

        const where: any = {}
        if (category) where.category = category

        const technologies = await prisma.technology.findMany({
            where,
            include: {
                projects: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        })

        return NextResponse.json({ success: true, data: technologies })
    } catch (error) {
        console.error('Error fetching technologies:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des technologies' },
            { status: 500 }
        )
    }
}

// POST - Créer une technologie
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const technology = await prisma.technology.create({
            data: {
                name: body.name,
                slug: body.slug,
                icon: body.icon,
                color: body.color,
                category: body.category,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Technologie ajoutée avec succès',
            data: technology,
        })
    } catch (error) {
        console.error('Error creating technology:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de la technologie' },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour une technologie
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

        const technology = await prisma.technology.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                icon: body.icon,
                color: body.color,
                category: body.category,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Technologie mise à jour avec succès',
            data: technology,
        })
    } catch (error) {
        console.error('Error updating technology:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer une technologie
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

        await prisma.technology.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Technologie supprimée avec succès',
        })
    } catch (error) {
        console.error('Error deleting technology:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}