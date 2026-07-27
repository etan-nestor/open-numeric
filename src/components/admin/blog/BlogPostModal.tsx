/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { FiX, FiImage, FiTag, FiFolder, FiClock, FiEye } from 'react-icons/fi'

interface BlogPostModalProps {
    isOpen: boolean
    onClose: () => void
    post: any | null
    onSubmit: (data: any) => void
    loading?: boolean
}

const POST_STATUSES = [
    { value: 'DRAFT', label: 'Brouillon', color: 'amber' },
    { value: 'PUBLISHED', label: 'Publié', color: 'green' },
    { value: 'ARCHIVED', label: 'Archivé', color: 'gray' },
]

export function BlogPostModal({ isOpen, onClose, post, onSubmit, loading }: BlogPostModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        image: '',
        status: 'DRAFT',
        isFeatured: false,
        categoryId: '',
        tags: [] as string[],
        readTime: '',
    })
    const [newTag, setNewTag] = useState('')
    const [categories, setCategories] = useState<any[]>([])
    const [availableTags, setAvailableTags] = useState<any[]>([])
    const [loadingData, setLoadingData] = useState(false)

    useEffect(() => {
        // Charger les catégories et tags disponibles
        const fetchData = async () => {
            try {
                setLoadingData(true)
                const [categoriesRes, tagsRes] = await Promise.all([
                    fetch('/api/blog/categories'),
                    fetch('/api/blog/tags'),
                ])
                const categoriesData = await categoriesRes.json()
                const tagsData = await tagsRes.json()
                setCategories(categoriesData.data || [])
                setAvailableTags(tagsData.data || [])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoadingData(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                slug: post.slug || '',
                content: post.content || '',
                excerpt: post.excerpt || '',
                image: post.image || '',
                status: post.status || 'DRAFT',
                isFeatured: post.isFeatured || false,
                categoryId: post.categoryId || '',
                tags: post.tags?.map((t: any) => t.name) || [],
                readTime: post.readTime?.toString() || '',
            })
        } else {
            setFormData({
                title: '',
                slug: '',
                content: '',
                excerpt: '',
                image: '',
                status: 'DRAFT',
                isFeatured: false,
                categoryId: '',
                tags: [],
                readTime: '',
            })
        }
    }, [post])

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleAddTag = () => {
        const tagName = newTag.trim()
        if (tagName && !formData.tags.includes(tagName)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagName],
            }))
            setNewTag('')
        }
    }

    const handleRemoveTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            ...formData,
            readTime: formData.readTime ? parseInt(formData.readTime) : null,
        })
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/30 dark:border-amber-700/30">
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-amber-200/30 dark:border-amber-700/30 rounded-t-2xl z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-50">
                                    {post ? 'Modifier l\'article' : 'Nouvel article'}
                                </h2>
                                <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                                    {post ? 'Mettez à jour les informations de l\'article' : 'Créez un nouvel article de blog'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors"
                            >
                                <FiX className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Titre */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Titre de l'article"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="titre-de-l-article"
                                    required
                                />
                                <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">
                                    Utilisé dans l&apos;URL, uniquement des lettres minuscules et des tirets
                                </p>
                            </div>

                            {/* Catégorie */}
                            <div>
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    <FiFolder className="inline mr-1.5" />
                                    Catégorie
                                </label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="">Sans catégorie</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Temps de lecture */}
                            <div>
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    <FiClock className="inline mr-1.5" />
                                    Temps de lecture (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="5"
                                    min="1"
                                />
                            </div>

                            {/* Image */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    <FiImage className="inline mr-1.5" />
                                    URL de l&apos;image
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Résumé */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    Résumé <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
                                    placeholder="Un court résumé de l'article..."
                                    required
                                />
                            </div>

                            {/* Contenu */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    Contenu <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={8}
                                    className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y font-mono text-sm"
                                    placeholder="Contenu de l'article (supporte le Markdown)..."
                                    required
                                />
                            </div>

                            {/* Tags */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                    <FiTag className="inline mr-1.5" />
                                    Tags
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Ajouter un tag"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleAddTag()
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {/* Tags suggérés */}
                                    {availableTags
                                        .filter(t => !formData.tags.includes(t.name))
                                        .slice(0, 5)
                                        .map((tag) => (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        tags: [...prev.tags, tag.name],
                                                    }))
                                                }}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                + {tag.name}
                                            </button>
                                        ))}
                                    {/* Tags sélectionnés */}
                                    {formData.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="group flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300 rounded-full text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 transition-colors"
                                            >
                                                <FiX className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Statut et options */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/30 dark:bg-amber-900/10 rounded-xl border border-amber-200/30 dark:border-amber-700/30">
                                    <div>
                                        <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                                            Statut
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            {POST_STATUSES.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-end gap-6 pt-1">
                                        <label className="flex items-center gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="isFeatured"
                                                checked={formData.isFeatured}
                                                onChange={handleChange}
                                                className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                            />
                                            <span className="text-sm text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                                <FiEye className="inline mr-1.5" />
                                                À la une
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-amber-200/30 dark:border-amber-700/30">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 border border-amber-200/30 dark:border-amber-700/30 rounded-xl hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-colors text-amber-700 dark:text-amber-300 font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading || loadingData}
                                className="px-8 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-medium shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Enregistrement...' : post ? 'Mettre à jour' : 'Publier l\'article'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}