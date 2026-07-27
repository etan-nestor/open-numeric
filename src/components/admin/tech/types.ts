export interface Technology {
    id: string
    name: string
    slug: string
    icon: string | null
    color: string | null
    category: string | null
    createdAt: string
    updatedAt: string
    projects?: {
      id: string
      title: string
      slug: string
    }[]
  }
  
  export interface TechStats {
    total: number
    categories: Record<string, number>
    mostUsed: string[]
  }