// pages/api/getPosts.ts

import { getRecordMap } from './notion-client/getRecordMap';

export const getRecordMapHandler = async (pageId: string) => {
    try {
        const posts = await getRecordMap(pageId);
        return { status: 200, data: posts };
    } catch (error) {
        console.error(error);
        return { status: 500, error: 'Failed to fetch posts' };
    }
}
