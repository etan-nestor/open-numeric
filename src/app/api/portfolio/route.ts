/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
    try {
        console.log('🔵 GET /api/portfolio called')

        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')
        const isPublished = searchParams.get('isPublished')
        const includeAll = searchParams.get('includeAll') === 'true'

        const where: any = {}
        if (category) where.category = category
        // Si includeAll est true, ne pas filtrer par isPublished
        if (!includeAll && isPublished !== null) {
            where.isPublished = isPublished === 'true'
        }

        console.log('🔵 Where clause:', where)

        const projects = await prisma.project.findMany({
            where,
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
            orderBy: { createdAt: 'desc' },
        })

        console.log('🟢 Projects found:', projects.length)
        console.log('🟢 All projects:', projects.map(p => ({ title: p.title, isPublished: p.isPublished })))

        return NextResponse.json({ success: true, data: projects })
    } catch (error) {
        console.error('🔴 Error fetching projects:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des projets' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = projectSchema.parse(body)

        // Gérer les technologies : créer ou connecter
        const technologyConnections = validatedData.technologies?.map((techName: string) => ({
            where: { name: techName },
            create: {
                name: techName,
                slug: techName.toLowerCase().replace(/\s+/g, '-'),
            },
        })) || []

        const project = await prisma.project.create({
            data: {
                title: validatedData.title,
                slug: validatedData.slug,
                description: validatedData.description,
                category: validatedData.category as any,
                imageUrl: validatedData.imageUrl,
                clientType: validatedData.clientType,
                isPublished: validatedData.isPublished || false,
                url: validatedData.url,
                isCompleted: validatedData.isCompleted || true,
                // Connecter ou créer les technologies
                technologies: {
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
            message: 'Projet créé avec succès',
            data: project,
        })
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du projet' },
            { status: 500 }
        )
    }
}