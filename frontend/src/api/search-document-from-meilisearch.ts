import { api } from '@/lib/axios'
import { Document } from '@/types/document-type'

interface SearchDocumentsQuery {
  q: string
  page: number
  category?: string
}

interface DocumentsResponse {
  documents: Document[]
  totalItems: number
  totalPages: number
}

export async function SearchDocumentsFromMeilisearch({
  q,
  page,
  category,
}: SearchDocumentsQuery) {
  const response = await api.get<DocumentsResponse>('/documents/search', {
    params: {
      q,
      page,
      category,
    },
  })

  return response.data
}
