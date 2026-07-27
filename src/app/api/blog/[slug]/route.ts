import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer un article par slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const post = await prisma.blogPost.findUnique({
      where: { slug },
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
          include: {
            replies: {
              where: { isApproved: true },
              orderBy: { createdAt: 'asc' },
            },
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    // Incrémenter les vues
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de l\'article' },
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