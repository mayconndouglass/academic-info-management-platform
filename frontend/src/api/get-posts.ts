import { api } from '@/lib/axios'

interface GetPostQuery {
  categorie: number | string
  pageIndex?: number | null
}

interface GetPostsResponse {
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

interface PostsPagination {
  posts: GetPostsResponse[]
  totalItems: number
  totalPages: number
}

export async function getPosts({
  pageIndex,
  categorie,
}: GetPostQuery): Promise<PostsPagination> {
  console.log('Entrou no arquivo da API')
  const response = await api.get<GetPostsResponse[]>('/posts', {
    params: {
      categories: categorie,
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
