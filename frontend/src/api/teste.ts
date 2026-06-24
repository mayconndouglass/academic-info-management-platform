import { wpApi } from '@/lib/axios'
import { RawWPPost } from '@/types/raw-wp-post'

interface GetPostQuery {
  categorie: number | string
  pageIndex?: number | null
}

interface PostsPagination {
  posts: RawWPPost[]
  totalItems: number
  totalPages: number
}

export async function GetPosts(): Promise<PostsPagination> {
  const response = await wpApi.get<RawWPPost[]>('/media', {
    params: {
      page: 1,
      per_page: 100,
      mime_type: 'application/pdf',
      search: 'resolucao',
    },
  })

  console.log('RESONSE IN', response)

  const totalItems = response.headers['x-wp-total']
  const totalPages = response.headers['x-wp-totalpages']

  return {
    posts: response.data,
    totalItems: parseInt(totalItems),
    totalPages: parseInt(totalPages),
  }
}

const response = GetPosts()

console.log('response', response)
