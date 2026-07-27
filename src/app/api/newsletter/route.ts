/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer les abonnés
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: any = {}
    if (status === 'active') where.isActive = true
    if (status === 'inactive') where.isActive = false

    const subscribers = await prisma.newsletterSubscription.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ success: true, data: subscribers })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des abonnés' },
      { status: 500 }
    )
  }
}

// POST - Ajouter un abonné
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Vérifier si déjà inscrit
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({
          success: false,
          error: 'Cet email est déjà inscrit',
        }, { status: 400 })
      }

      // Réactiver
      const subscription = await prisma.newsletterSubscription.update({
        where: { email },
        data: {
          isActive: true,
          token: randomBytes(32).toString('hex'),
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Réinscription réussie',
        data: subscription,
      })
    }

    // Créer un nouveau abonnement
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email,
        token: randomBytes(32).toString('hex'),
        isActive: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie',
      data: subscription,
    })
  } catch (error) {
    console.error('Error in newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}