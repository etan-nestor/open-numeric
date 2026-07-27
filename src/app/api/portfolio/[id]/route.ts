import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                screens: {
                    orderBy: { order: 'asc' },
                },
                details: {
                    orderBy: { order: 'asc' },
                },
                testimonials: {
                    where: { isVisible: true },
                },
                technologies: true,
            },
        })

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Projet non trouvé' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: project })
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération du projet' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        
        const technologyConnections = body.technologies?.map((techName: string) => ({
            where: { name: techName },
            create: { 
                name: techName,
                slug: techName.toLowerCase().replace(/\s+/g, '-'),
            },
        })) || []

        const project = await prisma.project.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                category: body.category,
                imageUrl: body.imageUrl,
                clientType: body.clientType,
                isPublished: body.isPublished,
                url: body.url,
                isCompleted: body.isCompleted,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                technologies: {
                    set: [],
                    connectOrCreate: technologyConnections,
                },
            },
            include: {
                technologies: true,
                screens: true,
                details: true,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Projet mis à jour avec succès',
            data: project,
        })
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour du projet' },
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
        
        await prisma.project.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: 'Projet supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du projet' },
            { status: 500 }
        )
    }
}