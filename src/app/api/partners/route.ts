/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer les partenaires
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const isVisible = searchParams.get('isVisible') !== 'false'
    const isFeatured = searchParams.get('isFeatured') === 'true'
    const category = searchParams.get('category')

    const where: any = {}
    if (isVisible !== undefined) where.isVisible = isVisible
    if (isFeatured) where.isFeatured = true
    if (category) where.category = category

    const partners = await prisma.partner.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ success: true, data: partners })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des partenaires' },
      { status: 500 }
    )
  }
}

// POST - Créer un partenaire
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        logoUrl: body.logoUrl,
        website: body.website,
        description: body.description,
        category: body.category,
        isVisible: body.isVisible !== undefined ? body.isVisible : true,
        isFeatured: body.isFeatured || false,
        order: body.order || 0,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Partenaire ajouté avec succès',
      data: partner,
    })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du partenaire' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour un partenaire
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
    
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: body.name,
        logoUrl: body.logoUrl,
        website: body.website,
        description: body.description,
        category: body.category,
        isVisible: body.isVisible,
        isFeatured: body.isFeatured,
        order: body.order,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Partenaire mis à jour avec succès',
      data: partner,
    })
  } catch (error) {
    console.error('Error updating partner:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un partenaire
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

    await prisma.partner.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Partenaire supprimé avec succès',
    })
  } catch (error) {
    console.error('Error deleting partner:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}