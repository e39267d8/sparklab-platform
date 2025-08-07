export interface Idea {
    id: number
    title: string
    content: string
    author: string
    tags: string[]
    likes: number
    comments: number
    timeAgo: string
    avatar: string

    // 新增以下字段
    isTeam?: boolean         // 是否已升级为组队
    teamMembers?: string[]   // 团队成员昵称（简化版）
}