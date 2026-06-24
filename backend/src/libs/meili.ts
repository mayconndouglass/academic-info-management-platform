import { MeiliSearch } from "meilisearch"

import { env } from "../env"

export const meiliClient = new MeiliSearch({
  host: env.MEILI_HOST,
  apiKey: env.MEILI_MASTER_KEY,
})
