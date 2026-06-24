import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { getPostDetailsFromMeilisearch } from '@/api'
import { Footer } from '@/components'
import { PageDetailsSkeleton } from '@/components/post-details-skeleton'
import { formatDate, getNameCategorysByNumber } from '@/utils'

export const PostDetails = () => {
  const { id } = useParams()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostDetailsFromMeilisearch(id!),
    enabled: !!id,
  })

  return (
    <section className="flex h-screen flex-col">
      <header className="container mx-auto border-b bg-white px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 pt-16">
        {isLoading && <PageDetailsSkeleton />}

        {!isLoading && post && (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center">
              <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900">
                <span className="flex items-center text-center text-base font-bold leading-none text-white">
                  {getNameCategorysByNumber(post.categories)}
                </span>
              </div>
              <div>
                {/*  <h1 className="text-xl font-bold text-gray-900">
                  {post?.title.rendered}
                </h1> */}
                {/* <p className="text-sm text-gray-500">
                  {formatDate(post?.date)}
                </p> */}
              </div>
            </div>

            <div className="mb-16 border-b border-gray-200 pb-16">
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="mb-4 text-sm text-gray-500">
                {formatDate(post?.date)}
              </p>
              <p
                className="link-color flex flex-col gap-6 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></p>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-normal">
                Acesse o conteúdo no site oficial da Uespi{' '}
              </h2>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <p className="text-sm text-blue-900">{post.slug}</p>
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </section>
  )
}
