import { notionClient } from "./client"

export const getRecordMap = async (pageId: string) => {
  const recordMap = await notionClient.getPage(pageId)

  // Notion attaches each text block's collaborative-edit history as
  // `crdt_data`, which nothing in the renderer reads. It is typically ~98% of
  // a post's payload and pushes ISR pages past Vercel's 20 MB limit.
  for (const block of Object.values(recordMap.block)) {
    const value = (block?.value as any)?.value ?? block?.value
    if (value) delete (value as any).crdt_data
  }

  return recordMap
}
