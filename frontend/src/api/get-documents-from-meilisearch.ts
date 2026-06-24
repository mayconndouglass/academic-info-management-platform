import { api } from '@/lib/axios'
import { Document } from '@/types/document-type'

interface GetDocumentsQuery {
  page: number
  category?: string
}

interface DocumentsResponse {
  documents: Document[]
  totalItems: number
  totalPages: number
}

export async function GetDocumentsFromMeilisearch({
  page,
  category,
}: GetDocumentsQuery) {
  const response = await api.get<DocumentsResponse>('/documents', {
    params: {
      page,
      category,
    },
  })

  return response.data
}
