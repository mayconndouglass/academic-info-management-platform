import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useSearch } from '@/hooks/useSearch'
import { cn } from '@/lib/utils'

import { SearchItemSkeleton } from './search-item-skeleton'
import { SearchResultItem } from './search-result-item'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'

export const SearchBar = () => {
  const { input, handleChange, results, loading } = useSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false)

  useEffect(() => {
    setDropDownIsOpen(input.length > 0)
  }, [input])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropDownIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (query: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('search', query)
    params.set('page', '1')

    setSearchParams(params)
    setDropDownIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl">
      {/* busca */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit(input)
        }}
      >
        <Input
          value={input}
          onChange={handleChange}
          onFocus={() => {
            if (input.length > 0) {
              setDropDownIsOpen(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault()
              setDropDownIsOpen(false)
              e.currentTarget.blur()
            }
          }}
          type="search"
          placeholder="Faça a sua busca..."
          className="h-14 rounded-lg border-zinc-300 pl-14 shadow-md placeholder:text-lg"
        />
      </form>

      <Search className="absolute left-4 top-3.5 h-7 w-7 text-muted-foreground" />

      {dropDownIsOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg',
            results.length === 0 &&
              !loading &&
              'p-4 text-center text-sm text-gray-500',
          )}
        >
          <ScrollArea className="h-80 w-full overscroll-contain">
            <div className="box-border w-full">
              {loading ? (
                <div className="w-full space-y-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SearchItemSkeleton key={i} />
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="w-full">
                  {results.map((item) => (
                    <SearchResultItem item={item} key={item.id} />
                  ))}
                </div>
              ) : (
                <div className="flex w-full items-center justify-center p-6 text-sm text-gray-500">
                  Nenhum resultado encontrado
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Busque por:
        <span className="text-slate-800">
          {' '}
          informações acadêmicas, editais, serviços institucionais,
          documentos...
        </span>
      </div>
    </div>
  )
}
