export interface Testimonial {
    id: string
    name: string
    position: string
    company: string
    content: string
    rating: number
    imageUrl: string | null
    isVisible: boolean
    isFeatured: boolean
    order: number
    createdAt: string
    updatedAt: string
    projectId: string | null
    project?: {
      id: string
      title: string
      slug: string
    } | null
  }
  
  export interface TestimonialsStats {
    total: number
    visible: number
    hidden: number
    featured: number
    averageRating: number
  }