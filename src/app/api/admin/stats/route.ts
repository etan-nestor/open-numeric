import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      projects,
      publishedProjects,
      blogPosts,
      publishedPosts,
      testimonials,
      teamMembers,
      contacts,
      unreadContacts,
      devis,
      pendingDevis,
      subscribers,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { isPublished: true } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.testimonial.count({ where: { isVisible: true } }),
      prisma.teamMember.count({ where: { isVisible: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.devisRequest.count(),
      prisma.devisRequest.count({ where: { status: 'PENDING' } }),
      prisma.newsletterSubscription.count({ where: { isActive: true } }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        projects: { total: projects, published: publishedProjects },
        blog: { total: blogPosts, published: publishedPosts },
        testimonials,
        teamMembers,
        contacts: { total: contacts, unread: unreadContacts },
        devis: { total: devis, pending: pendingDevis },
        subscribers,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des stats' },
      { status: 500 }
    )
  }
}