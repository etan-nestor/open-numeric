import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer toutes les catégories
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')

    const categories = await prisma.category.findMany({
      include: {
        posts: {
          where: { status: 'PUBLISHED' },
          select: { id: true },
        },
        children: true,
        parent: true,
      },
      orderBy: { name: 'asc' },
      take: limit,
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    )
  }
}

// POST - Créer une catégorie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 🔥 Si parentId est vide ou une chaîne vide, le mettre à null
    const parentId = body.parentId && body.parentId.trim() !== '' ? body.parentId : null

    // Si un parentId est fourni, vérifier qu'il existe
    if (parentId) {
      const parentExists = await prisma.category.findUnique({
        where: { id: parentId },
        select: { id: true },
      })
      if (!parentExists) {
        return NextResponse.json(
          { success: false, error: 'La catégorie parente n\'existe pas' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        color: body.color || null,
        icon: body.icon || null,
        parentId: parentId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: category,
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une catégorie
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

    // 🔥 Si parentId est vide ou une chaîne vide, le mettre à null
    const parentId = body.parentId && body.parentId.trim() !== '' ? body.parentId : null

    // Si un parentId est fourni, vérifier qu'il existe et n'est pas lui-même
    if (parentId) {
      if (parentId === id) {
        return NextResponse.json(
          { success: false, error: 'Une catégorie ne peut pas être son propre parent' },
          { status: 400 }
        )
      }

      const parentExists = await prisma.category.findUnique({
        where: { id: parentId },
        select: { id: true },
      })
      if (!parentExists) {
        return NextResponse.json(
          { success: false, error: 'La catégorie parente n\'existe pas' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        color: body.color || null,
        icon: body.icon || null,
        parentId: parentId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Catégorie mise à jour avec succès',
      data: category,
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une catégorie
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

    // 🔥 Vérifier si la catégorie a des enfants
    const children = await prisma.category.findMany({
      where: { parentId: id },
      select: { id: true },
    })

    if (children.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cette catégorie a ${children.length} sous-catégorie(s). Supprimez-les d'abord.`
        },
        { status: 400 }
      )
    }

    // 🔥 Vérifier si la catégorie a des articles
    const posts = await prisma.blogPost.findMany({
      where: { categoryId: id },
      select: { id: true },
      take: 1,
    })

    if (posts.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cette catégorie contient des articles. Réassignez-les ou supprimez-les d\'abord.'
        },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Catégorie supprimée avec succès',
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}