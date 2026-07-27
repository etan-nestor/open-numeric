export interface Partner {
    id: string
    name: string
    logoUrl: string
    website: string | null
    description: string | null
    category: string | null
    isVisible: boolean
    isFeatured: boolean
    order: number
    createdAt: string
    updatedAt: string
  }
  
  export interface PartnersStats {
    total: number
    visible: number
    hidden: number
    featured: number
  }