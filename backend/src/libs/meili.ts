import { MeiliSearch } from "meilisearch"

import { env } from "../env"

export const meiliClient = new MeiliSearch({
  host: env.MEILI_HOST ?? "http://localhost:7700",
  // apiKey: 
  apiKey: "mXMg77UymYL_xsi7CPj3IX4eCPfb4hjJ02lL5U3t8fI"
})
