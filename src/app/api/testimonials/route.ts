/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer les témoignages
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const isVisible = searchParams.get('isVisible') !== 'false'
        const isFeatured = searchParams.get('isFeatured') === 'true'
        const projectId = searchParams.get('projectId')

        const where: any = {}
        if (isVisible !== undefined) where.isVisible = isVisible
        if (isFeatured) where.isFeatured = true
        if (projectId) where.projectId = projectId

        const testimonials = await prisma.testimonial.findMany({
            where,
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
            orderBy: { order: 'asc' },
        })

        return NextResponse.json({ success: true, data: testimonials })
    } catch (error) {
        console.error('Error fetching testimonials:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des témoignages' },
            { status: 500 }
        )
    }
}

// POST - Créer un témoignage
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const testimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                position: body.position,
                company: body.company,
                content: body.content,
                rating: body.rating || 5,
                imageUrl: body.imageUrl,
                isVisible: body.isVisible !== undefined ? body.isVisible : true,
                isFeatured: body.isFeatured || false,
                projectId: body.projectId,
                order: body.order || 0,
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Témoignage ajouté avec succès',
            data: testimonial,
        })
    } catch (error) {
        console.error('Error creating testimonial:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du témoignage' },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour un témoignage
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

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                name: body.name,
                position: body.position,
                company: body.company,
                content: body.content,
                rating: body.rating,
                imageUrl: body.imageUrl,
                isVisible: body.isVisible,
                isFeatured: body.isFeatured,
                projectId: body.projectId,
                order: body.order,
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Témoignage mis à jour avec succès',
            data: testimonial,
        })
    } catch (error) {
        console.error('Error updating testimonial:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un témoignage
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

        await prisma.testimonial.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Témoignage supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting testimonial:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}