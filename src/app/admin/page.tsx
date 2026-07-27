'use client'

import { useEffect, useState } from 'react'
import { 
  FiUsers, 
  FiBriefcase, 
  FiMessageSquare, 
  FiFileText, 
  FiMail, 
  FiStar,
} from 'react-icons/fi'
import Link from 'next/link'

interface Stats {
  projects: { total: number; published: number }
  blog: { total: number; published: number }
  testimonials: number
  teamMembers: number
  contacts: { total: number; unread: number }
  devis: { total: number; pending: number }
  subscribers: number
}

interface RecentItem {
  id: string
  title?: string
  name?: string
  email?: string
  createdAt: string
  status?: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentProjects, setRecentProjects] = useState<RecentItem[]>([])
  const [recentMessages, setRecentMessages] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, projectsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/portfolio?limit=5'),
        fetch('/api/contact?limit=5'),
      ])

      const statsData = await statsRes.json()
      const projectsData = await projectsRes.json()
      const messagesData = await messagesRes.json()

      setStats(statsData.data)
      setRecentProjects(projectsData.data || [])
      setRecentMessages(messagesData.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const cards = [
    {
      title: 'Projets',
      value: stats?.projects.total || 0,
      subValue: `${stats?.projects.published || 0} publiés`,
      icon: FiBriefcase,
      color: 'bg-blue-500',
      href: '/admin/portfolio',
    },
    {
      title: 'Articles',
      value: stats?.blog.total || 0,
      subValue: `${stats?.blog.published || 0} publiés`,
      icon: FiFileText,
      color: 'bg-green-500',
      href: '/admin/blog',
    },
    {
      title: 'Témoignages',
      value: stats?.testimonials || 0,
      icon: FiStar,
      color: 'bg-yellow-500',
      href: '/admin/testimonials',
    },
    {
      title: 'Équipe',
      value: stats?.teamMembers || 0,
      icon: FiUsers,
      color: 'bg-purple-500',
      href: '/admin/team',
    },
    {
      title: 'Messages',
      value: stats?.contacts.total || 0,
      subValue: `${stats?.contacts.unread || 0} non lus`,
      icon: FiMessageSquare,
      color: 'bg-red-500',
      href: '/admin/contact',
    },
    {
      title: 'Devis',
      value: stats?.devis.total || 0,
      subValue: `${stats?.devis.pending || 0} en attente`,
      icon: FiMail,
      color: 'bg-orange-500',
      href: '/admin/devis',
    },
    {
      title: 'Abonnés',
      value: stats?.subscribers || 0,
      icon: FiUsers,
      color: 'bg-indigo-500',
      href: '/admin/newsletter',
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <div className="text-sm text-gray-500">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {card.title}
                </p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                {card.subValue && (
                  <p className="text-xs text-gray-400 mt-1">{card.subValue}</p>
                )}
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers projets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Derniers projets</h2>
            <Link href="/admin/portfolio" className="text-sm text-blue-600 hover:text-blue-800">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'PUBLISHED' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                  }`}>
                    {project.status || 'Brouillon'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun projet</p>
            )}
          </div>
        </div>

        {/* Derniers messages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Derniers messages</h2>
            <Link href="/admin/contact" className="text-sm text-blue-600 hover:text-blue-800">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">{message.name}</p>
                    <p className="text-xs text-gray-500">{message.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    message.status === 'READ' 
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {message.status === 'READ' ? 'Lu' : 'Non lu'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun message</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/admin/portfolio/new"
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <FiBriefcase className="w-6 h-6 mx-auto text-blue-600 mb-2" />
          <span className="text-sm font-medium">Ajouter un projet</span>
        </Link>
        <Link
          href="/admin/blog/new"
          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <FiFileText className="w-6 h-6 mx-auto text-green-600 mb-2" />
          <span className="text-sm font-medium">Nouvel article</span>
        </Link>
        <Link
          href="/admin/team/new"
          className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          <FiUsers className="w-6 h-6 mx-auto text-purple-600 mb-2" />
          <span className="text-sm font-medium">Ajouter un membre</span>
        </Link>
        <Link
          href="/admin/testimonials/new"
          className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
        >
          <FiStar className="w-6 h-6 mx-auto text-yellow-600 mb-2" />
          <span className="text-sm font-medium">Nouveau témoignage</span>
        </Link>
      </div>
    </div>
  )
}