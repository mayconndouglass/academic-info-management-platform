import { api } from '@/lib/axios'

interface GetPostDetailsProps {
  id: string | undefined
}

interface GetPostDetailsResponse {
  id: number
  date: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  categories: number[]
}

export async function getPostDetails({ id }: GetPostDetailsProps) {
  const response = await api.get<GetPostDetailsResponse>(`/posts/${id}`)

  return response.data
}
