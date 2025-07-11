import { Index as MeiliIndex } from "meilisearch"

import { MeiliTaskFailedError } from "../errors"
import { Post } from "../types"
import { FetchRecentUespiPostsService } from "./fetch-recent-uespi-posts"

export class UpdateMeilisearchWithRecentPostsService {
  constructor (
    private readonly meili: MeiliIndex<Post>,
    private readonly fetchRecentUespiPostsService: FetchRecentUespiPostsService
  ) { }

  async execute () {
    const { posts } = await this.fetchRecentUespiPostsService.execute()

    await this.meili.updateSearchableAttributes(["title", "content"])
    const task = await this.meili.addDocuments(posts)

    if (!task?.taskUid) {
      throw new MeiliTaskFailedError()
    }
  }
}
