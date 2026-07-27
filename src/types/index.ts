import { Project, ProjectCategory, ClientType, ProjectDetail, ProjectScreen } from '@prisma/client'

export type ProjectWithDetails = Project & {
    screens: ProjectScreen[]
    details: ProjectDetail[]
}

export interface ProjectFilter {
    category?: ProjectCategory
    clientType?: ClientType
    isPublished?: boolean
    isCompleted?: boolean
    search?: string
}

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}