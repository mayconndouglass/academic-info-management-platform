import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { GetDocumentDetails } from '@/api'
import { Footer } from '@/components'
import { PageDetailsSkeleton } from '@/components/post-details-skeleton'
import { formatDate } from '@/utils'

export const DocumentDetails = () => {
  const { id } = useParams()

  const { data: doc, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: () => GetDocumentDetails(id!),
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

        {!isLoading && doc && (
          <div className="mx-auto max-w-3xl">
            {/* Ícone e categoria */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  {doc.category || 'Outros'}
                </span>
                <span className="ml-2 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase text-gray-400">
                  {doc.type}
                </span>
              </div>
            </div>

            {/* Título e data */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="mb-2 text-xl font-semibold">{doc.title}</h2>
              <p className="text-sm text-gray-500">
                {doc.date ? formatDate(doc.date) : 'Sem data'}
              </p>
            </div>

            {/* Abrir documento */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Documento
              </h3>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 rounded-lg border border-blue-900 px-4 py-3 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-50"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir documento
              </a>
            </div>

            {/* Página de origem */}
            {doc.pageOrigin && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Publicado em
                </h3>
                <a
                  href={doc.pageOrigin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm text-blue-900 hover:underline"
                >
                  {doc.pageOrigin}
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </section>
  )
}
