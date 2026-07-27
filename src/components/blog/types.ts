export interface BlogPost {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    image: string | null
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    views: number
    isFeatured: boolean
    readTime: number | null
    publishedAt: string | null
    createdAt: string
    updatedAt: string
    author: {
      id: string
      name: string
      email: string
      avatar: string | null
    }
    category: {
      id: string
      name: string
      slug: string
      color: string | null
    } | null
    tags: {
      id: string
      name: string
      slug: string
    }[]
    comments: { id: string }[]
    _count: {
      comments: number
    }
  }
  
  export interface BlogCategory {
    id: string
    name: string
    slug: string
    description: string | null
    color: string | null
    icon: string | null
    posts?: { id: string }[]
  }
  
  export interface BlogTag {
    id: string
    name: string
    slug: string
    description: string | null
    posts?: { id: string }[]
  }