import { FetchPageError } from "../errors"
import { Post, RawWPPost } from "../types"

export class FetchRecentUespiPostsService {
  constructor(private baseUrl: string) { }

  async execute() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const isoDate = sevenDaysAgo.toISOString()
    
    const response = await fetch(
      `${this.baseUrl}/wp-json/wp/v2/posts?after=${isoDate}&per_page=100`
    )

    if (!response.ok) throw new FetchPageError()

    const rawWPPosts = (await response.json()) as RawWPPost[]

    const normalizedPosts: Post[] = rawWPPosts.map(post => ({
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

    return { posts: normalizedPosts }
  }
}
