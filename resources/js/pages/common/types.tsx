export type Post = {
    // Database attributes
    id: number,
    author_id: number,
    title: string,
    slug: string,
    content: string,
    published_at: string,
    created_at: string,
    updated_at: string,

    // Appended attributes
    excerpt: string,
    exists: boolean,
}