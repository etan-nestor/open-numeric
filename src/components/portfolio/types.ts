export interface Project {
    id: string
    title: string
    slug: string
    description: string
    category: string
    imageUrl: string
    isPublished: boolean
    url: string | null
    isCompleted: boolean
    technologies: { name: string }[]
    createdAt: string
  }
  
  export interface ServiceCategory {
    id: string
    title: string
    icon: React.ReactNode
    color: string
    description: string
  }