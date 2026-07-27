'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    FiHome,
    FiBriefcase,
    FiUsers,
    FiFileText,
    FiSettings,
    FiLogOut,
    FiStar,
    FiTag,
    FiFolder,
    FiCode,
    FiMail,
    FiDollarSign,
    FiSend,
    FiBookOpen,
    FiUserCheck,
} from 'react-icons/fi'

export function Sidebar() {
    const pathname = usePathname()

    const menuItems = [
        { href: '/admin', label: 'Tableau de bord', icon: FiHome },
        { href: '/admin/portfolio', label: 'Portfolio', icon: FiBriefcase },
        { href: '/admin/testimonials', label: 'Témoignages', icon: FiStar },
        { href: '/admin/team', label: 'Équipe', icon: FiUsers },
        { href: '/admin/partners', label: 'Partenaires', icon: FiUserCheck },
        { href: '/admin/technologies', label: 'Technologies', icon: FiCode },
        { href: '/admin/contact', label: 'Messages', icon: FiMail },
        { href: '/admin/newsletter', label: 'Newsletter', icon: FiSend },
        { href: '/admin/devis', label: 'Devis', icon: FiDollarSign },
        { href: '/admin/blog', label: 'Blog', icon: FiBookOpen },
    ]

    // Sous-menus pour le blog
    const blogSubItems = [
        { href: '/admin/blog', label: 'Articles', icon: FiFileText },
        { href: '/admin/blog/categories', label: 'Catégories', icon: FiFolder },
        { href: '/admin/blog/tags', label: 'Tags', icon: FiTag },
    ]

    const isBlogActive = pathname?.startsWith('/admin/blog')

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
            <div className="p-4 border-b border-gray-800">
                <h1 className="text-xl font-bold">Open Numeric Admin</h1>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-800 text-gray-300'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}

                    {/* Sous-menu Blog */}
                    <li>
                        <div 
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                isBlogActive
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-800 text-gray-300'
                            }`}
                        >
                            <FiBookOpen className="w-5 h-5" />
                            <span>Blog</span>
                        </div>
                        <ul className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-2">
                            {blogSubItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-1.5 rounded-lg transition-colors text-sm ${
                                                isActive
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:bg-gray-800 text-gray-400'
                                            }`}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>

                    <li>
                        <Link
                            href="/admin/settings"
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                pathname === '/admin/settings'
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-800 text-gray-300'
                            }`}
                        >
                            <FiSettings className="w-5 h-5" />
                            <span>Paramètres</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-gray-800 text-gray-300 transition-colors">
                    <FiLogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    )
}