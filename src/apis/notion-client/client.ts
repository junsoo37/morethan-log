import { NotionAPI } from "notion-client"

// Notion's private API responds 403 to Node's default `User-Agent: node`,
// so requests identify as a browser instead.
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"

const MAX_RETRIES = 4

// Notion answers bursts of requests with 429, and ofetch never retries POSTs
// unless told to. Back off so a throttled render recovers instead of failing,
// keeping the 1+2+4+8s budget inside the 30s maxDuration the pages declare.
export const notionClient = new NotionAPI({
  ofetchOptions: {
    headers: {
      "User-Agent": BROWSER_USER_AGENT,
    },
    retry: MAX_RETRIES,
    retryDelay: ({ options, response }) => {
      const retryAfterSeconds = Number(response?.headers.get("retry-after"))
      if (retryAfterSeconds > 0) {
        return retryAfterSeconds * 1000
      }

      // ofetch decrements `retry` on each pass, so it counts attempts down.
      const remaining = typeof options.retry === "number" ? options.retry : 0
      return 1000 * 2 ** (MAX_RETRIES - remaining)
    },
  },
})
