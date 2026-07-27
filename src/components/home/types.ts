export interface TeamMember {
    id?: string
    name: string
    position: string
    bio: string
    img: string
    isVisible?: boolean
}

export interface Client {
    id?: string
    name: string
    logo: string
    isVisible?: boolean
}

export interface Testimonial {
    id?: string
    name: string
    position: string
    company: string
    content: string
    rating?: number
    imageUrl: string | null
    isVisible?: boolean
}

export interface Service {
    name: string
    description: string
    icon: string
    slug: string
  }