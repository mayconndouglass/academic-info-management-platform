import { Index as MeiliIndex } from "meilisearch"

import { FetchPageError, MeiliTaskFailedError } from "../errors"
import { Post, RawWPPost } from "../types" 

export class PopulateMeiliSearchService { 
  constructor(
    private readonly baseUrl: string,
    private readonly meili: MeiliIndex<Post>
  ) { }
  
  async execute(startPage: number, endPage: number) {
    const { posts } = await this.fetchAllUespiPosts(startPage, endPage)

    await this.meili.updateSearchableAttributes(["title", "content"])
    const task = await this.meili.addDocuments(posts)

    if (!task?.taskUid) {
      throw new MeiliTaskFailedError()
    }
  }

  private async fetchAllUespiPosts(startPage: number, endPage: number) {
    const allPosts: Post[] = []
    const after = "after=2023-01-01T00:00:00"
    const url = `${this.baseUrl}/wp-json/wp/v2/posts?${after}&per_page=100`

    for (let i = startPage; i <= endPage; i ++) {
      const response = await fetch(`${url}&page=${i}`)
      const data = await response.json() as RawWPPost[]

      if (response.status !== 200) {
        console.log("Error Content", response.text)
        
        throw new FetchPageError()
      }

      const formattedPosts: Post[] = data.map(post => ({
        id: post.id,
        date: post.date,
        slug: post.slug,
        status: post.status,
        type: post.type,
        link: post.link,
        title: post.title.rendered,
        content: post.content.rendered,
        categories: post.categories
      }))
      
      allPosts.push(...formattedPosts)
      await new Promise((res) => setTimeout(res, 900))
    }

    return { posts: allPosts }
  }
}
