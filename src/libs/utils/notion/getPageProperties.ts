import { getTextContent, getDateValue } from "notion-utils"
import { notionClient } from "src/apis/notion-client/client"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { customMapImageUrl } from "./customMapImageUrl"

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const blockValue = (block?.[id]?.value as any)?.value ?? block?.[id]?.value
  const rawProperties = Object.entries(blockValue?.properties || [])
  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val]: any = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val)
    } else {
      switch (schema[key]?.type) {
        case "file": {
          try {
            const Block = blockValue
            const url: string = val[0][1][0][1]
            const newurl = customMapImageUrl(url, Block)
            properties[schema[key].name] = newurl
          } catch (error) {
            properties[schema[key].name] = undefined
          }
          break
        }
        case "date": {
          const dateProperty: any = getDateValue(val)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case "select": {
          const selects = getTextContent(val)
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          }
          break
        }
        case "multi_select": {
          const selects = getTextContent(val)
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          }
          break
        }
        case "person": {
          const rawUsers = val.flat()

          const users = []
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userIdPair = rawUsers[i][0]
              const uuid = userIdPair[1]
              try {
                const res: any = await notionClient.getUsers([uuid])
                const rawValue =
                  res?.recordMapWithRoles?.notion_user?.[uuid]?.value
                const resValue = rawValue?.value ?? rawValue
                const user = {
                  id: resValue?.id || null,
                  name:
                    resValue?.name ||
                    `${resValue?.family_name}${resValue?.given_name}` ||
                    null,
                  profile_photo: resValue?.profile_photo || null,
                }
                users.push(user)
              } catch {
                users.push({ id: uuid, name: null, profile_photo: null })
              }
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }
  return properties
}

export { getPageProperties as default }
