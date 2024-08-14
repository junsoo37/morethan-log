// pages/api/getPosts.ts
import { getPosts } from './notion-client/getPosts';

export const getPostsHandler = async () => {
    try {
        const posts = await getPosts();
        return posts;
    } catch (error) {
        Error('Failed to fetch posts');
    }
}
