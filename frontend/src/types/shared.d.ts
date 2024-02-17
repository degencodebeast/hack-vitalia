export type Article = {
    id: string;
    slug: string;
    title: string;
    content: string;
    image?: string;
    status?: ArticleStatus,
    intro?: string;
    createdAt: number | Date;
    updatedAt?: number | Date;
    author: {
        name: string;
        avatar?: string
    }
}
export type ArticleStatus = 'published' | 'draft'

export type MealPlan = {
    id: string;
    time: string; title: string;
    details: string;
    createdAt: number | Date;
    updatedAt?: number | Date
    userAddress: string
}