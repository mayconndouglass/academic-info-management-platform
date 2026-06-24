import { api } from '@/lib/axios'
import { Post } from '@/types/post'

interface GetPostsFromMeilisearchQuery {
  page: number
  category?: number | undefined
}

interface PostsFromMeilisearch {
  posts: Post[]
  totalItems: number
  totalPages: number
}

export async function GetPostsFromMeilisearch({
  page,
  category,
}: GetPostsFromMeilisearchQuery) {
  const response = await api.get<PostsFromMeilisearch>(`/posts-meilisearch`, {
    params: {
      page,
      category,
    },
  })

  const { posts, totalItems, totalPages }: PostsFromMeilisearch = response.data

  return {
    posts,
    totalItems,
    totalPages,
  }
}
