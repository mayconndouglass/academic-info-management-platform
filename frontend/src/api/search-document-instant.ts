import { api } from '@/lib/axios'
import { Document } from '@/types/document-type'

interface SearchInstantResponse {
  hits: Document[]
  total: number
}

export async function SearchDocumentsInstant(q: string) {
  const response = await api.get<SearchInstantResponse>('/documents/instant', {
    params: { q },
  })

  return response.data
}
