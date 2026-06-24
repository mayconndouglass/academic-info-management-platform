import { api } from '@/lib/axios'
import { Document } from '@/types/document-type'

export async function GetDocumentDetails(id: string) {
  const response = await api.get<Document>(`/documents/${id}`)
  return response.data
}
