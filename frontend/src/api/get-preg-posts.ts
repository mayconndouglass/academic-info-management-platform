import { api } from '@/lib/axios'

interface GetPostQuery {
  pageIndex?: number | null
}

interface GetPregPostsResponse {
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
}

interface PregPostsPaginated {
  posts: GetPregPostsResponse[]
  totalItems: number
  totalPages: number
}

export async function getPregPosts({
  pageIndex,
}: GetPostQuery): Promise<PregPostsPaginated> {
  console.log('Entrou no arquivo da API')
  const response = await api.get<GetPregPostsResponse[]>('/posts', {
    params: {
      categories: 4,
      page: pageIndex,
      per_page: 16,
    },
  })

  const totalItems = response.headers['x-wp-total']
  const totalPages = response.headers['x-wp-totalpages']
  console.log('DEntro do arquivo da API', response)
  console.log('totalItems', totalItems)
  console.log('totalPages', totalPages)

  return {
    posts: response.data,
    totalItems: parseInt(totalItems),
    totalPages: parseInt(totalPages),
  }
}
