import { z } from 'zod'

export const contactSchema = z.object({
    name: z.string().min(2, 'Le nom est requis'),
    email: z.string().email('Email invalide'),
    subject: z.string().min(3, 'Le sujet est requis'),
    message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
    phone:z.string().optional(),
    company:z.string().optional(),
})

export const devisSchema = z.object({
    name: z.string().min(2, 'Le nom est requis'),
    company: z.string().optional(),
    email: z.string().email('Email invalide'),
    phone: z.string().optional(),
    projectType: z.string().min(1, 'Le type de projet est requis'),
    budget: z.string().min(1, 'Le budget est requis'),
    timeline: z.string().min(1, 'Le délai est requis'),
    description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
})
export const devisUpdateSchema = z.object({
    status: z.enum(['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'COMPLETED']).optional(),
    estimatedPrice: z.number().optional().nullable(),
    notes: z.string().optional().nullable(),
})

export const projectSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().min(10),
    category: z.string(),
    technologies: z.array(z.string()),
    imageUrl: z.string().url(),
    clientType: z.enum(['ENTERPRISE', 'INDIVIDUAL']),
    isPublished: z.boolean().optional(),
    url: z.string().url().optional(),
    isCompleted: z.boolean().optional(),
})

export const blogPostSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    content: z.string().min(10),
    excerpt: z.string().min(10),
    image: z.string().url().optional(),
    tags: z.array(z.string()),
    published: z.boolean().optional(),
})