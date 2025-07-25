import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pages = Math.ceil(totalCount / perPage) || 1

  function handlePageChange(page: number) {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePageChange(1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira Página</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pageIndex - 1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Próxima Página</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pageIndex + 1)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>

          <Button
            onClick={() => handlePageChange(pages)}
            variant={'outline'}
            className="h-8 w-8 p-0"
            disabled={pageIndex === pages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
