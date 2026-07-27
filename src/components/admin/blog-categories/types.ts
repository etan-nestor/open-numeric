export interface BlogCategory {
    id: string
    name: string
    slug: string
    description: string | null
    color: string | null
    icon: string | null
    parentId: string | null
    parent?: BlogCategory | null
    children?: BlogCategory[]
    posts?: { id: string }[]
    createdAt: string
    updatedAt: string
  }
  
  export interface CategoryStats {
    total: number
    withPosts: number
    withoutPosts: number
    hasChildren: number
  }