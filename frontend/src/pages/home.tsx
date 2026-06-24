import { useQuery } from '@tanstack/react-query'

import {
  GetDocumentsFromMeilisearch,
  SearchDocumentsFromMeilisearch,
} from '@/api'
import { CardSkeleton, Footer, MainHeader, Pagination } from '@/components'
import { DocumentCard } from '@/components/document-card'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { useDocumentCategory } from '@/hooks/use-document-category'

export function Home() {
  const {
    searchParams,
    setSearchParams,
    selectedCategory,
    handleCategoryChange,
    getCategoryFilter,
  } = useDocumentCategory()

  const searchQuery = searchParams.get('search') || ''
  const pageIndex = searchParams.get('page') || '1'

  const {
    data: { documents = [], totalItems = 0 } = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['documents', pageIndex, selectedCategory, searchQuery],
    queryFn: () =>
      searchQuery
        ? SearchDocumentsFromMeilisearch({
            q: searchQuery,
            page: Number(pageIndex),
            category: getCategoryFilter(),
          })
        : GetDocumentsFromMeilisearch({
            page: Number(pageIndex),
            category: getCategoryFilter(),
          }),
    placeholderData: (previousData) => previousData,
  })

  const isLoadingOrFetching = isLoading || isFetching

  return (
    <>
      <MainHeader
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />

      <main className="container mx-auto px-4 pt-6 sm:pt-16">
        {/* Busca */}
        <div>
          <h1 className="mb-6 text-center text-4xl font-medium text-slate-700 sm:mb-12 sm:text-4xl md:text-5xl lg:text-6xl">
            Encontre Informações <br /> e Documentos
          </h1>
          <SearchBar />
        </div>

        <div className="mt-16">
          <div className="mb-2.5 ml-2 flex justify-between text-sm text-muted-foreground">
            {/* Título dinâmico */}
            <span>
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : selectedCategory === 'todos'
                  ? 'Todos os documentos'
                  : selectedCategory}
            </span>

            {searchQuery && (
              <Button
                onClick={() => {
                  const params = new URLSearchParams(searchParams)
                  params.delete('search')
                  params.set('page', '1')
                  setSearchParams(params)
                }}
                variant={'ghost'}
                className="text-sm hover:text-red-500"
                size={'sm'}
              >
                Limpar busca
              </Button>
            )}
          </div>

          <div className="cards grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading && <CardSkeleton />}

            {!isLoading && (
              <div
                className={`contents transition-opacity duration-300 ${isFetching ? 'opacity-0' : 'opacity-100'}`}
              >
                {documents.map((doc) => (
                  <DocumentCard key={doc.id} {...doc} />
                ))}
              </div>
            )}
          </div>

          {!isLoadingOrFetching && documents.length === 0 && (
            <div className="my-16 text-center text-sm text-muted-foreground">
              Nenhum documento encontrado
              {searchQuery ? ` para "${searchQuery}"` : ''}.
            </div>
          )}
        </div>

        <div className="mt-5">
          <Pagination
            pageIndex={Number(pageIndex)}
            totalCount={totalItems}
            perPage={16}
            isFetching={isFetching}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
