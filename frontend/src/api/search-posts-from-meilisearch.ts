import { api } from '@/lib/axios'
import { Post } from '@/types/post'

interface SearchPostsFromMeilisearch {
  q: string
  page: number
  category?: number | undefined
}

interface PostsFromMeilisearch {
  posts: Post[]
  totalItems: number
  totalPages: number
}

export async function SearchPostsFromMeilisearch({
  q,
  page,
  category,
}: SearchPostsFromMeilisearch) {
  console.log(page)
  const response = await api.get<PostsFromMeilisearch>(
    `/posts-meilisearch/search`,
    {
      params: {
        q,
        page,
        category,
      },
    },
  )

  const { posts, totalItems, totalPages }: PostsFromMeilisearch = response.data

  return {
    posts,
    totalItems,
    totalPages,
  }
}
