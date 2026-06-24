import { api } from '@/lib/axios'
import { Post } from '@/types/post'

interface SearchResult {
  hits: Post[]
  total: number
}

export async function searchPosts(query: string): Promise<SearchResult> {
  try {
    const response = await api.get<SearchResult>('/search-post', {
      params: { q: query },
    })

    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Erro na busca, tente novamente mais tarde')
  }
}
