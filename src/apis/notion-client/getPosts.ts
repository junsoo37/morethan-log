import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

export const maxDuration = 30;

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// Short-lived cache to avoid redundant Notion API calls during build.
// During `next build`, all getStaticProps calls share the same process,
// so this prevents fetching the same collection data 56+ times.
// TTL ensures fresh data during ISR revalidation on Vercel.
const CACHE_TTL_MS = 60 * 1000
let cachedPosts: TPosts | null = null
let cacheTimestamp = 0

export const getPosts = async () => {
  const now = Date.now()
  if (cachedPosts && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return cachedPosts
  }
  let id = CONFIG.notionConfig.pageId as string
  const api = new NotionAPI()

  const response = await api.getPage(id)
  id = idToUuid(id)
  const collectionValue = Object.values(response.collection)[0]?.value
  const collection = (collectionValue as any)?.value ?? collectionValue
  const block = response.block
  const schema = collection?.schema

  const rawMetadata = (block[id]?.value as any)?.value ?? block[id]?.value

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  } else {
    // Construct Data
    const pageIds = getAllPageIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      const blockValue = (block[id]?.value as any)?.value ?? block[id]?.value
      properties.createdTime = new Date(
        blockValue?.created_time
      ).toString()
      properties.fullWidth =
        (blockValue?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    cachedPosts = posts
    cacheTimestamp = Date.now()
    return posts
  }
}
