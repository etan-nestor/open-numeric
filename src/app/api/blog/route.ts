/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { blogPostSchema } from '@/lib/validations'

// GET - Récupérer les articles
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const categoryId = searchParams.get('categoryId')
        const tagId = searchParams.get('tagId')
        const search = searchParams.get('search')
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = parseInt(searchParams.get('offset') || '0')

        const where: any = {}

        if (status) where.status = status
        if (categoryId) where.categoryId = categoryId
        if (tagId) {
            where.tags = {
                some: { id: tagId },
            }
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
            ]
        }

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                        },
                    },
                    category: true,
                    tags: true,
                    comments: {
                        where: { isApproved: true },
                        orderBy: { createdAt: 'desc' },
                        take: 5,
                    },
                    _count: {
                        select: { comments: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip: offset,
                take: limit,
            }),
            prisma.blogPost.count({ where }),
        ])

        return NextResponse.json({
            success: true,
            data: posts,
            pagination: {
                total,
                limit,
                offset,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des articles' },
            { status: 500 }
        )
    }
}

// 🔥 Fonction utilitaire pour obtenir ou créer un auteur
async function getOrCreateAuthor(authorId?: string) {
    // Si un authorId est fourni, vérifier qu'il existe
    if (authorId) {
        const userExists = await prisma.user.findUnique({
            where: { id: authorId },
            select: { id: true }
        })
        if (userExists) {
            return authorId
        }
    }

    // Chercher un admin existant
    const adminUser = await prisma.user.findFirst({
        where: { 
            OR: [
                { email: 'admin@opennumeric.com' },
                { role: 'ADMIN' }
            ]
        },
        select: { id: true }
    })

    if (adminUser) {
        return adminUser.id
    }

    // Créer un utilisateur admin par défaut
    const newUser = await prisma.user.create({
        data: {
            email: 'admin@opennumeric.com',
            name: 'Admin',
            password: 'dev45@.dev',
            role: 'ADMIN',
            isActive: true,
        },
        select: { id: true }
    })

    return newUser.id
}

// POST - Créer un article
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = blogPostSchema.parse(body)

        // Vérifier si le slug existe déjà
        const existing = await prisma.blogPost.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existing) {
            return NextResponse.json(
                { success: false, error: 'Ce slug est déjà utilisé' },
                { status: 400 }
            )
        }

        // 🔥 Obtenir ou créer un auteur valide
        const authorId = await getOrCreateAuthor(body.authorId)

        // 🔥 Gérer les tags
        const tags = validatedData.tags || []

        // Créer l'article
        const post = await prisma.blogPost.create({
            data: {
                title: validatedData.title,
                slug: validatedData.slug,
                content: validatedData.content,
                excerpt: validatedData.excerpt,
                image: validatedData.image || null,
                authorId: authorId,
                status: body.status || 'DRAFT',
                categoryId: body.categoryId || null,
                tags: tags.length > 0 ? {
                    connectOrCreate: tags.map((tagName: string) => ({
                        where: { name: tagName },
                        create: {
                            name: tagName,
                            slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                        },
                    })),
                } : undefined,
                publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
                isFeatured: body.isFeatured || false,
                readTime: body.readTime ? parseInt(body.readTime) : null,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
                category: true,
                tags: true,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Article créé avec succès',
            data: post,
        })
    } catch (error) {
        console.error('Error creating blog post:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de l\'article' },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour un article
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const body = await request.json()
        
        // 🔥 Gérer les tags
        const tags = body.tags || []

        const post = await prisma.blogPost.update({
            where: { slug },
            data: {
                title: body.title,
                content: body.content,
                excerpt: body.excerpt,
                image: body.image || null,
                status: body.status,
                categoryId: body.categoryId || null,
                isFeatured: body.isFeatured,
                readTime: body.readTime ? parseInt(body.readTime) : null,
                publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
                tags: tags.length > 0 ? {
                    set: [],
                    connectOrCreate: tags.map((tagName: string) => ({
                        where: { name: tagName },
                        create: {
                            name: tagName,
                            slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                        },
                    })),
                } : {
                    set: []
                },
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
                category: true,
                tags: true,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Article mis à jour avec succès',
            data: post,
        })
    } catch (error) {
        console.error('Error updating blog post:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un article
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        await prisma.blogPost.delete({
            where: { slug },
        })

        return NextResponse.json({
            success: true,
            message: 'Article supprimé avec succès',
        })
    } catch (error) {
        console.error('Error deleting blog post:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}