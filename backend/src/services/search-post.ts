import { Index as MeiliIndex } from "meilisearch"

import { NoResultsFoundError } from "../errors/no-result-found-error"
import { Post } from "../types"

export class SearchPostService {
  constructor(private readonly meili: MeiliIndex<Post>) { }

  async execute(query: string) {
    const searchResult = await this.meili.search(query, {
      limit: 10,
      sort: ["date:desc"]
    })

    if (!searchResult.hits || searchResult.hits.length === 0) {
      throw new NoResultsFoundError()
    }

    return {
      hits: searchResult.hits,
      total: searchResult.estimatedTotalHits
    }
  }
}
