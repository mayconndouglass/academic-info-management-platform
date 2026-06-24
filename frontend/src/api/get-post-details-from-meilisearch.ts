import { api } from '@/lib/axios'
import { Post } from '@/types/post'

export const getPostDetailsFromMeilisearch = async (id: string) => {
  try {
    const response = await api.get<Post>(`/post/${id}`)
    console.log(response)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Erro na busca, tente novamente mais tarde')
  }
}
