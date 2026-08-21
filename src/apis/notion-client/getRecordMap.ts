import { notionClient } from "./client"

export const getRecordMap = async (pageId: string) => {
  const recordMap = await notionClient.getPage(pageId)
  return recordMap
}
