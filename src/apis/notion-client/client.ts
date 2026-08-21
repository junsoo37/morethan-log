import { NotionAPI } from "notion-client"

// Notion's private API responds 403 to Node's default `User-Agent: node`,
// so requests identify as a browser instead.
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"

export const notionClient = new NotionAPI({
  ofetchOptions: {
    headers: {
      "User-Agent": BROWSER_USER_AGENT,
    },
  },
})
