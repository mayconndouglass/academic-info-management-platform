import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  isFetching?: boolean
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  isFetching = false,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pages = Math.ceil(totalCount / perPage) || 1

  function handlePageChange(page: number) {
    if (isFetching) return

    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
      <span className="flex items-center gap-1 text-sm text-muted-foreground">
        Total de {totalCount} item(s)
        {isFetching && (
          <span className="ml-2 text-blue-500">
            <Spinner />
          </span>
        )}
      </span>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="order-2 text-sm font-medium">
          Página {pageIndex} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePageChange(1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1 || isFetching}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira Página</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pageIndex - 1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1 || isFetching}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Próxima Página</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pageIndex + 1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages || isFetching}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pages)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages || isFetching}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
