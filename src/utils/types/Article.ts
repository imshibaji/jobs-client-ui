export interface Article{
    id?: number;
    title: string;
    slug: string;
    content: string;
    image?: string;
    summary?: string;
    tags?: string[];
    userId?: number;
    type?: string;
    status?: string;
    isPublished?: boolean;
    isArchived?: boolean;
    isDeleted?: boolean;
    publishedAt?: Date;
}

export enum ArticleType {
    POST = 'post',
    PAGE = 'page',
    ARTICLE = 'article',
}

export enum ArticleStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    ARCHIVED = 'archived',
    DELETED = 'deleted',
}

export interface Tag{
    id?: number;
    name: string;
    slug: string;
    description?: string;
}